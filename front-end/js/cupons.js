document.getElementById('voucherForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message');

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (!validateEmail(email)) {
    message.textContent = 'E-mail inválido.';
    message.className = 'message error';
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/vouchers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cpf, email })
    });

    const result = await response.text();
    message.textContent = result;
    message.className = `message ${response.ok ? 'success' : 'error'}`;
  } catch (error) {
    message.textContent = 'Erro ao conectar ao servidor.';
    message.className = 'message error';
  }
});
