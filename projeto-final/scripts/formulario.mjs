const DRAFT_KEY = 'receita_sugestao_rascunho';


export function setupForm() {
  const form = document.querySelector('form');
  if (!form) return;

  const nomeAutorInput = document.getElementById('nomeAutor');
  const nomeReceitaInput = document.getElementById('nomeReceita');
  const categoriaSelect = document.getElementById('categoria');
  const ingredientesTextarea = document.getElementById('ingredientes');

  restoreDraft({ nomeAutorInput, nomeReceitaInput, categoriaSelect, ingredientesTextarea });

  const handleInput = () => {
    saveDraft({
      nomeAutor: nomeAutorInput?.value || '',
      nomeReceita: nomeReceitaInput?.value || '',
      categoria: categoriaSelect?.value || '',
      ingredientes: ingredientesTextarea?.value || ''
    });
  };

  form.addEventListener('input', handleInput);

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    form.removeEventListener('input', handleInput);
    localStorage.removeItem(DRAFT_KEY);
  });
}

export function displayFormResults() {
  const resultsContainer = document.getElementById('form-results');
  if (!resultsContainer) return;

  const params = new URLSearchParams(window.location.search);
  const autor = params.get('nomeAutor');
  const receita = params.get('nomeReceita');
  const categoria = params.get('categoria');
  const tempo = params.get('tempoPreparo');
  const ingredientes = params.get('ingredientes');

  if (autor || receita) {
    resultsContainer.innerHTML = `
      <div class="result-item">
        <span class="result-label">👤 Autor:</span>
        <span class="result-value">${autor || 'Não informado'}</span>
      </div>
      <div class="result-item">
        <span class="result-label">🍳 Receita:</span>
        <span class="result-value">${receita || 'Não informado'}</span>
      </div>
      <div class="result-item">
        <span class="result-label">📁 Categoria:</span>
        <span class="result-value">${categoria || 'Não informado'}</span>
      </div>
      ${tempo ? `
      <div class="result-item">
        <span class="result-label">⏱️ Tempo de Preparo:</span>
        <span class="result-value">${tempo}</span>
      </div>
      ` : ''}
      <div class="result-item full-width">
        <span class="result-label">📝 Ingredientes e Modo de Preparo:</span>
        <p class="result-text">${ingredientes || 'Não informado'}</p>
      </div>
    `;
  } else {
    resultsContainer.innerHTML = `
      <p style="color: #64748b; text-align: center;">Nenhum dado foi recebido. Por favor, envie uma receita através da página <a href="sugestoes.html" style="color: #d9534f; font-weight: bold;">Sugerir Receita</a>.</p>
    `;
  }
}

function saveDraft(draftData) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
  } catch (error) {
    console.error('Erro ao guardar rascunho no LocalStorage:', error);
  }
}

function restoreDraft(elements) {
  try {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (!savedDraft) return;

    const draft = JSON.parse(savedDraft);

    if (elements.nomeAutorInput && draft.nomeAutor) elements.nomeAutorInput.value = draft.nomeAutor;
    if (elements.nomeReceitaInput && draft.nomeReceita) elements.nomeReceitaInput.value = draft.nomeReceita;
    if (elements.categoriaSelect && draft.categoria) elements.categoriaSelect.value = draft.categoria;
    if (elements.ingredientesTextarea && draft.ingredientes) elements.ingredientesTextarea.value = draft.ingredientes;
  } catch (error) {
    console.error('Erro ao restaurar rascunho do LocalStorage:', error);
  }
}