import { openModal, setupModal } from '../scripts/modal.mjs';
import { getFavorites, toggleFavorite } from '../scripts/favoritos.mjs';

export async function loadRecipes() {
  const container = document.getElementById('recipe-container');
  const filterSelect = document.getElementById('category-filter');

  if (!container) return;

  try {
    const response = await fetch('../scripts/receitas.json');
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const recipes = await response.json();

    setupModal();
    renderRecipes(recipes, container);

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        const category = e.target.value;
        // Método de array: filter
        const filtered = category === 'todas' 
          ? recipes 
          : recipes.filter(r => r.categoria.toLowerCase() === category.toLowerCase());
        renderRecipes(filtered, container);
      });
    }

  } catch (error) {
    console.error('Falha ao carregar as receitas:', error);
    container.innerHTML = `<p class="error">Erro ao carregar o catálogo de receitas. Tente novamente mais tarde.</p>`;
  }
}

function renderRecipes(recipesList, container) {
  container.innerHTML = '';
  const favorites = getFavorites();

  if (recipesList.length === 0) {
    container.innerHTML = '<p>Nenhuma receita encontrada nesta categoria.</p>';
    return;
  }

  recipesList.forEach(recipe => {
    const isFav = favorites.includes(recipe.id);
    const card = document.createElement('article');
    card.className = 'recipe-card';
    
    card.innerHTML = `
      <img src="${recipe.imagem}" alt="${recipe.nome}" loading="lazy" width="100" height="200">
      <div class="recipe-card-content">
        <h3>${recipe.nome}</h3>
        <p><strong>Categoria:</strong> ${recipe.categoria}</p>
        <p><strong>Tempo:</strong> ${recipe.tempoPreparo} | <strong>Dificuldade:</strong> ${recipe.dificuldade}</p>
        <div class="recipe-card-actions">
          <button class="btn view-btn" data-id="${recipe.id}">Ver Receita</button>
          <button class="fav-btn" data-id="${recipe.id}" aria-label="Favoritar ${recipe.nome}">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    `;

    card.querySelector('.view-btn').addEventListener('click', () => openModal(recipe));
    
    const favBtn = card.querySelector('.fav-btn');
    favBtn.addEventListener('click', () => {
      const updatedFavs = toggleFavorite(recipe.id);
      favBtn.textContent = updatedFavs.includes(recipe.id) ? '❤️' : '🤍';
    });

    container.appendChild(card);
  });
}