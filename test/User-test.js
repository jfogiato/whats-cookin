import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';

describe('User', () => {
  let users, recipes, user, recipe1, recipe2, recipe3;

  beforeEach(() => {
    users = [
      {
        "name": "Saige O'Kon",
        "id": 1,
        "pantry": [
          {
            "ingredient": 11297,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 10
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 6
          },
          {
            "ingredient": 1123,
            "amount": 8
          },
          {
            "ingredient": 11282,
            "amount": 4
          },
          {
            "ingredient": 6172,
            "amount": 2
          },
          {
            "ingredient": 2044,
            "amount": 2
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 5114,
            "amount": 3
          },
          {
            "ingredient": 1017,
            "amount": 2
          },
          {
            "ingredient": 18371,
            "amount": 7
          },
          {
            "ingredient": 1001,
            "amount": 6
          },
          {
            "ingredient": 99223,
            "amount": 2
          },
          {
            "ingredient": 1230,
            "amount": 2
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 10611282,
            "amount": 2
          },
          {
            "ingredient": 93607,
            "amount": 2
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 1077,
            "amount": 4
          },
          {
            "ingredient": 6150,
            "amount": 2
          },
          {
            "ingredient": 1124,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 4
          },
          {
            "ingredient": 1102047,
            "amount": 2
          },
          {
            "ingredient": 19206,
            "amount": 2
          },
          {
            "ingredient": 1145,
            "amount": 4
          },
          {
            "ingredient": 1002030,
            "amount": 4
          },
          {
            "ingredient": 12061,
            "amount": 2
          },
          {
            "ingredient": 19335,
            "amount": 4
          },
          {
            "ingredient": 15152,
            "amount": 3
          },
          {
            "ingredient": 9003,
            "amount": 2
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 2027,
            "amount": 2
          }
        ]
      },
      {
        "name": "Ephraim Goyette",
        "id": 2,
        "pantry": [
          {
            "ingredient": 6150,
            "amount": 3
          },
          {
            "ingredient": 1032009,
            "amount": 7
          },
          {
            "ingredient": 1082047,
            "amount": 8
          },
          {
            "ingredient": 1034053,
            "amount": 6
          },
          {
            "ingredient": 2050,
            "amount": 10
          },
          {
            "ingredient": 19335,
            "amount": 13
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 18371,
            "amount": 8
          },
          {
            "ingredient": 19336,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 12
          },
          {
            "ingredient": 9152,
            "amount": 3
          },
          {
            "ingredient": 11297,
            "amount": 4
          },
          {
            "ingredient": 1123,
            "amount": 17
          },
          {
            "ingredient": 16112,
            "amount": 2
          },
          {
            "ingredient": 4053,
            "amount": 11
          },
          {
            "ingredient": 10011693,
            "amount": 4
          },
          {
            "ingredient": 5114,
            "amount": 2
          },
          {
            "ingredient": 11529,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 14
          },
          {
            "ingredient": 2027,
            "amount": 6
          },
          {
            "ingredient": 1002030,
            "amount": 9
          },
          {
            "ingredient": 20081,
            "amount": 10
          },
          {
            "ingredient": 1077,
            "amount": 5
          },
          {
            "ingredient": 14106,
            "amount": 7
          },
          {
            "ingredient": 2009,
            "amount": 5
          },
          {
            "ingredient": 16124,
            "amount": 4
          },
          {
            "ingredient": 2031,
            "amount": 3
          },
          {
            "ingredient": 2025,
            "amount": 5
          },
          {
            "ingredient": 11282,
            "amount": 8
          },
          {
            "ingredient": 20027,
            "amount": 2
          },
          {
            "ingredient": 11333,
            "amount": 3
          },
          {
            "ingredient": 19177,
            "amount": 2
          },
          {
            "ingredient": 11821,
            "amount": 3
          },
          {
            "ingredient": 18372,
            "amount": 9
          },
          {
            "ingredient": 1012047,
            "amount": 2
          },
          {
            "ingredient": 11291,
            "amount": 2
          },
          {
            "ingredient": 1102047,
            "amount": 4
          },
          {
            "ingredient": 6194,
            "amount": 5
          },
          {
            "ingredient": 19296,
            "amount": 5
          },
          {
            "ingredient": 11477,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 12
          },
          {
            "ingredient": 93607,
            "amount": 6
          },
          {
            "ingredient": 12061,
            "amount": 8
          },
          {
            "ingredient": 11353,
            "amount": 3
          },
          {
            "ingredient": 6615,
            "amount": 2
          },
          {
            "ingredient": 9003,
            "amount": 2
          },
          {
            "ingredient": 19911,
            "amount": 2
          },
          {
            "ingredient": 1124,
            "amount": 3
          },
          {
            "ingredient": 11165,
            "amount": 2
          },
          {
            "ingredient": 1125,
            "amount": 3
          },
          {
            "ingredient": 1089003,
            "amount": 2
          },
          {
            "ingredient": 12120,
            "amount": 2
          },
          {
            "ingredient": 10511282,
            "amount": 2
          },
          {
            "ingredient": 1019,
            "amount": 2
          },
          {
            "ingredient": 9302,
            "amount": 2
          },
          {
            "ingredient": 1011256,
            "amount": 2
          },
          {
            "ingredient": 9019,
            "amount": 4
          },
          {
            "ingredient": 11206,
            "amount": 2
          },
          {
            "ingredient": 19350,
            "amount": 2
          },
          {
            "ingredient": 9099,
            "amount": 18
          },
          {
            "ingredient": 14412,
            "amount": 3
          }
        ]
      },
      {
        "name": "Nelda Bosco",
        "id": 3,
        "pantry": [
          {
            "ingredient": 1009159,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 10
          },
          {
            "ingredient": 10123,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 12
          },
          {
            "ingredient": 11529,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 4
          },
          {
            "ingredient": 4582,
            "amount": 2
          },
          {
            "ingredient": 2021,
            "amount": 3
          },
          {
            "ingredient": 19336,
            "amount": 3
          },
          {
            "ingredient": 20027,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 7
          },
          {
            "ingredient": 14412,
            "amount": 3
          },
          {
            "ingredient": 1011256,
            "amount": 2
          },
          {
            "ingredient": 11215,
            "amount": 10
          },
          {
            "ingredient": 6615,
            "amount": 3
          },
          {
            "ingredient": 11477,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 4
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 16124,
            "amount": 4
          },
          {
            "ingredient": 20081,
            "amount": 10
          },
          {
            "ingredient": 1034053,
            "amount": 2
          },
          {
            "ingredient": 11124,
            "amount": 4
          },
          {
            "ingredient": 2047,
            "amount": 8
          },
          {
            "ingredient": 1124,
            "amount": 3
          },
          {
            "ingredient": 9156,
            "amount": 4
          },
          {
            "ingredient": 2050,
            "amount": 3
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 6150,
            "amount": 2
          },
          {
            "ingredient": 4053,
            "amount": 10
          },
          {
            "ingredient": 1012010,
            "amount": 3
          },
          {
            "ingredient": 19296,
            "amount": 3
          },
          {
            "ingredient": 18371,
            "amount": 6
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 10862,
            "amount": 2
          },
          {
            "ingredient": 1019,
            "amount": 2
          },
          {
            "ingredient": 11291,
            "amount": 4
          },
          {
            "ingredient": 9152,
            "amount": 10
          },
          {
            "ingredient": 99223,
            "amount": 2
          },
          {
            "ingredient": 2009,
            "amount": 2
          },
          {
            "ingredient": 1077,
            "amount": 3
          },
          {
            "ingredient": 2049,
            "amount": 3
          },
          {
            "ingredient": 11282,
            "amount": 3
          },
          {
            "ingredient": 19334,
            "amount": 3
          },
          {
            "ingredient": 2031,
            "amount": 2
          },
          {
            "ingredient": 9302,
            "amount": 2
          },
          {
            "ingredient": 11463,
            "amount": 2
          },
          {
            "ingredient": 2025,
            "amount": 2
          },
          {
            "ingredient": 1002014,
            "amount": 2
          },
          {
            "ingredient": 2028,
            "amount": 3
          },
          {
            "ingredient": 4047,
            "amount": 2
          }
        ]
      }
    ];

    recipes = [
      {
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [
          {
            "id": 20081,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          },
          {
            "id": 18372,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "id": 1123,
            "quantity": {
              "amount": 1,
              "unit": "large"
            }
          },
          {
            "id": 19335,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 19206,
            "quantity": {
              "amount": 3,
              "unit": "Tbsp"
            }
          },
          {
            "id": 19334,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 2047,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "id": 1012047,
            "quantity": {
              "amount": 24,
              "unit": "servings"
            }
          },
          {
            "id": 10019903,
            "quantity": {
              "amount": 2,
              "unit": "c"
            }
          },
          {
            "id": 1145,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "id": 2050,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          }
        ],
        "instructions": [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          },
          {
            "instruction": "Add egg and vanilla and mix until combined.",
            "number": 2
          },
          {
            "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
            "number": 3
          },
          {
            "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
            "number": 4
          },
          {
            "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
            "number": 5
          },
          {
            "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
            "number": 6
          }
        ],
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "tags": [
          "antipasti",
          "starter",
          "snack",
          "appetizer",
          "antipasto",
          "hor d'oeuvre"
        ]
      },
      {
        "id": 678353,
        "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
        "ingredients": [
          {
            "id": 1009016,
            "quantity": {
              "amount": 1.5,
              "unit": "cups"
            }
          },
          {
            "id": 9003,
            "quantity": {
              "amount": 2,
              "unit": ""
            }
          },
          {
            "id": 20027,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "id": 1002046,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "id": 11215,
            "quantity": {
              "amount": 1,
              "unit": "clove"
            }
          },
          {
            "id": 1012046,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "id": 19911,
            "quantity": {
              "amount": 0.25,
              "unit": "cup"
            }
          },
          {
            "id": 16112,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "id": 10010062,
            "quantity": {
              "amount": 24,
              "unit": "ounce"
            }
          },
          {
            "id": 1102047,
            "quantity": {
              "amount": 4,
              "unit": "servings"
            }
          },
          {
            "id": 16124,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "id": 1016168,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          }
        ],
        "instructions": [
          {
            "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
            "number": 1
          }
        ],
        "name": "Maple Dijon Apple Cider Grilled Pork Chops",
        "tags": [
          "lunch",
          "main course",
          "main dish",
          "dinner"
        ]
      },
      {
        "id": 412309,
        "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
        "ingredients": [
          {
            "id": 1002030,
            "quantity": {
              "amount": 4,
              "unit": "teaspoons"
            }
          },
          {
            "id": 19334,
            "quantity": {
              "amount": 8,
              "unit": "tablespoons"
            }
          },
          {
            "id": 1001,
            "quantity": {
              "amount": 2,
              "unit": "cups"
            }
          },
          {
            "id": 4582,
            "quantity": {
              "amount": 4,
              "unit": "servings"
            }
          },
          {
            "id": 2031,
            "quantity": {
              "amount": 4,
              "unit": "teaspoons"
            }
          },
          {
            "id": 5100,
            "quantity": {
              "amount": 1,
              "unit": "pound"
            }
          },
          {
            "id": 2009,
            "quantity": {
              "amount": 4,
              "unit": "teaspoons"
            }
          },
          {
            "id": 1022020,
            "quantity": {
              "amount": 4,
              "unit": "teaspoons"
            }
          },
          {
            "id": 6168,
            "quantity": {
              "amount": 8,
              "unit": "cups"
            }
          },
          {
            "id": 9176,
            "quantity": {
              "amount": 0.5,
              "unit": "cup"
            }
          },
          {
            "id": 2026,
            "quantity": {
              "amount": 4,
              "unit": "teaspoons"
            }
          },
          {
            "id": 1042047,
            "quantity": {
              "amount": 1.5,
              "unit": "tablespoons"
            }
          },
          {
            "id": 1042047,
            "quantity": {
              "amount": 4,
              "unit": "teaspoons"
            }
          }
        ],
        "instructions": [
          {
            "instruction": "Mix the hot sauce, butter, mango habanero sauce, brown sugar, chili powder, garlic powder, onion powder, black pepper, cayenne pepper and seasoning salt in a bowl. Stir vigorously until completely combined.",
            "number": 1
          }
        ],
        "name": "Dirty Steve's Original Wing Sauce",
        "tags": [
          "sauce"
        ]
      }
    ];

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
  });
    
  it.skip('should do a thing', () => {

  });
    
  it.skip('should do a thing', () => {

  });
});