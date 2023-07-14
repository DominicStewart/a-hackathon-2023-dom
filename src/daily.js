import rtcStats from './rtcStats.js';
import Daily from "@daily-co/daily-js";



console.log("Daily version: %s", Daily.version());

const ROOM_URL = "https://bdom.staging.daily.co/switchover";
const dailyConfig = {
};

let callObject;

async function initializeCallObject() {
  callObject = Daily.createCallObject({
    subscribeToTracksAutomatically: true,
    dailyConfig
  });
  await fillVideoDevicesDropDown();
  await fillAudioDevicesDropDown();
}

initializeCallObject();

function createAndJoin() {
  callObject.join({
    url: ROOM_URL
  });
  rtcStats();
};

// Function to handle track started event
function startTrack(evt) {
  console.log("Track started: ", evt);
  if (evt.track.kind === "audio" && evt.participant.local === false) {
    let audiosDiv = document.getElementById("audios");
    let audioEl = document.createElement("audio");
    audiosDiv.appendChild(audioEl);
    audioEl.style.width = "100%";
    audioEl.srcObject = new MediaStream([evt.track]);
    audioEl.play();
  } else if (evt.track.kind === "video") {
    let videosDiv = document.getElementById("videos");
    let videoEl = document.createElement("video");
    videosDiv.appendChild(videoEl);
    videoEl.style.width = "100%";
    videoEl.srcObject = new MediaStream([evt.track]);
    videoEl.play();
  }
}

// Function to handle track stopped event
function stopTrack(evt) {
  console.log("Track stopped: ", evt);
  if (evt.track.kind === "audio") {
    let audios = document.getElementsByTagName("audio");
    for (let audio of audios) {
      if (
        audio.srcObject &&
        audio.srcObject.getAudioTracks()[0] === evt.track
      ) {
        audio.remove();
      }
    }
  } else if (evt.track.kind === "video") {
    let vids = document.getElementsByTagName("video");
    for (let vid of vids) {
      if (vid.srcObject && vid.srcObject.getVideoTracks()[0] === evt.track) {
        vid.remove();
      }
    }
  }
}

async function fillVideoDevicesDropDown() {
  let video_devices = (await callObject.enumerateDevices()).devices.filter(
    (d) => d.kind === "videoinput"
  );
  let currentDeviceId = (await callObject.getInputDevices()).camera.deviceId;
  console.log("current", currentDeviceId, "cameras", video_devices);
  let selectEl = document.getElementById("video-devices");
  selectEl.innerHTML = "";
  video_devices.forEach((d) => {
    let optionEl = document.createElement("option");
    optionEl.value = d.deviceId;
    optionEl.innerHTML = d.label;
    optionEl.selected = d.deviceId === currentDeviceId;
    selectEl.appendChild(optionEl);
  });

  // set the selected device as default
  await changeVideoDevice();
}

async function fillAudioDevicesDropDown() {
  let audio_devices = (await callObject.enumerateDevices()).devices.filter(
    (d) => d.kind === "audioinput"
  );
  let currentDeviceId = (await callObject.getInputDevices()).mic.deviceId;
  console.log("current", currentDeviceId, "mic", audio_devices);
  let selectEl = document.getElementById("audio-devices");
  selectEl.innerHTML = "";
  audio_devices.forEach((d) => {
    let optionEl = document.createElement("option");
    optionEl.value = d.deviceId;
    optionEl.innerHTML = d.label;
    optionEl.selected = d.deviceId === currentDeviceId;
    selectEl.appendChild(optionEl);
  });

  // set the selected device as default
  await changeAudioDevice();
}

window.changeVideoDevice = async function changeVideoDevice() {
  let selectEl = document.getElementById("video-devices");
  console.log("!!! changing video device");
  callObject.setInputDevicesAsync({ videoDeviceId: selectEl.value });
}

window.changeAudioDevice = async function changeAudioDevice() {
  let selectEl = document.getElementById("audio-devices");
  console.log("!!! changing audio device");
  callObject.setInputDevicesAsync({ AudioDeviceId: selectEl.value });
}


function turnMicrophoneOn() {
  callObject.setLocalAudio(true);
}

function turnCameraOn() {
  callObject.setLocalVideo(true);
}

function turnMicrophoneOff() {
  callObject.setLocalAudio(false);
}

function turnCameraOff() {
  callObject.setLocalVideo(false);
}

async function leaveCall() {
  let vids = Array.from(document.getElementsByTagName("video"));
  for (let vid of vids) {
    vid.remove();
  }

  let audios = Array.from(document.getElementsByTagName("audio"));
  for (let audio of audios) {
    audio.remove();
  }

  await callObject.leave();
}

function cameraError(evt) {
  console.log("Your device error was: ", evt);
}

function meetingJoined(evt) {
  console.log("You joined the meeting: ", evt);
}

function participantJoined(evt) {
  console.log("Participant joined meeting: ", evt);
}

function updateParticipant(evt) {
  console.log("Participant updated: ", evt);
}



// Event listeners
  callObject.once("joined-meeting", meetingJoined);
  callObject.on("track-started", startTrack);
  callObject.on("track-stopped", stopTrack);
  callObject.on("participant-joined", participantJoined);
  callObject.on("participant-updated", updateParticipant);
  callObject.on("camera-error", cameraError);

document.addEventListener('DOMContentLoaded', (event) => {
  const joinButton = document.getElementById('joinCall');
  joinButton.addEventListener('click', createAndJoin);

  const cameraOnButton = document.getElementById('cameraOn');
  cameraOnButton.addEventListener('click', turnCameraOn);

  const microphoneOnButton = document.getElementById('microphoneOn');
  microphoneOnButton.addEventListener('click', turnMicrophoneOn);
  
  const cameraOffButton = document.getElementById('cameraOff');
  cameraOffButton.addEventListener('click', turnCameraOff);

  const microphoneOffButton = document.getElementById('microphoneOff');
  microphoneOffButton.addEventListener('click', turnMicrophoneOff);

  const leaveCallButton = document.getElementById('leaveCall');
  leaveCallButton.addEventListener('click', leaveCall);

  const videoDevicesSelect = document.getElementById('video-devices');
  videoDevicesSelect.addEventListener('change', changeVideoDevice);

  const audioDevicesSelect = document.getElementById('audio-devices');
  audioDevicesSelect.addEventListener('change', changeAudioDevice);

});

