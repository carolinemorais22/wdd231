import { loadFeaturedRecipes } from '../scripts/aleatorio.mjs'
import { setupNavigation } from '../scripts/navegacao.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  loadFeaturedRecipes(3);
});