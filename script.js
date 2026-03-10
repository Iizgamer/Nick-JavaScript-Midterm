let music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const startButton = document.getElementById('startButton');
const titleText = document.getElementById('title');

musicButton.addEventListener('click', function() {
    music.play();
    musicButton.style.display = 'none';
});

startButton.addEventListener('click', function() {
    musicButton.style.display = 'none';
    startButton.style.display = 'none';
    titleText.innerHTML = '';
    music.src = './music/dieHard.mp3';
})