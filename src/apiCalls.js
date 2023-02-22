//FETCH DATA

function fetchData(data) {
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
    return Promise.all([fetchData('users'), fetchData('ingredients'), fetchData('recipes')]);
};

//POST DATA


export default apiCalls;

