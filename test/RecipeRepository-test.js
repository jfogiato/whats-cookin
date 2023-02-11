import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';
import testData from '../src/data/test-data';

describe('Recipe Repo', () => {
  let recipes, recipeRepo;
  beforeEach(() => {
     recipes = testData.recipes;
     recipeRepo = new RecipeRepository(recipes);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be an instance of RecipeRepository', () => {
    expect(recipeRepo).to.be.an.instanceOf(RecipeRepository);
  });

  it('Should hold an array of recipes', () => {
    expect(recipeRepo.recipes).to.be.an.instanceOf(Array);
    expect(recipeRepo.recipes[1].id).to.equal(678353);
    expect(recipeRepo.recipes[2]).to.be.an.instanceOf(Recipe);
  });

  it('Should filter recipe based on a tag', () => {
    expect(recipeRepo.filterByTag("lunch")).to.deep.equal([new Recipe(recipes[1])]);
    expect(recipeRepo.filterByTag("starter")).to.deep.equal([new Recipe(recipes[0])]);
    expect(recipeRepo.filterByTag("sauce")).to.deep.equal([new Recipe(recipes[2])]);
  });

  it('Should be able to filter recipe by name', () => {
    expect(recipeRepo.filterByName("Loaded Chocolate Chip Pudding Cookie Cups")).to.deep.equal([new Recipe(recipes[0])]);
    expect(recipeRepo.filterByName("PUDDING")).to.deep.equal([new Recipe(recipes[0])]);
  });
  
});