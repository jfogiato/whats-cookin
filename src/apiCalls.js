function apiRequest(path, request, user, recipe) {
    return fetch(`http://localhost:3001/api/v1/${path}`, {
        method: request ? request : "GET",
        body: user ? JSON.stringify({ userID: user.id, recipeID: recipe.id }) : null,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("There was an error. Status Code: ", response.status);
        } else {
            return response.json()
        }
    })
    .catch(error => console.log(`Could not fetch because: ${error}`));
};

const getAllPromises = () => {
    return Promise.all([apiRequest("users"), apiRequest("ingredients"), apiRequest("recipes")]);
};

export default { getAllPromises, apiRequest };

