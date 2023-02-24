class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.recipesToCook = userData.recipesToCook;
  }

  filterSavedByTag(tag) {
    return this.recipesToCook.filter(recipe => recipe.tags.includes(tag));
  }

  filterSavedByName(name) {
    return this.recipesToCook.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
  }
}

export default User;