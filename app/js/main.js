'use strict';

(function () {

	// Var set to our URL and the URL for our getJSON method
	var menuUrl = "https://json-data.herokuapp.com/restaurant/menu/2";
	var promise = $.getJSON(menuUrl);

	// Function that runs our JSON url
	promise.then(function (res) {
		doSomething(res);
	});

	// Function that determines what will be display to the HTML
	var createTemplate = function createTemplate(arr) {

		// Var to add content
		var menuBlock = '';

		// For each statement to add to menuBlock var
		arr.forEach(function (option) {
			menuBlock += '\n      \t\t<h2>' + option.item + '</h2>\n      \t\t<p>' + option.description + '</p>';
		});

		var finalTemp = '\t\t\n\t\t\t' + menuBlock + '\t\t\t\n\t\t';

		// Return finalTemp to display template
		return finalTemp;
	};

	// Function to display and append array to html
	var doSomething = function doSomething(obj) {

		// Var that grab specific arrays
		var breakfastTemplate = createTemplate(obj.breakfast);
		var sandwichesTemplate = createTemplate(obj.sandwiches);
		var toppingsTemplate = createTemplate(obj.toppings);
		var sidesTemplate = createTemplate(obj.sides);
		var saladsTemplate = createTemplate(obj.salads);
		var soupsTemplate = createTemplate(obj.soups);
		var drinksTemplate = createTemplate(obj.drinks);
		var dessertsTemplate = createTemplate(obj.desserts);
		var veradessertsTemplate = createTemplate(obj.veraDesserts);

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
})();