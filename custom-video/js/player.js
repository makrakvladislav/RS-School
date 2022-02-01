const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-bar');
const toggle = player.querySelector('.player__button');
const volumeSlider = player.querySelector('.player__volume');
const volume = player.querySelector('.player__button-volume');

let videoVolume = volumeSlider.value / 100;

console.log(videoVolume);

function toggleBtn() {
  if (video.paused) {
    video.play();
    console.log(videoVolume)
    video.volume = videoVolume;
  } else {
    video.pause();
    video.volume = videoVolume;
  }
  toggle.classList.toggle('pause');
}

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
  volume.classList.toggle('mute');
}

function handleVolume() {
  if (this.value == 0) {
    volume.classList.add('mute');
    video.muted = true;
  } else {
    volume.classList.remove('mute');
    video.muted = false;
  }
  video[this.name] = this.value / 100;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent;
  progressBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #fff ${percent}%, white 100%)`
}

function scrubProgress(event) {
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggle.addEventListener('click', toggleBtn);
video.addEventListener('click', toggleBtn);
video.addEventListener('timeupdate', handleProgress);
volume.addEventListener('click', toggleMute);
volumeSlider.addEventListener('change', handleVolume);
volumeSlider.addEventListener('input', handleVolume);

let drag;
let grap;
progressBar.addEventListener('click', scrubProgress);
progressBar.addEventListener('mouseover', () => { drag = true });
progressBar.addEventListener('mouseout', () => { drag = false; grap = false });
progressBar.addEventListener('mousedown', () => { grap = drag });
progressBar.addEventListener('mouseup', () => { grap = false });
progressBar.addEventListener('mousemove', (event) => { 
  if (drag && grap) {
    scrubProgress(event);
  }
});




