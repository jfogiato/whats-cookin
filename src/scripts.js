import './styles.css';
import apiCalls from './apiCalls';
import './images/heart.png';
import './images/user.png';
import './images/wc-logo.png';
import './images/home-button.png';
import './images/close-icon.png';
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User';

// global variables
const recipeSection = document.getElementById('allRecipes');
const modalSection = document.getElementById('recipeModalBackground');
const filterHeader = document.getElementById('filterHeader')
const filterDropdown = document.getElementById('filterDropdown');
const searchBar = document.getElementById('searchBar');
const navMyRecipes = document.getElementById('navMyRecipes');
const navUserInfo = document.getElementById('navUserInfo');
const titleLogo = document.getElementById('titleLogo');
const myRecipesTitle = document.getElementById('myRecipesTitle');
const logo = document.getElementById('logo');
const body = document.querySelector('body');
let users;
let ingredients;
let recipes;
let recipeRepo;
let modalRecipe;
let currentUser;
let savedView = false;
let currentView;

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
  currentView = recipeRepo.recipes;
  getRandomUser();
  createRecipeCards(currentView);
});

function createRecipeCards(recipes) {
    recipeSection.innerHTML = "";
    recipes.forEach(recipe => {
        let titleClass = 'recipe-title'
        if (recipe.name.length > 17) titleClass = 'recipe-title long-title';
        let heartClass = "heart-icon";
        if(!recipe.saved) heartClass = "heart-icon hidden";
        recipeSection.innerHTML += `
        <article class="recipe-card pointer" data-parent="${recipe.id}">
            <img class="recipe-img" src="${recipe.image}" data-parent="${recipe.id}" alt="Picture of ${recipe.name}">
            <img class="${heartClass}" data-parent="${recipe.id}" src="./images/heart.png" alt="This recipe is in my recipes!">
            <h2 class="${titleClass}" data-parent="${recipe.id}">${recipe.name}</h2>
        </article>`;
    });
}

function createRecipeModal(event) {
  if(event.target.className !== "all-recipes") {
    toggleHidden(modalSection);
    body.classList.add('no-scroll')
    let recipeID = +(event.target.dataset.parent);
    modalRecipe = recipeRepo.recipes.find(recipe => recipe.id === recipeID);
    modalSection.innerHTML = `
    <div class="recipe-popup">
        <img class="close-icon pointer" id="closeIcon" src="./images/close-icon.png" alt="close icon">
        <h2>${modalRecipe.name}</h2>
        <div class="image-ingredients">
        <img class="modal-img" src="${modalRecipe.image}" alt="${modalRecipe.name} image">
        <ul class="oregano-font">
            <h3>Ingredients:</h3>
            ${createList(modalRecipe.listIngredients(ingredients))}
        </ul>
        </div>
        <ol class="oregano-font">
        <h3>Directions:</h3>
        ${createList(modalRecipe.getInstructions())}
        </ol>
        <h4 class="oregano-font"><i>TOTAL COST $${+(modalRecipe.listCost(ingredients))}</i></h4>
        <button class="save-button pointer" id="saveBtn">${updateButtonText()}</button>
    </div>`;
    document.getElementById('saveBtn').addEventListener('click', toggleSaveRecipe);
  }
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
  body.classList.remove('no-scroll')
  createRecipeCards(currentView);
  if (event.target.id === "recipeModalBackground" || event.target.id === "closeIcon"){
    toggleHidden(modalSection);
  }
}

function filterRecipes(event) {
    let tag = event.target.innerText.toLowerCase();
    let filteredRecipes = savedView ? currentUser.filterSavedByTag(tag) : recipeRepo.filterByTag(tag);
    currentView = filteredRecipes;
    createRecipeCards(currentView);
}

function searchRecipes() {
  let keyword = searchBar.value;
  let searchedRecipes = savedView ? currentUser.filterSavedByName(keyword) : recipeRepo.filterByName(keyword);
  currentView = searchedRecipes;
  createRecipeCards(currentView);
}

function toggleSaveRecipe() {
  currentUser.toggleSaveRecipe(modalRecipe);
  saveBtn.innerText = updateButtonText();
}

function updateButtonText() {
  let buttonText;
  modalRecipe.saved ? buttonText = "Remove from Saved Recipes" : buttonText = "Add to Saved Recipes";
  return buttonText;
}

function getRandomUser() {
  currentUser = new User(users[Math.floor(Math.random() * users.length)]);
  myRecipesTitle.innerText = `What's Cookin' in ${currentUser.name}'s Kitchen?`;
  navUserInfo.innerHTML = `
  <img class="user-icon" src="./images/user.png" alt="user icon">
  <span class="user-text">${currentUser.name}</span>
  `;
}

function showSavedRecipes() {
  savedView = true;
  currentView = currentUser.savedRecipes;
  searchBar.placeholder = 'Search My Recipes...';
  filterHeader.innerText = 'Filter My Recipes';
  toggleHidden(myRecipesTitle);
  toggleHidden(titleLogo);
  createRecipeCards(currentView);
}

function goHome() {
  toggleHidden(myRecipesTitle);
  toggleHidden(titleLogo);
  savedView = false;
  currentView = recipeRepo.recipes;
  searchBar.placeholder = 'Search Recipes...';
  filterHeader.innerText = 'Filter Recipes';
  createRecipeCards(currentView);
}