class Tooltips {
  constructor() {
    // Food assistance tooltip/callout
    $('#snap-callout').tooltip({
      position: {
        my: "left top+30", at: "center-65 bottom", collision: "flipfit",
        using: function( position, feedback ) {
          $(this).addClass(feedback.vertical).css( position);
        }
      },
      close: function (event, ui) {
        ui.tooltip.hover(
          function () {
            $(this).stop(true).fadeTo(400, 1);
          },
          function () {
            $(this).fadeOut("400", function () {
              $(this).remove();
            })
          }
        );
      },
      content: "<strong>What is SNAP? What is CalFresh? What determines eligibility?</strong>\
      <div style='margin: 10px 0;line-height: 1.3;'>\
        SNAP is the Supplemental Nutrition Assistance Program, which is funded\
        by the federal government and administered by the states. In California,\
        it's known as CalFresh. To qualify, individuals must make less than 130%\
        (200% in CA) of the Federal Poverty Level pre-tax AND less than 100% of\
        the poverty level after deductions. For a household of two, that's a\
        monthly income of $1,784 before taxes and $1,372 after deductions.<sup>[1]</sup>\
        The program provides a maximum of $353 per month for a household of two.\
        Funds are distributed via Electronic Benefit Transfer (EBT) cards that\
        look and function like a debit card.<sup>[2]</sup><sup>[3]</sup></div>\
      <div style='border-top: 1px solid #EFA44C; margin-top: 10px; padding-top: 10px; font-size: 12px;line-height:normal;'>\
        <div><sup>[1]</sup> USDA. 2018. <a href='https://fns-prod.azureedge.net/sites/default/files/snap/FY19-Income-Eligibility-Standards.pdf'>&quot;Supplemental Nutrition Assistance Program Fiscal Year 2019 Income Eligibility Standards.&quot;</a></div>\
        <div><sup>[2]</sup> US FNS. 2017. <a href='https://www.fns.usda.gov/snap/eligible-food-items'>&quot;What Can SNAP Buy?&quot;</a></div>\
        <div><sup>[3]</sup> CBPP. 2018. <a href='https://www.cbpp.org/research/food-assistance/a-quick-guide-to-snap-eligibility-and-benefits'>&quot;A Quick Guide to SNAP Eligibility and Benefits.&quot;</a></div>\
      </div>",
    });

    $('.footnote').tooltip({
      content: function () {
        return $(this).prop('title');
      },
      position: {
        my: "left-58 top+30", at: "center bottom", collision: "flipfit",
        using: function( position, feedback ) {
          $(this).addClass(feedback.vertical).addClass((feedback.element.left + 60 >= feedback.target.left ? 'left' : 'right')).css( position);
        }
      },
      close: function (event, ui) {
        ui.tooltip.hover(
          function () {
            $(this).stop(true).fadeTo(400, 1);
          },
          function () {
            $(this).fadeOut("400", function () {
              $(this).remove();
            })
          }
        );
      }
    });    
  }
}
