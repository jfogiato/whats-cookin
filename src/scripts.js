import './styles.css';
import apiObject from './apiCalls';
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
apiObject.getAllPromises().then(data => {
  users = data[0];
  ingredients = data[1];
  recipes = data[2];
  recipeRepo = new RecipeRepository(recipes);
  getRandomUser();
  recipeRepo.recipes.forEach(recipe => {
    if(currentUser.recipesToCook.includes(recipe.id)) {
      recipe.toggleSave();
    }
  });
  currentView = recipeRepo.recipes;
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
        <img role="button" aria-label="Close Recipe Button" class="close-icon pointer" id="closeIcon" src="./images/close-icon.png" tabindex="0">
        <h2>${modalRecipe.name}</h2>
        <div class="print-container">
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
        </div>
        <h4 class="oregano-font"><i>TOTAL COST $${modalRecipe.listCost(ingredients)}</i></h4>
        <div class="button-container">
          <button class="modal-button pointer" id="saveBtn">${updateButtonText()}</button>
          <button class="modal-button pointer" id="printBtn">Print Me!</button>
        </div>
    </div>`;
    document.getElementById('saveBtn').addEventListener('click', toggleSaveRecipe);
    document.getElementById('printBtn').addEventListener('click', () => window.print());
    document.getElementById('closeIcon').addEventListener('keypress', (event) => {
      event.key === "Enter" ? collapseRecipe(event) : null
    });
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
  if (searchedRecipes.length) {
    currentView = searchedRecipes;
    createRecipeCards(currentView);
  } else {
    recipeSection.innerHTML = "";
    recipeSection.innerText = "Oh no - we don't have any recipes that match that search! Looks like you're going hungry tonight 🥲";
  }
}

function toggleSaveRecipe() {
  if(!modalRecipe.saved){
    apiObject.apiRequest("usersRecipes","POST", currentUser, modalRecipe);
  } else {
    apiObject.apiRequest("usersRecipes","DELETE", currentUser, modalRecipe);
  }
  modalRecipe.toggleSave();
  apiObject.apiRequest("users").then(data => currentUser.recipesToCook = data[0].recipesToCook);
  saveBtn.innerText = updateButtonText();
}

function updateButtonText() {
  let buttonText;
  modalRecipe.saved ? buttonText = "Remove from Saved Recipes" : buttonText = "Add to Saved Recipes";
  return buttonText;
}

function getRandomUser() {
  // currentUser = new User(users[Math.floor(Math.random() * users.length)]);
  currentUser = new User(users[0]);
  myRecipesTitle.innerText = `What's Cookin' in ${currentUser.name}'s Kitchen?`;
  navUserInfo.innerHTML = `
  <img class="user-icon" src="./images/user.png" alt="user icon">
  <span class="user-text">${currentUser.name}</span>
  `;
}

function showSavedRecipes() {
  if(!savedView){
    savedView = true;
    const savedRecipes = currentUser.recipesToCook.map(userRecipe => {
      return recipeRepo.recipes.find(recipe => recipe.id === userRecipe)
    });
    currentView = savedRecipes;
    searchBar.placeholder = 'Search My Recipes...';
    filterHeader.innerText = 'Filter My Recipes';
    toggleHidden(myRecipesTitle);
    toggleHidden(titleLogo);
    createRecipeCards(currentView);
  }
}

function goHome() {
  if(currentView !== recipeRepo.recipes){
    toggleHidden(myRecipesTitle);
    toggleHidden(titleLogo);
    savedView = false;
    currentView = recipeRepo.recipes;
    searchBar.placeholder = 'Search Recipes...';
    filterHeader.innerText = 'Filter Recipes';
    createRecipeCards(currentView);
  }
}