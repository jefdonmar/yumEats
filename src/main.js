(function () {


// Blog JS Code for "Latest News" section

let blogUrl = 'https://json-data.herokuapp.com/restaurant/news/1';

let blogTemplate = _.template($('#blog-post').text());

let blogPromise = $.getJSON(blogUrl);

blogPromise.then( function(postInfo) {
  let blogInfo = blogTemplate(postInfo);
  $('#latest-news').append(blogInfo);
});

// Special JS Code for "Daily Special" section

let specialUrl = 'https://json-data.herokuapp.com/restaurant/special/1';

let specialPromise = $.getJSON(specialUrl);
let menuPromise = $.getJSON(menuUrl);

let arrMenu = [];
let specialId;
let specialMenuItem = {};

specialPromise.then( function(spObj){
  specialId = spObj.menu_item_id;
  return specialId;
});

menuPromise.then( function(obj){
	console.log(obj);
  Object.keys(obj).forEach(function(key) {
    arrMenu = arrMenu.concat(obj[key]);
  });

  specialMenuItem = _.findWhere(arrMenu, {id: specialId });

  let specialBlock = `
  <p>${ specialMenuItem.item }</p>
  <p>${ specialMenuItem.price }</p>
  <p>${ specialMenuItem.description }</p>`;

  console.log(specialBlock);

  $('#daily-special').append(specialBlock);

});

// ----------------- Isaac javaScript -------------------- //
	
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
	let prices = '';

	// Function to grab prices with multiple price selections
	arr.forEach(function(option) {
		
		if (option.price.cup) {
			prices =`
			<p class="priceCup">${ option.price.cup }</p>
			<p class="priceBowl">${ option.price.bowl }</p>`;
		} else if (option.price.small) {
			prices =`
			<p class="priceSmall">${ option.price.small }</p>
			<p class="priceLarge">${ option.price.large }</p>`;
		} else {
			prices = `${ option.price }`;
		}

	});


	// For each statement to add to menuBlock var
	arr.forEach(function(option) {
			menuBlock += `
			<div class="itemBlock">
				<h2 class="menuItem">${ option.item }</h2>
				<div class="dotted"></div>
				<p class="menuPrice">${ prices }</p>
				<p class="menuDes">${ option.description }</p>
				<ul>
					<li class="brandico-allergy"></li>
					<li class="brandico-favorite"></li>
					<li class="brandico-spicy"></li>
					<li class="brandico-vegan"></li>
				</ul>
			</div>`;
	});

	// Returnable var
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











