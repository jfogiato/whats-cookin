function fetchData(data) {
    return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${data}`)
        .then(promise => promise.json())
        .then(data => data)
        .catch(error => console.log(`Could not fetch because: ${error}`))
}

const apiCalls = () => {
    return Promise.all([fetchData('users'), fetchData('ingredients'), fetchData('recipes')])
}

console.log(apiCalls())

export default apiCalls