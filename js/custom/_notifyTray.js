$(document).ready(function() {
   if (getParameterByName('disableISIFooter') == 'true' || getParameterByName('isipaid') == 'true') {
      console.log("DISABLED: Sticky ISI Footer");
   } else {
      if (!($('.notifyTray.no-clone').length)) {
         var $stickyTray = $('.notifyTray').clone().addClass('is-sticky');
         var $placeholder = $('<div id="safetyInformation" class="js-notifyTrayPLaceholder"></div>');
         var toggleText = $('.notifyTray-toggleLink').text();

         $('.notifyTray').before($placeholder);
         $placeholder.before($stickyTray);

         $('.notifyTray-toggleLink').click(function() {
            var headerUtilHeight = parseInt($('.headerMain-util').outerHeight());
            var headerMainHeight = parseInt($('.headerMain-main').outerHeight());
            var notifyHeight = parseInt($('.notifyMain').outerHeight());
            var visibleHeader = getVisible('.headerMain-util') + getVisible('.headerMain-main') + getVisible('.notifyMain');
            var windowHeight = $(window).outerHeight();

            if ($('.notifyTray').hasClass('full')) {
               $('body').removeClass('noScroll');
               $('.notifyTray').removeClass('full').css('height', '');
               $(this).text(toggleText)
            } else {
               $('body').addClass('noScroll');
               $('.notifyTray').addClass('full').css('height', (windowHeight - visibleHeader) + 'px');
               $(this).text('Close');
            }
         });

         $(window).scroll(function() {
            if (isScrolledIntoView('.js-notifyTrayPLaceholder', 170)) {
               $stickyTray.hide();
            } else {
               $stickyTray.show();
            }
         });
      }
   }
});

function isScrolledIntoView(elem, padding) {
   var docViewTop = $(window).scrollTop();
   var docViewBottom = docViewTop + $(window).height() - padding;
   var elemTop = $(elem).offset().top;
   return ((elemTop <= docViewBottom));
}

function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
