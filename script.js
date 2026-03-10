let music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const startButton = document.getElementById('startButton');
const titleText = document.getElementById('title');
const textBox = document.getElementById('textBox');
const textBoxText = document.getElementById('textBoxText');
const continueText = document.getElementById('continueText');
const mcText = document.getElementById('mcText');

musicButton.addEventListener('click', function() {
    music.play();
    musicButton.style.display = 'none';
});

startButton.addEventListener('click', function() {
    musicButton.style.display = 'none';
    startButton.style.display = 'none';
    titleText.innerHTML = '';
    music.src = './music/dieHard.mp3';
    textBox.style.backgroundColor = '#6a6a6a';
    textBox.style.width = 'auto';
    textBox.style.padding = '100px';
    textBoxText.textContent = "Dang! This music is fiyah! Too bad it's unreleased...";
    textBoxText.style.backgroundColor = '#6a6a6a';
    continueText.style.display = 'block';
});