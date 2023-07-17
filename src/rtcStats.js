let batchArray = [];
let movingWindow = [];


export function getBatchArray() {
  return batchArray;
}

export default function rtcStats() {
  (function () {
    if (window.rtcstats) {
      console.warn("[RTCStats] Already declared");
      return;
    }

    window.rtcstats = {};

    const _config = {
      interval: 1,
      avgInterval: 5,
      logInterval: 10,
      maxBatches: 120,
    };

    const _filter = {
      types: [
        "outbound-rtp",
        "remote-inbound-rtp",
        "inbound-rtp",
        "media-source",
        "track",
      ],
      kinds: ["video", "audio"],
      props: [
        "id",
        "type",
        "kind",
        "bytesSent",
        "byesReceived",
        "packetsSent",
        "packetsLost",
        "packetsReceived",
        "frameHeight",
        "frameWidth",
        "framesEncoded",
        "framesDecoded",
        "framesPerSecond",
        "framesSent",
        "framesReceived",
        "keyFramesEncoded",
        "keyFramesDecoded",
        "mid",
        "qualityLimitationDurations",
        "qualityLimitationReason",
        "qualityLimitationResolutionChanges",
        "rid",
        "pauseCount",
        "freezeCount",
        "jitter",
        "totalAudioEnergy",
        "jitterBufferDelay",
        "totalPauseDuration",
        "totalFreezeDuration",
        "jitterBufferEmittedCount",
        "totalSamplesReceived",
        "concealedSamples",
        "silentConcealedSamples",
        "insertedSamplesForDeceleration",
        "removedSamplesForAcceleration",
        "audioLevel",
        "totalAudioEnergy",
        "totalSamplesDuration",
        "roundTripTime",
      ],
    };

    const pcArray = [];

    batchArray = [];
    movingWindow = [];

    async function writeBatch(batchCollection) {
      const aggregatedReports = [].concat(...batchCollection);

      let filteredReports = [];

      for (let report of aggregatedReports) {
        for (let key in report) {
          if (key !== "connectionId" && key !== "reportNum") {
            if (
              _filter.types.includes(report[key].type) &&
              _filter.kinds.includes(report[key].kind)
            ) {
              let filteredReport = {};
              for (let prop of _filter.props) {
                if (prop in report[key]) {
                  filteredReport[prop] = report[key][prop];
                }
              }
              filteredReports.push(filteredReport);
            }
          }
        }
      }

      if (!filteredReports.length) {
        return;
      }

      movingWindow.push(filteredReports);
      if (movingWindow.length > _config.avgInterval) {
        const averagedReports = calculateAverages();
        batchArray.push(averagedReports);

        if (batchArray.length > _config.maxBatches) {
          batchArray.shift();
        }

        movingWindow.shift();
      }
    }

    function calculateAverages() {
      let sums = {}, counts = {}, results = [];
      const nonAveragedProps = new Set(['id', 'type', 'kind', 'mid']); // Add any property names that should not be averaged
  
      for (let report of movingWindow) {
          for (let item of report) {
              const itemId = item.id + '|' + item.type;
              if (!sums[itemId]) {
                  sums[itemId] = {};
                  counts[itemId] = {};
              }
  
              for (let key in item) {
                  if (!counts[itemId][key]) {
                      counts[itemId][key] = 0;
                      sums[itemId][key] = 0;
                  }
  
                  if (nonAveragedProps.has(key)) {
                      // For non-averaged properties, we take the first occurrence
                      if (counts[itemId][key] === 0) {
                          sums[itemId][key] = item[key];
                          counts[itemId][key] = 1;  // Prevent this property from being overwritten
                      }
                  } else {
                      if (typeof item[key] === 'number') {
                          sums[itemId][key] += item[key];
                          counts[itemId][key]++;
                      }
                  }
  
                  if (isNaN(sums[itemId][key])) {
                      //console.log(`Got NaN for key ${key}, value was ${item[key]}`);
                  }
              }
          }
      }
  
      for (let itemId in sums) {
        let id_type = itemId.split('|');
        let itemResult = {id: id_type[0], type: id_type[1]};
        for (let key in sums[itemId]) {
            if (nonAveragedProps.has(key)) {
                itemResult[key] = sums[itemId][key];
            } else {
                itemResult[key] = sums[itemId][key] / counts[itemId][key];
            }
            if (isNaN(itemResult[key])) {
                //console.log(`Got NaN in result for key ${key}, sum was ${sums[itemId][key]}, count was ${counts[itemId][key]}`);
            }
        }
        results.push(itemResult);
    }
    
  
      return results;
  }
  
  
  
  
  

    setInterval(() => {
      console.log("[RTCStats] batchArray", batchArray);
    }, _config.logInterval * 1000);

    console.info("[RTCStats] Init");

    RTCPeerConnection = new Proxy(RTCPeerConnection, {
      construct(target, args) {
        const pc = new target(...args);

        const TICK = _config.interval * 1000;

        pc.batch = [];
        pc.reportNum = 0;
        pc.connectionId = crypto.randomUUID();

        pcArray.push(pc);

        console.warn("[RTCStats] PeerConnection instantiated", pc);

        pc._getStats = async function (getStatsPromise) {
          const stats = await getStatsPromise;
          const r = Object.fromEntries(stats.entries());
          if (!r) return;

          const logData = {
            connectionId: this.connectionId,
            reportNum: this.reportNum,
            ...r,
          };

          this.batch.push(logData);
          this.reportNum += 1;
        };

        pc.addEventListener("connectionstatechange", () => {
          clearInterval(pc._statsInterval);

          if (pc.connectionState === "connected") {
            pc._getStats(pc.getStats());

            pc._statsInterval = setInterval(() => {
              if (pc.connectionState !== "connected")
                return clearInterval(pc._statsInterval);

              pc._getStats(pc.getStats());
            }, TICK);
          }
        });

        return pc;
      },
    });

    setInterval(() => {
      if (!pcArray.length) {
        console.log("[RTCStats] No pc array");
        return;
      }
      const batchCollection = pcArray
        .filter((pc) => pc.batch.length)
        .map((pc) => pc.batch.splice(0, pc.batch.length));
      if (batchCollection.length) {
        writeBatch(batchCollection);
        window.rtcstats.batchArray = batchArray;
      }
    }, _config.interval * 1000);
  })();
}
