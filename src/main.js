(function () {

	
	// blah
	let menuUrl = "https://json-data.herokuapp.com/restaurant/menu/2";
	let promise = $.getJSON(menuUrl);
	console.log(promise);

	// blah
	promise.then (function (res) {
		console.log(res);
		doSomething(res); 
	}); 

	// blah
	let createTemplate = function(arr) {
		console.log(arr);
		let menuBlock = '';

		arr.forEach(function(option) {
      		menuBlock += `
      		<h2>${ option.item }</h2>
      		<p>${ option.description }</p>`;
    	});

		let finalTemp =`
			<div class="menuBreakfast">
				${menuBlock}
			</div>
		`;
		return finalTemp;
	}; 
 	
 	// blah
 	let doSomething = function (obj) {
 		let breakfastTemplate = createTemplate(obj.breakfast);
 		let dessertsTemplate = createTemplate(obj.desserts);
 		let drinksTemplate = createTemplate(obj.drinks);

 		console.log(breakfastTemplate);

 			$('.menu').append(breakfastTemplate);
 			$('.menu').append(dessertsTemplate);
			$('.menu').append(drinksTemplate);

 	}; 


}());
