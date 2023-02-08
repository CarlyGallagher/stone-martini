// Image API
var drinkImg = document.getElementById('drink-img')
getDrink ()

function getDrink() {

    //var drinkImgAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+result;
    var drinkImgAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
    //var result;

    fetch(drinkImgAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            document.getElementById('drink-img').src =data.drinks[0].strDrinkThumb
        })

    }