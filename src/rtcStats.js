let batchArray = [];
let bufferArray = [];

export function getBatchArray() {
  return batchArray;
}

const propertyMapAvg = {
  'inbound-rtp': ['packetsLost', 'framesDecoded', 'framesReceived', 'keyFramesDecoded', 'bytesReceived', 'packetsReceived', 'jitterBufferDelay', 'jitterBufferEmittedCount', 'totalSamplesReceived', 'concealedSamples', 'silentConcealedSamples', 'insertedSamplesForDeceleration', 'removedSamplesForAcceleration', 'totalSamplesDuration', 'totalAudioEnergy', 'audioLevel', 'pauseCount', 'freezeCount', 'totalFreezesDuration', 'totalPausesDuration', 'framesPerSecond', 'frameHeight', 'frameWidth'],
  'outbound-rtp': ['packetsLost', 'framesEncoded', 'framesSent', 'keyFramesEncoded', 'packetsSent', 'bytesSent', 'qualityLimitationDurations', 'framesPerSecond', 'frameHeight', 'frameWidth', 'audioLevel'],
  'remote-inbound-rtp': ['packetsLost'],
};

const propertyMapLastValue = {
  "inbound-rtp": ["jitter"],
  "outbound-rtp": ["jitter"],
  "remote-inbound-rtp": ["jitter", "roundTripTime"],
};

const idFilterValue = ["IT01V1234"];

export default function rtcStats() {
  if (window.rtcstats) {
    console.warn("[RTCStats] Already declared");
    return;
  }

  window.rtcstats = {};

  const _config = {
    interval: 1,
    logInterval: 10,
    maxBatches: 24,
    maxBuffer: 5,
  };

  const pcArray = [];

  batchArray = [];

  async function writeBatch(batchCollection) {
    const aggregatedReports = batchCollection.flat();

    if (!aggregatedReports.length) {
      return;
    }

    bufferArray.push(aggregatedReports);

    if (bufferArray.length === _config.maxBuffer) {
      const averageData = computeAverage();
      batchArray.push(averageData);
      bufferArray = [];
    }

    if (batchArray.length > _config.maxBatches) {
      batchArray.shift();
    }
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

  function computeAverage() {
    let valueSum = {};
    let valueCount = {};
    let lastValues = {};
    let averageValues = {};

    for (const sublist of bufferArray) {
      for (const report of sublist) {
        for (const id in report) {
          if (id === 'connectionId' || id === 'reportNum') continue;

          const item = report[id];
          const propertiesAvg = propertyMapAvg[item.type];
          const propertiesLast = propertyMapLastValue[item.type];

          if (propertiesAvg) {
            for (const property of propertiesAvg) {
              if (item.hasOwnProperty(property)) {
                if (!valueSum[item.type]) {
                  valueSum[item.type] = {};
                  valueCount[item.type] = {};
                }
                if (!valueSum[item.type][property]) {
                  valueSum[item.type][property] = {};
                  valueCount[item.type][property] = {};
                }
                if (!valueSum[item.type][property][item.id]) {
                  valueSum[item.type][property][item.id] = 0;
                  valueCount[item.type][property][item.id] = 0;
                }

                valueSum[item.type][property][item.id] += item[property];
                valueCount[item.type][property][item.id] += 1;
              }
            }
          }
          if (propertiesLast) {
            for (const property of propertiesLast) {
              if (item.hasOwnProperty(property)) {
                if (!lastValues[item.type]) {
                  lastValues[item.type] = {};
                }
                if (!lastValues[item.type][property]) {
                  lastValues[item.type][property] = {};
                }
                lastValues[item.type][property][item.id] = item[property];
              }
            }
          }
        }
      }
    }

    for (const type in valueSum) {
      for (const property in valueSum[type]) {
        const totalValues = valueSum[type][property];
        const count = valueCount[type][property];

        averageValues[type] = {
          ...averageValues[type],
          [property]: {},
        };

        for (const id in totalValues) {
          averageValues[type][property][id] = totalValues[id] / count[id];
        }
      }
    }

    // Add last values
    for (const type in lastValues) {
      for (const property in lastValues[type]) {
        const lastValue = lastValues[type][property];

        averageValues[type] = {
          ...averageValues[type],
          [property]: lastValue,
        };
      }
    }

    // Filter out specific IDs
    for (const type in averageValues) {
      for (const property in averageValues[type]) {
        for (const id in averageValues[type][property]) {
          if (idFilterValue.includes(id)) {
            delete averageValues[type][property][id];
          }
        }
      }
    }

    return averageValues;
  }
}
