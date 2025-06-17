document.getElementById("voucherForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message");
  const couponsInfo = document.getElementById("couponsInfo");

  message.textContent = "";
  couponsInfo.textContent = "";

  if (!username) {
    message.style.color = "red";
    message.textContent = "Por favor, insira seu login.";
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/players/${encodeURIComponent(username)}`);
    
    if (!response.ok) {
      throw new Error("Jogador não encontrado.");
    }

    const player = await response.json();

    const coins = player.coins || 0;
    const coupons = Math.floor(coins / 100);

    message.style.color = "green";
    message.textContent = `Saldo de moedas: ${coins}`;

    if (coupons > 0) {
      couponsInfo.textContent = `Você pode gerar ${coupons} cupom(ns) de desconto.`;
    } else {
      couponsInfo.textContent = "Você não tem moedas suficientes para gerar cupons.";
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = error.message || "Erro ao buscar informações do jogador.";
  }
});
