---
---

class Myths {
  constructor() {

    var outerThis = this;
    $('div.myth-summary').click(function() {
      var mythId = this.id.split('-')[2];
      outerThis.expandMythDetail(mythId);
    });
  }

  expandMythDetail(mythId) {
    if(!$('#myth-detail-'+mythId).is(":hidden")) {
      $('#myth-expander-'+mythId).toggleClass('expanded');
      $('#myth-detail-'+mythId).slideUp();
    } else {
      $('.myth-expander').removeClass('expanded');
      $('#myth-expander-'+mythId).addClass('expanded');
      $('.myth-detail').each(function() {
        if(!$(this).is(":hidden")) {
          $(this).slideUp();
        }
      });
      $('#myth-detail-'+mythId).slideDown();
    }
  };

  nert(mythId) {
    $('.myth-expander').removeClass('expanded');
    $('#myth-expander-'+mythId).addClass('expanded');
    $('.myth-detail').each(function() {
      if(!$(this).is(":hidden")) {
        $('#myth-detail-'+mythId).slideUp();
      }
    });
    $('#myth-detail-'+mythId).slideDown();
  };

}
