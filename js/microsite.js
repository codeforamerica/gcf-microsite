---
---
var gcf = gcf || {};

gcf.MapboxMap = function () {
  this.accessToken = 'pk.eyJ1IjoiY29kZWZvcmFtZXJpY2EiLCJhIjoiY2pyaGVyajRuMXhyaTQ5bHB3NGRyZ2RoMCJ9.htgeitsLNNPzgqxd973OqQ';
  this.activeQuoteIndex = 0;
  this.activeTab = 'stats';
  this.container = 'california-map';
  this.hoveredCounty =  null;
  this.selectedCounty = null;
  this.style = 'mapbox://styles/codeforamerica/cjrhm3dtk7kla2spjq690i1sk';

  this.countyGeoData = {{site.data.county_geo | jsonify}};
  this.countyGcfData = {{site.data.county_info | jsonify}};

  this.map = this.drawMap();
  this.map.addControl(new mapboxgl.NavigationControl({
    showCompass: false
  }));
  var outerThis = this;
  this.map.on("load", function(){
    outerThis.drawCounties(this.map);
  });
};

gcf.MapboxMap.prototype.drawMap = function () {
  const bounds =  new mapboxgl.LngLatBounds(
    [-124.48200988, 31.52952194],
    [-114.13077545, 43.00950241]);

  mapboxgl.accessToken = this.accessToken;
  return new mapboxgl.Map({
    attributionControl: false,
    center: [-122.4194, 37.7749],
    container: this.container,
    logoPosition: 'top-right',
    maxBounds: bounds,
    maxZoom: 10,
    style: this.style,
    zoom: 6,
  });
};

gcf.MapboxMap.prototype.drawCounties = function () {
  var layers = this.map.getStyle().layers;
  // Find the index of the first symbol layer in the map style
  var firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId = layers[i].id;
      break;
    }
  }

  //Defining the map source
  this.map.addSource("counties", {type: "geojson", data: this.countyGeoData});

  // Map outline, below the map
  this.map.addLayer({
    id: "county-borders",
    type: "line",
    source: "counties",
    layout: {},
    paint: {
      "line-color": ["case",
                       ["boolean", ["get", "is_gcf"], false],
                       "#000000", "#000000"],
      "line-width": 0.5
    }
  }, firstSymbolId)

  // Map fill (selected county)
  this.map.addLayer({
    id: "county-selection-fills",
    type: "fill",
    source: "counties",
    layout: {},
    paint: {
      "fill-color": "#EFA44C",
      "fill-opacity": ["case",
                       ["boolean", ["feature-state", "selected"], false],
                       1, 0]
    }
  }, "county-borders")

  // Map fill (hovered county)
  this.map.addLayer({
    id: "county-hover-fills",
    type: "fill",
    source: "counties",
    layout: {},
    paint: {
      "fill-color": "#F5D0A5",
      "fill-opacity": ["case",
                       ["boolean", ["feature-state", "hover"], false],
                       1, 0]
    }
  }, "county-selection-fills")

  // Map fill: highlight GCF Counties
  this.map.addLayer({id: "is-gcf-fill",
                     type: "fill",
                     source: "counties",
                     layout: {},
                     paint: {"fill-color": "#FFFFFF",
                             "fill-opacity": ["case",
                                              ["boolean", ["get", "is_gcf"], false],
                                              1, 0]
                            }
                    }, "county-hover-fills");

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  var outerThis = this;
  this.map.on("mousemove", "county-hover-fills", function(e) {
    if (e.features.length > 0) {
      if (outerThis.hoveredCounty) {
        outerThis.map.setFeatureState({source: 'counties', id: outerThis.hoveredCounty}, { hover: false});
      }
      outerThis.hoveredCounty = e.features[0].id;
      outerThis.map.setFeatureState({source: 'counties', id: outerThis.hoveredCounty}, { hover: true});
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  this.map.on("mouseleave", "county-hover-fills", function() {
    if (outerThis.hoveredCounty) {
      outerThis.map.setFeatureState({source: 'counties', id: outerThis.hoveredCounty}, { hover: false});
    }
    outerThis.hoveredCounty =  null;
  });

  // Click handler
  this.map.on("click", "county-selection-fills", this.selectCounty.bind(this))

  this.selectCountyInMap('San Francisco');
}

gcf.MapboxMap.prototype.selectCountyInMap = function (countyName) {
  for(var i = 0; i < this.countyGeoData.features.length; i++) {
    var feature = this.countyGeoData.features[i];
    if (feature.properties.name === countyName) {
      var countyData = this.countyGcfData[countyName];
      this.map.flyTo({
        center:countyData.center,  zoom: 6, speed: 0.5, curve: 1
      });
      this.selectCounty({'features':[feature]});
    }
  }
};

gcf.MapboxMap.prototype.selectCounty = function(selection) {
  const feature = selection.features[0]
  const countyName = feature.properties.name
  const countyId = feature.id

  // highlight county
  if (this.selectedCounty !== null) {
    this.map.setFeatureState(
      {source: "counties", id: this.selectedCounty},
      {selected: false}
    )
  }
  this.selectedCounty = countyId
  this.map.setFeatureState(
    {source: "counties", id: countyId},
    {selected: true}
  )

  this.updateMapInfo(countyName);
};

gcf.MapboxMap.prototype.updateMapInfo = function(countyName) {
	var countyData = this.countyGcfData[countyName];
	var hasGetCalFreshData = countyData.hasOwnProperty("number-apps");
	var hasQuotes = countyData['quotes'].length > 0;
  var countyNames = Object.keys(this.countyGcfData).sort();

  // Setup the select box for Counties
  var countySelect = $("<select id='county-select'></select>");
  $.each(countyNames, function(val, text) {
    countySelect.append($('<option></option>').attr("selected", countyName === text).val(text).html(text));
  });
  var countySelectContainer = $("<div class='select'></div>");
  countySelectContainer.append(countySelect);
  $('div.map-info').html(countySelectContainer);

  // Setup the tab and content containers with the details tab that will
	// always be present.
	$('div.map-info').append(
		"<div class='county-details'>" +
		"<div class='county-details-tabs'>" +
		"<div class='county-details-tab' id='stats-tab'>" +
		"County Statistics" +
		"</div>" +
		"</div>" +
		"<div class='county-details-content'>" +
		"</div>" +
		"</div>"
	);

	// Insert tab for quotes if there is at least one to display
	if (hasQuotes) {
		$('div.county-details-tabs').append(
			"<div class='county-details-tab' id='stories-tab'>Stories of CalFresh</div>"
		);
	}

	// Build the stats content and add it if that tab is active or the only tab
	if(!hasQuotes || this.activeTab == 'stats') {
		$('#stats-tab').addClass('selected');

		// Every county always has these basic stats
		$('div.county-details-content').html(
			"<div class='county-details-stats'>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Population</div>" +
			"<div class='county-details-stat-number'>" + countyData["population"].toLocaleString("en", {style: "decimal"}) + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Poverty rate</div>" +
			"<div class='county-details-stat-number'>" + countyData["poverty-rate"] + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Median family income</div>" +
			"<div class='county-details-stat-number'>" + countyData["median-income"].toLocaleString("en", {style: "currency", currency: "USD", maximumFractionDigits: 0, minimumFractionDigits: 0}) + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Min income for cost of living<div class='county-details-stat-desc'>2 adults, 2 children</div></div>" +
			"<div class='county-details-stat-number'>" + countyData["minimum-cost-living-family"].toLocaleString("en", {style: "currency", currency: "USD", maximumFractionDigits: 0, minimumFractionDigits: 0}) + "</div>" +
			"</div>" +
			"<div style='clear:both'></div>" +
			"</div>"
		);

		// GetCalFresh counties also have these additional stats
		if (hasGetCalFreshData) {
			$('div.county-details-content').append(
				"<div class='county-details-gcf-stats-heading'>GetCalFresh Data</div>" +
				"<div class='county-details-gcf-stats'>" +
				"<div class='county-details-gcf-stat'>" +
				"<div class='county-details-gcf-stat-number'>"+ countyData["number-apps"].toLocaleString("en", {style: "decimal"}) + "</div>" +
				"<div class='county-details-gcf-stat-name'>Monthly applicants</div>" +
				"</div>" +
				"<div class='county-details-gcf-stat'>" +
				"<div class='county-details-gcf-stat-number'>"+ countyData["percent-earned-income"].toLocaleString("en", {style: "percent"}) + "</div>" +
				"<div class='county-details-gcf-stat-name'>Have jobs</div>" +
				"</div>" +
				"<div class='county-details-gcf-stat'>" +
				"<div class='county-details-gcf-stat-number'>"+ countyData["percent-student"].toLocaleString("en", {style: "percent"}) + "</div>" +
				"<div class='county-details-gcf-stat-name'>Students</div>" +
				"</div>" +
				"<div class='county-details-gcf-stat'>" +
				"<div class='county-details-gcf-stat-number'>"+ countyData["percent-unstable-housing"].toLocaleString("en", {style: "percent"}) + "</div>" +
				"<div class='county-details-gcf-stat-name'>Lack stable housing</div>" +
				"</div>" +
				"<div class='county-details-gcf-stat'>" +
				"<div class='county-details-gcf-stat-number'>"+ countyData["percent-with-children"].toLocaleString("en", {style: "percent"}) + "</div>" +
				"<div class='county-details-gcf-stat-name'>Families with children</div>" +
				"</div>" +
				"<div class='county-details-gcf-stat'>" +
				"<div class='county-details-gcf-stat-number'>"+ countyData["percent-with-seniors"].toLocaleString("en", {style: "percent"}) + "</div>" +
				"<div class='county-details-gcf-stat-name'>Seniors</div>" +
				"</div>" +
				"</div>"
			);
		}
	} else {
		// Build the quotes content and add it if that tab is active
		$('#stories-tab').addClass('selected');
		this.activeQuoteIndex = 0;

		// Append the wrapper and first quote
		var quote = countyData['quotes'][0];
		$('div.county-details-content').html(
			"<div class='county-details-stories'>" +
			"<div class='map-quote'>" +
			"<div class='map-quote-image'></div>" +
      "<div class='map-quote__scroller'>" + quote + "</div>" +
			"</div>" +
			"<div class='map-quote-selector'>" +
			"<div class='map-quote-selector-arrow left'></div>" +
			"<div class='map-quote-selector-dots'></div>" +
			"<div class='map-quote-selector-arrow right'></div>" +
			"</div>" +
			"</div>"
		);

    $('div.map-quote-selector-dots').html("1 of " + countyData['quotes'].length);
	}

  var outerThis = this;

	$('div.map-quote-selector-arrow.left').click(function() {
		if(outerThis.activeQuoteIndex == 0) {
			outerThis.activeQuoteIndex = countyData['quotes'].length - 1;
		} else {
			outerThis.activeQuoteIndex -= 1;
		}
		$('div.map-quote__scroller').html(countyData['quotes'][outerThis.activeQuoteIndex]);
    $('div.map-quote-selector-dots').html(outerThis.activeQuoteIndex+1 + " of " + countyData['quotes'].length);
	});

	$('div.map-quote-selector-arrow.right').click(function() {
		if(outerThis.activeQuoteIndex == countyData['quotes'].length - 1) {
			outerThis.activeQuoteIndex = 0;
		} else {
			outerThis.activeQuoteIndex += 1;
		}
		$('div.map-quote__scroller').html(countyData['quotes'][outerThis.activeQuoteIndex]);
    $('div.map-quote-selector-dots').html(outerThis.activeQuoteIndex+1 + " of " + countyData['quotes'].length);
	});

  $('.map-quote__scroller').scroll(function() {
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $(this).parent().addClass('scrolled');
      } else {
        $(this).parent().removeClass('scrolled');
      }
  });

  $('div.map-info').append(
    "<div class='map-sources'><span title='#' class='callout' id='map-sources-callout'>Sources</span></div>"
  );

  $('#map-sources-callout').tooltip({
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
    content: "<strong>Sources for county statistics</strong>\
    <div style='margin: 10px 0;line-height: 1.3;'>\
      Poverty rate from <a target='_blank' href='https://www.ppic.org/publication/poverty-in-california/'>California Poverty Measure</a>,\
      population figures are from the July 2017 <a target='_blank' href='https://factfinder.census.gov'>American Community Survey</a> estimate,\
      median family income estimate from 2013-2017 <a target='_blank' href='https://factfinder.census.gov'>American Community Survey</a> data (2017 dollars),\
      cost of living estimates from <a target='_blank' href='http://livingwage.mit.edu/'>MIT Living Wage Calculator</a>.\
      GetCalFresh monthly applicant counts are from January 2019 to account for newly added counties; percentages reflect averages of application data from 2018 and 2019.\
    </div>",
  });

	$('#stats-tab').click(function() {
		outerThis.activeTab = "stats";
		outerThis.updateMapInfo(countyName);
	});

  $('#stories-tab').click(function() {
    outerThis.activeTab = "stories";
    outerThis.updateMapInfo(countyName);
	});

  $('#county-select').change(function() {
    outerThis.selectCountyInMap($(this).val());
  });
};

gcf.Myths = function() {
  var outerThis = this;
  $('div.myth-summary').click(function() {
    var mythId = this.id.split('-')[2];
    outerThis.expandMythDetail(mythId);
  });
};

gcf.Myths.prototype.expandMythDetail = function(mythId) {
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

gcf.Navigation = function() {
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
    outerThis.adjustHeader();
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
};

gcf.Navigation.prototype.adjustHeader = function() {
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

gcf.Navigation.prototype.autoHideHeader = function() {
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

gcf.QuoteExplorer = function() {
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
  $('.quote-content__scroller').scroll(function() {
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $(this).parent().addClass('scrolled');
      } else {
        $(this).parent().removeClass('scrolled');
      }
  });
};

gcf.QuoteExplorer.prototype.selectQuote = function(contentId, tabId) {
  $('#quote-content-'+contentId).html(this.quotes[contentId][tabId].quote);
  $('.quote-selector-tab.'+contentId).removeClass('selected');
  $('#quote-selector-tab-'+contentId+'-'+tabId).addClass('selected');
};

gcf.Resources = function() {
  var outerThis = this;
  $('div.resources-row').click(function() {
    var resourceId = this.id;
    outerThis.expandResourceDetail(resourceId);
  });
};

gcf.Resources.prototype.expandResourceDetail = function(resourceId) {
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

gcf.Social = function() {
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
};

gcf.Social.prototype.shareEmail = function() {
  window.open("mailto:?subject={{page.title}}&body=Help Code for America change the narrative. Read stories directly from GetCalFresh users and see why Californians need food assistance: https://snapstories.codeforamerica.org/");
};

gcf.Social.prototype.shareFacebook = function() {
  window.open("https://www.facebook.com/sharer/sharer.php?u=https://snapstories.codeforamerica.org/");
};

gcf.Social.prototype.shareTwitter = function() {
  window.open("https://twitter.com/intent/tweet?text=Help @codeforamerica change the narrative. Read stories directly from %23GetCalFresh users and see why Californians need food assistance:&url=https://snapstories.codeforamerica.org/&hashtags=SNAPworks");
};

gcf.Tooltips = function() {
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
      <div><sup>[1]</sup> {{site.data.footnotes[1].author}} {{site.data.footnotes[1].year}} <a href='{{site.data.footnotes[1].link}}'>&quot;{{site.data.footnotes[1].text}}&quot;</a></div>\
      <div><sup>[2]</sup> {{site.data.footnotes[2].author}} {{site.data.footnotes[2].year}} <a href='{{site.data.footnotes[2].link}}'>&quot;{{site.data.footnotes[2].text}}&quot;</a></div>\
      <div><sup>[3]</sup> {{site.data.footnotes[3].author}} {{site.data.footnotes[3].year}} <a href='{{site.data.footnotes[3].link}}'>&quot;{{site.data.footnotes[3].text}}&quot;</a></div>\
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
};
