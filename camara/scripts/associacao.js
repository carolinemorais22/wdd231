document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  const modalButtons = document.querySelectorAll('.btn-modal');
  const closeButtons = document.querySelectorAll('.btn-close-modal');

  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dialog = e.target.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  const botaoMenu = document.getElementById("botao-menu");
  const navegacao = document.getElementById("navegacao-principal");
  const botaoDropdown = document.querySelector(".botao-dropdown");
  const itemDropdown = document.querySelector(".item-dropdown");

  botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");
    botaoMenu.classList.toggle("aberto");
  });

  if (botaoDropdown) {
    botaoDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      itemDropdown.classList.toggle("ativo");
    });
  }

  const rotuloAno = document.getElementById("ano-atual");
  const rotuloModificacao = document.getElementById("ultima-modificacao");

  if (rotuloAno) rotuloAno.textContent = new Date().getFullYear();
  if (rotuloModificacao) rotuloModificacao.textContent = `Última modificação: ${document.lastModified}`;

  const botaoTema = document.getElementById("botao-tema");
});