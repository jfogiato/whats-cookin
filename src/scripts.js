import './styles.css';
// import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/heart.png';
import Recipe from './classes/Recipe';
import RecipeRepository from './classes/RecipeRepository';
import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';

// global variables
const recipeRepo = new RecipeRepository(recipeData);

const recipeSection = document.getElementById('allRecipes');
const modalSection = document.getElementById('recipeModalBackground');
const filterDropdown = document.getElementById('filterDropdown');
const searchBar = document.getElementById('searchBar')
let modalRecipe 
// const saveButton = document.getElementById('saveBtn')

//event listeners
window.addEventListener('load', () => createRecipeCards(recipeRepo.recipes));
recipeSection.addEventListener('click', createRecipeModal);
modalSection.addEventListener('click', collapseRecipe);
filterDropdown.addEventListener('click', filterRecipes);
// saveButton.addEventListener('click', toggleSavedRecipe);


// Let's clean this up to be a proper form submission..?
searchBar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchRecipes()
  }
});

//functions
function createRecipeCards(recipes) {
    recipeSection.innerHTML = "";
    recipes.forEach(recipe => {
        let size = (2 - (recipe.length / 65)).toFixed(2);
        recipeSection.innerHTML += `
        <article class="recipe-card" data-parent="${recipe.id}">
            <img class="recipe-img" src="${recipe.image}" data-parent="${recipe.id}" alt="picture of ${recipe.name}">
            <img class="heart-icon hidden" id="heartIcon" data-parent="${recipe.id}" src="./images/heart.png" alt="This recipe is in my recipes!">
            <h3 style="font-size: ${size}rem" data-parent="${recipe.id}">${recipe.name}</h3>
        </article>`;
        let heart = document.getElementById('heartIcon')
        if(recipe.saved){
            toggleHidden(heart)
        }
    });
}

function createRecipeModal(event) {
  toggleHidden(modalSection);
  let recipeID = +(event.target.dataset.parent);
  modalRecipe = recipeRepo.recipes.find(recipe => recipe.id === recipeID);
  let buttonText
  modalRecipe.saved ? buttonText = "Remove from Saved Recipes" : buttonText = "Add to Saved Recipes"
  modalSection.innerHTML = `
  <div class="recipe-popup">
      <h2>${modalRecipe.name}</h2>
      <div class="image-ingredients">
      <img class="recipe-img" src="${modalRecipe.image}" alt="${modalRecipe.name} image">
      <ul class="ingredient-list">
          <h3>Ingredients:</h3>
          ${createList(modalRecipe.listIngredients(ingredientsData))}
      </ul>
      </div>
      <ol class="direction-list">
      <h3>Directions:</h3>
      ${createList(modalRecipe.getInstructions())}
      </ol>
      <h4>TOTAL COST $${+(modalRecipe.listCost(ingredientsData))}</h4>
      <button class="save-button" id="saveBtn">${buttonText}</button>
  </div>`;
  document.getElementById('saveBtn').addEventListener('click', toggleSaveRecipe);
}

function createList(recipe) {
    return recipe.reduce((acc, cv) => {
        acc += `<li>${cv}</li>`;
        return acc;
    }, "");
}

function toggleHidden(element) {
  element.classList.toggle('hidden');
}

function collapseRecipe(event) {
  if(event.target.id === "recipeModalBackground"){
    toggleHidden(modalSection);
  }
}

function filterRecipes(event) {
    let tag = event.target.innerText.toLowerCase();
    let filteredRecipes = recipeRepo.filterByTag(tag);
    createRecipeCards(filteredRecipes);
}

function searchRecipes() {
  let keyword = searchBar.value;
  let searchedRecipes = recipeRepo.filterByName(keyword);
  createRecipeCards(searchedRecipes);
}

function toggleSaveRecipe(event) {
console.log(modalRecipe)
    // currentUser.toggleSaveRecipe(modalRecipe)
}