---
---

window.JSMaps.maps.activeTab = "stats";

window.JSMaps.maps.onStateClick = function(data) {
	if (!data.enable) {
		return;
	}
	var countyName = data.name;
	var countyData = window.JSMaps.maps.countyData[data.name];
	var hasGetCalFreshData = countyData.hasOwnProperty("number-apps");
	var hasQuotes = countyData['quotes'].length > 0;

	// Setup the tab and content containers with the details tab that will
	// always be present.
	$('div.map-info').html(
		"<h3>" + countyName + "</h3>" +
		"<div class='county-details-note'>Data from 2017</div>" +
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
	if(!hasQuotes || window.JSMaps.maps.activeTab == 'stats') {
		$('#stats-tab').addClass('selected');

		// Every county always has these basic stats
		$('div.county-details-content').html(
			"<div class='county-details-stats'>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Population</div>" +
			"<div class='county-details-stat-number'>" + countyData["population"] + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Poverty rate</div>" +
			"<div class='county-details-stat-number'>" + countyData["poverty-rate"] + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Median income<div class='county-details-stat-desc'>cost of living adjusted</div></div>" +
			"<div class='county-details-stat-number'>" + countyData["median-income"].toLocaleString("en", {style: "currency", currency: "USD", maximumFractionDigits: 0, minimumFractionDigits: 0}) + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Min cost of living<div class='county-details-stat-desc'>2 working adults, 2 children</div></div>" +
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
				"<div class='county-details-gcf-stat-name'>GetCalFresh applicants</div>" +
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
		console.log("STORIES!!");
		// Build the quotes content and add it if that tab is active
		$('#stories-tab').addClass('selected');

		// Append the wrapper first
		$('div.county-details-content').html(
			"<div class='county-details-stories'>" +
			"</div>"
		);

		// Append each quote
		for (i = 0; i < countyData['quotes'].length; i++) {
			var quote = countyData['quotes'][i];
			var outerDivHtml = "<div class='map-quote'>";
			if (i == 0) {
				outerDivHtml = "<div class='map-quote first'>"
			}
			$('div.county-details-stories').append(
				outerDivHtml +
				"<div class='map-quote-image'></div>" +
				"<p class='map-quote-text'>" + quote + "</p></div>"
			);
		}
	}

	$('#stats-tab').click(function() {
		window.JSMaps.maps.activeTab = "stats";
		window.JSMaps.maps.onStateClick(data);
	});
	$('#stories-tab').click(function() {
		window.JSMaps.maps.activeTab = "stories";
		window.JSMaps.maps.onStateClick(data);
	});
};

window.JSMaps.maps.countyData = {{site.data.map | jsonify}};

window.JSMaps.maps.california = {
	"config": {
		"mapWidth": 612,
		"mapHeight": 1300,
		"enablePanZoom": true,
		"initialZoom": 7,
		"initialMapX": 25,
		"initialMapY": 125,
		"displayAbbreviations": false,
		"offColor": "#EBEBEB",
		"offStrokeColor": "#ABABAB",
		"stateClickAction": null,
		"strokeWidth": 0.5,
		"strokeColor": "#000000",
		"textAreaWidth": 0,
		"textAreaHeight": 0,
		"onStateClick": window.JSMaps.maps.onStateClick,
		"onReady": function() {
				$('#california-map').trigger('stateClick', 'San Francisco');
		},
	},
	"paths": [
		{% for county in site.data.map %}
			{% assign countyName = county[0] %}
			{% assign countyData = county[1] %}
		{
			"enable": {%if countyData['number-apps'] %}true{% else %}false{%endif%},
			"name": "{{countyName}}",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#FFFFFF",
			"hoverColor": "#F5D0A5",
			"selectedColor": "#EFA44C",
			"text": "",
			"path": "{{countyData.path}}"
		},
		{% endfor %}
	],
}
