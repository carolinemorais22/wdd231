const FAVORITES_KEY = 'receitas_rapidas_favs';

export function getFavorites() {
  const favs = localStorage.getItem(FAVORITES_KEY);
  return favs ? JSON.parse(favs) : [];
}

export function toggleFavorite(recipeId) {
  let favs = getFavorites();
  if (favs.includes(recipeId)) {
    favs = favs.filter(id => id !== recipeId);
  } else {
    favs.push(recipeId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
}