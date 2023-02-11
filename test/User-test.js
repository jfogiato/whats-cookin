import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import testData from '../src/data/test-data';

describe('User', () => {
  let users, recipes, user, recipe1, recipe2, recipe3;

  beforeEach(() => {
    users = testData.users;

    recipes = testData.recipes

    user = new User(users[0]);

    recipe1 = new Recipe(recipes[0]);
    recipe2 = new Recipe(recipes[1]);
    recipe3 = new Recipe(recipes[2]);
  });
  
  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });
  
  it('should have a name', () => {
    expect(user.name).to.equal('Saige O\'Kon');
  });
    
  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });
    
  it('should have a pantry', () => {
    expect(user.pantry).to.be.an('array');
    expect(user.pantry).to.deep.equal(users[0].pantry);
  });
    
  it('should have a place to save recipes', () => {
    expect(user.savedRecipes).to.deep.equal([]);
  });
    
  it('should be able to save recipes', () => {
    user.toggleSaveRecipe(recipe1);
    expect(user.savedRecipes).to.deep.equal([recipe1]);
    expect(recipe1.saved).to.equal(true);
    user.toggleSaveRecipe(recipe2);
    expect(user.savedRecipes).to.deep.equal([recipe2, recipe1]);
    expect(recipe2.saved).to.equal(true);
    user.toggleSaveRecipe(recipe3);
    expect(user.savedRecipes).to.deep.equal([recipe3, recipe2, recipe1]);
    expect(recipe3.saved).to.equal(true);
  });
    
  it('should be able to unsave a recipe', () => {
    user.toggleSaveRecipe(recipe1);
    expect(user.savedRecipes).to.deep.equal([recipe1]);
    expect(recipe1.saved).to.equal(true);
    user.toggleSaveRecipe(recipe1);
    expect(user.savedRecipes).to.deep.equal([]);
    expect(recipe1.saved).to.equal(false);
  });
    
  it('should be able to unsave any recipe', () => {
    user.toggleSaveRecipe(recipe1);
    user.toggleSaveRecipe(recipe2);
    user.toggleSaveRecipe(recipe3);
    expect(user.savedRecipes).to.deep.equal([recipe3, recipe2, recipe1]);
    expect(recipe2.saved).to.equal(true);
    user.toggleSaveRecipe(recipe2);
    expect(user.savedRecipes).to.deep.equal([recipe3, recipe1]);
    expect(recipe2.saved).to.equal(false);
  });
    
  it('should be able to filter recipes by a tag', () => {
    user.toggleSaveRecipe(recipe1);
    user.toggleSaveRecipe(recipe2);
    user.toggleSaveRecipe(recipe3);
    expect(user.filterSavedByTag('sauce')).to.deep.equal([recipe3]);
    expect(user.filterSavedByTag('appetizer')).to.deep.equal([recipe1]);
    expect(user.filterSavedByTag('main course')).to.deep.equal([recipe2]);
  });
      
  it('should be able to filter recipes by name', () => {
    user.toggleSaveRecipe(recipe1);
    user.toggleSaveRecipe(recipe2);
    user.toggleSaveRecipe(recipe3);
    expect(user.filterSavedByName('dIrTy')).to.deep.equal([recipe3]);
    expect(user.filterSavedByName('puddin')).to.deep.equal([recipe1]);
    expect(user.filterSavedByName('pork ChOps')).to.deep.equal([recipe2]);
  });
});