class Myths {
  constructor() {

    var outerThis = this;
    $('div.myth-expander').click(function() {
      var mythId = this.id.split('-')[2];
      outerThis.toggleMythDetail(mythId);
    });

    $('div.myth-expander').hover(
      function() {
        var mythId = this.id.split('-')[2];
        outerThis.highlightMyth(mythId);
      },
      function() {
        var mythId = this.id.split('-')[2];
        outerThis.dehighlightMyth(mythId);
      });
    }

  highlightMyth(mythId) {
      $('#myth-summary-'+mythId).addClass('hovered');
  }

  dehighlightMyth(mythId) {
      $('#myth-summary-'+mythId).removeClass('hovered');
  }

  toggleMythDetail(mythId) {
    $('#myth-expander-'+mythId).toggleClass('expanded');
    if($('#myth-detail-'+mythId).is(":hidden")) {
      $('#myth-detail-'+mythId).slideDown();
    } else {
      $('#myth-detail-'+mythId).slideUp();
    }
  };

}
