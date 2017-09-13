$(document).ready(function() {
   $('.notifyMain-copy').truncateText({
      lengthLg: 300,
      lengthMed: 200,
      lengthSm: 120,
      toggleText: "Read More"
   });


   $('.notifyMain-close').click(function(event) {
      event.preventDefault();
      $(this).closest('.notifyMain').addClass('is-closed');
   });

   $(window).scroll(function() {
      if (!$('.notifyMain').hasClass('is-closed') && $(this).scrollTop() > 10) {
         $('.notifyMain').addClass('is-closed')
      }
   });
});


(function($) {
   $.fn.truncateText = function(opts) {
      var defaults = {
         lengthSm: 50,
         lengthMed: 100,
         lengthLg: 150,
         breakSm: 500,
         breakLg: 850,
         toggleText: "Show"
      };
      var options = $.extend({}, defaults, opts);

      var $containers = this;

      var visibleLegnthEffective;
      var visibleLegnthSm = options.lengthSm;
      var visibleLegnthMed = options.lengthMed;
      var visibleLegnthLg = options.lengthLg;

      var breakSm = options.breakSm;
      var breakLg = options.breakLg;

      var toggleText = options.toggleText;

      var firstRun = true;

      initialize();

      $(window).on('resize orientationchange', function() {
         unwrap();
      });

      function unwrap() {
         $containers.each(function() {
            $(this).find('.ellipse').remove();
            $(this).find('.showToggle').click().remove();
            $(this).html($(this).attr('data-original'));
            $(this).css('max-height', '');
         });
         initialize();
      }

      function initialize() {
         if (window.matchMedia("(max-width:" + breakSm + "px)").matches) {
            visibleLegnthEffective = visibleLegnthSm;
         } else if (window.matchMedia("(max-width:" + breakLg + "px)").matches) {
            visibleLegnthEffective = visibleLegnthMed;
         } else {
            visibleLegnthEffective = visibleLegnthLg;
         }
         wireUp();
      }

      function wireUp() {
         //loop through each container and wire up indiviually 
         $containers.each(function() {
            var $container = $(this);
            var fullHeight = $container.outerHeight();
            var truncHeight;
            var originalHtml = $container.html();
            var originalText = $container.text();
            var truncatedText = $(originalHtml.substring(0, visibleLegnthEffective));
            var $showMore = $('<a class="showToggle" style="margin-left:5px;font-weight:bold;cursor:pointer;">' + toggleText + '</a>' + '<i class="colorBrandBlue fa-chevron-right ml-1">' + '</i>')

            truncatedText.append($('<i class="ellipse">...</i>')).append($showMore);
            $container.html(truncatedText);

            truncHeight = $container.outerHeight();

            $container.attr('data-maxHeight', fullHeight);
            $container.attr('data-minHeight', truncHeight);
            $container.attr('data-original', originalHtml);

            $container.css('max-height', $(this).attr('data-minHeight') + 'px');

            //add show event to generated toggle buttons
            $showMore.click(function() {
               $container.css('max-height', $container.attr('data-maxHeight') + 'px');
               $container.html(originalHtml);
            });
            $('.openNotifyMain').click(function(e) {
               e.preventDefault();
                              $container.css('max-height', $container.attr('data-maxHeight') + 'px');
               $container.html(originalHtml);

               if ($('.notifyMain').hasClass('is-closed')) {
                  $('.notifyMain').hide().removeClass('is-closed').slideDown(250);
               }
            });
            return $container;
         });
      }
      return $containers;
   };
}(jQuery));


/*! js-cookie v2.1.3 | MIT */
!function(a){var b=!1;if("function"==typeof define&&define.amd&&(define(a),b=!0),"object"==typeof exports&&(module.exports=a(),b=!0),!b){var c=window.Cookies,d=window.Cookies=a();d.noConflict=function(){return window.Cookies=c,d}}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if("undefined"!=typeof document){if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(i){}return e=c.write?c.write(e,b):encodeURIComponent(e+"").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(b+""),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=b+"="+e+(f.expires?"; expires="+f.expires.toUTCString():"")+(f.path?"; path="+f.path:"")+(f.domain?"; domain="+f.domain:"")+(f.secure?"; secure":"")}b||(g={});for(var j=document.cookie?document.cookie.split("; "):[],k=/(%[0-9A-Z]{2})+/g,l=0;l<j.length;l++){var m=j[l].split("="),n=m.slice(1).join("=");'"'===n.charAt(0)&&(n=n.slice(1,-1));try{var o=m[0].replace(k,decodeURIComponent);if(n=c.read?c.read(n,o):c(n,o)||n.replace(k,decodeURIComponent),this.json)try{n=JSON.parse(n)}catch(i){}if(b===o){g=n;break}b||(g[o]=n)}catch(i){}}return g}}return d.set=d,d.get=function(a){return d.call(d,a)},d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b(function(){})});



$(document).ready(function() {
   if (Cookies.get('indicationsTrayVisibility') !== "closedTray") {
      // create Indication Tray
      $('.notifyMain').removeClass('is-closed');
      $('.notifyMain').slideDown();
      var expiresDate = new Date();
      var minutes = 720; // 12 hours
      expiresDate.setTime(expiresDate.getTime() + (minutes * 60 * 1000));
      Cookies.set('indicationsTrayVisibility', "closedTray", { expires: expiresDate, path: '/' });
   }

});
