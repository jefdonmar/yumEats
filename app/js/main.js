'use strict';

(function () {
	/////////////////////////////////////////////////////////////
	// ----------------- Isaac javaScript -------------------- //
	/////////////////////////////////////////////////////////////

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
				prices = '\n\t\t\t<p class="priceCup">cup:$' + option.price.cup + ' </p>\n\t\t\t<p class="priceBowl">bowl:$' + option.price.bowl + '</p>';
			} else if (option.price.small) {
				prices = '\n\t\t\t<p class="priceSmall">sm:$' + option.price.small + ' </p>\n\t\t\t<p class="priceLarge">lg:$' + option.price.large + '</p>';
			} else {
				prices = '$' + option.price;
			}
		});

		// For each statement to add to menuBlock var
		arr.forEach(function (option) {
			menuBlock += '\n\t\t\t<div class="itemBlock">\n\t\t\t\t<div class="blockLeft">\n\t\t\t\t\t<h2 class="menuItem">' + option.item + '</h2>\n\t\t\t\t\t<p class="menuDes">~ ' + option.description + '</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="blockRight">\n\t\t\t\t\t<p class="menuPrice">' + prices + '</p>\n\t\t\t\t\t<div class="menuIcons">\n\t\t\t\t\t  <i class="fa fa-exclamation-circle"><div class="exclamationHover"><h2>Food Allergies</h2><p>Click <a href="#">HERE</a> for the list of ingredients.</p></div></i>\n\t\t\t\t\t  <i class="fa fa-star"><div class="starHover"><h2>Favorite</h2><button href="#">Add to Favorites</button></div></i>\n\t\t\t\t\t  <i class="fa fa-fire"><div class="fireHover"><h2>Spicy</h2><p>Click <a href="#">HERE</a> for spice level!</p></div></i>\n\t\t\t\t\t  <i class="fa fa-vimeo"><div class="vimeoHover"><h2>Vegan</h2><p>Eat more bacon...Seriously.</p></div></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\n\t\t\t</div>';
		});

		// Returnable var
		var finalTemp = '\t\t\n\t\t' + menuBlock + '\t\t\t\n\t';

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

	/////////////////////////////////////////////////////////////
	// ----------------- Cori's javaScript ------------------- //
	/////////////////////////////////////////////////////////////

	// Blog JS Code for "Latest News" section

	var blogUrl = 'https://json-data.herokuapp.com/restaurant/news/1';

	var blogTemplate = _.template($('#blog-post').text());

	var blogPromise = $.getJSON(blogUrl);

	blogPromise.then(function (postInfo) {
		var blogInfo = blogTemplate(postInfo);
		$('#latest-news').append(blogInfo);
	});

	// Special JS Code for "Daily Special" section

	var specialUrl = 'https://json-data.herokuapp.com/restaurant/special/1';

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
		console.log(obj);
		Object.keys(obj).forEach(function (key) {
			arrMenu = arrMenu.concat(obj[key]);
		});

		specialMenuItem = _.findWhere(arrMenu, { id: specialId });

		var specialBlock = '\n\t  <img class=\'special-food\' src=\'../images/nuggets.jpg\'>\n\t  <div class=\'special-text\'>\n\t  \t<p class=\'special-item\'>' + specialMenuItem.item + '</p>\n\t  \t<p class=\'special-price\'>$' + specialMenuItem.price + '</p>\n\t  \t<p class=\'special-des\'>' + specialMenuItem.description + '</p>\n\t  </div>';

		$('#daily-special').append(specialBlock);
	});

	// Tab JS Code (cori and jeff)

	$('.tab1').on('click', function () {
		$('.tab1').toggleClass('clicked');
		$('.tab2').removeClass('clicked');
		$('.tab3').removeClass('clicked');
		$('.tab4').removeClass('clicked');
		$('.tabLink1').removeClass('close').addClass('open');
		$('.tabLink2').removeClass('open').addClass('close');
		$('.tabLink3').removeClass('open').addClass('close');
		$('.tabLink4').removeClass('open').addClass('close');
	});

	$('.tab2').on('click', function () {
		$('.tab2').toggleClass('clicked');
		$('.tab1').removeClass('clicked');
		$('.tab3').removeClass('clicked');
		$('.tab4').removeClass('clicked');
		$('.tabLink2').removeClass('close').addClass('open');
		$('.tabLink1').removeClass('open').addClass('close');
		$('.tabLink3').removeClass('open').addClass('close');
		$('.tabLink4').removeClass('open').addClass('close');
	});

	$('.tab3').on('click', function () {
		$('.tab3').toggleClass('clicked');
		$('.tab1').removeClass('clicked');
		$('.tab2').removeClass('clicked');
		$('.tab4').removeClass('clicked');
		$('.tabLink3').removeClass('close').addClass('open');
		$('.tabLink1').removeClass('open').addClass('close');
		$('.tabLink2').removeClass('open').addClass('close');
		$('.tabLink4').removeClass('open').addClass('close');
	});

	$('.tab4').on('click', function () {
		$('.tab4').toggleClass('clicked');
		$('.tab1').removeClass('clicked');
		$('.tab2').removeClass('clicked');
		$('.tab3').removeClass('clicked');
		$('.tabLink4').removeClass('close').addClass('open');
		$('.tabLink2').removeClass('open').addClass('close');
		$('.tabLink3').removeClass('open').addClass('close');
		$('.tabLink1').removeClass('open').addClass('close');
	});
})();