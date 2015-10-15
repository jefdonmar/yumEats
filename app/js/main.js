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
})();