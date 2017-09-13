$(document).ready(function() {
   $('.profile-content-right.roy .content').retach({
      destination: '.profile-content-container.roy',
      mediaQuery: 767,
   });
   $('.profile-content-right.brian .content').retach({
      destination: '.profile-content-container.brian',
      mediaQuery: 767,
   });
   $('.profile-content-right.connie .content').retach({
      destination: '.profile-content-container.connie',
      mediaQuery: 767,
   });
   $('.health-data.connie').retach({
      destination: '.health-data-placeholder.connie',
      mediaQuery: 767,
   });
   // $('section.sideBySide.first').retach({
   //    destination: '.sectionContent',
   //    prependAppend: 'prepend',
   //    mediaQuery: 991,
   // });
});



(function($) {
  $.fn.retach = function(options) {
    var defaults = {
      destination: 'body',
      mediaQuery: 1023,
      movedClass: 'is-moved',
      prependAppend: 'append'
    };
    var options = $.extend({}, defaults, options);

    var $items = this;
    var $destination = $(options.destination);
    var mediaQuery = options.mediaQuery;
    var movedClass = options.movedClass;
    var $prependAppend = options.prependAppend;

    var placeholderID = Math.floor((Math.random() * 10000) + 1) + Math.floor((Math.random() * 10000) + 1);
    var $placeholder = $('<i class="placeholder" data-placeholderID="' + placeholderID + '" />');

    function moveItems() {
      if ($('i[data-placeholderID="' + placeholderID + '"]').length <= 0) {
        $items.first().before($placeholder);
      }
      if (window.matchMedia("(max-width: " + mediaQuery + "px)").matches) {
        if ($prependAppend == 'append') {
          $destination.append($items);
        } else {
          $destination.prepend($items);
        }

        $items.addClass(movedClass);
      } else {
        $placeholder.after($items);
        $items.removeClass(movedClass);
      }
    }

    moveItems();
    $(window).resize(function() {
      moveItems();
    });
    return $items;
  }
}(jQuery));