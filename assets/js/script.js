// Image API
var drinkImg = document.getElementById('drink-img')
var ninjaKey = 'mbA0oOq8BxNEPSK4vFbW7Q==IfwPuDu0oCLy5XEX'
var result;
var input = document.querySelector('#dropdown');
var suggestions = document.querySelector('.suggestions ul');

const dropdown =['Jagermeister', 'Gordons Gin', 'tequila', 'Crown Royal', 'Jameson', 'Captain Morgan', 'Jack Daniels', 'Bacardi', 'Patron', 'Lime', 'Tajin', 
'salt'];

getDrink()

//Functions
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
//grabs the recipe based on the result that the user selects
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
            renderIngredients(data[0].ingredients);
            document.getElementById('instruction').textContent = data[0].instructions;

        })

}
//displays results based on the ingredients on hand
getResults()
function getResults() {
    var results = document.getElementById('onHand').childNodes;

    for (var i = 0; i < results.length; i++) {
        var resultsBtn = document.createElement('button')
        resultsBtn.textContent = results.value
        // vvvv element not yet named for results div <ul>
        unorderedListEl.append(resultsBtn);
    }

    var chosenIngredients = ['tequila,lime,salt']
    var recipeAPI = 'https://api.api-ninjas.com/v1/cocktail?ingredients=' + chosenIngredients;
    fetch(recipeAPI, { headers: { 'X-Api-Key': ninjaKey } })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            document.getElementById('cocktail-name').textContent = data[0].name;
        })
}

function renderIngredients(ingredients) {
    for (var i = 0; i < ingredients.length; i++) {
        document.getElementById('recipe-ingred-' + i + '').textContent = ingredients[i];
    }
}

function search(str){
    let results =[];
    const val = str.toLowerCase();

    for( i = 0; i<dropdown.length; i++){
        if (dropdown[i].toLowerCase().indexOf(val) > -1){
            results.push(dropdown[i]);
        }
    }
    return results;
}
function searchHandler(e) {
	const inputVal = e.currentTarget.value;
	let results = [];
	if (inputVal.length > 0) {
		results = search(inputVal);
	}
	showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {
    
    suggestions.innerHTML = '';

	if (results.length > 0) {
		for (i = 0; i < results.length; i++) {
			let item = results[i];
	
			const match = item.match(new RegExp(inputVal, 'i'));
			item = item.replace(match[0], `<strong>${match[0]}</strong>`);
			suggestions.innerHTML += `<li>${item}</li>`;
		}
		suggestions.classList.add('has-suggestions');
	} else {
		results = [];
		suggestions.innerHTML = '';
		suggestions.classList.remove('has-suggestions');
	}
}

function useSuggestion(e) {
	input.value = e.target.innerText;
	input.focus();
	suggestions.innerHTML = '';
	suggestions.classList.remove('has-suggestions');
}


function handle_form_submission()
{
  alert('Submit button pressed');
  return false; //do not submit the form
}
//Event Listeners
input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);

//Event listener for dynamic list or buttons (We need to change the variables)
// btnHolder.addEventListener('click', (event)=> {
//     cityName = event.target.textContent;
//     getRecipe()
// }) 