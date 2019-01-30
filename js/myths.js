---
---

class Myths {
  constructor() {

    var outerThis = this;
    $('div.myth-expander').click(function() {
      var mythId = this.id.split('-')[2];
      outerThis.toggleMythDetail(mythId);
    });
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
