let slider = document.getElementById('vol-control');
let value = document.getElementById('value');
let audio = document.getElementById('myaudio');

slider.addEventListener('mousemove', setVolume);

function setVolume(){
  audio.volume = slider.value/100
}


