class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.savedRecipes = [];
  }

  toggleSaveRecipe(recipe) {
    recipe.saveThisRec
    this.savedRecipes.find(element => recipe.id === element.id)


    // this.savedRecipes.some((element, index) => element.id === recipe.id) ? this.savedRecipes.splice(index, 1) : this.savedRecipes.push(recipe);
  }
}






/*

name :
id:
pantry: [{}, {}]
recipesToCook: []



Create classes and methods that can:
- Allow a user to add/remove a recipe to their recipesToCook list (add to my recipesToCook) (this will both add AND remove aka toggle)
- Filter my recipesToCook by a tag. (Extension option: filter by multiple tags)
- Filter my recipesToCook by its name. (Extension option: filter by name or ingredients)
*/
export default User;