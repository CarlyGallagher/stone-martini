// Image API
var drinkImg = document.getElementById('drink-img')
var ninjaKey = 'mbA0oOq8BxNEPSK4vFbW7Q==IfwPuDu0oCLy5XEX'
var result;
var input = document.getElementById('ingInput');
var addBtn = document.getElementById('addBtn');
var suggestions = document.querySelector('.suggestions ul');
var onHand = document.getElementById('onHand');
var resultsContainer = document.getElementById('resultsContainer');
var clearIngredients = document.getElementById('clear');
var result;


//Functions
function getDrink() {
    var drinkImgAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + result;

    fetch(drinkImgAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            if (data.drinks === null) {
                document.getElementById('drink-img').src = './assets/images/empty-cocktail.jpg'
            } else {
                document.getElementById('drink-img').src = data.drinks[0].strDrinkThumb
            }
        })
    getRecipe()
}
//grabs the recipe based on the result that the user selects
function getRecipe() {
    
    var recipeAPI = 'https://api.api-ninjas.com/v1/cocktail?name=' + result;


    fetch(recipeAPI, { headers: { 'X-Api-Key': ninjaKey } })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            document.getElementById('cocktail-name').textContent = data[0].name.toUpperCase();
            renderIngredients(data[0].ingredients);
            document.getElementById('instruction').textContent = data[0].instructions;

        })

}

function ingredientsList() {
    var userIngredient = input.value
    console.log(userIngredient)
    var listIngredient = document.createElement('li')
    listIngredient.textContent = userIngredient
    onHand.append(listIngredient)
    input.value = ''
}


//displays results based on the ingredients on hand
function getResults() {
    const userInput = []
    userInput.push(onHand.innerText.split('\n'))
    console.log(userInput)
    

    var recipeAPI = 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + userInput;
    fetch(recipeAPI, { headers: { 'X-Api-Key': ninjaKey } })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                var resultsBtn = document.createElement('button')
                resultsBtn.textContent = data[i].name.toUpperCase()
                resultsContainer.append(resultsBtn);
            }
        })


}

function renderIngredients(ingredients) {
    for (var i = 0; i < ingredients.length; i++) {
        document.getElementById('recipe-ingred-' + i + '').textContent = ingredients[i];
    }
}

//clears list and rendered content
 function clear() {
onHand.innerHTML = '';
resultsContainer.innerHTML = '';
}


//Event Listeners
submit.addEventListener('click', getResults)
addBtn.addEventListener('click', ingredientsList)
clearIngredients.addEventListener('click', clear)


//Event listener for dynamic list or buttons (We need to change the variables)
resultsContainer.addEventListener('click', (event) => {
    result = event.target.textContent;
    getDrink()
}) 