const cardIcons = ['☕', '🍂', '🕯️', '📖', '🧤', '🧣', '🧶', '🍁'];
let cardsArray = [...cardIcons, ...cardIcons];
cardsArray.sort(() => Math.random() - 0.5);

const gameBoard = document.querySelector('.game-board');

cardsArray.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.innerText = '';
    gameBoard.appendChild(card);
});

let flippedCards = [];
let matchedCards = 0;

const allCards = document.querySelectorAll('.card');

allCards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('flipped') || flippedCards.length === 2) return;

        card.classList.add('flipped');
        card.innerText = card.dataset.icon;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
                matchedCards += 2;
                flippedCards = [];

                if (matchedCards === cardsArray.length) {
                    const winMessage = document.getElementById('win-message');
                    winMessage.classList.remove('hidden');
                    winMessage.classList.add('show');
                    startLeafFall();
                }

            } else {
                setTimeout(() => {
                    flippedCards.forEach(c => {
                        c.classList.remove('flipped');
                        c.innerText = '';
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    });
});

const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute');

muteBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        muteBtn.innerText = '🔈Mute';
    } else {
        music.pause();
        muteBtn.innerText = '🔇Unmute';
    }
});

const restartBtn = document.getElementById('restart');

restartBtn.addEventListener('click', () => {
    location.reload();
});

function startLeafFall() {
    for (let i = 0; i < 20; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.innerText = '🍂';

        leaf.style.left = Math.random() * 100 + "vw";
        leaf.style.animationDuration = 3 + Math.random() * 3 + "s";
        leaf.style.fontSize = (20 + Math.random() * 20) + "px";

        document.body.appendChild(leaf);

        setTimeout(() => leaf.remove(), 6000);
    }
}
