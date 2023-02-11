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
    
    const ingredientsWithAllData = this.ingredients.reduce((acc, cv) => {
      const combiner = relevantIngredients.forEach(el => {
        if(el.id === cv.id) {
          acc.push(
          {
            id: el.id,
            name: el.name,
            estimatedCostInCents: el.estimatedCostInCents,
            quantity: cv.quantity
          });
        }
      });
      return acc;
    }, []);

    return ingredientsWithAllData;
  }
  
  listIngredients(ingredientData) {
    return this.matchIngredients(ingredientData).map(element => {
      let amount = element.quantity.amount
      if(amount.toString().length > 5) {
        amount = element.quantity.amount.toFixed(2)
      }
      return `${amount} ${element.quantity.unit} ${element.name}`
    });  
  }

  listCost(ingredientData) {
    const totalCost = this.matchIngredients(ingredientData).reduce((acc, cv) => {
      acc += (cv.estimatedCostInCents * cv.quantity.amount);
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