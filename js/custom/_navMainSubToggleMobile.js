//toggle search on lg screens

jQuery(document).ready(function($) {
  var mqlSubToggle = window.matchMedia("(max-width: 991px)");

  function toggleSub() {
    $('.headerMain-navMainLink.hasChildren').on("click.mqlSubToggle", function(e) {
        e.preventDefault();
      if (!$(this).closest('.headerMain-navMainItem').hasClass('is-open')) {
        $('.headerMain-navMainItem').removeClass('is-open');
        $(this).closest('.headerMain-navMainItem').addClass('is-open');
      } else {
        $('.headerMain-navMainItem').removeClass('is-open');
      }

    });
  }

  function resetIt() {
    $('.headerMain-navMainLink').off("click.mqlSubToggle");
    $('.headerMain-navMainItem').removeClass('is-open');
  }

  function screenSize(mqlSubToggle) {
    if (mqlSubToggle.matches) {
      toggleSub();
    } else {
      resetIt();
    }
  }

  // Handle media query 'change' event
  mqlSubToggle.addListener(screenSize);
  screenSize(mqlSubToggle);
});
