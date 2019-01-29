---
---

class QuoteExplorer {
  constructor() {
    this.quotes = {{site.data.quotes | jsonify}};

    var outerThis = this;
    $('div.quote-selector-arrow.left').click(function() {
      var contentId = this.id.split('-')[4];
      var activeTab = $('.quote-selector-tab.'+contentId+'.selected');
      var activeTabId = parseInt(activeTab.attr('id').split('-')[4]);
      var newTabId = outerThis.quotes[contentId].length - 1;
      if (activeTabId > 0) {
        newTabId = activeTabId - 1;
      }
      outerThis.selectQuote(contentId, newTabId);
    });
    $('div.quote-selector-arrow.right').click(function() {
      var contentId = this.id.split('-')[4];
      var activeTab = $('.quote-selector-tab.'+contentId+'.selected');
      var activeTabId = parseInt(activeTab.attr('id').split('-')[4]);
      var newTabId = 0;
      if (activeTabId < outerThis.quotes[contentId].length - 1) {
        newTabId = activeTabId + 1;
      }
      outerThis.selectQuote(contentId, newTabId);
    });
    $('div.quote-selector-tab').click(function() {
      var contentId = this.id.split('-')[3];
      var tabId = this.id.split('-')[4];
      outerThis.selectQuote(contentId, tabId);
    });
  }

  selectQuote(contentId, tabId) {
    $('#quote-content-'+contentId).html(this.quotes[contentId][tabId].quote);
    $('.quote-selector-tab.'+contentId).removeClass('selected');
    $('#quote-selector-tab-'+contentId+'-'+tabId).addClass('selected');
  };

}
