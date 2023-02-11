import './styles.css';
import apiCalls from './apiCalls';
import './images/turing-logo.png';
import './images/heart.png';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

// global variables
const recipeSection = document.getElementById('allRecipes');
const modalSection = document.getElementById('recipeModalBackground');
const filterDropdown = document.getElementById('filterDropdown');
const searchBar = document.getElementById('searchBar');
const navMyRecipes = document.getElementById('navMyRecipes');
const navUserInfo = document.getElementById('navUserInfo');
const logo = document.getElementById('logo');
let users;
let ingredients;
let recipes;
let recipeRepo;
let modalRecipe;
let currentUser;
let savedView = false;

//event listeners
recipeSection.addEventListener('click', createRecipeModal);
modalSection.addEventListener('click', collapseRecipe);
filterDropdown.addEventListener('click', filterRecipes);
navMyRecipes.addEventListener('click', showSavedRecipes);
logo.addEventListener('click', goHome);
searchBar.addEventListener('keyup', searchRecipes);

//functions
apiCalls().then(data => {
  users = data[0].usersData;
  ingredients = data[1].ingredientsData;
  recipes = data[2].recipeData;
  recipeRepo = new RecipeRepository(recipes);
  getRandomUser();
  createRecipeCards(recipeRepo.recipes);
});

function createRecipeCards(recipes) {
    recipeSection.innerHTML = "";
    recipes.forEach(recipe => {
        let size = (2 - (recipe.name.length / 65)).toFixed(2);
        let hidden = "heart-icon";
        if(!recipe.saved){
          hidden = "heart-icon hidden";
        }
        recipeSection.innerHTML += `
        <article class="recipe-card" data-parent="${recipe.id}">
            <img class="recipe-img" src="${recipe.image}" data-parent="${recipe.id}" alt="picture of ${recipe.name}">
            <img class="${hidden}" data-parent="${recipe.id}" src="./images/heart.png" alt="This recipe is in my recipes!">
            <h3 style="font-size: ${size}rem" data-parent="${recipe.id}">${recipe.name}</h3>
        </article>`;
    });
};

function createRecipeModal(event) {
  if(event.target.className !== "all-recipes") {
    toggleHidden(modalSection);
    let recipeID = +(event.target.dataset.parent);
    modalRecipe = recipeRepo.recipes.find(recipe => recipe.id === recipeID);
    let buttonText;
    modalRecipe.saved ? buttonText = "Remove from Saved Recipes" : buttonText = "Add to Saved Recipes";
    modalSection.innerHTML = `
    <div class="recipe-popup">
        <h2>${modalRecipe.name}</h2>
        <div class="image-ingredients">
        <img class="recipe-img" src="${modalRecipe.image}" alt="${modalRecipe.name} image">
        <ul class="ingredient-list">
            <h3>Ingredients:</h3>
            ${createList(modalRecipe.listIngredients(ingredients))}
        </ul>
        </div>
        <ol class="direction-list">
        <h3>Directions:</h3>
        ${createList(modalRecipe.getInstructions())}
        </ol>
        <h4>TOTAL COST $${+(modalRecipe.listCost(ingredients))}</h4>
        <button class="save-button" id="saveBtn">${buttonText}</button>
    </div>`;
    document.getElementById('saveBtn').addEventListener('click', toggleSaveRecipe);
  }
};

function createList(recipe) {
    return recipe.reduce((acc, cv) => {
        acc += `<li>${cv}</li>`;
        return acc;
    }, "");
};

function toggleHidden(element) {
  element.classList.toggle('hidden');
};

function collapseRecipe(event) {
  savedView ? createRecipeCards(currentUser.savedRecipes) : createRecipeCards(recipeRepo.recipes);
  if (event.target.id === "recipeModalBackground"){
    toggleHidden(modalSection);
  };
};

function filterRecipes(event) {
    let tag = event.target.innerText.toLowerCase();
    let filteredRecipes = savedView ? currentUser.filterSavedByTag(tag) : recipeRepo.filterByTag(tag);
    createRecipeCards(filteredRecipes);
};

function searchRecipes() {
  let keyword = searchBar.value;
  let searchedRecipes = savedView ? currentUser.filterSavedByName(keyword) : recipeRepo.filterByName(keyword);
  createRecipeCards(searchedRecipes);
};

function toggleSaveRecipe() {
  currentUser.toggleSaveRecipe(modalRecipe);
};

function getRandomUser() {
  currentUser = new User(users[Math.floor(Math.random() * users.length)]);
  navUserInfo.innerText = currentUser.name;
};

function showSavedRecipes() {
  savedView = true;
  createRecipeCards(currentUser.savedRecipes);
};

function goHome() {
  savedView = false;
  createRecipeCards(recipeRepo.recipes);
};