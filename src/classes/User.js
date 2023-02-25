class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.recipesToCook = userData.recipesToCook;
  }

  convertToFullRecipe(recipeRepo) {
    const fullRecipes = this.recipesToCook.map(userRecipe => {
      return recipeRepo.recipes.find(recipe => recipe.id === userRecipe);
    });
    return fullRecipes.reverse();
  }

  filterSavedByTag(tag, allRecipes) {
    return this.convertToFullRecipe(allRecipes).filter(recipe => recipe.tags.includes(tag));
  }

  filterSavedByName(name, allRecipes) {
    return this.convertToFullRecipe(allRecipes).filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }
}

export default User;