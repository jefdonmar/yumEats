(function () {
/////////////////////////////////////////////////////////////
// ----------------- Isaac javaScript -------------------- //
/////////////////////////////////////////////////////////////
	
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
			<p class="priceCup">cup:$${ option.price.cup } </p>
			<p class="priceBowl">bowl:$${ option.price.bowl }</p>`;
		} else if (option.price.small) {
			prices =`
			<p class="priceSmall">sm:$${ option.price.small } </p>
			<p class="priceLarge">lg:$${ option.price.large }</p>`;
		} else {
			prices = `$${ option.price }`;
		}

	});


	// For each statement to add to menuBlock var
	arr.forEach(function(option) {
			menuBlock += `
			<div class="itemBlock">
				<div class="blockLeft">
					<h2 class="menuItem">${ option.item }</h2>
					<p class="menuDes">~ ${ option.description }</p>
				</div>
				<div class="blockRight">
					<p class="menuPrice">${ prices }</p>
					<div class="menuIcons">
					  <i class="fa fa-exclamation-circle"><div class="exclamationHover"><h2>Food Allergies</h2><p>Click <a href="#">HERE</a> for the list of ingredients.</p></div></i>
					  <i class="fa fa-star"><div class="starHover"><h2>Favorite</h2><button href="#">Add to Favorites</button></div></i>
					  <i class="fa fa-fire"><div class="fireHover"><h2>Spicy</h2><p>Click <a href="#">HERE</a> for spice level!</p></div></i>
					  <i class="fa fa-vimeo"><div class="vimeoHover"><h2>Vegan</h2><p>Eat more bacon...Seriously.</p></div></i>
					</div>
				</div>
				
				
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

/////////////////////////////////////////////////////////////
// ----------------- Cori's javaScript ------------------- //
/////////////////////////////////////////////////////////////

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
  Object.keys(obj).forEach(function(key) {
    arrMenu = arrMenu.concat(obj[key]);
  });

  specialMenuItem = _.findWhere(arrMenu, {id: specialId });

  let specialBlock = `
	  <img class='special-food' src='../images/nuggets.jpg'>
	  <div class='special-text'>
	  	<p class='special-item'>${ specialMenuItem.item }</p>
	  	<p class='special-price'>$${ specialMenuItem.price }</p>
	  	<p class='special-des'>${ specialMenuItem.description }</p>
	  </div>`;

  $('#daily-special').append(specialBlock);

});

// Flickr API to have images load on side (cori)

let flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6ba403d8e91a4b5aafeb28027c5a7542&photoset_id=72157659986712021&user_id=135399936%40N08&format=json&nojsoncallback=1&auth_token=72157659992342092-738c02df2d137139&api_sig=4ea4c9aaf148a9f45bfe5774a803c005';

let flickrPromise = $.getJSON(flickrUrl);
let photoInfo = {};

let photoLink1;
let photoLink2;
let photoLink3;
let photoLink4;

flickrPromise.then( function(object){

	photoInfo = object.photoset;

	console.log(photoInfo);

	photoLink1 = 'https://farm' + photoInfo.photo[0].farm + '.staticflickr.com' + '/' + photoInfo.photo[0].server + '/' + photoInfo.photo[0].id + '_' + photoInfo.photo[0].secret + '_n.jpg';

	photoLink2 = 'https://farm' + photoInfo.photo[1].farm + '.staticflickr.com' + '/' + photoInfo.photo[1].server + '/' + photoInfo.photo[1].id + '_' + photoInfo.photo[1].secret + '_n.jpg';

	photoLink3 = 'https://farm' + photoInfo.photo[2].farm + '.staticflickr.com' + '/' + photoInfo.photo[2].server + '/' + photoInfo.photo[2].id + '_' + photoInfo.photo[2].secret + '_n.jpg';

	photoLink4 = 'https://farm' + photoInfo.photo[3].farm + '.staticflickr.com' + '/' + photoInfo.photo[3].server + '/' + photoInfo.photo[3].id + '_' + photoInfo.photo[3].secret + '_n.jpg';

	$('#foodPhoto1').attr('src', photoLink1);
	$('#foodPhoto2').attr('src', photoLink2);
	$('#foodPhoto3').attr('src', photoLink3);
	$('#foodPhoto4').attr('src', photoLink4);

});


// Tab JS Code (cori)

$('.tab1').on('click', function(){
	$('.tab1').toggleClass('clicked');
	$('.tab2').removeClass('clicked');
	$('.tab3').removeClass('clicked');
	$('.tab4').removeClass('clicked');
	$('.tabLink1').removeClass('close').addClass('open');
	$('.tabLink2').removeClass('open').addClass('close');
	$('.tabLink3').removeClass('open').addClass('close');
	$('.tabLink4').removeClass('open').addClass('close');
});

$('.tab2').on('click', function(){
	$('.tab2').toggleClass('clicked');
	$('.tab1').removeClass('clicked');
	$('.tab3').removeClass('clicked');
	$('.tab4').removeClass('clicked');
	$('.tabLink2').removeClass('close').addClass('open');
	$('.tabLink1').removeClass('open').addClass('close');
	$('.tabLink3').removeClass('open').addClass('close');
	$('.tabLink4').removeClass('open').addClass('close');
});

$('.tab3').on('click', function(){
	$('.tab3').toggleClass('clicked');
	$('.tab1').removeClass('clicked');
	$('.tab2').removeClass('clicked');
	$('.tab4').removeClass('clicked');
	$('.tabLink3').removeClass('close').addClass('open');
	$('.tabLink1').removeClass('open').addClass('close');
	$('.tabLink2').removeClass('open').addClass('close');
	$('.tabLink4').removeClass('open').addClass('close');
});

$('.tab4').on('click', function(){
	$('.tab4').toggleClass('clicked');
	$('.tab1').removeClass('clicked');
	$('.tab2').removeClass('clicked');
	$('.tab3').removeClass('clicked');
	$('.tabLink4').removeClass('close').addClass('open');
	$('.tabLink2').removeClass('open').addClass('close');
	$('.tabLink3').removeClass('open').addClass('close');
	$('.tabLink1').removeClass('open').addClass('close');
});

}());











