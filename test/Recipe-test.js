import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import testData from '../src/data/test-data';

describe('Recipe', () => {
  let recipe, recipeData, ingredients;

  beforeEach(() => {
    recipeData = testData.recipes;

    ingredients = testData.ingredients;
    
    recipe = new Recipe(recipeData[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.equal(595736);
    expect(recipe.id).to.equal(recipeData[0].id);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
    expect(recipe.image).to.equal(recipeData[0].image);
  });

  it('should have an array of ingredients', () => {
    expect(recipe.ingredients).to.be.an.instanceOf(Array);
    expect(recipe.ingredients.length).to.equal(11);
    expect(recipe.ingredients[0]).to.deep.equal({
      "id": 20081,
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    });
  });

  it('should have an array of instructions', () => {
    expect(recipe.instructions).to.be.an.instanceOf(Array);
    expect(recipe.instructions.length).to.equal(6);
    expect(recipe.instructions[0]).to.deep.equal({
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    });
  });

  it('should have a name', () => {
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    expect(recipe.name).to.equal(recipeData[0].name);
  });

  it('should have an array of tags', () => {
    expect(recipe.tags).to.be.an.instanceOf(Array);
    expect(recipe.tags.length).to.equal(6);
    expect(recipe.tags).to.deep.equal([
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ]);
  });

  it('should be able to return the names of the ingredients needed', () => {
    expect(recipe.listIngredients).to.be.a('function');
    expect(recipe.listIngredients(ingredients)).to.deep.equal([
      '1.5 c wheat flour',
      '0.5 tsp bicarbonate of soda',
      '1 large eggs',
      '0.5 c sucrose',
      '3 Tbsp instant vanilla pudding',
      '0.5 c brown sugar',
      '0.5 tsp salt',
      '24 servings fine sea salt',
      '2 c semi sweet chips',
      '0.5 c unsalted butter',
      '0.5 tsp vanilla'
    ]);
  });

  it('should return the cost of it\'s ingredients', () => {
    expect(recipe.listCost).to.be.a('function');
    expect(recipe.listCost(ingredients)).to.equal(177.76);
  });

  it('should return the recipe instructions', () => {
    expect(recipe.getInstructions).to.be.a('function');
    expect(recipe.getInstructions()).to.deep.equal([
      "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "Add egg and vanilla and mix until combined.",
      "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce."
      ]);
  });

  it('should be able to flag itself as saved', () => {
    recipe.toggleSave();
    expect(recipe.saved).to.equal(true);
    recipe.toggleSave();
    expect(recipe.saved).to.equal(false);
  });
});