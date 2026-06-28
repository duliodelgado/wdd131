import { recipes } from './recipes-data.js';

const main = document.querySelector('.main');
const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

/* render one recipe */
function renderRecipe(recipe) {
  return `
    <section class="card">
      <div class="card-image">
        <img src="${recipe.image}" alt="${recipe.name}">
      </div>

      <div class="card-content">
        <span class="tag">${recipe.tags.join(', ')}</span>

        <h2>${recipe.name}</h2>

        <span class="rating">
          ${generateStars(recipe.rating)}
        </span>

        <p class="description">${recipe.description}</p>
      </div>
    </section>
  `;
}

/* render list */
function renderRecipesList(list) {
  main.innerHTML = list.map(renderRecipe).join('');
}

/* generate stars */
function generateStars(rating) {
  let stars = '';
  const full = Math.floor(rating);

  for (let i = 0; i < full; i++) stars += '⭐';
  if (rating % 1 !== 0) stars += '⭐';
  while (stars.length < 5) stars += '☆';

  return stars;
}

/* random recipe */
function showRandomRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  renderRecipesList([recipes[randomIndex]]);
}

/* filter recipes */
function filterRecipes(query) {
  const q = query.toLowerCase();

  return recipes.filter(r => {
    return (
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.join(' ').toLowerCase().includes(q)
    );
  });
}

/* sort recipes */
function sortRecipes(list) {
  return list.sort((a, b) => a.name.localeCompare(b.name));
}

/* handle search */
function searchHandler() {
  const query = searchInput.value.trim();

  if (!query) {
    showRandomRecipe();
    return;
  }

  let results = filterRecipes(query);
  results = sortRecipes(results);

  renderRecipesList(results);
}

/* events */
searchBtn.addEventListener('click', searchHandler);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') searchHandler();
});

/* init */
showRandomRecipe();