/* find elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progressFilled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".playerSlider");
const fullScreen = player.querySelector(".full__screen");

var fullScreenEnabled = !!document.fullscreenEnabled;

//console.log(fullScreenEnabled);

/* functions */

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  let icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function openFullScreen() {
  if (isFullScreen()) {
    document.exitFullscreen();
    setFullscreenData(false);
  } else {
    player.requestFullscreen();
    setFullscreenData(true);
  }
}

function isFullScreen() {
  setFullscreenData(false);
  return document.fullScreen;
}
function setFullscreenData(state) {
  player.setAttribute("data-fullscreen", state);
}
/* events */

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));

progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullScreen.addEventListener("click", openFullScreen);
