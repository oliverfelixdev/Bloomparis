const modal = document.getElementById("videoModal");
const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const timeDisplay = document.getElementById("timeDisplay");
const progressBar = document.getElementById("progressBar");

function openModal() {
  modal.style.display = "block";
  video.play();
  playPauseBtn.textContent = "PAUSE";
}

function closeModal() {
  modal.style.display = "none";
  video.pause();
  video.currentTime = video.currentTime;
  playPauseBtn.textContent = "PLAY";
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "PAUSE";
  } else {
    video.pause();
    playPauseBtn.textContent = "PLAY";
  }
}

function toggleMute() {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "SOUND OFF" : "SOUND ON";
}

function toggleFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

video.addEventListener("timeupdate", () => {
  timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(
    video.duration
  )}`;
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
});

function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
  requestAnimationFrame(updateProgressBar);
}

video.addEventListener("play", () => {
  requestAnimationFrame(updateProgressBar);
});
