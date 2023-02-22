function fetchData(data) {
    return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${data}`)
           .then(response => response.json())
           .catch(error => console.log(`Could not fetch because: ${error}`));
};

const apiCalls = () => {
    return Promise.all([fetchData('users'), fetchData('ingredients'), fetchData('recipes')]);
};

export default apiCalls;