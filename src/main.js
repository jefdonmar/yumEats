(function () {

	
	// Var set to our URL and the URL for our getJSON method
	let menuUrl = "https://json-data.herokuapp.com/restaurant/menu/2";
	let promise = $.getJSON(menuUrl);

	// Function that runs our JSON url
	promise.then (function (res) {
		doSomething(res); 
	}); 

	// Function that determines what will be display to the HTML
	let createTemplate = function(arr) {

		// Var to add content
		let menuBlock = '';

		// For each statement to add to menuBlock var
		arr.forEach(function(option) {
      		menuBlock += `
      		<h2>${ option.item }</h2>
      		<p>${ option.description }</p>`;
    	});

		let finalTemp =	`		
			${menuBlock}			
		`;

		// Return finalTemp to display template
		return finalTemp;
	}; 
 	
 	// Function to display and append array to html
 	let doSomething = function (obj) {

 		// Var that grab specific arrays
 		let breakfastTemplate = createTemplate(obj.breakfast);
 		let sandwichesTemplate = createTemplate(obj.sandwiches);
 		let toppingsTemplate = createTemplate(obj.toppings);
 		let sidesTemplate = createTemplate(obj.sides);
 		let saladsTemplate = createTemplate(obj.salads);
 		let soupsTemplate = createTemplate(obj.soups);
 		let drinksTemplate = createTemplate(obj.drinks);
 		let dessertsTemplate = createTemplate(obj.desserts);
 		let veradessertsTemplate = createTemplate(obj.veraDesserts);

 		// Append to the specific div class depending upon the var
		$('.menuBreakfast').append(breakfastTemplate);
		$('.menuSandwiches').append(sandwichesTemplate);
		$('.menuToppings').append(toppingsTemplate);
		$('.menuSides').append(sidesTemplate);
		$('.menuSalads').append(saladsTemplate);
		$('.menuSoups').append(soupsTemplate);
		$('.menuDrinks').append(drinksTemplate);
		$('.menuDesserts').append(dessertsTemplate);
		$('.menuVeradesserts').append(veradessertsTemplate);

 	}; 


}());
