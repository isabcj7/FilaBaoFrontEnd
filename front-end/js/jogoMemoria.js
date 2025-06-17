const emojis = [
  '🍎','🍌','🍓','🍇','🍉','🍍','🍒','🥝','🥥','🍑',
  '🧀','🥕','🍪','🍕','🍩','🎂','🧁','🍫','🍭','🍔',
  '🌮','🍣','🍤','🍜','🍿','🥨','🥐','🍞','🧃','🥓',
  '🍗','🥩','🍰','🍧','🍨','🍬','🍙','🍱','🍛','🧇'
];

let size = 20;
let cards = [];
let firstCardIndex = null;
let secondCardIndex = null;
let lockBoard = false;
let matchedPairs = 0;

const gameContainer = document.getElementById('game');
const sizeSelector = document.getElementById('size');

function createGame(newSize) {
  size = newSize;
  const pairs = size / 2;
  const chosen = emojis.slice(0, pairs);
  cards = [...chosen, ...chosen]
    .map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);

  firstCardIndex = null;
  secondCardIndex = null;
  lockBoard = false;
  matchedPairs = 0;

  render();
}

function render() {
  gameContainer.innerHTML = '';
  cards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (card.flipped) cardDiv.classList.add('flip');
    if (card.matched) cardDiv.classList.add('matched');
    cardDiv.textContent = card.flipped || card.matched ? card.symbol : '';
    cardDiv.addEventListener('click', () => handleCardClick(index));
    gameContainer.appendChild(cardDiv);
  });
}

function handleCardClick(index) {
  if (lockBoard) return;
  if (cards[index].flipped || cards[index].matched) return;

  cards[index].flipped = true;
  render();

  if (firstCardIndex === null) {
    firstCardIndex = index;
  } else if (secondCardIndex === null) {
    secondCardIndex = index;
    checkMatch();
  }
}

function checkMatch() {
  if (cards[firstCardIndex].symbol === cards[secondCardIndex].symbol) {
    cards[firstCardIndex].matched = true;
    cards[secondCardIndex].matched = true;
    matchedPairs++;
    resetFlip();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      cards[firstCardIndex].flipped = false;
      cards[secondCardIndex].flipped = false;
      resetFlip();
      render();
    }, 800);
  }
}

function resetFlip() {
  firstCardIndex = null;
  secondCardIndex = null;
  lockBoard = false;
}

function checkWin() {
  if (matchedPairs === size / 2) {
    setTimeout(() => {
      alert('Parabéns! Você venceu! 🎉');
      createGame(size);
    }, 500);
  }
}

// Inicializa o jogo ao carregar a página
createGame(size);

// Atualiza o tamanho do jogo quando o usuário muda o select
sizeSelector.addEventListener('change', (e) => {
  createGame(parseInt(e.target.value));
});
