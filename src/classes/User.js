class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.recipesToCook = userData.recipesToCook;
  }

  toggleSaveRecipe(recipe) {
    if (recipe.saved) {
      this.recipesToCook.forEach((element, index) => {
        element.id === recipe.id ? this.recipesToCook.splice(index, 1) : null;
      });
    } else {
      this.recipesToCook.unshift(recipe);
    }
    recipe.toggleSave();
  }

  filterSavedByTag(tag) {
    return this.recipesToCook.filter(recipe => recipe.tags.includes(tag));
  }

  filterSavedByName(name) {
    return this.recipesToCook.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }

}

export default User;