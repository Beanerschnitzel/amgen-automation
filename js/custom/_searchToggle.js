//toggle search on lg screens

jQuery(document).ready(function($) {
  var mql = window.matchMedia("(min-width: 768px)");

  function toggleSearch() {
    $('.headerMain-searchToggle').on("click.mql", function() {
      if (!$('.headerMain').hasClass('search-open')) {
        $('.headerMain').addClass('search-open');
        $('.headerMain-searchBox').focus();
      } else {
        $('.headerMain').removeClass('search-open');
        $('.headerMain-searchBox').blur();
      }
    });
  }

  function resetIt() {
    $('.headerMain-searchToggle').off("click.mql");
    $('.headerMain').removeClass('search-open');
  }

  function screenSize(mql) {
    if (mql.matches) {
      toggleSearch();
    } else {
      resetIt();
    }
  }

  // Handle media query 'change' event
  mql.addListener(screenSize);
  screenSize(mql);
});
