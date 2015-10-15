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
  var specialTemplate = _.template($('#specials').text());

  var specialPromise = $.getJSON(specialUrl);
  var menuPromise = $.getJSON(menuUrl);

  Promise.all([specialPromise, menuPromise]).then(function (array) {
    var specialStuff = array[0];
    var menuItems = array[1];
    console.log(array);
  });
})();