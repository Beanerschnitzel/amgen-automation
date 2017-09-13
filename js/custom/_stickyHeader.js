
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

$(document).ready(function() {





   var mql = window.matchMedia('(min-width: 768px)');

   function stickyHeader() {
	   var headerHeight = $('.headerMain').outerHeight();


      if (getParameterByName('disableStickyMenu') == 'true') {
         console.log("DISABLED: Sticky Menu");
      }
      else{
      	   
         $(window).on('scroll.mql', function() {
            var scroll = getCurrentScroll();
            var stickHeight = $('#pageTop').offset().top + $('.headerMain').outerHeight() + 50;
            if (scroll >= stickHeight) {
               $('body').addClass('header-sticky');
               $('main').css("padding-top", headerHeight);
            } else {
               $('body').removeClass('header-sticky');
               $('main').css("padding-top", '');
            }
         });
      }


   }

   function getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
   }

   function resetIt() {
      $(window).off('scroll.mql');
      $('body').removeClass('header-sticky');
      $('main').css("padding-top", '');
   }

   function screenSize(mql) {
      if (mql.matches) {
         stickyHeader();
      } else {
         resetIt();
      }
   }

   // Handle media query 'change' event
   mql.addListener(screenSize);
   screenSize(mql);
});