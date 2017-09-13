//nav bar toggles
//toggle main nav on sm screens

jQuery(document).ready(function($) {
  var mqlNavToggle = window.matchMedia("(max-width: 991px)");

  function toggleNav() {
    $('.headerMain-navMainToggle').on("click.mqlNavToggle", function(e) {
        e.preventDefault();
        //alert('crap');
        $(this).toggleClass('is-active');
        $('.headerMain-navMain').toggleClass('is-open');
    });
  }

  function resetIt() {
    $('.headerMain-navMainToggle').off("click.mqlNavToggle");
    $('.headerMain-navMainToggle').removeClass('is-active');
    $('.headerMain-navMain').removeClass('is-open');
  }

  function screenSize(mqlNavToggle) {
    if (mqlNavToggle.matches) {
      toggleNav();
    } else {
      resetIt();
    }
  }

  // Handle media query 'change' event
  mqlNavToggle.addListener(screenSize);
  screenSize(mqlNavToggle);
});
