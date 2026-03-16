// declaring variables
let music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const startButton = document.getElementById('startButton');
const titleText = document.getElementById('title');
const textBox = document.getElementById('textBox');
const textBoxText = document.getElementById('textBoxText');
const continueText = document.getElementById('continueText');
const theHelm = document.getElementById('battle-1');
const battleBox = document.getElementById('battle');
const mustardGuy = document.getElementById('mustardGuy');
const takeThem = document.getElementById('takeThem');
const leaveThem = document.getElementById('leaveThem');
const ending = document.getElementById('ending');
let sceneCount = 0;
let battleCount = 0;

// makes intro music play
musicButton.addEventListener('click', function() {
    music.play().catch(e => console.warn('Audio play failed:', e));
    musicButton.style.display = 'none';
});

// makes start button transition to opening scene
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
    document.body.style.backgroundImage = 'url(./images/background-1.png)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
});

// for when you click the continue button
continueText.addEventListener('click', function() {
    sceneCount++;
    if (sceneCount === 1) {
        textBoxText.textContent = "Wait! I got it! I'll just steal the music and release it myself!";
    } else if (sceneCount === 2) {
        textBoxText.textContent = "I'll just have to get to the studio, take the records, and leave! Should be easy!";
    } else if (sceneCount === 3) {
        document.body.style.backgroundImage = 'url(./images/studio.png)';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        textBoxText.textContent = "Alright! I'm here! Now, let's see... where are those records...";
    } else if (sceneCount === 4) {
        theHelm.style.display = 'block';
        textBoxText.textContent = "What?! A worker! Guess I'll have to rap battle to get out of this!";
    } else if (sceneCount === 5) {
        music.src = './music/euphoria.mp3';
        battle('./images/the-helm.png', 1);
    } else if (sceneCount === 6) {
        theHelm.style.display = 'none';
        mustardGuy.style.display = 'block';
        textBoxText.textContent = "W-What?! Kendrick Lamar?! I- I'm just- I'm here to steal your records! So getcho mic up and rap battle me!";
    } else if (sceneCount === 7) {
        music.src = './music/prayer.mp3';
        battle('./images/mustard-guy.png', 1);
    } else if (sceneCount === 8) {
        mustardGuy.style.display = 'none';
        takeThem.style.display = 'block';
        leaveThem.style.display = 'block';
        textBoxText.textContent = "But... do I want to take these records now? I mean, there's a reason he didn't release them... am I really gonna be that guy?";
    }
});

function battle(battleImage, enemyHealthMax) {
    let PHP = 100;
    let EHP = enemyHealthMax;
    const playerHP = document.getElementById('playerHP');
    const enemyHP = document.getElementById('enemyHP');
    const oldAttack = document.getElementById('attack');
    const oldHeal = document.getElementById('heal');
    const attackBtn = oldAttack.cloneNode(true);
    const healBtn = oldHeal.cloneNode(true);
    oldAttack.replaceWith(attackBtn);
    oldHeal.replaceWith(healBtn);

    textBox.style.display = 'none';
    battleBox.style.display = 'block';

    function updateHP() {
        playerHP.textContent = "Your Flow: " + PHP + '/100';
        enemyHP.textContent = "Enemy's Flow: " + EHP + '/' + enemyHealthMax;
    }
    updateHP();

    attackBtn.addEventListener('click', function onAttackClick() {
        timingAttack(function(result) {
            let damage = 0;
            if (result.perfects === 3)       damage = 20;
            else if (result.misses === 0)    damage = 12;
            else if (result.misses <= 1)     damage = 6;

            EHP = Math.max(0, EHP - damage);
            updateHP();

            if (EHP <= 0) {
                endBattle(true);
                return;
            }

            const enemyDmg = Math.floor(Math.random() * 15) + 5;
            PHP = Math.max(0, PHP - enemyDmg);
            updateHP();

            if (PHP <= 0) {
                endBattle(false);
            }
        });
    });

    healBtn.addEventListener('click', function onHealClick() {
        const healAmount = Math.floor(Math.random() * 20) + 10;
        PHP = Math.min(100, PHP + healAmount);
        updateHP();

        const enemyDmg = Math.floor(Math.random() * 15) + 5;
        PHP = Math.max(0, PHP - enemyDmg);
        updateHP();

        if (PHP <= 0) {
            endBattle(false);
        }
    });

    function endBattle(won) {
        battleBox.style.display = 'none';
        textBox.style.display = 'block';
        continueText.style.display = 'block';
        music.src = './music/dieHard.mp3';
        if (won) {
            if (battleCount === 0) {
                textBoxText.textContent = "Oh yeah! I win! Now let's go get them records!";
                battleCount++;
            } else {
                textBoxText.textContent = "I... I did it! I won!";
            }
        } else {
            textBoxText.textContent = "Ah dang... I lost. Guess I'll go home sad and illegally stream them... (Ending 1 Achieved. Refresh the page to try again!)";
        }
    }
}


// timing attack minigame
function timingAttack(onFinish) {
    const overlay  = document.getElementById('timing-overlay');
    const btn      = document.getElementById('timing-btn');
    const hint     = document.getElementById('timing-hint');
    const result   = document.getElementById('timing-result');
    const hitZone  = document.getElementById('timing-hit-zone');
    const track    = document.getElementById('timing-track');
    const combo    = document.getElementById('timing-combo');
    const dots     = [0, 1, 2].map(i => document.getElementById('tdot-' + i));
    const ZONE_LEFT     = 8;
    const ZONE_WIDTH    = 40;
    const ZONE_CENTER   = ZONE_LEFT + ZONE_WIDTH / 2;
    const PERFECT_RANGE = 14;
    const GOOD_RANGE    = 28;
    const MARKER_SIZE   = 24;
    const SPEEDS        = [260, 300, 240];
    const DELAY_BETWEEN = 500;
    let step         = 0;
    let animFrames   = [];
    let stepResults  = [];
    let markerEl     = null;
    let markerStart  = null;
    let pressAllowed = false;

    overlay.classList.add('active');

    combo.textContent  = '';
    result.textContent = '';
    btn.textContent    = 'Strike';
    hint.textContent   = 'press when the marker hits the zone';
    track.querySelectorAll('.timing-marker').forEach(m => m.remove());
    setDots();
    setZone('active');
    runStep(0);

    function setDots() {
        dots.forEach((d, i) => {
            d.className = 'timing-dot';
            if (i < step)        d.classList.add(stepResults[i] === 'miss' ? 'miss' : 'done');
            else if (i === step) d.classList.add('active');
        });
    }

    function setZone(mode) {
        hitZone.className   = 'timing-hit-zone ' + mode;
        hitZone.textContent = { idle:'HIT', active:'HIT', perfect:'OK', good:'OK', miss:'X' }[mode] || 'HIT';
    }

    function runStep(stepIndex) {
        step         = stepIndex;
        pressAllowed = true;
        setDots();
        setZone('active');

        const trackW = track.getBoundingClientRect().width;
        const startX = trackW + MARKER_SIZE;

        const el       = document.createElement('div');
        el.className   = 'timing-marker';
        el.textContent = stepIndex + 1;
        el.style.left  = startX + 'px';
        track.appendChild(el);
        markerEl    = el;
        markerStart = performance.now();

        function animate(now) {
            const x = startX - (SPEEDS[stepIndex] / 1000) * (now - markerStart);
            el.style.left = x + 'px';
            if (x < -MARKER_SIZE - 10) {
                el.remove();
                if (pressAllowed) onPress('miss');
                return;
            }
            animFrames[stepIndex] = requestAnimationFrame(animate);
        }
        animFrames[stepIndex] = requestAnimationFrame(animate);
    }

    function onPress(force) {
        if (!pressAllowed) return;
        pressAllowed = false;
        cancelAnimationFrame(animFrames[step]);

        let r;
        if (force === 'miss') {
            r = 'miss';
        } else {
            const cx   = parseFloat(markerEl.style.left) + MARKER_SIZE / 2;
            const dist = Math.abs(cx - ZONE_CENTER);
            r = dist <= PERFECT_RANGE ? 'perfect' : dist <= GOOD_RANGE ? 'good' : 'miss';
        }

        stepResults[step] = r;

        if (r !== 'miss' && markerEl) {
            markerEl.classList.add('hit-flash');
            setTimeout(() => markerEl && markerEl.remove(), 200);
        } else if (markerEl) {
            markerEl.remove();
        }

        setZone(r);
        result.textContent = r;
        setDots();

        if (step + 1 < 3) {
            setTimeout(() => {
                result.textContent = '';
                setZone('active');
                runStep(step + 1);
            }, DELAY_BETWEEN);
        } else {
            setTimeout(finish, 400);
        }
    }

    function finish() {
        const misses   = stepResults.filter(r => r === 'miss').length;
        const perfects = stepResults.filter(r => r === 'perfect').length;

        if      (misses === 0 && perfects === 3) { result.textContent = 'critical hit';  combo.textContent = '* critical *'; }
        else if (misses === 0)                   { result.textContent = 'hit';            combo.textContent = '* hit *'; }
        else if (misses <= 1)                    { result.textContent = 'glancing blow';  combo.textContent = '* graze *'; }
        else                                     { result.textContent = 'miss';           combo.textContent = '* miss *'; }

        setZone('idle');
        btn.textContent  = 'Close';
        hint.textContent = '';

        document.removeEventListener('keydown', keyHandler);

        setTimeout(() => {
            combo.textContent = '';
            overlay.classList.remove('active');
            btn.textContent = 'Strike';
            onFinish({ stepResults, misses, perfects });
        }, 1500);
    }

    function keyHandler(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            btn.click();
        }
    }

    btn.onclick = () => {
        if (pressAllowed) onPress(null);
    };

    document.addEventListener('keydown', keyHandler);
}

takeThem.addEventListener('click', function() {
    textBox.style.display = 'none';
    takeThem.style.display = 'none';
    leaveThem.style.display = 'none';
    ending.style.display = 'block';
    ending.textContent = 'Ending 2 Achieved! You took the records and distributed them to the world!';
    ending.style.backgroundColor = '#14248a'
    ending.style.fontSize = '32px';
})

leaveThem.addEventListener('click', function() {
    textBox.style.display = 'none';
    takeThem.style.display = 'none';
    leaveThem.style.display = 'none';
    ending.style.display = 'block';
    ending.textContent = 'Ending 3 Achieved! You let the records stay there, and eventually Kendrick Lamar released even better versions of the unreleased songs!';
    ending.style.backgroundColor = '#14248a';
    ending.style.fontSize = '32px';
})