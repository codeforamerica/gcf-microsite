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
    window.open("mailto:?subject=&body=A fresh look at the facts from Code for America: https://gcf-microsite.herokuapp.com/");
  };

  shareFacebook() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://gcf-microsite.herokuapp.com/");
  }

  shareTwitter() {
    window.open("https://twitter.com/intent/tweet?text= A fresh look at the facts from @codeforamerica&url=https://gcf-microsite.herokuapp.com/&hashtags=feedthepeople,civictech");
  }

}
