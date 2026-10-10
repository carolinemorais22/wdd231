export function setupModal() {
  const modal = document.getElementById('recipe-modal');
  const closeBtn = document.getElementById('close-modal-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.close();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  }
}

export function openModal(recipe) {
  const modal = document.getElementById('recipe-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  if (modal && modalTitle && modalBody) {
    modalTitle.textContent = recipe.nome;
    modalBody.innerHTML = `
      <p><strong>Categoria:</strong> ${recipe.categoria}</p>
      <p><strong>Tempo:</strong> ${recipe.tempoPreparo} | <strong>Porções:</strong> ${recipe.porcoes}</p>
      <p><strong>Dificuldade:</strong> ${recipe.dificuldade}</p>
      <hr style="margin: 0.8rem 0;">
      <h4>Ingredientes:</h4>
      <ul>
        ${recipe.ingredientes.map(ing => `<li style="list-style-type: none; padding: 0; margin: 0;">${ing}</li>`).join('')}
      </ul>
      <h4 style="margin-top: 0.8rem;">Instruções:</h4>
      <p>${recipe.instrucoes}</p>
    `;
    modal.showModal();
  }
}