// Image API
var drinkImg = document.getElementById('drink-img')
var ninjaKey = 'mbA0oOq8BxNEPSK4vFbW7Q==IfwPuDu0oCLy5XEX'
var result;


getDrink()

function getDrink() {
    var result = 'margarita'
    var drinkImgAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + result;

    fetch(drinkImgAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            document.getElementById('drink-img').src = data.drinks[0].strDrinkThumb
        })
        getRecipe()
}

function getRecipe() {
        result = 'margarita'
    var recipeAPI = 'https://api.api-ninjas.com/v1/cocktail?name=' + result;

    fetch(recipeAPI, { headers: { 'X-Api-Key': ninjaKey } })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            document.getElementById('cocktail-name').textContent = data[0].name;
            for (var i = 0; i < data[0].ingredients.length; i++)
                document.getElementById('recipe-ingred-' + i + '').textContent = data[0].ingredients[i];
            document.getElementById('instruction').textContent = data[0].instructions;

        })

}
