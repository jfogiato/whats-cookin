class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
    this.saved = false;
  }

  matchIngredients(ingredientData) {
    const relevantIngredients = ingredientData.filter(ingredient => {
      const recipeIds = this.ingredients.map(ingredient => ingredient.id);
      return recipeIds.includes(ingredient.id);
    });
    
    const ingredientsWithAllData = this.ingredients.reduce((acc, recipeIngredient) => {
      const combiner = relevantIngredients.forEach(ingredientItem => {
        if(ingredientItem.id === recipeIngredient.id) {
          acc.push(
          {
            id: ingredientItem.id,
            name: ingredientItem.name,
            estimatedCostInCents: ingredientItem.estimatedCostInCents,
            quantity: recipeIngredient.quantity
          });
        }
      });
      return acc;
    }, []);

    return ingredientsWithAllData;
  }
  
  listIngredients(ingredientData) {
    return this.matchIngredients(ingredientData).map(ingredient => {
      let amount = ingredient.quantity.amount
      if(amount.toString().length > 5) {
        amount = ingredient.quantity.amount.toFixed(2)
      }
      return `${amount} ${ingredient.quantity.unit} ${ingredient.name}`
    });  
  }

  listCost(ingredientData) {
    const totalCost = this.matchIngredients(ingredientData).reduce((acc, ingredient) => {
      acc += (ingredient.estimatedCostInCents * ingredient.quantity.amount);
      return acc;
    }, 0);
    return Math.round(totalCost * .01);
  }

  getInstructions() {
    const instructions = this.instructions.map(step => `${step.instruction}`);
    return instructions;
  }

  toggleSave() {
    this.saved = !this.saved;
  }
}

export default Recipe;