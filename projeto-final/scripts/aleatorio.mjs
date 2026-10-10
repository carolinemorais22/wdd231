import { openModal, setupModal } from '../scripts/modal.mjs';

export async function loadFeaturedRecipes(count = 3) {
  const container = document.getElementById('featured-container');
  if (!container) return;

  try {
    const response = await fetch('../scripts/receitas.json');
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const recipes = await response.json();

    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    const featuredRecipes = shuffled.slice(0, count);

    setupModal();

    renderFeatured(featuredRecipes, container);

  } catch (error) {
    console.error('Erro ao carregar destaques:', error);
    container.innerHTML = '<p>Não foi possível carregar os destaques no momento.</p>';
  }
}

function renderFeatured(recipesList, container) {
  container.innerHTML = '';

  recipesList.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';

    card.innerHTML = `
      <img src="${recipe.imagem}" alt="${recipe.nome}" loading="lazy" width="300" height="200">
      <div class="recipe-card-content">
        <h3>${recipe.nome}</h3>
        <p><strong>Categoria:</strong> ${recipe.categoria}</p>
        <p><strong>Tempo:</strong> ${recipe.tempoPreparo} | <strong>Dificuldade:</strong> ${recipe.dificuldade}</p>
        <div class="recipe-card-actions">
          <button class="btn view-btn" data-id="${recipe.id}">Ver Receita</button>
        </div>
      </div>
    `;

    card.querySelector('.view-btn').addEventListener('click', () => openModal(recipe));

    container.appendChild(card);
  });
}