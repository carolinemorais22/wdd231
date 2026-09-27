document.addEventListener('DOMContentLoaded', () => {
  const displayContainer = document.getElementById('formDataDisplay');
  const urlParams = new URLSearchParams(window.location.search);

  const nome = urlParams.get('nome') || '';
  const sobrenome = urlParams.get('sobrenome') || '';
  const email = urlParams.get('email') || 'Não informado';
  const telefone = urlParams.get('telefone') || 'Não informado';
  const organizacao = urlParams.get('organizacao') || 'Não informada';
  const timestamp = urlParams.get('timestamp');

  let dataFormatada = 'Não informada';
  if (timestamp) {
    const data = new Date(timestamp);
    dataFormatada = data.toLocaleString('pt-BR');
  }

  const nomeCompleto = `${nome} ${sobrenome}`.trim() || 'Não informado';

  displayContainer.innerHTML = `
    <div class="summary-item">
      <span class="label">Nome Completo</span>
      <span class="value">${nomeCompleto}</span>
    </div>
    <div class="summary-item">
      <span class="label">E-mail</span>
      <span class="value">${email}</span>
    </div>
    <div class="summary-item">
      <span class="label">Telefone</span>
      <span class="value">${telefone}</span>
    </div>
    <div class="summary-item">
      <span class="label">Organização</span>
      <span class="value">${organizacao}</span>
    </div>
    <div class="summary-item full-width">
      <span class="label">Data/Hora do Envio</span>
      <span class="value">${dataFormatada}</span>
    </div>
  `;

  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Última modificação: ${document.lastModified}`;
});