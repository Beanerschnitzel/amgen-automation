//scroll effect to any internal anchor links to give visual feedback of where users are in the document and that they have not been taken to another page
$(document).ready(function() {
   var hash = window.location.hash;
   var $target = $(hash);

   if (hash) {
      $('html, body').stop().animate({
         'scrollTop': $target.offset().top - 75
      }, 0, 'swing', function() {
         $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 75
         }, 0, 'swing');
      });
   }
});

$(document).ready(function() {
   $('a[href*="#"]').on('click', function(e) {
      var hash = this.hash;
      var $target = $(hash);
      var currentPage = window.location.pathname;
      var targetPage = $(this).attr('href');

      currentPage = currentPage.substring(currentPage.lastIndexOf('/') + 1, currentPage.length);

      targetPage = targetPage.substring(targetPage.lastIndexOf('/'), targetPage.length);
      targetPage = targetPage.substring(0, targetPage.indexOf('#'));
      console.log(currentPage);
      console.log(targetPage);

      if (targetPage === currentPage || targetPage === "") {
         e.preventDefault();
         if ($(this).hasClass('scrollPadding')) {
            $('html, body').stop().animate({
               'scrollTop': $target.offset().top - 80
            }, 900, 'linear', function() {
               $('html, body').stop().animate({
                  'scrollTop': $target.offset().top - 80
               }, 200, 'linear');
            });
         } else {
            $('html, body').stop().animate({
               'scrollTop': $target.offset().top - 75
            }, 900, 'swing', function() {
               $('html, body').stop().animate({
                  'scrollTop': $target.offset().top - 75
               }, 200, 'swing');
            });
         }
      }
   });
});
