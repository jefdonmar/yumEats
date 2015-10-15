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
let menuUrl = 'https://json-data.herokuapp.com/restaurant/menu/2';
let specialTemplate = _.template($('#specials').text());

let specialPromise = $.getJSON(specialUrl);
let menuPromise = $.getJSON(menuUrl);


Promise.all([specialPromise, menuPromise]).then(function(array){
  let specialStuff = array[0];
  let menuItems = array[1];
  console.log(array);
});



}());


