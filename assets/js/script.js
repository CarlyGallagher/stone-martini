const input = document.querySelector('#dropdown');
const suggestions = document.querySelector('.suggestions ul');

const dropdown =['Jagermeister', 'Gordons Gin', 'tequila', 'Crown Royal', 'Jameson', 'Captain Morgan', 'Jack Daniels', 'Bacardi'];
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

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);