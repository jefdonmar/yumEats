'use strict';

(function () {

	// Blog JS Code for "Latest News" section

	var blogUrl = 'https://json-data.herokuapp.com/restaurant/news/1';

	var blogTemplate = _.template($('#blog-post').text());

	var blogPromise = $.getJSON(blogUrl);

	blogPromise.then(function (postInfo) {
		var blogInfo = blogTemplate(postInfo);
		$('.latest-news').append(blogInfo);
	});

	// Special JS Code for "Daily Special" section

  var specialUrl = 'https://json-data.herokuapp.com/restaurant/special/1';
  var menuUrl = 'https://json-data.herokuapp.com/restaurant/menu/2';


	var specialPromise = $.getJSON(specialUrl);
	var menuPromise = $.getJSON(menuUrl);

  var arrMenu = [];
  var specialId = undefined;
  var specialMenuItem = {};

  specialPromise.then(function (spObj) {
    specialId = spObj.menu_item_id;
    return specialId;
  });

  menuPromise.then(function (obj) {

    Object.keys(obj).forEach(function (key) {
      arrMenu = arrMenu.concat(obj[key]);
    });

    specialMenuItem = _.findWhere(arrMenu, { id: specialId });

    var specialBlock = '\n  <p>' + specialMenuItem.item + '</p>\n  <p>' + specialMenuItem.price + '</p>\n  <p>' + specialMenuItem.description + '</p>';

    $('.daily-special').append(specialBlock);
  });

	// ----------------- Isaac javaScript -------------------- //

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
		var prices = '';

		// Function to grab prices with multiple price selections
		arr.forEach(function (option) {

			if (option.price.cup) {
				prices = '\n\t\t\t\t<p>' + option.price.cup + '</p>\n\t\t\t\t<p>' + option.price.bowl + '</p>';
			} else if (option.price.small) {
				prices = '\n\t\t\t\t<p>' + option.price.small + '</p>\n\t\t\t\t<p>' + option.price.large + '</p>';
			} else {
				prices = '<p>' + option.price + '</p>';
			}
		});

		// For each statement to add to menuBlock var
		arr.forEach(function (option) {
			menuBlock += '\n      \t\t<h2>' + option.item + '</h2>\n      \t\t<p>' + option.description + '</p>\n      \t\t<p>' + prices + '</p>';

			console.log(menuBlock);
		});

		// Returnable var
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