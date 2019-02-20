class Navigation {
  constructor() {
    this.scrolling = false;
    this.header = $('header');
    this.nav = $('nav');
    this.headerHeight = this.header.height();
    this.navHeight = this.nav.height();
    this.previousTop = 0;
    this.scrollDelta = 20;
    this.navColorOffset = $('section#instability').offset().top - 140;
    this.navStickyOffset = $('div#intro-content').offset().top - this.headerHeight - 70;

    var outerThis = this;

    // Scroll-tip in top section
    $('.scroll-tip').click(function() {
      var goTo =  $('div#intro-content').position().top - outerThis.headerHeight;
      $("html, body").stop().animate({ scrollTop: goTo }, 1500, function() {
        outerThis.header.removeClass('is-hidden');
      });
    });

    // Links inside content
    $('.scroll-link').click(function(e){
      e.preventDefault();
      var hash = $(this).attr('href').split('#')[1];
      var goTo =  $('section#'+ hash).position().top - outerThis.headerHeight;
      $("html, body").stop().animate({ scrollTop: goTo }, 1500, function() {
        outerThis.header.removeClass('is-hidden');
      });
    });

    // open primary navigation on mobile
    this.header.on('click', '.nav-trigger', function(event){
      event.preventDefault();
      outerThis.nav.toggleClass('nav-open');
    });

    // Set nav behavior based on window size, on load and resize
    $(window).on('DOMContentLoaded load resize', function () {
      if ($(window).innerWidth() <= 768) {
        // Remove the smint plugin in favor of a responsive nav
        outerThis.header.removeClass('smint');
        outerThis.header.removeClass('fxd');
        outerThis.header.removeAttr('style');

        // Click handler for the responsive nav items
        $('.nav-dropdown-item').on('click', function(e){
          e.preventDefault();
          var hash = $(this).attr('href').split('#')[1];
          var goTo =  $('section#'+ hash).offset().top - outerThis.headerHeight;
          $("html, body").stop().animate({ scrollTop: goTo }, 1500, function() {
            outerThis.header.removeClass('is-hidden');
          });
        });
      } else if(!outerThis.header.hasClass('smint')) {
        // The smint plugin takes care of single-page scrolling and tracking
        // the active section when we are using the full size nav
        outerThis.header.smint({
          'mySelector': 'section',
          'scrollSpeed' : 1500
        });
      }
    });

    // Reset heights and offsets on resize
    $(window).on('resize', function(){
      outerThis.headerHeight = outerThis.header.height();
      outerThis.navStickyOffset = $('div#intro-content').offset().top - outerThis.headerHeight - 70;
  	});

    // Change nav bar color and hide mobile nav on scroll
    $(window).on('scroll', function(){
      if( !outerThis.scrolling) {
        outerThis.scrolling = true;
        (!window.requestAnimationFrame)
          ? setTimeout($.proxy(outerThis.adjustHeader, outerThis), 250)
          : requestAnimationFrame($.proxy(outerThis.adjustHeader, outerThis));
      }
    });

    // Animate the intro background in and pulse the scroll button on load
    $(window).on("load", function() {
      $('div.intro-header-outer').animate({opacity: 1}, 1200, function() {
        $('div.intro-header-inner').animate({opacity: 1}, 1000, function() {
          $('div.scroll-tip').addClass("animated heartBeat long");
        });
      });
      outerThis.adjustHeader();
    });
  }

  adjustHeader() {
    if($(window).innerWidth() <= 768) {
      this.nav.removeClass('nav-open');
      this.autoHideHeader();
    }

    // This effects all screen sizes, it's just to color the nav differently
    if($(window).scrollTop() > this.navColorOffset) {
      this.nav.addClass("scrolled");
    } else {
      this.nav.removeClass("scrolled");
    }

    // This only effects smaller screens, and it causes the nav to change
    // from relative to fixed positioning
    if($(window).scrollTop() > this.headerHeight) {
      this.header.addClass('scrolled');
      $('body').addClass('scrolled');
    } else if ($(window).scrollTop() < this.headerHeight){
      this.header.removeClass('scrolled');
      $('body').removeClass('scrolled');
    }
    this.scrolling = false;
    this.headerHeight = this.header.height();
    this.navStickyOffset = $('div#intro-content').offset().top - this.headerHeight - 70;
  };

  autoHideHeader() {
    var currentTop = $(window).scrollTop();

    if (this.previousTop - currentTop > this.scrollDelta) {
      //if scrolling up...
      this.header.removeClass('is-hidden');
    } else if( currentTop - this.previousTop > this.scrollDelta && currentTop > this.headerHeight) {
      //if scrolling down...
      this.header.addClass('is-hidden');
      this.nav.removeClass('nav-open');
    }
    this.previousTop = currentTop;
    this.headerHeight = this.header.height();
    this.navStickyOffset = $('div#intro-content').offset().top - this.headerHeight - 70;
  };
}
