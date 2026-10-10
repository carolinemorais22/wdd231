import { setupNavigation } from '../scripts/navegacao.mjs';
import { loadRecipes } from '../scripts/receitas.mjs';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  loadRecipes();
});