//get visible height
function getVisible(elem) {
   var $el = $(elem),
      scrollTop = $(this).scrollTop(),
      scrollBot = scrollTop + $(this).height(),
      elTop = $el.offset().top,
      elBottom = elTop + $el.outerHeight(),
      visibleTop = elTop < scrollTop ? scrollTop : elTop,
      visibleBottom = elBottom > scrollBot ? scrollBot : elBottom,
      visibleHeight = visibleBottom - visibleTop;
   if (visibleHeight < 0) {
      visibleHeight = 0;
   }
   return visibleHeight;
}
