---
---

class MapboxMap {

  constructor() {
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
    this.map.on("load", () => {
      this.drawCounties(this.map);
    });
  }

  // Render the basic map
  drawMap() {
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
      style: this.style,
      zoom: 6,
    });
  }

  // Draw the county layers for active GCF counties, hover and selection states
  // This is complicated because of Mapbox Gl's DSL
  // See https://www.mapbox.com/mapbox-gl-js/example/hover-styles/ for an example
  drawCounties() {

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

  // Trigger a selection on the map - used to initialize and by dropdown
  selectCountyInMap(countyName) {
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
  }

  // Handler for when a county is clicked. Sets the selection state and calls
  // updateMapInfo to display the correct stats and quotes
  selectCounty(selection) {
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
  }

  // Updates the info box with the right stats and quotes for a selected county
  updateMapInfo(countyName) {
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
    			"<div class='county-details-stat-name'>Median income</div>" +
    			"<div class='county-details-stat-number'>" + countyData["median-income"].toLocaleString("en", {style: "currency", currency: "USD", maximumFractionDigits: 0, minimumFractionDigits: 0}) + "</div>" +
    			"</div>" +
    			"<div class='county-details-stat'>" +
    			"<div class='county-details-stat-name'>Min cost of living<div class='county-details-stat-desc'>2 adults, 2 children</div></div>" +
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

    		// Append quote selector
    		// for (var i = 0; i < countyData['quotes'].length; i++) {
    		// 	var quote = countyData['quotes'][i];
    		// 	var quoteDotHtml = "<div id='map-dot-" + i + "' class='map-quote-selector-dot'></div>";
    		// 	if (i == 0) {
    		// 		quoteDotHtml = "<div id='map-dot-" + i + "' class='map-quote-selector-dot selected'></div>"
    		// 	}
    		// 	$('div.map-quote-selector-dots').append(quoteDotHtml);
    		// }
    	}

      var outerThis = this;
  		// $('div.map-quote-selector-dot').click(function() {
  		// 	var dotIndex = this.id.split('-')[2];
  		// 	outerThis.activeQuoteIndex = dotIndex;
      //
  		// 	$('div.map-quote__scroller').html(countyData['quotes'][dotIndex]);
      //
  		// 	$('div.map-quote-selector-dot').removeClass('selected');
  		// 	$('#'+this.id).addClass('selected');
  		// });

    	$('div.map-quote-selector-arrow.left').click(function() {
    		if(outerThis.activeQuoteIndex == 0) {
    			outerThis.activeQuoteIndex = countyData['quotes'].length - 1;
    		} else {
    			outerThis.activeQuoteIndex -= 1;
    		}
    		$('div.map-quote__scroller').html(countyData['quotes'][outerThis.activeQuoteIndex]);
        $('div.map-quote-selector-dots').html(outerThis.activeQuoteIndex+1 + " of " + countyData['quotes'].length);

    		// $('div.map-quote-selector-dot').removeClass('selected');
    		// $('div#map-dot-' + outerThis.activeQuoteIndex).addClass('selected');
    	});

    	$('div.map-quote-selector-arrow.right').click(function() {
    		if(outerThis.activeQuoteIndex == countyData['quotes'].length - 1) {
    			outerThis.activeQuoteIndex = 0;
    		} else {
    			outerThis.activeQuoteIndex += 1;
    		}
    		$('div.map-quote__scroller').html(countyData['quotes'][outerThis.activeQuoteIndex]);
        $('div.map-quote-selector-dots').html(outerThis.activeQuoteIndex+1 + " of " + countyData['quotes'].length);

    		// $('div.map-quote-selector-dot').removeClass('selected');
    		// $('div#map-dot-' + outerThis.activeQuoteIndex).addClass('selected');
    	});

      $('.map-quote__scroller').scroll(function() {
          if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $(this).parent().addClass('scrolled');
          } else {
            $(this).parent().removeClass('scrolled');
          }
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
  }
}
