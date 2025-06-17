document.querySelectorAll('.cupom').forEach(img => {
  img.addEventListener('click', () => {
    const desconto = img.dataset.desconto;
    window.location.href = `usarCupom.html?desconto=${desconto}`;
  });
});