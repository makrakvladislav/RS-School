const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const videoPoster = document.querySelector('.poster');
const videoPosterButton = document.querySelector('.player__play');
const progressBar = player.querySelector('.progress-bar');
const toggle = player.querySelector('.player__button');
const volumeSlider = player.querySelector('.player__volume');
const volume = player.querySelector('.player__button-volume');
const fullscreenButton = player.querySelector('.player__button-fullscreen');

let videoVolume = volumeSlider.value / 100;

function toggleBtn() {
  if (video.paused) {
    video.play();
    video.volume = videoVolume;
    videoPosterButton.classList.add('hide');
  } else {
    video.pause();
    video.volume = videoVolume;
    videoPosterButton.classList.remove('hide');
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

function toggleFullscreen(event) {
  if (document.fullscreenElement !== player) {
    if (player.requestFullscreen) {
      player.requestFullscreen();
      fullscreenButton.classList.add('fullscreen-exit');
    } else {
      player.webkitRequestFullscreen?.();
      fullscreenButton.classList.remove('fullscreen-exit');
    }
  } else {
    document.exitFullscreen?.();
    fullscreenButton.classList.remove('fullscreen-exit');
  }
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
  volumeSlider.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${this.value}%, rgb(200, 200, 200) ${this.value}%, rgb(200, 200, 200) 100%)`;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent;
  progressBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, rgb(200, 200, 200) ${percent}%, rgb(200, 200, 200) 100%)`;
}

function scrubProgress(event) {
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggle.addEventListener('click', toggleBtn);
videoPoster.addEventListener('click', (event) => { 
  event.target.classList.add('hide');
  videoPosterButton.classList.add('hide');
  toggleBtn();
});
videoPosterButton.addEventListener('click', () => {
  videoPoster.classList.add('hide');
  toggleBtn();
});
video.addEventListener('click', toggleBtn);
video.addEventListener('timeupdate', handleProgress);
video.onended = (eent) => {
  toggle.classList.toggle('pause');
  videoPosterButton.classList.remove('hide');
};
volume.addEventListener('click', toggleMute);
volumeSlider.addEventListener('change', handleVolume);
volumeSlider.addEventListener('input', handleVolume);
fullscreenButton.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', (event) => {
  fullscreenButton.classList.toggle('fullscreen-exit', document.fullscreenElement != null);
});

let drag;
let grap;
progressBar.addEventListener('pointerdown', scrubProgress);
progressBar.addEventListener('pointerover', () => { drag = true });
progressBar.addEventListener('pointerout', () => { drag = false; grap = false });
progressBar.addEventListener('pointerdown', () => { grap = drag });
progressBar.addEventListener('pointerup', () => { grap = false });

progressBar.addEventListener('pointermove', (event) => { 
  if (drag && grap) {
    scrubProgress(event);
  }
});






