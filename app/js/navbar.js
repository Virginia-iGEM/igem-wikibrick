// Code courtesy of Jay Holtslander, https://codepen.io/j_holtslander/pen/doQggE

$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});
