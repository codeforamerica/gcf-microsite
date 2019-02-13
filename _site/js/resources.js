class Resources {
  constructor() {
    var outerThis = this;
    $('div.resources-row').click(function() {
      var resourceId = this.id;
      outerThis.expandResourceDetail(resourceId);
    });
  }

  expandResourceDetail(resourceId) {
    if(!$('#resources-content-'+resourceId).is(":hidden")) {
      $('#resources-expander-'+resourceId).toggleClass('expanded');
      $('#resources-content-'+resourceId).slideUp();
    } else {
      $('.resources-expander').removeClass('expanded');
      $('#resources-expander-'+resourceId).addClass('expanded');
      $('.resources-content').each(function() {
        if(!$(this).is(":hidden")) {
          $(this).slideUp();
        }
      });
      $('#resources-content-'+resourceId).slideDown();
    }
  };
}
