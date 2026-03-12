let music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const startButton = document.getElementById('startButton');
const titleText = document.getElementById('title');
const textBox = document.getElementById('textBox');
const textBoxText = document.getElementById('textBoxText');
const continueText = document.getElementById('continueText');
const theHelm = document.getElementById('battle-1');
const battleBox = document.getElementById('battle');
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
    } else if (sceneCount === 4) {
        theHelm.style.display = 'block';
        textBoxText.textContent = "What?! A worker! Guess I'll have to rap battle to get out of this!"
    } else if (sceneCount === 5) {
        battle('./images/the-helm.png', 50);
    }
});

function battle(battleImage, enemyHealthMax) {
    let PHP = 100;
    const playerHP = document.getElementById('playerHP');
    const enemyHP = document.getElementById('enemyHP');
    const enemyHealth = enemyHealthMax;
    let playerHPText = "Your Flow: " + String(PHP) + '/100'
    let enemyHPText = "Enemy's Flow: " + String(enemyHealth) + '/' + String(enemyHealthMax);
    document.body.backgroundColor = 'black';
    textBox.style.display = 'none';
    battleBox.style.display = 'block';
    music.src = './music/euphoria.mp3';
    playerHP.textContent = playerHPText;
    enemyHP.textContent = enemyHPText;
    
};