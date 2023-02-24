import { expect } from 'chai';
import User from '../src/classes/User';
import testData from '../src/data/test-data';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('User', () => {
  let users, recipeRepo, user, recipe1, recipe2, recipe3;

  beforeEach(() => {
    users = testData.users;

    recipeRepo = new RecipeRepository(testData.recipes);

    user = new User(users[0]);

    recipe1 = recipeRepo.recipes[0];
    recipe2 = recipeRepo.recipes[1];
    recipe3 = recipeRepo.recipes[2];
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

  it('should have a place to save recipes', () => {
    expect(user.recipesToCook).to.deep.equal([]);
  });
    
  it('should be able to filter recipes by a tag', () => {
    user.recipesToCook.push(recipe1.id);
    user.recipesToCook.push(recipe2.id);
    user.recipesToCook.push(recipe3.id);
    expect(user.filterSavedByTag('sauce', recipeRepo)).to.deep.equal([recipe3]);
    expect(user.filterSavedByTag('appetizer', recipeRepo)).to.deep.equal([recipe1]);
    expect(user.filterSavedByTag('main course', recipeRepo)).to.deep.equal([recipe2]);
  });
      
  it('should be able to filter recipes by name', () => {
    expect(user.filterSavedByName('dIrTy', recipeRepo)).to.deep.equal([recipe3]);
    expect(user.filterSavedByName('puddin', recipeRepo)).to.deep.equal([recipe1]);
    expect(user.filterSavedByName('pork ChOps', recipeRepo)).to.deep.equal([recipe2]);
  });
});