//GET DATA

function getData(data) {
    return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => {
        if(!response.ok) {
            throw new Error("There was an error. Status Code: ", response.status);
        } else {
            return response.json();
        }
    })
    .catch(error => console.log(`Could not fetch because: ${error}`));
};

const apiCalls = () => {
    return Promise.all([getData('users'), getData('ingredients'), getData('recipes')]);
};

//POST DATA

function postData(user, recipe) {
    return fetch("http://localhost:3001/api/v1/usersRecipes", {
        method: "POST",
        body: JSON.stringify({ userID: user.id, recipeID: recipe.id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("There was an error. Status Code: ", response.status);
        } else {
            console.log(response.json());
        }
    })
    .catch(error => console.log(`Could not fetch because: ${error}`));
};

export default { apiCalls, postData };

