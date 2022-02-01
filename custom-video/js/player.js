const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-bar');
const toggle = player.querySelector('.player__button');
const ranges = player.querySelectorAll('.player__slider');
const volume = player.querySelector('.player__button-volume');

console.log(player, video, progress, progressBar, toggle);

function toggleBtn() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  toggle.classList.toggle('pause');
}

function toggleMute() {
  if (video.muted == true) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  volume.classList.toggle('mute');
}

function handleRangesUpdate() {
  console.log(this.name)
  if (this.name == 'volume') {
    if (this.value == 0) {
      volume.classList.add('mute');
    } else {
      volume.classList.remove('mute');
    }
  }
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent;
  progressBar.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${percent}%, #fff ${percent}%, white 100%)`
}

function scrubProgress(event) {
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * video.duration;
  console.log(scrubTime);
  video.currentTime = scrubTime;

}
  
ranges.forEach(range => range.addEventListener('change', handleRangesUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangesUpdate));

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

toggle.addEventListener('click', toggleBtn);
video.addEventListener('click', toggleBtn);
volume.addEventListener('click', toggleMute);
video.addEventListener('timeupdate', handleProgress);


