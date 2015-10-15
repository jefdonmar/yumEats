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
  <p>${ specialMenuItem.item }</p>
  <p>${ specialMenuItem.price }</p>
  <p>${ specialMenuItem.description }</p>`;

  $('.daily-special').append(specialBlock);

});




}());











