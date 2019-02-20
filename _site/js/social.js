class Social {

  constructor() {
    // Sharing Widget
    $('div.share-menu').click(function() {
      if ($('div.share-menu').hasClass('open')) {
        $('div.share-menu').removeClass('open');
        $('div.share-menu').addClass('closed');
      } else {
        $('div.share-menu').removeClass('closed');
        $('div.share-menu').addClass('open');
      }
    })

    var outerThis = this;
    $('div.share-menu-icon.facebook').click(function() {
      outerThis.shareFacebook();
    })
    $('div.share-menu-icon.twitter').click(function() {
      outerThis.shareTwitter();
    })
    $('div.share-menu-icon.email').click(function() {
      outerThis.shareEmail();
    })

    // Sharing in Footer
    $('img#footer-share-facebook').click(function() {
      outerThis.shareFacebook();
    })
    $('img#footer-share-twitter').click(function() {
      outerThis.shareTwitter();
    })
    $('img#footer-share-email').click(function() {
      outerThis.shareEmail();
    })
  }

  shareEmail() {
    window.open("mailto:?subject=&body=Help Code for America change the narrative. Read stories directly from GetCalFresh users and see why Californians need food assistance: https://snapstories.codeforamerica.org/");
  };

  shareFacebook() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://snapstories.codeforamerica.org/");
  }

  shareTwitter() {
    window.open("https://twitter.com/intent/tweet?text=Help @codeforamerica change the narrative. Read stories directly from #GetCalFresh users and see why Californians need food assistance&url=https://snapstories.codeforamerica.org/&hashtags=SNAPworks");
  }

}
