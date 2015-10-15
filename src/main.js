(function () {


// Blog JS Code for "Latest News" section

let blogUrl = 'https://json-data.herokuapp.com/restaurant/news/1';

let blogTemplate = _.template($('#blog-post').text());

let blogPromise = $.getJSON(blogUrl);

blogPromise.then( function(postInfo) {
  let blogInfo = blogTemplate(postInfo);
  $('.latest-news').append(blogInfo);
});

// Special JS Code for "Daily Special" section

let specialUrl = 'https://json-data.herokuapp.com/restaurant/special/1';
let specialTemplate = _.template($('#specials').text());

let specialPromise = $.getJSON(specialUrl);
let menuPromise = $.getJSON(menuUrl);


Promise.all([specialPromise, menuPromise]).then(function(object){

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
				<p>${ option.price.cup }</p>
				<p>${ option.price.bowl }</p>`;
			} else if (option.price.small) {
				prices =`
				<p>${ option.price.small }</p>
				<p>${ option.price.large }</p>`;
			} else {
				prices = `<p>${ option.price }</p>`;
			}

		});


		// For each statement to add to menuBlock var
		arr.forEach(function(option) {
      		menuBlock += `
      		<h2>${ option.item }</h2>
      		<p>${ option.description }</p>
      		<p>${ prices }</p>`;

      		console.log(menuBlock);
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


