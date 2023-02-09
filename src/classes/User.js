class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.savedRecipes = [];
  }

  toggleSaveRecipe(recipe) {
    if (recipe.saved) {
      this.savedRecipes.forEach((element, index) => {
        element.id === recipe.id ? this.savedRecipes.splice(index, 1) : null;
      });
    } else {
      this.savedRecipes.unshift(recipe);
    }
    recipe.toggleSave();
  }

  filterSavedByTag(tag) {
    return this.savedRecipes.filter(recipe => recipe.tags.includes(tag));
  }

  filterSavedByName(name) {
    return this.savedRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }

}

export default User;