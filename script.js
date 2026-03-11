let music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const startButton = document.getElementById('startButton');
const titleText = document.getElementById('title');
const textBox = document.getElementById('textBox');
const textBoxText = document.getElementById('textBoxText');
const continueText = document.getElementById('continueText');
let sceneCount = 0;

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
    document.body.background = './images/background-1.png';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
});

continueText.addEventListener('click', function() {
    sceneCount++;
    if (sceneCount === 1) {
        textBoxText.textContent = "Wait! I got it! I'll just steal the music and release it myself!";
    } else if (sceneCount === 2) {
        textBoxText.textContent = "I'll just have to get to the studio, take the records, and leave! Should be easy!";
    } else if (sceneCount === 3) {
        document.body.background = './images/studio.png';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        textBoxText.textContent = "Alright! I'm here! Now, let's see... where are those records..."
    }
});