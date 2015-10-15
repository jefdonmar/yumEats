'use strict';

(function () {

	// blah
	var menuUrl = "https://json-data.herokuapp.com/restaurant/menu/2";
	var promise = $.getJSON(menuUrl);
	console.log(promise);

	// blah
	promise.then(function (res) {
		console.log(res);
		doSomething(res);
	});

	// blah
	var createTemplate = function createTemplate(arr) {
		console.log(arr);
		var menuBlock = '';

		arr.forEach(function (option) {
			menuBlock += '\n      \t\t<h2>' + option.item + '</h2>\n      \t\t<p>' + option.description + '</p>';
		});

		var finalTemp = '\n\t\t\t<div class="menuBreakfast">\n\t\t\t\t' + menuBlock + '\n\t\t\t</div>\n\t\t';
		return finalTemp;
	};

	// blah
	var doSomething = function doSomething(obj) {
		var breakfastTemplate = createTemplate(obj.breakfast);
		var dessertsTemplate = createTemplate(obj.desserts);
		var drinksTemplate = createTemplate(obj.drinks);

		console.log(breakfastTemplate);

		$('.menu').append(breakfastTemplate);
		$('.menu').append(dessertsTemplate);
		$('.menu').append(drinksTemplate);
	};
})();