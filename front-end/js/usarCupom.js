const cupons = {
  '15': '../assets/Cupom15.png',
  '20': '../assets/Cupom20.png',
  '40': '../assets/Cupom40.png',
  '50': '../assets/Cupom50.png',
  '60': '../assets/Cupom60.png'
};

const qrCodes = {
  '15': '../assets/Desconto15.png',
  '20': '../assets/desconto20.png',
  '40': '../assets/desconto40.png',
  '50': '../assets/desconto50.png',
  '60': '../assets/desconto60.png'
};

const params = new URLSearchParams(window.location.search);
const desconto = params.get('desconto');
const conteudo = document.getElementById('conteudo');

if (!cupons[desconto]) {
  conteudo.innerHTML = '<p>Cupom inválido!</p>';
} else {
  conteudo.innerHTML = `
    <div class="cupom">
      <img src="${cupons[desconto]}" alt="Cupom ${desconto}%"/>
    </div>
    <div class="botao">
      <button id="usarCupomBtn">Usar Cupom</button>
    </div>
  `;

  document.getElementById('usarCupomBtn').addEventListener('click', () => {
    conteudo.innerHTML = `
      <div class="desconto">
        <img src="${qrCodes[desconto]}" alt="Desconto ${desconto}%"/>
      </div>
      <p>Parabéns, você usou o cupom com sucesso!</p>
    `;
  });
}