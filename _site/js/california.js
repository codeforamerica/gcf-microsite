window.JSMaps.maps.activeTab = "stats";

window.JSMaps.maps.onStateClick = function(data) {
	if (!data.enable) {
		return;
	}
	var countyName = data.name;
	var countyData = window.JSMaps.maps.countyData[data.name];

	$('div.map-info').html(
		"<h3>" + countyName + "</h3>" +
		"<div class='county-details'>" +
		"<div class='county-details-tabs'>" +
		"<div class='county-details-tab' id='stats-tab'>" +
		"County Statistics" +
		"</div>" +
		"<div class='county-details-tab' id='stories-tab'>" +
		"Stories of CalFresh" +
		"</div>" +
		"</div>" +
		"<div class='county-details-content'>" +
		"</div>" +
		"</div>");

	if(window.JSMaps.maps.activeTab == 'stats') {
		$('#stats-tab').addClass('selected');
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
			"<div class='county-details-stat-name'>Median income</div>" +
			"<div class='county-details-stat-number'>" + countyData["median-income"].toLocaleString("en", {style: "currency", currency: "USD", maximumFractionDigits: 0, minimumFractionDigits: 0}) + "</div>" +
			"</div>" +
			"<div class='county-details-stat'>" +
			"<div class='county-details-stat-name'>Min cost of living</div>" +
			"<div class='county-details-stat-number'>" + countyData["minimum-cost-living-family"].toLocaleString("en", {style: "currency", currency: "USD", maximumFractionDigits: 0, minimumFractionDigits: 0}) + "</div>" +
			"</div>" +
			"<div style='clear:both'></div>" +
			"</div>"
		);

		if (countyData.hasOwnProperty("number-apps")) {
			$('div.county-details-content').append(
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
		$('#stories-tab').addClass('selected');

		$('div.county-details-content').html(
			"<div class='county-details-stories-content'>" +
			"</div>"
		);
		for (i = 0; i < countyData['quotes'].length; i++) {
			var quote = countyData['quotes'][i];
			var outerDivHtml = "<div class='map-quote'>";
			if (i == 0) {
				outerDivHtml = "<div class='map-quote first'>"
			}
			$('div.county-details-stories-content').append(
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

window.JSMaps.maps.countyData = {"Placer":{"poverty-rate":"12.90%","percent-student":0.1573438011,"minimum-cost-living-family":59880,"percent-unstable-housing":0.2505724567,"number-apps":3057,"percent-with-children":0.4131501472,"percent-earned-income":0.5493741307,"percent-with-seniors":0.09937684487,"path":"M183.8,247.1 L183.1,247.1 L163.9,245.2 L164.8,244.0 L164.9,231.1 L168.1,231.1 L168.1,225.9 L174.5,221.8 L175.9,223.2 L175.9,223.2 L179.3,224.9 L184.1,223.0 L186.0,224.9 L189.6,224.8 L192.9,218.3 L197.3,213.3 L207.8,204.6 L212.5,202.6 L249.2,202.5 L249.2,205.7 L249.5,220.9 L241.4,220.9 L239.1,223.6 L230.8,224.2 L224.6,223.8 L222.5,228.5 L220.2,231.0 L216.7,232.2 L212.6,230.0 L207.6,225.6 L202.9,225.9 L200.2,229.4 L195.5,228.6 L191.9,231.9 L189.6,232.2 L188.6,237.1 L186.1,239.4 Z","center":[-120.722718,39.06203],"quotes":["I just finished a masters degree program for counseling and I am in-between jobs. I took a position with a counseling agency (non-profit), but I do not have an income yet. I am working on scheduling clients and will be paid based on a sliding scale. I am going on two weeks of no income and I am really worried. I worked my entire life, and have never been on assistance programs and I know this would be a temporary thing, but I need help especially as a single mom. I know I would need to submit paychecks when I recieve one, but right now I am bringing in $0. They say the first few months are rough."],"population":"348,432","median-income":73747,"poverty-rate-increase":"0.9"},"San Luis Obispo":{"poverty-rate":"18.50%","percent-student":0.2837009804,"minimum-cost-living-family":63156,"percent-unstable-housing":0.2457107843,"number-apps":1632,"percent-with-children":0.2861519608,"percent-earned-income":0.6036363636,"percent-with-seniors":0.08655616943,"path":"M238.1,463.0 L238.5,463.0 L239.3,463.0 L239.3,476.0 L245.8,475.9 L245.8,482.4 L251.2,486.7 L251.3,488.8 L258.4,488.8 L258.4,495.3 L262.7,495.3 L262.7,501.7 L271.4,501.8 L271.4,508.2 L278.3,507.8 L277.9,514.6 L283.3,515.4 L283.4,528.3 L279.6,528.6 L274.7,524.8 L271.2,523.1 L266.8,523.1 L261.6,520.8 L260.1,518.9 L255.6,516.9 L252.5,517.0 L245.3,513.2 L241.1,515.8 L239.8,519.1 L235.9,519.2 L230.9,520.9 L232.9,524.1 L232.9,528.3 L224.8,522.4 L221.1,521.9 L212.7,524.4 L211.7,523.2 L212.9,515.9 L212.1,511.1 L208.3,508.5 L204.8,509.5 L199.6,506.3 L196.8,502.9 L198.6,496.9 L200.8,496.5 L196.2,488.2 L190.3,487.3 L184.5,480.6 L180.5,474.2 L173.3,472.1 L171.3,464.7 L169.8,462.4 L209.9,462.9 Z","center":[-120.44754,35.38522],"quotes":["I suffer from a movement disorder akin to Parkinson's, and it's thought to be myoclonus, or myoclonus dystonia. I can't work as of now, and I am going through further tests to get a precise diagnosis, but it's a lengthy process thus far. I am paying rent with my state disability, as social security has rejected my application for disability. This leaves me with about $20 for the month. This means gas for school and food for myself. I cannot make $20 stretch that far, as much as I would like to. I'm currently appealing the denial, but this process takes time, and I don't have resources to survive, much less the physical capability a lot of the time. "],"population":"269,637","median-income":59454,"poverty-rate-increase":"0.7"},"Contra Costa":{"poverty-rate":"14.80%","percent-student":0.1153344351,"minimum-cost-living-family":73524,"percent-unstable-housing":0.3199965208,"number-apps":11497,"percent-with-children":0.3653996695,"percent-earned-income":0.5514737292,"percent-with-seniors":0.1653467931,"path":"M154.6,293.0 L157.7,292.6 L157.5,294.8 L154.7,296.1 L157.6,296.9 L159.1,298.2 L157.6,300.6 L159.0,304.4 L157.7,308.9 L160.3,310.5 L158.9,312.9 L135.2,319.9 L132.2,317.7 L133.1,316.6 L130.3,313.9 L124.7,313.4 L122.1,312.1 L120.0,307.8 L117.6,305.9 L114.3,306.5 L110.2,305.5 L108.0,301.3 L109.9,301.9 L111.8,297.8 L115.7,297.9 L120.0,294.5 L124.6,297.2 L128.5,295.5 L133.0,294.9 L139.8,296.1 L142.7,297.5 L151.3,298.7 L149.6,296.9 L151.6,296.0 L152.5,293.2 L154.3,293.0 L154.4,293.0 Z","center":[-121.951543,37.91947],"quotes":["I just moved out of my single-mother's house. I still help her with bills and also try to pay my own rent and utilities with the little money I could provide. I can only afford to work part-time because I am also in school and in the ROTC program. I would be very grateful to have some help with being able to buy nutritious food instead of settling for quick, unhealthy food such as ramen and hot dogs.","I have various medical conditions, endometriosis, bipolar disorder, etc., which caused my copays for my medications to skyrocket. My medications are number one for me to stay on. But that has made it hard to keep food that is supposed to be on my diet in the kitchen. When you are trying to make $30 last a week for groceries, it's hard to buy vegetables and fruit. I have gone down two sizes in a month trying to balance out food and my medications and prescribed PRNS. Being allowed the assistance for food would lessen the stress around the costs of medications and mental health services.","I need help with many basic day to today activities of daily living, because im disabled and have great difficulty getting things done. I'm currently suffering of rheumatiod arthritis, fibromyalgia, and seizures. I'm also suffering of a severly injured back and possible some other disease that is causing me great abnormal weightloss and extreme fatigue. I'm currently working with my PCP, to figure out what is causing it. "],"population":"1,049,025","median-income":79799,"poverty-rate-increase":"1.4"},"Marin":{"poverty-rate":"17.00%","percent-student":0.147826087,"minimum-cost-living-family":83664,"percent-unstable-housing":0.2347826087,"number-apps":1150,"percent-with-children":0.307826087,"percent-earned-income":0.6244541485,"percent-with-seniors":0.1826086957,"path":"M103.0,311.5 L103.0,311.5 L102.3,311.5 L102.1,312.0 L99.4,309.1 L93.8,305.2 L92.1,306.2 L87.5,302.0 L85.2,298.3 L80.3,295.6 L76.0,296.8 L76.9,298.5 L73.2,298.2 L75.4,294.3 L78.0,287.3 L76.1,280.3 L81.4,288.3 L85.1,292.8 L84.7,291.0 L79.0,282.0 L77.1,280.4 L75.1,276.0 L81.1,274.6 L90.3,282.9 L95.6,285.0 L100.5,285.0 L104.3,290.3 L105.1,292.9 L103.7,297.3 L107.2,299.7 L104.4,300.8 L103.7,304.1 L107.4,307.3 L105.4,310.9 L104.9,311.4 L104.0,311.6 L103.9,311.7 L103.8,311.7 L103.7,311.7 L103.6,311.8 L103.6,311.7 L103.5,311.7 L103.4,311.7 L103.4,311.6 Z M108.5,309.3 L107.1,309.2 L108.4,308.5 L108.5,308.9 Z","center":[-122.745974,38.05181],"quotes":["My husband walked out on me and my two kids a couple months ago and filed for divorce a month ago. He is still paying the mortgage and utilities but barely any for food and has otherwise cut me off financially. I started college two years ago to become a nurse and am still in school. I have used up what little money I had to enroll in school and get my kids started back to school. I am trying to sort out my situation and have some family help but have urgent need for food assistance and expect that to be the case for some time as my husband says he's not helping any further and I have a few years before I will be able to become a nurse, and school prohibits me from working full time. I am not eligible for unemployment as I have been home raising kids all these years."],"population":"252,409","median-income":91529,"poverty-rate-increase":"0.4"},"Napa":{"population":"136,484","path":"M109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 Z M97.7,249.1 L107.2,246.5 L111.1,239.3 L112.6,238.3 L111.4,234.8 L114.0,237.0 L117.6,236.8 L121.1,247.2 L124.2,250.5 L127.8,261.1 L126.4,267.3 L129.4,272.4 L129.8,275.7 L121.6,275.6 L122.6,278.8 L120.9,285.6 L122.0,287.4 L109.7,287.2 L109.7,287.2 L111.7,287.0 L112.1,280.5 L110.0,277.9 L110.6,276.2 L107.6,270.6 L104.8,267.2 L105.7,265.1 L103.0,263.8 L102.3,260.1 L97.9,257.0 L96.5,254.1 Z","center":[-122.325995,38.50735],"quotes":[],"median-income":70925,"minimum-cost-living-family":66624,"poverty-rate":"16.70%","poverty-rate-increase":"1.5"},"San Mateo":{"poverty-rate":"16.60%","percent-student":0.1988616151,"minimum-cost-living-family":83664,"percent-unstable-housing":0.2290999644,"number-apps":2811,"percent-with-children":0.408751334,"percent-earned-income":0.6281407035,"percent-with-seniors":0.1416370107,"path":"M109.8,320.2 L110.2,325.9 L111.7,328.8 L117.9,330.7 L120.9,333.2 L120.4,334.5 L124.7,336.0 L126.0,338.4 L121.3,340.9 L120.5,346.1 L121.1,349.2 L123.4,351.7 L123.3,356.9 L117.9,356.8 L117.9,358.6 L113.5,358.8 L114.8,364.7 L112.1,363.8 L110.4,359.7 L108.4,358.1 L107.6,353.8 L108.8,345.9 L105.4,335.7 L102.0,333.1 L102.0,328.5 L103.2,328.0 L103.3,320.1 L105.2,320.1 Z M110.6,320.2 L110.6,320.3 L110.4,320.2 L110.5,320.2 Z","center":[-122.371542,37.41466],"quotes":["My husband, baby, and I live with his parents. We do not recieve help such as extra money or taken to get groceries and we do pay his parents for rent and utilities. My husband pays for his own car, insurance, and our phone bills, so it doesn't leave us with very much extra money for groceries when only one person is able to work. "],"population":"718,451","median-income":91421,"poverty-rate-increase":"0.5"},"Tuolumne":{"population":"55,365","path":"M293.1,318.6 L291.9,318.2 L290.7,315.7 L288.1,312.2 L285.0,311.4 L283.7,309.3 L280.9,310.1 L277.4,306.7 L275.5,306.8 L273.0,310.4 L270.9,310.9 L270.4,313.6 L261.4,317.7 L258.1,316.5 L255.6,317.6 L245.5,312.4 L242.7,315.9 L240.0,314.6 L238.4,317.2 L229.9,320.1 L232.2,324.5 L231.1,325.7 L227.2,323.2 L227.5,326.8 L218.4,318.3 L211.9,312.2 L213.0,310.1 L220.0,303.2 L218.9,300.6 L223.0,298.9 L224.2,295.4 L234.2,279.7 L238.0,275.4 L239.7,272.1 L248.8,267.7 L256.7,273.4 L264.2,268.8 L267.3,269.1 L267.4,272.6 L271.0,275.4 L270.3,278.4 L273.1,282.2 L271.4,284.9 L274.7,287.9 L281.0,290.0 L281.4,292.2 L285.2,291.5 L288.0,293.1 L290.7,297.6 L289.7,301.5 L290.6,303.3 L296.9,307.5 L296.0,312.7 L297.0,313.7 Z","center":[-119.964708,38.02145],"quotes":[],"median-income":48493,"minimum-cost-living-family":59076,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"Fresno":{"poverty-rate":"19.60%","percent-student":0.05798177523,"minimum-cost-living-family":58092,"percent-unstable-housing":0.3431888754,"number-apps":14815,"percent-with-children":0.3063786703,"percent-earned-income":0.5177981651,"percent-with-seniors":0.0658694771,"path":"M348.0,391.0 L336.5,391.7 L311.1,392.0 L311.0,398.2 L292.0,398.2 L292.0,404.7 L282.4,404.7 L276.1,411.1 L270.6,416.3 L265.4,417.6 L253.2,417.8 L253.2,434.0 L232.0,454.3 L229.3,450.1 L224.9,449.8 L222.1,446.7 L215.3,442.2 L214.8,440.0 L211.9,439.5 L210.8,435.6 L213.3,432.5 L210.2,427.7 L211.4,424.1 L215.1,423.2 L214.7,411.4 L196.0,392.8 L211.6,377.1 L215.5,377.1 L215.2,373.5 L218.4,370.4 L223.8,380.2 L223.5,383.8 L226.8,386.8 L233.2,390.5 L237.0,390.6 L240.3,388.1 L245.8,386.5 L248.9,387.3 L251.5,385.3 L259.6,383.8 L261.0,384.7 L265.9,375.7 L270.6,370.5 L272.9,371.4 L273.8,368.1 L276.3,368.6 L277.8,365.6 L276.0,364.8 L279.6,362.2 L281.7,365.1 L283.9,361.4 L286.7,362.2 L289.9,358.0 L289.6,350.3 L292.4,345.5 L307.7,329.7 L310.4,331.8 L313.9,332.2 L317.9,337.6 L321.1,336.6 L322.4,338.5 L323.4,340.5 L321.6,343.6 L321.9,347.4 L324.7,349.4 L326.1,348.4 L329.2,353.3 L328.0,354.7 L330.0,362.1 L333.6,362.3 L343.0,368.1 L343.6,371.4 L347.8,380.5 L346.1,384.5 Z","center":[-119.655019,36.761],"quotes":["I was an registered nurse until I fractured my right heel bone and was forced to retire - disability was declined. The only income I have is Social Security ($1,047/month). Each month, my expenses average $75 for major medical insurance, $80 for one prescription medication, $54 for auto insurance, $30 for auto registration, $250 for propane for cooking and heating (I live in a camper). I do not have dental insurance and can't afford to get care for my bad teeth. I really need help for food and other basic necessities. ","I became ill in Dec 2017 and am currently on unpaid company leave. I now only have Social Security retirement benefits. I live with my boyfriend and his mother. They are both disabled and his home care worker shops and provides their food from their disability and retirement income. I purchase my own food due to a special diet. I am having surgery next week and will be home several weeks to recover. ","I'm 25 and I take care of my grandma who has been on dialysis for the past 11 years. I offer my daily help for free and I have done this for several years however, it has become increasingly hard to support myself with very little money and hardly any family support. I go to local churches and food drives and get food for my grandpa, grandma and myself. Unfortunately, I find that many days and nights I go hungry. I am extremely independent - seeking help for others is easy, but for myself I have trouble accepting anything I don't feel I earned, but everyone needs a little help to get on their feet sometimes. I don't intend to take advantage of CalFresh services for a over extended period. Only until I find a job that can allow me flexible hours while my grandma needs my continued support. "],"population":"930,450","median-income":45201,"poverty-rate-increase":"5"},"Sierra":{"population":"3,240","path":"M241.0,173.6 L248.5,173.5 L249.3,172.4 L249.4,181.0 L249.3,192.9 L220.6,192.9 L217.7,188.0 L211.8,187.2 L206.2,192.4 L197.1,194.8 L192.6,195.2 L190.9,196.9 L190.3,187.8 L189.0,185.9 L190.9,184.5 L191.7,178.6 L195.2,176.1 L196.1,171.3 L199.6,168.5 L202.8,170.7 L204.2,173.4 L206.6,172.7 L210.5,175.9 L212.1,173.7 Z","center":[-120.521993,39.57692],"quotes":[],"median-income":43107,"minimum-cost-living-family":61260,"poverty-rate":"17.20%","poverty-rate-increase":"1.6"},"El Dorado":{"poverty-rate":"11.80%","percent-student":0.1117424242,"minimum-cost-living-family":59880,"percent-unstable-housing":0.2840909091,"number-apps":528,"percent-with-children":0.2954545455,"percent-earned-income":0.5284090909,"percent-with-seniors":0.09867172676,"path":"M249.5,220.9 L249.6,225.9 L255.2,230.7 L256.7,235.8 L251.8,242.4 L245.6,247.8 L243.4,247.6 L241.7,252.6 L237.5,253.3 L236.0,256.5 L231.5,259.5 L229.3,259.3 L220.2,262.0 L213.5,262.6 L205.8,258.8 L201.1,258.7 L196.1,261.7 L195.4,260.7 L190.2,262.2 L185.1,246.7 L183.8,247.1 L186.1,239.4 L188.6,237.1 L189.6,232.2 L191.9,231.9 L195.5,228.6 L200.2,229.4 L202.9,225.9 L207.6,225.6 L212.6,230.0 L216.7,232.2 L220.2,231.0 L222.5,228.5 L224.6,223.8 L230.8,224.2 L239.1,223.6 L241.4,220.9 Z","center":[-120.534398,38.78553],"quotes":["I started a long term subtitute teacher position, but do not get paid until September 10th. I anticipate this amount to be $1500 for the amount of time I worked in August. The hours for my sub job are irregular. I was not able to work June & July because school was closed. I am looking for a fulltime teaching job. ","I was a full time student last semester, will be a part time student this upcoming (summer semester) and if I still don't have a job in the fall will resume being a full time student. I am currently in the application process for summer internships. I'm staying in my ex-husbands house for a while, I am in the same house as my kids, but I don't have the funds to pitch in (and they are over 18). My daughter pays for my cell phone. The only bill I have is for my stuff in storage. I am saving up money for my car which needs 980.00 in engine work and new brakes. ","I'd like to be able to make healthier food choices which would improve my health and overall help me focus more on my academics and less on what I'll be eating everyday.","My boyfriend and I have been homeless for months. In Janurary we were in a car accident that totalled $48,000. Following that I got extreamly sick and wasnt able to work so i was forced to quit. I was kicked out of my house at 17 in Febuary and moved into my boyfriend's house after spending a week in a shelter. He has a fulltime job which barely makes ends meet. We often go to bed so hungry it's hard to sleep. "],"population":"181,058","median-income":68507,"poverty-rate-increase":"1.2"},"Lassen":{"population":"34,895","path":"M249.3,172.4 L248.5,173.5 L241.0,173.6 L243.1,169.3 L243.1,156.4 L240.0,154.3 L237.8,151.0 L237.4,145.6 L235.2,144.0 L229.9,143.5 L221.8,136.8 L220.3,133.6 L216.5,132.5 L212.2,129.2 L205.9,128.6 L204.1,131.4 L199.8,134.1 L199.8,137.2 L196.6,137.8 L195.6,135.6 L192.3,135.6 L189.0,132.9 L189.1,118.9 L174.1,118.9 L174.4,115.0 L174.8,84.8 L174.2,82.7 L174.3,64.2 L211.5,64.4 L248.8,64.3 L249.4,124.1 Z","center":[-120.629931,40.72108],"quotes":[],"median-income":53351,"minimum-cost-living-family":58452,"poverty-rate":"15.50%","poverty-rate-increase":"3.3"},"Santa Barbara":{"poverty-rate":"23.00%","percent-student":0.649496337,"minimum-cost-living-family":66108,"percent-unstable-housing":0.1375915751,"number-apps":8736,"percent-with-children":0.1861263736,"percent-earned-income":0.6176115802,"percent-with-seniors":0.03836463582,"path":"M229.4,591.4 L232.7,594.0 L224.2,593.1 L229.3,590.0 Z M283.4,528.3 L284.0,528.3 L285.3,528.3 L285.6,561.2 L285.1,565.6 L283.6,567.4 L278.3,564.4 L275.0,564.0 L269.4,565.9 L264.5,564.3 L258.9,565.1 L256.3,563.2 L250.9,561.1 L245.9,561.3 L243.3,560.3 L233.5,560.7 L222.5,562.0 L220.3,556.8 L216.1,554.4 L213.4,554.4 L211.8,552.0 L214.6,543.2 L212.3,539.2 L213.8,531.9 L210.3,528.2 L211.7,523.2 L212.7,524.4 L221.1,521.9 L224.8,522.4 L232.9,528.3 L232.9,524.1 L230.9,520.9 L235.9,519.2 L239.8,519.1 L241.1,515.8 L245.3,513.2 L252.5,517.0 L255.6,516.9 L260.1,518.9 L261.6,520.8 L266.8,523.1 L271.2,523.1 L274.7,524.8 L279.6,528.6 Z M236.4,595.2 L242.7,593.5 L249.0,593.2 L249.6,596.0 L252.9,596.4 L253.6,599.6 L251.7,599.6 L244.9,603.2 L240.9,601.0 Z M269.0,598.1 L260.9,597.6 L258.6,594.5 L259.2,592.8 L255.8,590.8 L256.7,589.4 L261.8,590.5 L269.4,592.0 L274.3,594.1 L278.4,590.9 L281.1,592.5 L278.8,595.4 L272.8,596.1 Z","center":[-120.038485,34.53737],"quotes":["I am an incoming sophomore student going into UCSB from Florida. My family's household earnings are dominated by my mother, who lives barely above the poverty line. We live in this house which is owned (mortgaged from bank) by my brother, who is in the military and has helped my mom pay for the expenses of me, herself, as well as our 70 year old grandmother. Going into UCSB as an out of state student places a heavy burden of taking out around sixty-thousand dollars worth of loans in the first year (due to non-residency, and in-dorm housing rent). I support myself as an independent paying for a personal car insurance, as well as healthcare - in order to become a resident of California. "],"population":"423,895","median-income":63409,"poverty-rate-increase":"2.3"},"Yolo":{"poverty-rate":"20.20%","percent-student":0.5718799368,"minimum-cost-living-family":61548,"percent-unstable-housing":0.1475513428,"number-apps":3165,"percent-with-children":0.1759873618,"percent-earned-income":0.6016949153,"percent-with-seniors":0.03381795196,"path":"M111.4,234.8 L109.9,232.1 L111.0,230.3 L114.7,230.5 L133.3,230.7 L143.8,230.9 L145.5,231.7 L144.9,234.5 L150.2,236.4 L150.1,239.9 L152.3,243.0 L157.7,243.1 L157.0,245.1 L155.4,247.9 L157.5,251.8 L159.2,252.0 L160.0,255.2 L162.5,256.2 L162.2,259.1 L159.4,262.7 L162.3,264.5 L161.4,272.9 L157.2,276.3 L151.4,276.2 L151.5,260.4 L149.0,259.6 L144.7,260.4 L142.0,259.4 L137.3,259.7 L133.1,263.0 L130.5,260.8 L127.8,261.1 L124.2,250.5 L121.1,247.2 L117.6,236.8 L114.0,237.0 Z","center":[-121.903178,38.67926],"quotes":["Until four weeks ago I had been working as an ambulance EMT, but I was laid off. They call it a termination to avoid paying unemployment benefits, but our entire division was \"fired\" which consists of about six medics who were good at their jobs. We all got taken advantage of. I just need a little help while I look for another EMT job. I was on CalFresh about a year ago while I was a UC Davis student and now I need temporary help again. Medics are severely underpaid and the private EMS can be a tough business. We are are treated as disposable, unfortunately. ","As a college student without much money, trying to buy enough healthy food at the grocery store is a real challenge. I'd like to make healthier food choices and focus more on my academics and less on what I'll be able to eat everyday.","I am applying for CalFresh because I am struggling to pay for food. I am currently going to college as a full time student, and I do not have full financial aid coverage. I rely on some money from my parents, but it is usually barely enough to pay for my tuition and rent. My parents income is less than middle class, and on top of that, they live in San Francisco, and almost everythign there is quite expensive, so they are also struggling to pay for their own necessities after rent. My mom was forced to quit her job just early this year because her lease for her store got terminated. I feel very bad having to ask them for money for food. I also had some personal and family struggles resulting in this, but I am determined to finish college within four years. "],"population":"200,849","median-income":55508,"poverty-rate-increase":"1.6"},"Yuba":{"population":"72,155","path":"M168.1,225.9 L163.8,226.2 L160.7,227.6 L159.0,230.1 L156.9,221.3 L158.3,218.9 L156.5,212.0 L156.3,203.7 L157.0,202.0 L159.8,203.0 L168.8,200.6 L173.0,194.3 L172.8,191.3 L174.8,187.3 L183.7,186.9 L183.7,184.7 L187.9,181.7 L189.4,180.5 L191.7,178.6 L190.9,184.5 L189.0,185.9 L190.3,187.8 L190.9,196.9 L184.9,197.7 L180.3,202.4 L179.5,204.9 L176.8,205.7 L176.1,208.7 L175.9,223.2 L175.9,223.2 L174.5,221.8 Z","center":[-121.34428,39.27002],"quotes":[],"median-income":45470,"minimum-cost-living-family":58080,"poverty-rate":"16.40%","poverty-rate-increase":"1.8"},"Merced":{"population":"255,793","path":"M196.0,392.8 L182.8,385.6 L179.5,379.8 L177.3,378.9 L178.5,376.3 L176.7,374.7 L176.7,371.6 L178.9,368.4 L176.9,366.6 L177.9,363.5 L193.5,348.0 L192.3,344.1 L227.5,326.9 L234.1,340.9 L234.7,344.0 L241.9,355.9 L244.9,357.1 L247.3,360.1 L244.3,361.2 L237.0,361.5 L228.9,364.8 L222.2,366.5 L218.4,370.4 L215.2,373.5 L215.5,377.1 L211.6,377.1 Z","center":[-120.722802,37.1948],"quotes":[],"median-income":43066,"minimum-cost-living-family":56760,"poverty-rate":"18.40%","poverty-rate-increase":"4.4"},"Mono":{"population":"14,202","path":"M273.8,246.8 L298.9,268.6 L325.1,291.2 L377.9,337.1 L356.0,337.8 L322.4,338.5 L321.1,336.6 L317.9,337.6 L313.9,332.2 L310.4,331.8 L307.7,329.7 L305.1,322.4 L301.6,318.8 L297.2,318.7 L296.2,320.4 L293.1,318.6 L297.0,313.7 L296.0,312.7 L296.9,307.5 L290.6,303.3 L289.7,301.5 L290.7,297.6 L288.0,293.1 L285.2,291.5 L281.4,292.2 L281.0,290.0 L274.7,287.9 L271.4,284.9 L273.1,282.2 L270.3,278.4 L271.0,275.4 L272.8,272.5 L271.9,270.5 L275.4,269.2 L276.4,262.6 L271.9,255.0 L272.1,250.4 Z","center":[-118.875167,37.91583],"quotes":[],"median-income":61814,"minimum-cost-living-family":61728,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"San Francisco":{"poverty-rate":"18.90%","percent-student":0.322775264,"minimum-cost-living-family":83664,"percent-unstable-housing":0.2425339367,"number-apps":6630,"percent-with-children":0.1779788839,"percent-earned-income":0.4719000892,"percent-with-seniors":0.08504531722,"path":"M103.0,311.5 L103.1,311.5 L103.4,311.6 L103.4,311.7 Z M103.6,311.8 L103.5,311.8 L103.5,311.7 L103.6,311.7 Z M103.7,311.7 L103.7,311.7 L103.8,311.7 L103.9,311.7 Z M105.4,310.9 L105.0,311.5 L104.0,311.6 L104.9,311.4 Z M108.4,308.5 L108.6,308.7 L108.5,309.3 L108.5,308.9 Z M113.7,314.9 L113.5,314.8 L113.6,314.6 L113.6,314.7 Z M110.4,320.2 L109.8,320.1 L109.8,320.2 L105.2,320.1 L103.3,320.1 L102.7,314.7 L109.0,312.6 L112.1,318.6 L110.6,320.2 L110.5,320.2 Z M102.1,312.0 L102.3,311.5 L103.0,311.5 L102.4,311.7 Z","center":[-123.032229,37.72723],"quotes":["Currently, I am looking for a job near my apartment but even with that money I would earn, I still have to pay rent, utilities, and still go to college next month.","I am a full time PhD student at UCSF, and I do receive a modest stipend that would be enough to live on if not for insane rent prices in San Francisco and a pile of debt. The past few months, after a string of unexpected expenses have caused my credit debt to build, I have found it hard to make ends meet and I haven't been able to save any money to pay my taxes. This has left me very vulnerable and has caused a great deal of stress. Beyond this, I am not allowed to seek outside employment while I am enrolled at UCSF, and I am expected to spend 40-60 hours a week conducting research in a lab.","I currently cannot work and have not been able to work for the past 3 months. Due to medical reasons I cannot stand for long periods of time. I am self-employed so if I don't work I don't make an income. I'm hoping to have a medical procedure in the next couple of months so I can return to work. My partner has been actively looking for work in the past couple of months but he has been my primary caregiver, which leaves his schedule limited.","I have extensive health problems. Due to serious food sensitivities, my diet is very expensive. If I eat food that's come in contact with wheat, corn, or tapioca I will vomit for days. This rules most cheap meal options out. Additionally, I have PTSD and ADHD, which require expensive ongoing medication. My ongoing costs include $150 or so for therapy, which I can not go without, about $600 for health insurance, paying down a $900 credit card bill, and soon I may need to replace the computer that is my livelihood as far as job hunting goes. I want to save as much as I can so I can move into a rented room when I find a job. I have no family to fall back on. I legally emancipated from my mother at 16 due to abuse, and my father is dead."],"population":"805,235","median-income":78378,"poverty-rate-increase":"0.6"},"Amador":{"population":"38,091","path":"M245.6,247.8 L245.6,253.6 L245.7,262.1 L242.6,263.1 L237.9,262.7 L230.7,265.4 L225.3,264.8 L223.1,266.8 L214.2,271.0 L213.2,274.6 L202.8,278.9 L198.0,283.4 L192.0,283.1 L191.4,281.2 L190.2,277.5 L190.3,263.6 L190.2,262.2 L195.4,260.7 L196.1,261.7 L201.1,258.7 L205.8,258.8 L213.5,262.6 L220.2,262.0 L229.3,259.3 L231.5,259.5 L236.0,256.5 L237.5,253.3 L241.7,252.6 L243.4,247.6 Z","center":[-120.653856,38.44355],"quotes":[],"median-income":52964,"minimum-cost-living-family":59592,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"Mendocino":{"population":"87,841","path":"M82.4,151.8 L83.1,156.3 L81.4,157.0 L81.9,165.1 L81.7,168.8 L84.3,171.8 L84.4,181.3 L84.1,185.1 L81.4,185.9 L76.3,185.6 L74.1,186.7 L73.2,193.8 L76.2,200.2 L77.5,206.6 L72.6,211.0 L71.5,218.5 L73.1,219.1 L75.1,224.2 L77.5,224.2 L79.5,231.4 L86.8,235.3 L71.8,234.8 L68.5,235.6 L68.5,237.9 L55.1,237.7 L55.0,239.8 L47.5,239.5 L45.3,240.2 L39.0,234.0 L34.7,228.7 L34.8,225.6 L37.1,220.7 L34.8,210.9 L33.0,208.3 L31.1,198.6 L30.1,196.9 L30.9,189.7 L33.8,182.4 L32.7,171.5 L31.2,169.5 L29.7,160.9 L26.8,158.4 L25.6,155.2 L20.6,148.1 L36.0,148.6 L47.8,149.0 L47.7,150.9 Z","center":[-123.442881,39.43238],"quotes":[],"median-income":43290,"minimum-cost-living-family":59820,"poverty-rate":"21.60%","poverty-rate-increase":"2.9"},"San Joaquin":{"population":"685,306","path":"M192.0,283.1 L195.2,293.2 L196.0,294.0 L196.2,319.1 L191.8,317.4 L188.2,318.1 L179.6,322.1 L163.6,337.7 L163.6,337.7 L163.6,337.7 L161.8,334.5 L158.7,333.2 L158.9,312.9 L160.3,310.5 L157.7,308.9 L159.0,304.4 L157.6,300.6 L159.1,298.2 L157.6,296.9 L158.4,294.6 L163.6,297.8 L163.2,296.2 L159.6,294.7 L158.3,292.3 L158.1,289.9 L160.4,288.2 L160.9,285.1 L164.3,280.3 L167.2,282.0 L171.7,282.7 L176.1,281.0 L181.7,280.8 L188.0,277.6 L190.2,277.5 L191.4,281.2 Z M163.7,337.8 L163.6,337.7 L163.6,337.7 L163.6,337.7 L163.6,337.7 Z","center":[-121.272237,37.93503],"quotes":[],"median-income":53253,"minimum-cost-living-family":59052,"poverty-rate":"15.80%","poverty-rate-increase":"3"},"Ventura":{"poverty-rate":"18.30%","percent-student":0.1758241758,"minimum-cost-living-family":68592,"percent-unstable-housing":0.2937878448,"number-apps":4459,"percent-with-children":0.3870823054,"percent-earned-income":0.600591716,"percent-with-seniors":0.09272563987,"path":"M282.2,648.5 L287.2,651.8 L284.8,653.0 L280.3,651.9 L279.2,648.9 Z M316.6,591.2 L307.6,587.2 L305.2,587.3 L300.2,583.5 L297.0,578.7 L296.4,576.0 L288.9,571.4 L283.6,567.4 L285.1,565.6 L285.6,561.2 L285.3,528.3 L288.9,528.3 L288.9,529.9 L295.4,529.8 L297.4,531.4 L297.4,534.6 L313.7,534.5 L313.7,536.1 L319.6,536.0 L335.2,572.5 L335.5,576.4 L333.4,576.4 L333.5,581.8 L326.0,581.9 L316.8,589.0 Z","center":[-119.133143,34.35874],"quotes":["I will be 65 next year. I am unemployed, just filed for unemployment which EDD approved and am currently searching for work as I have a mortgage and bills to pay. I am drawing on my retirement savings to pay for my mortgage, health insurance, car insurance and living expenses while I am out of work. The EDD monthly payment is to be about $380 and I have not yet received payment. I do not qualify for social security until I turn 66 in 2020. Jobs I am interviewing for are offering as low as $13.00 per hour. I have, therefore, reluctantly applied for this food aid program due to the high cost of living in California. "],"population":"823,318","median-income":77335,"poverty-rate-increase":"1.7"},"Kern":{"population":"839,631","path":"M285.3,528.3 L284.0,528.3 L283.4,528.3 L283.3,515.4 L277.9,514.6 L278.3,507.8 L271.4,508.2 L271.4,501.8 L262.7,501.7 L262.7,495.3 L258.4,495.3 L258.4,488.8 L251.3,488.8 L251.2,486.7 L245.8,482.4 L245.8,475.9 L239.3,476.0 L239.3,463.0 L272.2,462.7 L278.8,462.7 L307.0,462.3 L340.8,461.8 L343.1,461.5 L370.8,461.1 L375.8,460.3 L393.4,459.8 L394.1,477.0 L395.7,531.8 L393.5,531.9 L374.0,532.4 L343.4,533.5 L321.2,534.0 L319.6,536.0 L313.7,536.1 L313.7,534.5 L297.4,534.6 L297.4,531.4 L295.4,529.8 L288.9,529.9 L288.9,528.3 Z","center":[-118.729506,35.34662],"quotes":[],"median-income":48574,"minimum-cost-living-family":57576,"poverty-rate":"18.90%","poverty-rate-increase":"3.9"},"Inyo":{"population":"18,546","path":"M393.4,459.8 L375.8,460.3 L370.8,461.1 L370.8,455.6 L372.3,455.3 L370.7,446.7 L368.9,444.9 L366.2,435.4 L366.8,432.7 L364.4,430.2 L362.7,423.5 L364.4,421.2 L360.6,416.7 L360.7,413.8 L357.2,413.7 L355.1,409.9 L355.6,407.2 L352.5,404.7 L353.4,401.8 L350.6,399.7 L350.0,396.8 L347.8,395.0 L349.6,393.9 L348.0,391.0 L346.1,384.5 L347.8,380.5 L343.6,371.4 L343.0,368.1 L333.6,362.3 L330.0,362.1 L328.0,354.7 L329.2,353.3 L326.1,348.4 L324.7,349.4 L321.9,347.4 L321.6,343.6 L323.4,340.5 L322.4,338.5 L356.0,337.8 L377.9,337.1 L398.0,354.5 L435.9,387.4 L460.1,408.5 L500.2,443.2 L512.7,454.0 L512.7,454.0 L507.4,454.3 L507.5,455.4 L452.4,457.8 L449.9,457.9 L398.8,459.8 Z","center":[-117.403927,36.56197],"quotes":[],"median-income":45625,"minimum-cost-living-family":57984,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"Santa Clara":{"poverty-rate":"16.00%","percent-student":0.2,"minimum-cost-living-family":74088,"percent-unstable-housing":0.2993501219,"number-apps":4925,"percent-with-children":0.3841624365,"percent-earned-income":0.6067226891,"percent-with-seniors":0.09796747967,"path":"M178.5,376.3 L166.4,376.3 L164.5,374.2 L162.3,374.6 L160.8,377.4 L156.7,380.7 L156.8,379.2 L152.9,378.2 L150.2,375.5 L146.4,369.5 L142.5,366.6 L132.7,362.3 L130.4,358.9 L126.1,355.5 L123.4,351.7 L121.1,349.2 L120.5,346.1 L121.3,340.9 L126.0,338.4 L127.8,339.7 L130.5,338.6 L137.0,339.5 L140.5,337.3 L163.6,337.8 L163.6,337.8 L163.6,337.8 L164.5,344.1 L167.1,344.6 L167.4,350.4 L164.3,352.5 L164.4,354.9 L166.7,357.8 L167.4,361.9 L170.4,359.8 L171.9,361.2 L174.6,359.9 L177.9,363.5 L176.9,366.6 L178.9,368.4 L176.7,371.6 L176.7,374.7 Z M163.6,337.7 L163.7,337.8 L163.6,337.8 L163.6,337.8 L163.6,337.8 Z","center":[-121.690622,37.22077],"quotes":["My unemployment ends June 30th. I have not yet found steady work. I am trying my hardest to find work and keep food on the table for my child. I am desperate to feed my family and I really need help. ","I recently broke my hand and I'm going from job to job. I'm living on the streets in Gilroy, San Martin, & Morgan Hill. I don't do drugs or drink alcohol. At age 13 I was diagnosed with pseudohypoparathyroidism type 1b. At a young age I left the house and started living on my own, working, and feeding myself. Now I'm down and need a little help. My stomach is growling as I write this. "],"population":"1,781,642","median-income":93854,"poverty-rate-increase":"0.8"},"Orange":{"poverty-rate":"20.90%","percent-student":0.2124238197,"minimum-cost-living-family":69204,"percent-unstable-housing":0.2930376028,"number-apps":13619,"percent-with-children":0.3267493942,"percent-earned-income":0.5806451613,"percent-with-seniors":0.1031821856,"path":"M395.2,602.2 L401.2,609.6 L404.0,610.3 L404.2,613.8 L407.9,614.2 L411.8,617.4 L406.1,626.8 L406.2,629.0 L406.3,631.4 L402.1,632.9 L401.2,637.7 L397.4,633.9 L392.3,630.9 L389.6,627.7 L383.1,623.2 L376.9,620.1 L368.1,612.4 L371.5,604.7 L376.5,600.4 L376.4,597.2 L388.3,596.8 L394.8,601.8 Z","center":[-117.777207,33.67568],"quotes":["I am currently in difficult financial bind- never been in a postion such as now. Even help for one month would help my son and I immensely. I just started working my regular, consistent hours at the school. I was off during the summer and working our summer daycare for just about 3 hours a day except field trip days (1-2 times per week). I barely got by. I am almost embarrassed to be here, but hey, it happens, and I know I am not alone. First and foremost, my son needs to know that food will always be available. ","I used to average 30-35 hrs a week, but the last two months it's been fewer hours... last paycheck I grossed $275 for 22 hrs. I just need help for 6 months or less while we are in the slow period until work picks back up. Just worried about the coming months. ","I lost my job, the restaurant where I worked for the last 13 years was sold. My second job is only 1 hour 15 minutes every day serving lunch at a school district and we dont get paid during the summer break, my husband's second job is very variable sometimes he can work one or two days a week but sometimes he does not work at all for a month. In May we had to move because the owner of the condo where we were renting had to sell it. Our monthly rent increased by $700. We just found out that the electricity here in Fullerton is so much more expensive than Anaheim and we are already behind on payments with Edison for $390!! Our 7 year old kid used to attend after school program which was free, but in our new place we have to pay $70 registration and $305 a month; our kindergardener's new program was $55 registration and $385 a month! We can't afford our youngest boy's preschool anymore. After deducting the medical, vision, and dental insurance for the 5 of us and taxes, there's very little left my husband's paycheck. Not to mention all other expenses such as gasoline, food, clothes, etc...","I've had 3 back injuries this year. I work as a caregiver to the elderly in their homes. I go without pay when I take time off work or decline offered jobs from my agency due to my back injuries. I can only afford to eat once or twice a day and my health is declining. I buy most of my own food. I try my best not to eat the healthy foods that my parents buy or cook because my father is diabetic and my mother is prediabetic and they need healthy food for themselves. Also, I have about $1000 in a bank account that was gifted to me for school. The only reason I'm able go to college this Fall semester is because I got gifted that money. I have not touched that money for anything.","I never thought i would ever apply for this help, but things started to quickly go downhill when I got a DUI two years ago. I had a great job working as a tank driver delivering fuel to gasoline stations. I paid big time for my bad decision. I lost everything. I lost my job and then my girlfriend left with our kids because I didn't have any income. I fell into a big depression... I just need a little help for a couple months as I'm already working on getting my class A license again. ","It still feels strange to have to skip 1-2 meals a day. I don't like to think of myself as the type of person that complains about their situation either. I will always do anything in my power to overcome adverse situations. By applying for CalFresh, I don't see myself as complacent, but attempting to take control of my situation and the cards life has dealt me.","I may be having to move in the next 1 to 4 weeks, depending on the grace of my landlord, otherwise I will be homeless. I have no family support at this time and no friends willing or able to help me. I have pop tarts and tomato soup and frozen burritos until I can get help from Cal Fresh. I have multiple physical and mental health challenges and doctor appointments each week. ","We just recently moved here to California and are struggling each month with enough money to properly buy groceries after rent, insurance, gas, utilities, conservice and vehicle bills. I am currently pregnant which will make 4 in this household by November and I am nervous we won't be buy enough food. We cannot afford childcare so I have to stay home with my children. Hoping we can get any kind of help there is available, even a little goes a LONG way. ","I am a sophmore in college paying for my own rent, tuition, food, books, and all other expenses. I receive no financial assisance from either of my parents because they are not capable of doing so while also maintaining financially stablility themselves. I have to budget my spending on food especially. I have often skipped meals in fear that if I spend too much money on food I may not have enough funds to pay for rent. ","Sheltered, with long time friends. Unable to pay any rent, but help with their utilities when able. I pay for my cell phone only. I have not found fulltime work, despite a 4 year college business degree and 35 years of experience, since 2008. All resources meant for retirement have had to be used, and are depleted. Until last summer, I had paid all my bills on time for 35 years. Bankruptcy is scheduled next month. The car goes to repo tomorrow. I have HIV and am disabled depending on which social service or doctor you talk to, and am unable to get SSI. I am unable to get a job interview for full-time anything, all in my 50's. Well, it was damn good until 2008. Thank you for letting me vent a little. So glad I didn't have a mortgage, or children. I would have been a great dad.","I was a caregiver for and lived with my dad who passed in 2016. My sisters want to sell the house even though they know my son, nephew, and I have no place to go. I am disabled but have not applied for SSI yet until I talk to a surgeon. I feel like I messed up the rest of my life so that my parents didn't have to go in nursing homes. I am so hungry. My dad said whoever is living in the home can stay in it and he preferred the house stays in the family.","I am the only one who takes care of my groceries, medical bills, CT scan test. I had to leave my job of 9 years as I became very ill with lung cancer, despite never having smoked. I now only have 1/2 of my right lung. I cannot work as I still struggle with this health issue. I have no income, used all my disablity, and have exhaused my unemployment insurance. I am still disabled it has only been since August end of the month that I was released. I cannot pay my rent, copays for oncologist. After 3 hours of light activity I get very exhaused and my body aches. I have back lumbar pain and still recovering from two surgeries to remove the cancer. I am sure if I had money I could get food and that will boost my energy a little. I need help please. Right away I am hungry and need food. "],"population":"3,010,232","median-income":75998,"poverty-rate-increase":"1.4"},"Solano":{"poverty-rate":"15.60%","percent-student":0.1029380227,"minimum-cost-living-family":62976,"percent-unstable-housing":0.351704911,"number-apps":4663,"percent-with-children":0.3752948745,"percent-earned-income":0.5270684372,"percent-with-seniors":0.09330759331,"path":"M109.7,287.2 L122.0,287.4 L120.9,285.6 L122.6,278.8 L121.6,275.6 L129.8,275.7 L129.4,272.4 L126.4,267.3 L127.8,261.1 L130.5,260.8 L133.1,263.0 L137.3,259.7 L142.0,259.4 L144.7,260.4 L149.0,259.6 L151.5,260.4 L151.4,276.2 L157.2,276.3 L155.8,284.9 L153.1,285.9 L151.6,288.5 L148.1,292.8 L144.8,294.6 L143.0,294.0 L142.4,293.6 L141.4,294.0 L135.0,293.6 L132.4,291.8 L133.3,288.9 L130.1,289.2 L125.6,295.8 L117.4,293.3 L115.8,290.8 L110.0,287.8 L109.7,287.2 Z M149.0,293.2 L149.8,292.5 L150.4,291.9 L150.0,293.1 Z","center":[-121.939594,38.26722],"quotes":["After taking six weeks of paid family leave to care for my ailing husband, my employer said there was no work for me. I applied for unemployment benefits, which I received and am currently on. Once my husband passed away, we stopped receiving his disability benefits and can't pay for rent and utilities. ","I have a workers compensation claim. I have now been switched to Permanent Disability and that amount is only $580 every 2 weeks. This has left me in a really bad place. At this time I am waiting a hearing on my case. I am in limbo but in the meantime my family is suffering due to this hardship. I am a hard working person who has been off work since May 2017! I am in depression!"],"population":"413,344","median-income":67341,"poverty-rate-increase":"1.7"},"San Benito":{"population":"55,269","path":"M178.5,376.3 L177.3,378.9 L179.5,379.8 L182.8,385.6 L196.0,392.8 L214.7,411.4 L215.1,423.2 L211.4,424.1 L210.2,427.7 L206.1,424.6 L208.5,432.4 L205.2,432.4 L199.0,425.8 L195.7,424.5 L193.7,427.1 L188.5,427.4 L188.5,423.5 L179.5,414.4 L176.5,409.9 L172.5,410.2 L173.5,408.4 L171.5,406.3 L172.1,402.2 L170.3,399.4 L166.8,398.7 L163.3,396.6 L164.3,393.7 L159.2,389.0 L154.3,384.6 L153.0,381.1 L153.0,381.1 L153.0,381.1 L153.9,379.8 L156.7,380.7 L160.8,377.4 L162.3,374.6 L164.5,374.2 L166.4,376.3 Z","center":[-121.085296,36.6107],"quotes":[],"median-income":67874,"minimum-cost-living-family":65328,"poverty-rate":"19.30%","poverty-rate-increase":"2.9"},"San Diego":{"poverty-rate":"20.10%","percent-student":0.1853981619,"minimum-cost-living-family":68340,"percent-unstable-housing":0.323612466,"number-apps":38954,"percent-with-children":0.3266673512,"percent-earned-income":0.5749611417,"percent-with-seniors":0.0944817128,"path":"M401.2,637.7 L402.1,632.9 L406.3,631.4 L406.2,629.0 L415.2,628.7 L414.8,629.8 L423.0,632.6 L423.0,633.8 L436.1,633.7 L494.7,631.3 L496.2,657.3 L494.8,657.3 L496.2,691.1 L432.6,700.0 L431.7,694.0 L429.7,690.1 L426.0,689.1 L427.1,686.9 L429.5,687.9 L432.5,694.6 L433.8,693.6 L431.7,688.5 L426.8,686.0 L423.9,687.9 L423.7,681.8 L421.9,677.9 L423.7,674.3 L422.1,666.3 L418.8,657.9 L416.2,653.8 L406.7,641.5 Z","center":[-116.776117,33.0236],"quotes":["I am currently a graduate student and will soon be moving to San Diego. Since I am moving I was forced to quit my job. Unfortunately, my mother lost her job a few years back and is unable to support me financially. My father, who now lives in Texas, is also unable to support me. The financial aid I have recieved from school only covers money for tuition, books, rent, and utilities. I currently don't have the income to purchase food, toiletries, and other necessary items. Recieving an EBT card would lift a large weight off my shoulders, I could focus more on my education rather than how I'm going to make ends meet each month.","We relocated to San Diego to be close to family because of our health problems, but we have been unable to secure any permanent housing yet and have been going broke paying for nightly budget motels which double their rates every weekend. We will most likely be living in our car starting tommorow until my wife's next social security check comes in next week and then back to a motel until we can secure housing i am disabled with copd and require medical oxygen and a sleep apnea machine wife has renal failure and confined to a wheelchair. ","My school referred me to CalFresh. I am a senior in college and live on my own. As rewarding as that feels, at the end of the day, I do struggle a lot with paying bills and still having money left over to buy food. No one else supports me, so with the little money I have left over I am normally only able to afford unhealthy meals. If I were to have the oppurtunity to receive some type of financial assistance, I feel that I would be able to be a heathier person and feel beter throughout the day while studying. ","I spend about $200 on groceries and another $200 on car insurance. My commute to work is 40 miles every day, and it takes about $50 to fill my tank every week ($100 every pay period). I work & I work hard, but I can't do this on my own. I'm tired of just surviving, I'm ready to start thriving. I'm making progress to where I want to be in life, but right now I need some help. Sometimes my roommates eat my food while I'm away at work, so what was supposed to last me a couple of days only lasted a night. I can't afford to keep buying groceries, so I'm just about living off of multi-vitamins & protein shakes. Even if you can't help me, thank you for taking the time to look at my case, & I hope you're having a great day when you read this. ","As my children are getting older, they are consuming more. Their father, who lives in Colorado, will not increase his monthly child support payments to help cover costs as our children get older. I am a self-employed single mother and in addition have now have taken on the caregiver role for my elderly folks, one with dementia and the other who recently had a brain injury. I am not able to make ends meet. Receiving CalFresh benefits would greatly help my situation. ","I am on workers comp. The last 2 months have been hard food wise. My husbands mom sends cash from Russia to help with our rent and my brothers are loaning me money to cover my bills until I get my settlement and can pay them back but it leaves us with only about $150 for food every month for 2 people. My husband is worried about it affecting his immigration status and so thats one of the main issues we are worried about.","This past Friday, my doctor told me I was disabled. I won't recieve income until I am approved for disability insurance so I have an account balance of 0 dollars. In addition, my significant other (with whom I live and share the bills) suffered from a comound fracture in her ankle two days ago. She had to have surgery to reinforce her bones with metal plates and screws. She will be discharged today. The doctor is not allowing her to work for four to six weeks and she only has 600 dollars in her bank account. "],"population":"3,095,313","median-income":63996,"poverty-rate-increase":"1.3"},"Trinity":{"population":"13,786","path":"M82.4,151.8 L47.7,150.9 L47.8,149.0 L49.6,94.5 L48.9,87.8 L45.6,80.2 L49.2,78.9 L53.5,81.7 L58.0,74.5 L57.1,71.2 L54.9,69.7 L56.9,66.7 L58.2,62.2 L65.6,66.6 L67.4,70.2 L74.7,70.4 L77.7,72.6 L78.6,75.8 L82.7,75.3 L85.3,76.7 L86.5,74.2 L85.1,70.9 L82.7,70.1 L82.4,67.9 L84.6,63.1 L87.5,61.1 L91.6,61.4 L96.6,58.2 L97.3,56.2 L100.6,55.2 L101.1,52.6 L104.2,52.6 L106.4,50.0 L110.4,53.2 L108.4,55.8 L107.8,61.0 L109.1,63.3 L112.0,65.1 L111.3,69.7 L108.1,70.3 L107.2,75.7 L102.6,79.8 L102.9,84.1 L99.1,89.5 L98.8,93.4 L95.9,95.8 L95.7,99.1 L94.0,99.4 L96.3,103.8 L96.8,108.4 L95.5,108.0 L91.9,110.4 L91.4,112.4 L88.4,113.0 L85.0,117.3 L79.6,119.2 L79.7,120.8 L75.5,125.4 L75.6,128.8 L79.8,131.6 L80.8,136.4 L79.6,139.4 L81.1,142.8 L81.5,150.3 Z","center":[-123.114404,40.64772],"quotes":[],"median-income":36862,"minimum-cost-living-family":57204,"poverty-rate":"17.20%","poverty-rate-increase":"2.7"},"Kings":{"population":"152,982","path":"M238.1,463.0 L235.3,458.9 L236.3,456.5 L232.0,454.3 L253.2,434.0 L253.2,417.8 L265.4,417.6 L270.6,416.3 L276.1,411.1 L278.8,411.2 L278.9,417.5 L282.1,417.5 L282.2,427.3 L278.9,427.3 L278.6,437.0 L278.8,462.7 L272.2,462.7 L239.3,463.0 L238.5,463.0 Z","center":[-119.81553,36.07247],"quotes":[],"median-income":47341,"minimum-cost-living-family":57084,"poverty-rate":"16.80%","poverty-rate-increase":"2.6"},"Del Norte":{"poverty-rate":"15.50%","percent-student":0.09090909091,"minimum-cost-living-family":58128,"percent-unstable-housing":0.3636363636,"number-apps":121,"percent-with-children":0.3223140496,"percent-earned-income":0.6571428571,"percent-with-seniors":0.07438016529,"path":"M22.1,39.8 L20.5,32.2 L20.6,29.5 L18.7,24.9 L17.8,19.5 L15.5,19.2 L12.2,16.3 L14.9,11.0 L16.1,2.8 L15.6,0.0 L46.4,1.4 L54.1,1.2 L51.2,8.4 L46.9,9.2 L45.2,13.2 L43.4,13.6 L45.5,22.2 L41.9,30.8 L44.0,31.0 L43.2,33.8 L45.7,35.5 L47.5,40.9 L44.6,46.8 L38.5,46.6 L38.7,40.5 Z","center":[-123.980998,41.7499],"quotes":[],"population":"28,610","median-income":39302,"poverty-rate-increase":"3.3"},"Monterey":{"poverty-rate":"19.30%","percent-student":0.2317148125,"minimum-cost-living-family":64452,"percent-unstable-housing":0.266441303,"number-apps":3254,"percent-with-children":0.4081130916,"percent-earned-income":0.6021126761,"percent-with-seniors":0.06545789797,"path":"M232.0,454.3 L236.3,456.5 L235.3,458.9 L238.1,463.0 L209.9,462.9 L169.8,462.4 L163.0,455.6 L161.4,448.5 L156.9,445.6 L153.1,438.7 L147.3,432.4 L141.0,428.5 L137.2,424.4 L136.4,415.6 L134.1,408.2 L135.4,405.4 L132.8,404.3 L135.3,399.6 L138.2,402.4 L141.2,400.0 L142.7,396.5 L144.3,387.4 L143.0,384.2 L147.0,379.8 L152.0,379.5 L153.0,381.1 L153.0,381.1 L153.0,381.1 L153.0,381.1 L155.7,385.3 L159.2,389.0 L161.2,391.2 L164.3,393.7 L163.3,396.6 L166.8,398.7 L170.3,399.4 L172.1,402.2 L171.5,406.3 L173.5,408.4 L172.5,410.2 L176.5,409.9 L179.5,414.4 L188.5,423.5 L188.5,427.4 L193.7,427.1 L195.7,424.5 L199.0,425.8 L205.2,432.4 L208.5,432.4 L206.1,424.6 L210.2,427.7 L213.3,432.5 L210.8,435.6 L211.9,439.5 L214.8,440.0 L215.3,442.2 L222.1,446.7 L224.9,449.8 L229.3,450.1 Z","center":[-121.315573,36.2401],"quotes":["I was working full time at a large hotel in Monterey. I had good pay, but was offered a job at a local business for higher pay and Monday-Friday (since hotels are open 24/7 a M-F schedule seemed like a luxury). The hiring job asked me to put in my two weeks notice for my past job. I was already training for my new job when they called me and said the position wouldn't work out since they didn't have it in the budget. Now I'm unemployed and applying for jobs. My partner cannot afford to support us on his $400/per 2 week pay checks. ","My unemployment ran out in April. I am under a one year lease. My son works where I used to work, and he has the only income for the family. The rent is all of our income. My other children are in college full time and there is no work-study this year. They are on grants for their academics through PELL and SEOG. I really want someone who can evaluate our situtation and provide resources. Thank you.","Even if our income is around $3,000 per month, with credit card bills, auto insurance, gas, clothes, diapers, utility bills, repairing the old car, etc... it gets expensive and times we cannot keep up with affording food so spending $8 for 4 on McDonalds or boiling potatoes with salt is what we have to do to survive. Because of our income my kids are no longer able to have MediCal and if we have to pay for overpriced health insurance, we might as well be homeless. ","I have a car payment that's $336 every month and a weekly daycare bill of $175. After rent, the phone bill, and gas, I have nearly nothing to spend on food. I often don't eat so that my child can eat. I feel terrible feeding him cheap unhealthy food because I enjoy cooking but I can't afford the ingredients to even cook anything. It's embarressing, but I often eat leftover food at work or the school cafeteria so I have the energy to function. So I would absoulutely appreciate any help I can get.","Not sure if this helps at all. The last time I had to renew my CalFresh all I needed to do was to update and give some paperwork and I kept forgetting, just like I forget a lot of things and stress about them. I struggle from paycheck to paycheck and at times I do ask my parents for money or food especially because my daughter is growing and eating more. We do live in a low income housing and we qualify for the HEAP program for our PGE. I do go to the food bank when I can which is a big help but we still need help with other foods."],"population":"415,057","median-income":58582,"poverty-rate-increase":"2.9"},"Santa Cruz":{"poverty-rate":"23.80%","percent-student":0.5684360382,"minimum-cost-living-family":69384,"percent-unstable-housing":0.1801911735,"number-apps":4917,"percent-with-children":0.163310962,"percent-earned-income":0.5831381733,"percent-with-seniors":0.03828140908,"path":"M153.0,381.1 L152.0,379.5 L147.0,379.8 L143.0,384.2 L140.2,378.4 L135.7,374.6 L133.5,376.3 L129.2,376.7 L122.9,374.5 L117.1,368.3 L114.8,364.7 L113.5,358.8 L117.9,358.6 L117.9,356.8 L123.3,356.9 L123.4,351.7 L126.1,355.5 L130.4,358.9 L132.7,362.3 L142.5,366.6 L146.4,369.5 L150.2,375.5 L152.9,378.2 L156.8,379.2 L156.7,380.7 L153.9,379.8 L153.0,381.1 Z","center":[-122.007205,37.01248],"quotes":["I have never lived on my own before - much of it can be overwhelming, especially when everything that I used to have help with I now face alone. I realized how quickly things add up and its more and more stressful to keep up. I'd like to think I can make it without assistance but the reality is I'm not in a place where I can do that yet. Living paycheck to paycheck is like a scheduled anxiety attack. My health and weight have declined greatly since moving out because the only food I can afford for myself is fast food & dollar tree items. I get sick more often due to my poor health. My goal is to be able to purchase more groceries that are healthier & more nourishing. ","I finally have stable housing and going back to school. It would be extremely beneficial for me to have CalFresh as an option while I'm a student so I don't have to worry so hard about where my food income is coming from. ","I have just recently moved to Santa Cruz. I am a fourth year student and I have come here because in two weeks I have training for an on-campus job. But for now I have no source of income for groceries. I also am not recieving any finanicial support from my mother because she has to support my three brothers back home. And my father has recently gotten released from jail and we've had very little contact in the past seven months. This is the first time that I will live off campus and not have a meal plan. ","I have an adult daughter in Portland, OR with type one diabetes and a rare renal tube disorder called Gitlemans syndrom. She cant work much but is proud and works as much as she can. I help her a great deal financially. I don't get enough nutritcious food to eat. I retired at age 65 because my physical job of retail grocery casheir was taking a toll on my body and mental health. I am waiting until age 66 (my full retirement age for social security) because I will need the bit of extra money that I'll receive by waiting. I have never asked for help before and neither has anyone in my immediate family and I have a bit of shame about applying for this food assistance, but I've been urged by a medical provider to not be so proud and to apply for some short term assistance."],"population":"262,382","median-income":66923,"poverty-rate-increase":"1.7"},"Modoc":{"population":"9,686","path":"M174.3,64.2 L171.1,64.2 L167.9,64.2 L168.2,20.3 L167.8,20.3 L167.9,7.4 L168.5,3.9 L199.9,4.4 L248.6,4.3 L248.8,64.3 L211.5,64.4 Z","center":[-120.71837,41.59291],"quotes":[],"median-income":38560,"minimum-cost-living-family":55620,"poverty-rate":"15.50%","poverty-rate-increase":"3.3"},"Butte":{"poverty-rate":"20.60%","percent-student":0.5080440305,"minimum-cost-living-family":58524,"percent-unstable-housing":0.1858594412,"number-apps":4724,"percent-with-children":0.1756985605,"percent-earned-income":0.5432780847,"percent-with-seniors":0.04322949777,"path":"M140.0,202.8 L140.8,200.1 L141.1,197.0 L142.3,192.1 L142.0,187.7 L143.2,185.7 L135.4,185.8 L135.6,178.7 L137.0,177.3 L138.0,172.4 L132.7,166.2 L131.4,163.0 L132.9,159.9 L146.6,160.0 L149.7,158.4 L152.4,152.7 L155.7,152.9 L156.3,149.7 L158.6,147.4 L159.2,144.2 L163.5,144.3 L166.8,142.7 L167.7,140.5 L171.6,145.4 L168.6,150.6 L169.1,154.8 L167.9,158.0 L168.9,161.3 L171.8,162.5 L172.4,164.7 L180.3,172.1 L184.5,179.4 L187.9,181.7 L183.7,184.7 L183.7,186.9 L174.8,187.3 L172.8,191.3 L173.0,194.3 L168.8,200.6 L159.8,203.0 L157.0,202.0 L156.3,203.7 L156.0,202.9 Z","center":[-121.601919,39.66595],"quotes":["I have been unemplyed this last month. I am in the process of getting hired at an on campus job in university housing, though I have multiple applications out for more job opportunities. Although some of my schooling is covered through CalVet college fee waiver program, I am struggling to cover extra school fees and books. I am trying to further my future by earning a degree to one day be finacially stable and available to help others in need.","This is my 2nd year at CSU Chico and during my first year I had no problems with money as my financial aid covered most of it, the rest was barely paid for by my parents. I found out last year after multiple visits to the financial aid office that for the rest of my education that I will not be getting almost any financial aid. It was for the reason that my parents just barely made the line of which to receive financial aid and so I ended up getting $750 (in grants) this year instead of the $12,000 (in grants) from last year. My dad works as a construction worker and it's only on certain weeks that he gets paid good which ends up making it like we have money but in reality, the pay is inconsistent. Anyways seeing this my parents and friends have told me to drop out but I really did not want to give up on college. I am looking for a job to help cover my expenses. "],"population":"220,000","median-income":43165,"poverty-rate-increase":"2.4"},"Alameda":{"poverty-rate":"16.70%","percent-student":0.3563768945,"minimum-cost-living-family":73524,"percent-unstable-housing":0.2677294824,"number-apps":13988,"percent-with-children":0.2412782385,"percent-earned-income":0.5326678766,"percent-with-seniors":0.08018024462,"path":"M113.6,314.6 L115.7,311.2 L114.3,306.5 L117.6,305.9 L120.0,307.8 L122.1,312.1 L124.7,313.4 L130.3,313.9 L133.1,316.6 L132.2,317.7 L135.2,319.9 L158.9,312.9 L158.7,333.2 L161.8,334.5 L163.6,337.7 L163.6,337.7 L163.6,337.7 L163.6,337.7 L163.7,337.8 L163.6,337.7 L140.5,337.3 L137.0,339.5 L130.5,338.6 L127.1,335.7 L124.1,330.0 L123.2,323.7 L117.5,317.8 L120.2,316.7 L113.7,314.9 L113.6,314.7 Z","center":[-121.913304,37.64808],"quotes":["I am doing a \"year of service\" for Habitat for Humanity and Americorps. I will be building multi-family homes and tiny homes for lower-income families and the homeless. Because this is a service position I will only be provided with a very small living stipend (~$900 a month). I am a recent college graduate who just finished paying off their student loans and because of that, I don't have much money saved.","I was married when I came out of the closet. I couldnt get out of the marriage even though my wife long knew that I was gay so I went to my mom's. My mom couldn't accept me being gay, nor could my siblings. I left for the Bay Area. I originally planned to pay the bills driving for Uber, but my car was stolen. I have a new job, but need to wait two weeks before getting paid so I can buy basic things like food. ","I'm currently enrolled at UC Berkeley and my finances are very tight. I receive some money in grants and scholarships but I take out $5,000 in loans every year and I have to work part-time 10-15 hours/week. I've been doing this since my first year in college and I am now entering my final year. I come from a single parent, low-income household so I cannot ask my dad for financial help. My dad only makes $25-30K a year and he pays for health insurance, the mortgage on a house, utilities, and car expenses so I never wish to put a larger burden on him. I received EBT last year and it was extremely helpful. I was able to buy healthy groceries. ","I just moved to CA for school, I am getting my teaching credential. I made and saved money over the summer, but it will be difficult for me to work as I have to do 15-20 hours of unpaid student teaching a week in addition to my classes. While my rent and utilities are part of my school expenses that are being mostly covered by student loans, I still have to make loan payments, pay for insurance, gas, groceries, etc. in addition to the fees for tests to get my credential. I have no family support in CA.","I'm struggling really bad, to the point of being in debt. I know that other bills don't count in this process but I have lived here on my own for almost 4 years paying 1800 for just bills alone every month, trying to pay off debt, school, etc. I never have enough to eat. Ramen noodles, eggs, cereal everyday just to save up money for bills. I've been going to the hospital to see what is wrong with me, but I believe I just need to eat properly. I'm almost 22 now, and I have another year of school. I honestly don't know how I will make it if I have no family here. ","I am currently applying for grad school, which is extremely expensive. We are still living in Berkeley even though we both graduated. The rent is extremely high here and we receive absolutely no financial assistance from our parents. Since we graduated from UC Berkeley this past summer, we are also no longer receiving financial aid, which has significantly impacted our ability to support ourselves. We both now work in San Francisco and transportation to and from the city every day is quite costly. We are struggling to find the extra funds to feed ourselves after paying for rent, utilities, public transit, loans, grad school applications, and everything in between.","I work twice a week, which is the most that I can work with my school schedule. Last semester was very hard. I would either have class all day, or have class and get off and work, or on weekends I would work. I did not have a single day off for 4 months straight to skim by. I would have to choose between eating or school supplies. This is affecting my mental and physical health. I hope that I can make this year better, and be excited for school, not dread it... ","I'm in medical school and am taking out ~$33,000 in loans every four months. I'm spending more than half of my loan money on rent and utilities. Since I'm in medical school, I have to do volunteer work to gain more knowledge and skills in order to be the best doctor I can become. I have no time outside of this to work for money, or else I'd be jeopordizing my education. Because of the high cost of living in the Bay Area, I'm struggling to pay for groceries, basic living expenses, and car insurance so that I can get to and from the clinic I'm volunteering in at Martinez. I do not buy as much food as I need because of the expenses of living and the books/technology/transportation costs required for me to learn medicine.","I do not receive any financial support from my father, and my mother works tirelessly in two jobs to feed my younger brother and to help me with college. I help my mom pay the water, light and gas bills for our apartment back in southern California, and I also pay the water, gas, and light bills for my apartment here in Berkeley. Our financial situation is not the best, and a CalFresh card would be a huge blessing and support."],"population":"1,510,271","median-income":73775,"poverty-rate-increase":"1.2"},"Plumas":{"population":"20,007","path":"M191.7,178.6 L189.4,180.5 L187.9,181.7 L184.5,179.4 L180.3,172.1 L172.4,164.7 L171.8,162.5 L168.9,161.3 L167.9,158.0 L169.1,154.8 L168.6,150.6 L171.6,145.4 L167.7,140.5 L167.6,137.3 L171.6,136.1 L173.0,128.7 L171.0,126.6 L166.0,125.8 L165.8,120.4 L164.5,118.7 L171.9,118.8 L174.1,118.9 L189.1,118.9 L189.0,132.9 L192.3,135.6 L195.6,135.6 L196.6,137.8 L199.8,137.2 L199.8,134.1 L204.1,131.4 L205.9,128.6 L212.2,129.2 L216.5,132.5 L220.3,133.6 L221.8,136.8 L229.9,143.5 L235.2,144.0 L237.4,145.6 L237.8,151.0 L240.0,154.3 L243.1,156.4 L243.1,169.3 L241.0,173.6 L212.1,173.7 L210.5,175.9 L206.6,172.7 L204.2,173.4 L202.8,170.7 L199.6,168.5 L196.1,171.3 L195.2,176.1 Z","center":[-120.829516,39.99517],"quotes":[],"median-income":48032,"minimum-cost-living-family":57420,"poverty-rate":"15.50%","poverty-rate-increase":"3.3"},"Glenn":{"poverty-rate":"17.20%","percent-student":0.1862745098,"minimum-cost-living-family":56748,"percent-unstable-housing":0.2254901961,"number-apps":102,"percent-with-children":0.4117647059,"percent-earned-income":0.5555555556,"percent-with-seniors":0.07843137255,"path":"M141.1,197.0 L134.3,196.8 L134.4,194.7 L127.1,194.5 L127.0,196.6 L92.5,196.1 L93.0,181.5 L84.4,181.3 L84.3,171.8 L81.7,168.8 L81.9,165.1 L87.2,165.1 L132.7,166.2 L138.0,172.4 L137.0,177.3 L135.6,178.7 L135.4,185.8 L143.2,185.7 L142.0,187.7 L142.3,192.1 Z","center":[-122.4017,39.60254],"quotes":[],"population":"28,122","median-income":40106,"poverty-rate-increase":"2.7"},"Colusa":{"population":"21,419","path":"M141.1,197.0 L140.8,200.1 L140.0,202.8 L137.6,207.5 L137.7,211.9 L140.9,220.0 L143.2,220.1 L144.8,226.2 L143.8,230.9 L133.3,230.7 L114.7,230.5 L110.7,227.5 L110.6,223.3 L106.1,220.8 L105.7,215.7 L107.1,211.9 L105.0,209.2 L101.7,209.5 L95.5,206.8 L91.2,203.3 L90.3,201.3 L92.5,196.1 L127.0,196.6 L127.1,194.5 L134.4,194.7 L134.3,196.8 Z","center":[-122.237563,39.17773],"quotes":[],"median-income":50503,"minimum-cost-living-family":57312,"poverty-rate":"17.20%","poverty-rate-increase":"2.7"},"Alpine":{"population":"1,175","path":"M271.0,275.4 L267.4,272.6 L267.3,269.1 L264.2,268.8 L256.7,273.4 L248.8,267.7 L245.7,266.7 L245.7,262.1 L245.6,253.6 L245.6,247.8 L251.8,242.4 L256.7,235.8 L255.2,230.7 L259.4,234.3 L273.8,246.8 L272.1,250.4 L271.9,255.0 L276.4,262.6 L275.4,269.2 L271.9,270.5 L272.8,272.5 Z","center":[-119.798999,38.61761],"quotes":[],"median-income":61343,"minimum-cost-living-family":57600,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"Humboldt":{"poverty-rate":"19.60%","percent-student":0.261575179,"minimum-cost-living-family":59760,"percent-unstable-housing":0.2706443914,"number-apps":2095,"percent-with-children":0.2114558473,"percent-earned-income":0.5707070707,"percent-with-seniors":0.04538939322,"path":"M44.6,46.8 L53.5,47.0 L55.0,48.3 L56.5,57.0 L55.7,57.9 L58.2,62.2 L56.9,66.7 L54.9,69.7 L57.1,71.2 L58.0,74.5 L53.5,81.7 L49.2,78.9 L45.6,80.2 L48.9,87.8 L49.6,94.5 L47.8,149.0 L36.0,148.6 L20.6,148.1 L17.4,145.5 L15.6,140.1 L11.7,138.3 L9.9,135.6 L2.0,128.1 L3.1,123.9 L2.2,119.6 L0.0,114.6 L1.5,109.8 L6.1,99.8 L10.5,91.7 L9.2,96.1 L11.8,96.0 L14.2,88.5 L17.3,88.3 L19.5,85.4 L15.6,84.2 L11.4,91.8 L10.9,91.1 L14.3,85.2 L17.0,78.8 L18.5,71.0 L16.6,69.6 L15.9,63.7 L18.2,60.6 L20.4,52.7 L22.4,42.0 L22.1,39.8 L38.7,40.5 L38.5,46.6 Z","center":[-123.925818,40.70667],"quotes":["I was a full time federal government employee until over a month ago. I am disabled with anxiety and bi-polar. I'm applying for disability. I expect us to have trouble with food expenses for the next few months.","My bank account balance is -$136.00. All of my credit cards are maxed out and I do not know how I am going to buy food, pay my utilities or put gas in my car, let alone pay the rest of my bills this month. I am job hunting, but I have a child with autism and he goes to a special school program for only 3 hours a day. I am a single mom and have both kids full time. "],"population":"134,623","median-income":42153,"poverty-rate-increase":"3.1"},"Los Angeles":{"population":"9,818,605","path":"M345.9,679.0 L341.0,670.4 L339.6,665.5 L346.8,673.8 L355.2,681.2 L350.4,682.5 Z M345.8,637.2 L340.4,635.7 L338.4,632.8 L342.7,632.7 L353.1,637.6 L357.0,642.8 L356.0,645.6 L352.9,644.2 L347.4,644.0 L346.1,642.3 Z M368.1,612.4 L364.6,611.0 L360.8,613.7 L358.9,612.5 L357.4,615.7 L349.9,613.0 L348.9,610.6 L351.0,606.0 L347.6,597.7 L345.1,594.0 L341.3,591.2 L328.7,591.9 L325.2,594.4 L322.3,591.9 L316.6,591.2 L316.8,589.0 L326.0,581.9 L333.5,581.8 L333.4,576.4 L335.5,576.4 L335.2,572.5 L319.6,536.0 L321.2,534.0 L343.4,533.5 L374.0,532.4 L393.5,531.9 L394.1,551.4 L396.0,571.3 L394.3,580.7 L391.1,591.4 L389.1,591.1 L387.1,594.7 L388.3,596.8 L376.4,597.2 L376.5,600.4 L371.5,604.7 Z","center":[-118.261862,34.19639],"quotes":[],"median-income":55870,"minimum-cost-living-family":65988,"poverty-rate":"24.30%","poverty-rate-increase":"2.3"},"Sonoma":{"poverty-rate":"17.10%","percent-student":0.153437816,"minimum-cost-living-family":66312,"percent-unstable-housing":0.2886754297,"number-apps":3956,"percent-with-children":0.3513650152,"percent-earned-income":0.5326975477,"percent-with-seniors":0.1057424741,"path":"M110.0,287.8 L109.4,288.8 L104.3,290.3 L100.5,285.0 L95.6,285.0 L90.3,282.9 L81.1,274.6 L75.1,276.0 L71.7,275.9 L70.5,268.8 L68.2,264.5 L61.1,259.7 L56.4,255.4 L52.1,247.9 L45.3,240.2 L47.5,239.5 L55.0,239.8 L55.1,237.7 L68.5,237.9 L68.5,235.6 L71.8,234.8 L86.8,235.3 L90.9,238.8 L94.0,245.8 L96.6,246.2 L97.7,249.1 L96.5,254.1 L97.9,257.0 L102.3,260.1 L103.0,263.8 L105.7,265.1 L104.8,267.2 L107.6,270.6 L110.6,276.2 L110.0,277.9 L112.1,280.5 L111.7,287.0 L109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 Z","center":[-122.945194,38.53257],"quotes":["My husband is a carpenter and his job is not steady. Last month was a good month and he grossed about $3.000.00, but not every month is not like that. Our bills are so behind. The fires really did us in - my husband was out of work for over 30 days. My oldest son has been diagnosed with autisim, and has some heart problems. My boys are growing and feeding them has taken a huge toll on our finances.","I lost my home in the Tubbs Fire, and because of complications with FEMA not being able to understand that I was renting a room out of a large home with multiple people sharing the same situation as I, I did not receive lodging assistance. All of my money that I did receive from FEMA ended up going to hotel costs. After couch surfing for 6 months, I finally found a friend who had a room opening up. Unfortunatly I had spent everything on hotel costs, rental aplications, and simply trying to get my life back together. I have nothing left. Not even enough to spare for yet another rental application that will most likely be denied. I need help. I can't even afford to buy myself a new bed. I'm putting myself in debt because I thought now would be a good time to see a dentist after 7 years... I figure no one is going to actually read this anyway, so it's mostly just venting. Maybe I'll get lucky, and who ever's in charge of this case will at least get an understanding of what those of us who didn't own 3 homes before the Tubbs Fire are struggling with.","I ended up living out of my car for the last six months and have just moved into a room for rent which i found throguh my current employers. I am now working in a wine cellar, but the \"internship\" only lasts until November. I make 4 paychecks of $1100 which have to last me until March when I travel south for work again, which makes me enough money to move back here in time for another cellar position in August. I eat nutrigrain bars from the work pantry as my main caloric intake in the mornings. I have been cooking lentils and rice for most of my meals at home. Sometimes when I'm bored, I'll do the math to figure out how I can spend $3 on food that day instead of the usual $2 budget I give myself. I'm 6'5'' and am dropping weight and starting to lose my cognitive functions. Please let me partake in this help temporarily. All I know right now is that I need to eat, then I can figure out the rest. My parents are in no position to help financially as one is on disability in Modesto worst off than me, and the other just texted me that he's been worrking 30 days straight in the sun doing construction. He's 60. I am 28, hoping to have enough to eat by my birthday coming up on the 8th of September. Whoever reads this, thank you."],"population":"483,878","median-income":63799,"poverty-rate-increase":"1.2"},"Mariposa":{"population":"18,251","path":"M227.5,326.9 L227.5,326.8 L227.5,326.8 L227.2,323.2 L231.1,325.7 L232.2,324.5 L229.9,320.1 L238.4,317.2 L240.0,314.6 L242.7,315.9 L245.5,312.4 L255.6,317.6 L258.1,316.5 L261.4,317.7 L270.4,313.6 L270.9,310.9 L273.0,310.4 L275.5,306.8 L277.4,306.7 L280.9,310.1 L283.7,309.3 L285.0,311.4 L288.1,312.2 L290.7,315.7 L274.7,332.0 L274.8,336.8 L272.9,339.3 L270.8,339.3 L270.9,342.6 L264.3,342.7 L247.3,360.1 L244.9,357.1 L241.9,355.9 L234.7,344.0 L234.1,340.9 Z","center":[-119.91286,37.57003],"quotes":[],"median-income":50560,"minimum-cost-living-family":57816,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"Nevada":{"poverty-rate":"17.20%","percent-student":0.1020710059,"minimum-cost-living-family":63156,"percent-unstable-housing":0.300295858,"number-apps":676,"percent-with-children":0.3357988166,"percent-earned-income":0.5652173913,"percent-with-seniors":0.1022222222,"path":"M249.3,192.9 L249.2,198.2 L249.2,202.5 L212.5,202.6 L207.8,204.6 L197.3,213.3 L192.9,218.3 L189.6,224.8 L186.0,224.9 L184.1,223.0 L179.3,224.9 L175.9,223.2 L175.9,223.2 L176.1,208.7 L176.8,205.7 L179.5,204.9 L180.3,202.4 L184.9,197.7 L190.9,196.9 L192.6,195.2 L197.1,194.8 L206.2,192.4 L211.8,187.2 L217.7,188.0 L220.6,192.9 Z","center":[-120.773446,39.29519],"quotes":[],"population":"98,764","median-income":56949,"poverty-rate-increase":"1.6"},"Stanislaus":{"population":"514,453","path":"M163.7,337.8 L179.6,322.1 L188.2,318.1 L191.8,317.4 L196.2,319.1 L196.0,294.0 L206.1,305.4 L211.9,312.2 L218.4,318.3 L227.5,326.8 L227.5,326.8 L227.5,326.9 L192.3,344.1 L193.5,348.0 L177.9,363.5 L174.6,359.9 L171.9,361.2 L170.4,359.8 L167.4,361.9 L166.7,357.8 L164.4,354.9 L164.3,352.5 L167.4,350.4 L167.1,344.6 L164.5,344.1 L163.6,337.8 L163.6,337.8 L163.6,337.8 L163.6,337.8 L163.6,337.7 Z","center":[-121.002656,37.56238],"quotes":[],"median-income":49573,"minimum-cost-living-family":58704,"poverty-rate":"15.70%","poverty-rate-increase":"3.1"},"Shasta":{"population":"177,223","path":"M167.9,64.2 L171.1,64.2 L174.3,64.2 L174.2,82.7 L174.8,84.8 L174.4,115.0 L174.1,118.9 L171.9,118.8 L164.5,118.7 L156.1,119.5 L153.9,118.1 L151.1,119.3 L147.0,118.6 L139.4,120.7 L135.5,119.8 L128.7,121.7 L118.5,123.6 L110.8,123.2 L106.4,121.6 L99.2,126.3 L93.6,123.4 L86.7,124.5 L84.0,127.5 L80.7,126.8 L75.6,128.8 L75.5,125.4 L79.7,120.8 L79.6,119.2 L85.0,117.3 L88.4,113.0 L91.4,112.4 L91.9,110.4 L95.5,108.0 L96.8,108.4 L96.3,103.8 L94.0,99.4 L95.7,99.1 L95.9,95.8 L98.8,93.4 L99.1,89.5 L102.9,84.1 L102.6,79.8 L107.2,75.7 L108.1,70.3 L111.3,69.7 L112.0,65.1 L109.1,63.3 L129.9,63.7 Z","center":[-122.04355,40.76052],"quotes":[],"median-income":44556,"minimum-cost-living-family":58152,"poverty-rate":"17.80%","poverty-rate-increase":"2.7"},"Sutter":{"population":"94,737","path":"M156.3,203.7 L156.5,212.0 L158.3,218.9 L156.9,221.3 L159.0,230.1 L160.7,227.6 L163.8,226.2 L168.1,225.9 L168.1,231.1 L164.9,231.1 L164.8,244.0 L163.9,245.2 L161.7,245.1 L157.0,245.1 L157.7,243.1 L152.3,243.0 L150.1,239.9 L150.2,236.4 L144.9,234.5 L145.5,231.7 L143.8,230.9 L144.8,226.2 L143.2,220.1 L140.9,220.0 L137.7,211.9 L137.6,207.5 L140.0,202.8 L156.0,202.9 Z","center":[-121.702758,39.03525],"quotes":[],"median-income":51527,"minimum-cost-living-family":58080,"poverty-rate":"16.40%","poverty-rate-increase":"1.8"},"Tulare":{"poverty-rate":"20.30%","percent-student":0.3005181347,"minimum-cost-living-family":57924,"percent-unstable-housing":0.3834196891,"number-apps":193,"percent-with-children":0.3367875648,"percent-earned-income":0.5813953488,"percent-with-seniors":0.02590673575,"path":"M276.1,411.1 L282.4,404.7 L292.0,404.7 L292.0,398.2 L311.0,398.2 L311.1,392.0 L336.5,391.7 L348.0,391.0 L349.6,393.9 L347.8,395.0 L350.0,396.8 L350.6,399.7 L353.4,401.8 L352.5,404.7 L355.6,407.2 L355.1,409.9 L357.2,413.7 L360.7,413.8 L360.6,416.7 L364.4,421.2 L362.7,423.5 L364.4,430.2 L366.8,432.7 L366.2,435.4 L368.9,444.9 L370.7,446.7 L372.3,455.3 L370.8,455.6 L370.8,461.1 L343.1,461.5 L340.8,461.8 L307.0,462.3 L278.8,462.7 L278.6,437.0 L278.9,427.3 L282.2,427.3 L282.1,417.5 L278.9,417.5 L278.8,411.2 Z","center":[-118.780542,36.23045],"quotes":["My mother has been diagnosed with Transverse Myelitis which has left her paralyzed from 80% of her body, leaving her unable to work. My father is 69 years old and permanently disabled due to osteoporosis. I am currently a full-time student at the Cal State here and also work a part-time job. There is not enough income in my home for us to get the proper nutrition we all need. My father already receives food stamps but because I am anemic, I require a special diet and often times find myself needing to buy my food separately. My mother is also diabetic, so she too requires a special diet."],"population":"442,179","median-income":42863,"poverty-rate-increase":"4.3"},"Riverside":{"population":"2,189,641","path":"M406.2,629.0 L406.1,626.8 L411.8,617.4 L407.9,614.2 L404.2,613.8 L404.0,610.3 L401.2,609.6 L395.2,602.2 L396.2,598.2 L399.0,598.1 L398.9,594.7 L402.1,593.3 L402.0,590.0 L413.2,589.6 L413.3,590.7 L422.5,590.4 L422.5,591.5 L440.8,590.8 L440.7,588.6 L479.4,587.1 L498.8,586.0 L539.9,584.0 L539.7,580.7 L551.4,579.9 L593.8,577.3 L593.9,581.6 L588.5,589.1 L590.6,593.4 L589.1,594.1 L591.9,605.8 L589.8,608.0 L590.9,616.6 L588.9,618.2 L585.0,625.8 L572.4,626.8 L533.0,629.3 L494.7,631.3 L436.1,633.7 L423.0,633.8 L423.0,632.6 L414.8,629.8 L415.2,628.7 Z","center":[-116.002239,33.72982],"quotes":[],"median-income":56592,"minimum-cost-living-family":61812,"poverty-rate":"18.30%","poverty-rate-increase":"2.2"},"Lake":{"population":"64,665","path":"M114.7,230.5 L111.0,230.3 L109.9,232.1 L111.4,234.8 L112.6,238.3 L111.1,239.3 L107.2,246.5 L97.7,249.1 L96.6,246.2 L94.0,245.8 L90.9,238.8 L86.8,235.3 L79.5,231.4 L77.5,224.2 L75.1,224.2 L73.1,219.1 L71.5,218.5 L72.6,211.0 L77.5,206.6 L76.2,200.2 L73.2,193.8 L74.1,186.7 L76.3,185.6 L81.4,185.9 L84.1,185.1 L84.4,181.3 L93.0,181.5 L92.5,196.1 L90.3,201.3 L91.2,203.3 L95.5,206.8 L101.7,209.5 L105.0,209.2 L107.1,211.9 L105.7,215.7 L106.1,220.8 L110.6,223.3 L110.7,227.5 Z","center":[-122.746757,39.0948],"quotes":[],"median-income":35997,"minimum-cost-living-family":58428,"poverty-rate":"21.60%","poverty-rate-increase":"2.9"},"Madera":{"population":"150,865","path":"M290.7,315.7 L291.9,318.2 L293.1,318.6 L296.2,320.4 L297.2,318.7 L301.6,318.8 L305.1,322.4 L307.7,329.7 L292.4,345.5 L289.6,350.3 L289.9,358.0 L286.7,362.2 L283.9,361.4 L281.7,365.1 L279.6,362.2 L276.0,364.8 L277.8,365.6 L276.3,368.6 L273.8,368.1 L272.9,371.4 L270.6,370.5 L265.9,375.7 L261.0,384.7 L259.6,383.8 L251.5,385.3 L248.9,387.3 L245.8,386.5 L240.3,388.1 L237.0,390.6 L233.2,390.5 L226.8,386.8 L223.5,383.8 L223.8,380.2 L218.4,370.4 L222.2,366.5 L228.9,364.8 L237.0,361.5 L244.3,361.2 L247.3,360.1 L264.3,342.7 L270.9,342.6 L270.8,339.3 L272.9,339.3 L274.8,336.8 L274.7,332.0 Z","center":[-119.749852,37.21003],"quotes":[],"median-income":45490,"minimum-cost-living-family":58164,"poverty-rate":"16.60%","poverty-rate-increase":"3.6"},"Tehama":{"poverty-rate":"17.20%","percent-student":0.1075581395,"minimum-cost-living-family":57324,"percent-unstable-housing":0.2994186047,"number-apps":344,"percent-with-children":0.3895348837,"percent-earned-income":0.6354166667,"percent-with-seniors":0.08746355685,"path":"M81.9,165.1 L81.4,157.0 L83.1,156.3 L82.4,151.8 L81.5,150.3 L81.1,142.8 L79.6,139.4 L80.8,136.4 L79.8,131.6 L75.6,128.8 L80.7,126.8 L84.0,127.5 L86.7,124.5 L93.6,123.4 L99.2,126.3 L106.4,121.6 L110.8,123.2 L118.5,123.6 L128.7,121.7 L135.5,119.8 L139.4,120.7 L147.0,118.6 L151.1,119.3 L153.9,118.1 L156.1,119.5 L164.5,118.7 L165.8,120.4 L166.0,125.8 L171.0,126.6 L173.0,128.7 L171.6,136.1 L167.6,137.3 L167.7,140.5 L166.8,142.7 L163.5,144.3 L159.2,144.2 L158.6,147.4 L156.3,149.7 L155.7,152.9 L152.4,152.7 L149.7,158.4 L146.6,160.0 L132.9,159.9 L131.4,163.0 L132.7,166.2 L87.2,165.1 Z","center":[-122.232276,40.12615],"quotes":[],"population":"63,463","median-income":42369,"poverty-rate-increase":"2.7"},"San Bernardino":{"population":"2,035,210","path":"M512.7,454.0 L512.7,454.0 L512.7,454.0 L554.2,490.0 L577.4,510.1 L577.7,518.6 L580.6,521.8 L583.4,527.1 L588.6,530.7 L592.0,538.1 L591.3,539.2 L595.0,543.9 L595.0,549.2 L597.9,549.5 L605.3,555.4 L608.3,556.4 L610.9,559.6 L611.3,563.0 L609.6,563.5 L604.5,569.6 L600.3,572.7 L594.9,575.2 L593.8,577.3 L551.4,579.9 L539.7,580.7 L539.9,584.0 L498.8,586.0 L479.4,587.1 L440.7,588.6 L440.8,590.8 L422.5,591.5 L422.5,590.4 L413.3,590.7 L413.2,589.6 L402.0,590.0 L402.1,593.3 L398.9,594.7 L399.0,598.1 L396.2,598.2 L395.2,602.2 L394.8,601.8 L388.3,596.8 L387.1,594.7 L389.1,591.1 L391.1,591.4 L394.3,580.7 L396.0,571.3 L394.1,551.4 L393.5,531.9 L395.7,531.8 L394.1,477.0 L393.4,459.8 L449.9,457.9 L507.5,455.4 L507.4,454.3 Z","center":[-116.181197,34.85722],"quotes":[],"median-income":54100,"minimum-cost-living-family":61812,"poverty-rate":"18.20%","poverty-rate-increase":"3.8"},"Imperial":{"population":"174,528","path":"M585.0,625.8 L579.4,628.0 L580.9,633.2 L579.2,635.9 L582.7,638.1 L583.1,646.0 L581.7,651.6 L584.2,655.2 L588.7,655.8 L593.8,655.3 L597.7,664.0 L597.6,668.6 L594.0,672.9 L594.4,675.4 L589.0,677.8 L583.5,676.9 L582.6,679.0 L531.9,686.1 L496.2,691.1 L494.8,657.3 L496.2,657.3 L494.7,631.3 L533.0,629.3 L572.4,626.8 Z","center":[-115.355395,33.04081],"quotes":[],"median-income":41772,"minimum-cost-living-family":57312,"poverty-rate":"20.30%","poverty-rate-increase":"5.4"},"Calaveras":{"population":"45,578","path":"M196.0,294.0 L195.2,293.2 L192.0,283.1 L198.0,283.4 L202.8,278.9 L213.2,274.6 L214.2,271.0 L223.1,266.8 L225.3,264.8 L230.7,265.4 L237.9,262.7 L242.6,263.1 L245.7,262.1 L245.7,266.7 L248.8,267.7 L239.7,272.1 L238.0,275.4 L234.2,279.7 L224.2,295.4 L223.0,298.9 L218.9,300.6 L220.0,303.2 L213.0,310.1 L211.9,312.2 L206.1,305.4 Z","center":[-120.555115,38.18784],"quotes":[],"median-income":54936,"minimum-cost-living-family":57852,"poverty-rate":"13.40%","poverty-rate-increase":"2.4"},"Siskiyou":{"poverty-rate":"15.50%","percent-student":0.1088082902,"minimum-cost-living-family":57216,"percent-unstable-housing":0.4093264249,"number-apps":193,"percent-with-children":0.3367875648,"percent-earned-income":0.5090909091,"percent-with-seniors":0.07772020725,"path":"M58.2,62.2 L55.7,57.9 L56.5,57.0 L55.0,48.3 L53.5,47.0 L44.6,46.8 L47.5,40.9 L45.7,35.5 L43.2,33.8 L44.0,31.0 L41.9,30.8 L45.5,22.2 L43.4,13.6 L45.2,13.2 L46.9,9.2 L51.2,8.4 L54.1,1.2 L63.5,1.6 L74.6,1.2 L80.2,1.8 L102.9,2.3 L117.1,2.2 L168.5,3.9 L167.9,7.4 L167.8,20.3 L168.2,20.3 L167.9,64.2 L129.9,63.7 L109.1,63.3 L107.8,61.0 L108.4,55.8 L110.4,53.2 L106.4,50.0 L104.2,52.6 L101.1,52.6 L100.6,55.2 L97.3,56.2 L96.6,58.2 L91.6,61.4 L87.5,61.1 L84.6,63.1 L82.4,67.9 L82.7,70.1 L85.1,70.9 L86.5,74.2 L85.3,76.7 L82.7,75.3 L78.6,75.8 L77.7,72.6 L74.7,70.4 L67.4,70.2 L65.6,66.6 Z","center":[-122.533287,41.58798],"quotes":[],"population":"44,900","median-income":37495,"poverty-rate-increase":"3.3"},"Sacramento":{"poverty-rate":"17.30%","percent-student":0.1591106363,"minimum-cost-living-family":59880,"percent-unstable-housing":0.3682804674,"number-apps":14977,"percent-with-children":0.2818989117,"percent-earned-income":0.5355407047,"percent-with-seniors":0.07666087421,"path":"M158.3,292.3 L155.1,291.6 L152.0,292.5 L150.8,295.6 L148.3,297.1 L145.8,296.1 L149.0,293.2 L150.0,293.1 L150.4,291.9 L151.6,290.2 L151.6,288.5 L153.1,285.9 L155.8,284.9 L157.2,276.3 L161.4,272.9 L162.3,264.5 L159.4,262.7 L162.2,259.1 L162.5,256.2 L160.0,255.2 L159.2,252.0 L157.5,251.8 L155.4,247.9 L157.0,245.1 L161.7,245.1 L163.9,245.2 L183.1,247.1 L183.8,247.1 L183.8,247.1 L185.1,246.7 L190.2,262.2 L190.3,263.6 L190.2,277.5 L188.0,277.6 L181.7,280.8 L176.1,281.0 L171.7,282.7 L167.2,282.0 L164.3,280.3 L160.9,285.1 L160.4,288.2 L158.1,289.9 Z M154.3,293.0 L154.5,293.0 L154.6,293.0 L154.4,293.0 Z M143.0,294.0 L142.3,293.9 L141.4,294.0 L142.4,293.6 Z","center":[-121.340441,38.45001],"quotes":["Financially not making it. My landlord is about to begin eviction proceedings on me as my rent has been late every month. I struggle to get enough food for my home. I feed my kids before I feed myself. I recently ended up in the hospital from dehydration and malnourishment.","In February, I moved to Sacramento from Bakersfield because my landlord asked me to leave (I was behind on rent and couldn't pay). I have been working as an appraiser for 16 years, but since moving to Sacramento I haven't been able to find work. A couple weeks ago, my annual software fees were due as well as my business insurance and I was unable to pay. This has shut down my business. I am looking for work. I am selling things in order to survive on a daily basis. I anticipate this request for food stamps to be temporary. I look forward to getting back on my feet soon but, some assistance, especially food assistance, would help immensely.","Originally I couch surfed and at one point lived in my car. I am a high school student working full time just to get by. I make about $900 a month, but $500 goes to rent, $120 goes to phone bills and the other is gas and groceries. Most the time I under pay the rent by up to $200. I was lucky enough to be taken in by my girlfriend and her parents but they expect me to still contribute to household.","I pay for wifi also and I take care of my emotional support dog Charlotte who is about 35 lbs. So any extra funds I have left goes to feeding and keeping her groomed. I can't walk to food pantries and such as they are too far. I get help from friends or neighbors with a hot meal here and there. I am starving almost after the first week after payday and I am becoming more unhealthy. I do not know what else to do. I am hungry now as I am typing this.","I go back to college in August. I financially qualify for a government grant, however, due to mental health illness I failed many classes. Therefore, I cannot receive assistance due to my unsatisfactory academic progress. During the last six months I have been couch surfing with family. I worked part time for a month to save up enough to move back and pay for tuition. I am currently borrowing money from family members just to pay rent and buy food. I am looking for a job that gives me at least 23 hours a week. I really don't want to do this, but I need help. I just have to get through this to graduate.","I am helping my adult son apply. He has a disability, he was diagnosed with mild retardation by social security physicians when he was about 8. At 18 they said he did not qualify anymore, which I disagree with. I've been wanting to reapply for him but havent had the chance. Since we have moved to Sacramento I haven't been able to work a steady job because of my disease. I can't afford to support my adult son as I also have two younger children I support on my own and it is very, very hard. My son is staying here and there with no stable place to live. I try my best to take him food to eat when i can. I dont know what else to do. ","I am legally deaf due to a recent illness. A friend loaned me a hearing aid. I can only use phone on speaker. I am terrified of not getting medical treatment or having a place to live because of my income and disability status. i have been disabled for 30 years. A recent illness caused my condition to worsen. i need help. "],"population":"1,418,788","median-income":55615,"poverty-rate-increase":"2.9"}};

window.JSMaps.maps.california = {
	"config": {
		"mapWidth": 612,
		"mapHeight": 1300,
		"enablePanZoom": true,
		"initialZoom": 6,
		"initialMapX": 25,
		"initialMapY": 125,
		"displayAbbreviations": false,
		"stateClickAction": null,
		"onStateClick": window.JSMaps.maps.onStateClick,
		"onReady": function() {
				$('#california-map').trigger('stateClick', 'San Francisco');
		},
	},
	"paths": [
		
			
			
		{
			"enable": true,
			"name": "Placer",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M183.8,247.1 L183.1,247.1 L163.9,245.2 L164.8,244.0 L164.9,231.1 L168.1,231.1 L168.1,225.9 L174.5,221.8 L175.9,223.2 L175.9,223.2 L179.3,224.9 L184.1,223.0 L186.0,224.9 L189.6,224.8 L192.9,218.3 L197.3,213.3 L207.8,204.6 L212.5,202.6 L249.2,202.5 L249.2,205.7 L249.5,220.9 L241.4,220.9 L239.1,223.6 L230.8,224.2 L224.6,223.8 L222.5,228.5 L220.2,231.0 L216.7,232.2 L212.6,230.0 L207.6,225.6 L202.9,225.9 L200.2,229.4 L195.5,228.6 L191.9,231.9 L189.6,232.2 L188.6,237.1 L186.1,239.4 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "San Luis Obispo",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M238.1,463.0 L238.5,463.0 L239.3,463.0 L239.3,476.0 L245.8,475.9 L245.8,482.4 L251.2,486.7 L251.3,488.8 L258.4,488.8 L258.4,495.3 L262.7,495.3 L262.7,501.7 L271.4,501.8 L271.4,508.2 L278.3,507.8 L277.9,514.6 L283.3,515.4 L283.4,528.3 L279.6,528.6 L274.7,524.8 L271.2,523.1 L266.8,523.1 L261.6,520.8 L260.1,518.9 L255.6,516.9 L252.5,517.0 L245.3,513.2 L241.1,515.8 L239.8,519.1 L235.9,519.2 L230.9,520.9 L232.9,524.1 L232.9,528.3 L224.8,522.4 L221.1,521.9 L212.7,524.4 L211.7,523.2 L212.9,515.9 L212.1,511.1 L208.3,508.5 L204.8,509.5 L199.6,506.3 L196.8,502.9 L198.6,496.9 L200.8,496.5 L196.2,488.2 L190.3,487.3 L184.5,480.6 L180.5,474.2 L173.3,472.1 L171.3,464.7 L169.8,462.4 L209.9,462.9 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Contra Costa",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M154.6,293.0 L157.7,292.6 L157.5,294.8 L154.7,296.1 L157.6,296.9 L159.1,298.2 L157.6,300.6 L159.0,304.4 L157.7,308.9 L160.3,310.5 L158.9,312.9 L135.2,319.9 L132.2,317.7 L133.1,316.6 L130.3,313.9 L124.7,313.4 L122.1,312.1 L120.0,307.8 L117.6,305.9 L114.3,306.5 L110.2,305.5 L108.0,301.3 L109.9,301.9 L111.8,297.8 L115.7,297.9 L120.0,294.5 L124.6,297.2 L128.5,295.5 L133.0,294.9 L139.8,296.1 L142.7,297.5 L151.3,298.7 L149.6,296.9 L151.6,296.0 L152.5,293.2 L154.3,293.0 L154.4,293.0 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Marin",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M103.0,311.5 L103.0,311.5 L102.3,311.5 L102.1,312.0 L99.4,309.1 L93.8,305.2 L92.1,306.2 L87.5,302.0 L85.2,298.3 L80.3,295.6 L76.0,296.8 L76.9,298.5 L73.2,298.2 L75.4,294.3 L78.0,287.3 L76.1,280.3 L81.4,288.3 L85.1,292.8 L84.7,291.0 L79.0,282.0 L77.1,280.4 L75.1,276.0 L81.1,274.6 L90.3,282.9 L95.6,285.0 L100.5,285.0 L104.3,290.3 L105.1,292.9 L103.7,297.3 L107.2,299.7 L104.4,300.8 L103.7,304.1 L107.4,307.3 L105.4,310.9 L104.9,311.4 L104.0,311.6 L103.9,311.7 L103.8,311.7 L103.7,311.7 L103.6,311.8 L103.6,311.7 L103.5,311.7 L103.4,311.7 L103.4,311.6 Z M108.5,309.3 L107.1,309.2 L108.4,308.5 L108.5,308.9 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Napa",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 Z M97.7,249.1 L107.2,246.5 L111.1,239.3 L112.6,238.3 L111.4,234.8 L114.0,237.0 L117.6,236.8 L121.1,247.2 L124.2,250.5 L127.8,261.1 L126.4,267.3 L129.4,272.4 L129.8,275.7 L121.6,275.6 L122.6,278.8 L120.9,285.6 L122.0,287.4 L109.7,287.2 L109.7,287.2 L111.7,287.0 L112.1,280.5 L110.0,277.9 L110.6,276.2 L107.6,270.6 L104.8,267.2 L105.7,265.1 L103.0,263.8 L102.3,260.1 L97.9,257.0 L96.5,254.1 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "San Mateo",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M109.8,320.2 L110.2,325.9 L111.7,328.8 L117.9,330.7 L120.9,333.2 L120.4,334.5 L124.7,336.0 L126.0,338.4 L121.3,340.9 L120.5,346.1 L121.1,349.2 L123.4,351.7 L123.3,356.9 L117.9,356.8 L117.9,358.6 L113.5,358.8 L114.8,364.7 L112.1,363.8 L110.4,359.7 L108.4,358.1 L107.6,353.8 L108.8,345.9 L105.4,335.7 L102.0,333.1 L102.0,328.5 L103.2,328.0 L103.3,320.1 L105.2,320.1 Z M110.6,320.2 L110.6,320.3 L110.4,320.2 L110.5,320.2 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Tuolumne",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M293.1,318.6 L291.9,318.2 L290.7,315.7 L288.1,312.2 L285.0,311.4 L283.7,309.3 L280.9,310.1 L277.4,306.7 L275.5,306.8 L273.0,310.4 L270.9,310.9 L270.4,313.6 L261.4,317.7 L258.1,316.5 L255.6,317.6 L245.5,312.4 L242.7,315.9 L240.0,314.6 L238.4,317.2 L229.9,320.1 L232.2,324.5 L231.1,325.7 L227.2,323.2 L227.5,326.8 L218.4,318.3 L211.9,312.2 L213.0,310.1 L220.0,303.2 L218.9,300.6 L223.0,298.9 L224.2,295.4 L234.2,279.7 L238.0,275.4 L239.7,272.1 L248.8,267.7 L256.7,273.4 L264.2,268.8 L267.3,269.1 L267.4,272.6 L271.0,275.4 L270.3,278.4 L273.1,282.2 L271.4,284.9 L274.7,287.9 L281.0,290.0 L281.4,292.2 L285.2,291.5 L288.0,293.1 L290.7,297.6 L289.7,301.5 L290.6,303.3 L296.9,307.5 L296.0,312.7 L297.0,313.7 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Fresno",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M348.0,391.0 L336.5,391.7 L311.1,392.0 L311.0,398.2 L292.0,398.2 L292.0,404.7 L282.4,404.7 L276.1,411.1 L270.6,416.3 L265.4,417.6 L253.2,417.8 L253.2,434.0 L232.0,454.3 L229.3,450.1 L224.9,449.8 L222.1,446.7 L215.3,442.2 L214.8,440.0 L211.9,439.5 L210.8,435.6 L213.3,432.5 L210.2,427.7 L211.4,424.1 L215.1,423.2 L214.7,411.4 L196.0,392.8 L211.6,377.1 L215.5,377.1 L215.2,373.5 L218.4,370.4 L223.8,380.2 L223.5,383.8 L226.8,386.8 L233.2,390.5 L237.0,390.6 L240.3,388.1 L245.8,386.5 L248.9,387.3 L251.5,385.3 L259.6,383.8 L261.0,384.7 L265.9,375.7 L270.6,370.5 L272.9,371.4 L273.8,368.1 L276.3,368.6 L277.8,365.6 L276.0,364.8 L279.6,362.2 L281.7,365.1 L283.9,361.4 L286.7,362.2 L289.9,358.0 L289.6,350.3 L292.4,345.5 L307.7,329.7 L310.4,331.8 L313.9,332.2 L317.9,337.6 L321.1,336.6 L322.4,338.5 L323.4,340.5 L321.6,343.6 L321.9,347.4 L324.7,349.4 L326.1,348.4 L329.2,353.3 L328.0,354.7 L330.0,362.1 L333.6,362.3 L343.0,368.1 L343.6,371.4 L347.8,380.5 L346.1,384.5 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Sierra",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M241.0,173.6 L248.5,173.5 L249.3,172.4 L249.4,181.0 L249.3,192.9 L220.6,192.9 L217.7,188.0 L211.8,187.2 L206.2,192.4 L197.1,194.8 L192.6,195.2 L190.9,196.9 L190.3,187.8 L189.0,185.9 L190.9,184.5 L191.7,178.6 L195.2,176.1 L196.1,171.3 L199.6,168.5 L202.8,170.7 L204.2,173.4 L206.6,172.7 L210.5,175.9 L212.1,173.7 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "El Dorado",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M249.5,220.9 L249.6,225.9 L255.2,230.7 L256.7,235.8 L251.8,242.4 L245.6,247.8 L243.4,247.6 L241.7,252.6 L237.5,253.3 L236.0,256.5 L231.5,259.5 L229.3,259.3 L220.2,262.0 L213.5,262.6 L205.8,258.8 L201.1,258.7 L196.1,261.7 L195.4,260.7 L190.2,262.2 L185.1,246.7 L183.8,247.1 L186.1,239.4 L188.6,237.1 L189.6,232.2 L191.9,231.9 L195.5,228.6 L200.2,229.4 L202.9,225.9 L207.6,225.6 L212.6,230.0 L216.7,232.2 L220.2,231.0 L222.5,228.5 L224.6,223.8 L230.8,224.2 L239.1,223.6 L241.4,220.9 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Lassen",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M249.3,172.4 L248.5,173.5 L241.0,173.6 L243.1,169.3 L243.1,156.4 L240.0,154.3 L237.8,151.0 L237.4,145.6 L235.2,144.0 L229.9,143.5 L221.8,136.8 L220.3,133.6 L216.5,132.5 L212.2,129.2 L205.9,128.6 L204.1,131.4 L199.8,134.1 L199.8,137.2 L196.6,137.8 L195.6,135.6 L192.3,135.6 L189.0,132.9 L189.1,118.9 L174.1,118.9 L174.4,115.0 L174.8,84.8 L174.2,82.7 L174.3,64.2 L211.5,64.4 L248.8,64.3 L249.4,124.1 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Santa Barbara",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M229.4,591.4 L232.7,594.0 L224.2,593.1 L229.3,590.0 Z M283.4,528.3 L284.0,528.3 L285.3,528.3 L285.6,561.2 L285.1,565.6 L283.6,567.4 L278.3,564.4 L275.0,564.0 L269.4,565.9 L264.5,564.3 L258.9,565.1 L256.3,563.2 L250.9,561.1 L245.9,561.3 L243.3,560.3 L233.5,560.7 L222.5,562.0 L220.3,556.8 L216.1,554.4 L213.4,554.4 L211.8,552.0 L214.6,543.2 L212.3,539.2 L213.8,531.9 L210.3,528.2 L211.7,523.2 L212.7,524.4 L221.1,521.9 L224.8,522.4 L232.9,528.3 L232.9,524.1 L230.9,520.9 L235.9,519.2 L239.8,519.1 L241.1,515.8 L245.3,513.2 L252.5,517.0 L255.6,516.9 L260.1,518.9 L261.6,520.8 L266.8,523.1 L271.2,523.1 L274.7,524.8 L279.6,528.6 Z M236.4,595.2 L242.7,593.5 L249.0,593.2 L249.6,596.0 L252.9,596.4 L253.6,599.6 L251.7,599.6 L244.9,603.2 L240.9,601.0 Z M269.0,598.1 L260.9,597.6 L258.6,594.5 L259.2,592.8 L255.8,590.8 L256.7,589.4 L261.8,590.5 L269.4,592.0 L274.3,594.1 L278.4,590.9 L281.1,592.5 L278.8,595.4 L272.8,596.1 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Yolo",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M111.4,234.8 L109.9,232.1 L111.0,230.3 L114.7,230.5 L133.3,230.7 L143.8,230.9 L145.5,231.7 L144.9,234.5 L150.2,236.4 L150.1,239.9 L152.3,243.0 L157.7,243.1 L157.0,245.1 L155.4,247.9 L157.5,251.8 L159.2,252.0 L160.0,255.2 L162.5,256.2 L162.2,259.1 L159.4,262.7 L162.3,264.5 L161.4,272.9 L157.2,276.3 L151.4,276.2 L151.5,260.4 L149.0,259.6 L144.7,260.4 L142.0,259.4 L137.3,259.7 L133.1,263.0 L130.5,260.8 L127.8,261.1 L124.2,250.5 L121.1,247.2 L117.6,236.8 L114.0,237.0 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Yuba",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M168.1,225.9 L163.8,226.2 L160.7,227.6 L159.0,230.1 L156.9,221.3 L158.3,218.9 L156.5,212.0 L156.3,203.7 L157.0,202.0 L159.8,203.0 L168.8,200.6 L173.0,194.3 L172.8,191.3 L174.8,187.3 L183.7,186.9 L183.7,184.7 L187.9,181.7 L189.4,180.5 L191.7,178.6 L190.9,184.5 L189.0,185.9 L190.3,187.8 L190.9,196.9 L184.9,197.7 L180.3,202.4 L179.5,204.9 L176.8,205.7 L176.1,208.7 L175.9,223.2 L175.9,223.2 L174.5,221.8 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Merced",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M196.0,392.8 L182.8,385.6 L179.5,379.8 L177.3,378.9 L178.5,376.3 L176.7,374.7 L176.7,371.6 L178.9,368.4 L176.9,366.6 L177.9,363.5 L193.5,348.0 L192.3,344.1 L227.5,326.9 L234.1,340.9 L234.7,344.0 L241.9,355.9 L244.9,357.1 L247.3,360.1 L244.3,361.2 L237.0,361.5 L228.9,364.8 L222.2,366.5 L218.4,370.4 L215.2,373.5 L215.5,377.1 L211.6,377.1 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Mono",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M273.8,246.8 L298.9,268.6 L325.1,291.2 L377.9,337.1 L356.0,337.8 L322.4,338.5 L321.1,336.6 L317.9,337.6 L313.9,332.2 L310.4,331.8 L307.7,329.7 L305.1,322.4 L301.6,318.8 L297.2,318.7 L296.2,320.4 L293.1,318.6 L297.0,313.7 L296.0,312.7 L296.9,307.5 L290.6,303.3 L289.7,301.5 L290.7,297.6 L288.0,293.1 L285.2,291.5 L281.4,292.2 L281.0,290.0 L274.7,287.9 L271.4,284.9 L273.1,282.2 L270.3,278.4 L271.0,275.4 L272.8,272.5 L271.9,270.5 L275.4,269.2 L276.4,262.6 L271.9,255.0 L272.1,250.4 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "San Francisco",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M103.0,311.5 L103.1,311.5 L103.4,311.6 L103.4,311.7 Z M103.6,311.8 L103.5,311.8 L103.5,311.7 L103.6,311.7 Z M103.7,311.7 L103.7,311.7 L103.8,311.7 L103.9,311.7 Z M105.4,310.9 L105.0,311.5 L104.0,311.6 L104.9,311.4 Z M108.4,308.5 L108.6,308.7 L108.5,309.3 L108.5,308.9 Z M113.7,314.9 L113.5,314.8 L113.6,314.6 L113.6,314.7 Z M110.4,320.2 L109.8,320.1 L109.8,320.2 L105.2,320.1 L103.3,320.1 L102.7,314.7 L109.0,312.6 L112.1,318.6 L110.6,320.2 L110.5,320.2 Z M102.1,312.0 L102.3,311.5 L103.0,311.5 L102.4,311.7 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Amador",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M245.6,247.8 L245.6,253.6 L245.7,262.1 L242.6,263.1 L237.9,262.7 L230.7,265.4 L225.3,264.8 L223.1,266.8 L214.2,271.0 L213.2,274.6 L202.8,278.9 L198.0,283.4 L192.0,283.1 L191.4,281.2 L190.2,277.5 L190.3,263.6 L190.2,262.2 L195.4,260.7 L196.1,261.7 L201.1,258.7 L205.8,258.8 L213.5,262.6 L220.2,262.0 L229.3,259.3 L231.5,259.5 L236.0,256.5 L237.5,253.3 L241.7,252.6 L243.4,247.6 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Mendocino",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M82.4,151.8 L83.1,156.3 L81.4,157.0 L81.9,165.1 L81.7,168.8 L84.3,171.8 L84.4,181.3 L84.1,185.1 L81.4,185.9 L76.3,185.6 L74.1,186.7 L73.2,193.8 L76.2,200.2 L77.5,206.6 L72.6,211.0 L71.5,218.5 L73.1,219.1 L75.1,224.2 L77.5,224.2 L79.5,231.4 L86.8,235.3 L71.8,234.8 L68.5,235.6 L68.5,237.9 L55.1,237.7 L55.0,239.8 L47.5,239.5 L45.3,240.2 L39.0,234.0 L34.7,228.7 L34.8,225.6 L37.1,220.7 L34.8,210.9 L33.0,208.3 L31.1,198.6 L30.1,196.9 L30.9,189.7 L33.8,182.4 L32.7,171.5 L31.2,169.5 L29.7,160.9 L26.8,158.4 L25.6,155.2 L20.6,148.1 L36.0,148.6 L47.8,149.0 L47.7,150.9 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "San Joaquin",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M192.0,283.1 L195.2,293.2 L196.0,294.0 L196.2,319.1 L191.8,317.4 L188.2,318.1 L179.6,322.1 L163.6,337.7 L163.6,337.7 L163.6,337.7 L161.8,334.5 L158.7,333.2 L158.9,312.9 L160.3,310.5 L157.7,308.9 L159.0,304.4 L157.6,300.6 L159.1,298.2 L157.6,296.9 L158.4,294.6 L163.6,297.8 L163.2,296.2 L159.6,294.7 L158.3,292.3 L158.1,289.9 L160.4,288.2 L160.9,285.1 L164.3,280.3 L167.2,282.0 L171.7,282.7 L176.1,281.0 L181.7,280.8 L188.0,277.6 L190.2,277.5 L191.4,281.2 Z M163.7,337.8 L163.6,337.7 L163.6,337.7 L163.6,337.7 L163.6,337.7 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Ventura",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M282.2,648.5 L287.2,651.8 L284.8,653.0 L280.3,651.9 L279.2,648.9 Z M316.6,591.2 L307.6,587.2 L305.2,587.3 L300.2,583.5 L297.0,578.7 L296.4,576.0 L288.9,571.4 L283.6,567.4 L285.1,565.6 L285.6,561.2 L285.3,528.3 L288.9,528.3 L288.9,529.9 L295.4,529.8 L297.4,531.4 L297.4,534.6 L313.7,534.5 L313.7,536.1 L319.6,536.0 L335.2,572.5 L335.5,576.4 L333.4,576.4 L333.5,581.8 L326.0,581.9 L316.8,589.0 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Kern",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M285.3,528.3 L284.0,528.3 L283.4,528.3 L283.3,515.4 L277.9,514.6 L278.3,507.8 L271.4,508.2 L271.4,501.8 L262.7,501.7 L262.7,495.3 L258.4,495.3 L258.4,488.8 L251.3,488.8 L251.2,486.7 L245.8,482.4 L245.8,475.9 L239.3,476.0 L239.3,463.0 L272.2,462.7 L278.8,462.7 L307.0,462.3 L340.8,461.8 L343.1,461.5 L370.8,461.1 L375.8,460.3 L393.4,459.8 L394.1,477.0 L395.7,531.8 L393.5,531.9 L374.0,532.4 L343.4,533.5 L321.2,534.0 L319.6,536.0 L313.7,536.1 L313.7,534.5 L297.4,534.6 L297.4,531.4 L295.4,529.8 L288.9,529.9 L288.9,528.3 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Inyo",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M393.4,459.8 L375.8,460.3 L370.8,461.1 L370.8,455.6 L372.3,455.3 L370.7,446.7 L368.9,444.9 L366.2,435.4 L366.8,432.7 L364.4,430.2 L362.7,423.5 L364.4,421.2 L360.6,416.7 L360.7,413.8 L357.2,413.7 L355.1,409.9 L355.6,407.2 L352.5,404.7 L353.4,401.8 L350.6,399.7 L350.0,396.8 L347.8,395.0 L349.6,393.9 L348.0,391.0 L346.1,384.5 L347.8,380.5 L343.6,371.4 L343.0,368.1 L333.6,362.3 L330.0,362.1 L328.0,354.7 L329.2,353.3 L326.1,348.4 L324.7,349.4 L321.9,347.4 L321.6,343.6 L323.4,340.5 L322.4,338.5 L356.0,337.8 L377.9,337.1 L398.0,354.5 L435.9,387.4 L460.1,408.5 L500.2,443.2 L512.7,454.0 L512.7,454.0 L507.4,454.3 L507.5,455.4 L452.4,457.8 L449.9,457.9 L398.8,459.8 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Santa Clara",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M178.5,376.3 L166.4,376.3 L164.5,374.2 L162.3,374.6 L160.8,377.4 L156.7,380.7 L156.8,379.2 L152.9,378.2 L150.2,375.5 L146.4,369.5 L142.5,366.6 L132.7,362.3 L130.4,358.9 L126.1,355.5 L123.4,351.7 L121.1,349.2 L120.5,346.1 L121.3,340.9 L126.0,338.4 L127.8,339.7 L130.5,338.6 L137.0,339.5 L140.5,337.3 L163.6,337.8 L163.6,337.8 L163.6,337.8 L164.5,344.1 L167.1,344.6 L167.4,350.4 L164.3,352.5 L164.4,354.9 L166.7,357.8 L167.4,361.9 L170.4,359.8 L171.9,361.2 L174.6,359.9 L177.9,363.5 L176.9,366.6 L178.9,368.4 L176.7,371.6 L176.7,374.7 Z M163.6,337.7 L163.7,337.8 L163.6,337.8 L163.6,337.8 L163.6,337.8 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Orange",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M395.2,602.2 L401.2,609.6 L404.0,610.3 L404.2,613.8 L407.9,614.2 L411.8,617.4 L406.1,626.8 L406.2,629.0 L406.3,631.4 L402.1,632.9 L401.2,637.7 L397.4,633.9 L392.3,630.9 L389.6,627.7 L383.1,623.2 L376.9,620.1 L368.1,612.4 L371.5,604.7 L376.5,600.4 L376.4,597.2 L388.3,596.8 L394.8,601.8 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Solano",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M109.7,287.2 L122.0,287.4 L120.9,285.6 L122.6,278.8 L121.6,275.6 L129.8,275.7 L129.4,272.4 L126.4,267.3 L127.8,261.1 L130.5,260.8 L133.1,263.0 L137.3,259.7 L142.0,259.4 L144.7,260.4 L149.0,259.6 L151.5,260.4 L151.4,276.2 L157.2,276.3 L155.8,284.9 L153.1,285.9 L151.6,288.5 L148.1,292.8 L144.8,294.6 L143.0,294.0 L142.4,293.6 L141.4,294.0 L135.0,293.6 L132.4,291.8 L133.3,288.9 L130.1,289.2 L125.6,295.8 L117.4,293.3 L115.8,290.8 L110.0,287.8 L109.7,287.2 Z M149.0,293.2 L149.8,292.5 L150.4,291.9 L150.0,293.1 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "San Benito",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M178.5,376.3 L177.3,378.9 L179.5,379.8 L182.8,385.6 L196.0,392.8 L214.7,411.4 L215.1,423.2 L211.4,424.1 L210.2,427.7 L206.1,424.6 L208.5,432.4 L205.2,432.4 L199.0,425.8 L195.7,424.5 L193.7,427.1 L188.5,427.4 L188.5,423.5 L179.5,414.4 L176.5,409.9 L172.5,410.2 L173.5,408.4 L171.5,406.3 L172.1,402.2 L170.3,399.4 L166.8,398.7 L163.3,396.6 L164.3,393.7 L159.2,389.0 L154.3,384.6 L153.0,381.1 L153.0,381.1 L153.0,381.1 L153.9,379.8 L156.7,380.7 L160.8,377.4 L162.3,374.6 L164.5,374.2 L166.4,376.3 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "San Diego",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M401.2,637.7 L402.1,632.9 L406.3,631.4 L406.2,629.0 L415.2,628.7 L414.8,629.8 L423.0,632.6 L423.0,633.8 L436.1,633.7 L494.7,631.3 L496.2,657.3 L494.8,657.3 L496.2,691.1 L432.6,700.0 L431.7,694.0 L429.7,690.1 L426.0,689.1 L427.1,686.9 L429.5,687.9 L432.5,694.6 L433.8,693.6 L431.7,688.5 L426.8,686.0 L423.9,687.9 L423.7,681.8 L421.9,677.9 L423.7,674.3 L422.1,666.3 L418.8,657.9 L416.2,653.8 L406.7,641.5 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Trinity",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M82.4,151.8 L47.7,150.9 L47.8,149.0 L49.6,94.5 L48.9,87.8 L45.6,80.2 L49.2,78.9 L53.5,81.7 L58.0,74.5 L57.1,71.2 L54.9,69.7 L56.9,66.7 L58.2,62.2 L65.6,66.6 L67.4,70.2 L74.7,70.4 L77.7,72.6 L78.6,75.8 L82.7,75.3 L85.3,76.7 L86.5,74.2 L85.1,70.9 L82.7,70.1 L82.4,67.9 L84.6,63.1 L87.5,61.1 L91.6,61.4 L96.6,58.2 L97.3,56.2 L100.6,55.2 L101.1,52.6 L104.2,52.6 L106.4,50.0 L110.4,53.2 L108.4,55.8 L107.8,61.0 L109.1,63.3 L112.0,65.1 L111.3,69.7 L108.1,70.3 L107.2,75.7 L102.6,79.8 L102.9,84.1 L99.1,89.5 L98.8,93.4 L95.9,95.8 L95.7,99.1 L94.0,99.4 L96.3,103.8 L96.8,108.4 L95.5,108.0 L91.9,110.4 L91.4,112.4 L88.4,113.0 L85.0,117.3 L79.6,119.2 L79.7,120.8 L75.5,125.4 L75.6,128.8 L79.8,131.6 L80.8,136.4 L79.6,139.4 L81.1,142.8 L81.5,150.3 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Kings",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M238.1,463.0 L235.3,458.9 L236.3,456.5 L232.0,454.3 L253.2,434.0 L253.2,417.8 L265.4,417.6 L270.6,416.3 L276.1,411.1 L278.8,411.2 L278.9,417.5 L282.1,417.5 L282.2,427.3 L278.9,427.3 L278.6,437.0 L278.8,462.7 L272.2,462.7 L239.3,463.0 L238.5,463.0 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Del Norte",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M22.1,39.8 L20.5,32.2 L20.6,29.5 L18.7,24.9 L17.8,19.5 L15.5,19.2 L12.2,16.3 L14.9,11.0 L16.1,2.8 L15.6,0.0 L46.4,1.4 L54.1,1.2 L51.2,8.4 L46.9,9.2 L45.2,13.2 L43.4,13.6 L45.5,22.2 L41.9,30.8 L44.0,31.0 L43.2,33.8 L45.7,35.5 L47.5,40.9 L44.6,46.8 L38.5,46.6 L38.7,40.5 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Monterey",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M232.0,454.3 L236.3,456.5 L235.3,458.9 L238.1,463.0 L209.9,462.9 L169.8,462.4 L163.0,455.6 L161.4,448.5 L156.9,445.6 L153.1,438.7 L147.3,432.4 L141.0,428.5 L137.2,424.4 L136.4,415.6 L134.1,408.2 L135.4,405.4 L132.8,404.3 L135.3,399.6 L138.2,402.4 L141.2,400.0 L142.7,396.5 L144.3,387.4 L143.0,384.2 L147.0,379.8 L152.0,379.5 L153.0,381.1 L153.0,381.1 L153.0,381.1 L153.0,381.1 L155.7,385.3 L159.2,389.0 L161.2,391.2 L164.3,393.7 L163.3,396.6 L166.8,398.7 L170.3,399.4 L172.1,402.2 L171.5,406.3 L173.5,408.4 L172.5,410.2 L176.5,409.9 L179.5,414.4 L188.5,423.5 L188.5,427.4 L193.7,427.1 L195.7,424.5 L199.0,425.8 L205.2,432.4 L208.5,432.4 L206.1,424.6 L210.2,427.7 L213.3,432.5 L210.8,435.6 L211.9,439.5 L214.8,440.0 L215.3,442.2 L222.1,446.7 L224.9,449.8 L229.3,450.1 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Santa Cruz",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M153.0,381.1 L152.0,379.5 L147.0,379.8 L143.0,384.2 L140.2,378.4 L135.7,374.6 L133.5,376.3 L129.2,376.7 L122.9,374.5 L117.1,368.3 L114.8,364.7 L113.5,358.8 L117.9,358.6 L117.9,356.8 L123.3,356.9 L123.4,351.7 L126.1,355.5 L130.4,358.9 L132.7,362.3 L142.5,366.6 L146.4,369.5 L150.2,375.5 L152.9,378.2 L156.8,379.2 L156.7,380.7 L153.9,379.8 L153.0,381.1 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Modoc",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M174.3,64.2 L171.1,64.2 L167.9,64.2 L168.2,20.3 L167.8,20.3 L167.9,7.4 L168.5,3.9 L199.9,4.4 L248.6,4.3 L248.8,64.3 L211.5,64.4 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Butte",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M140.0,202.8 L140.8,200.1 L141.1,197.0 L142.3,192.1 L142.0,187.7 L143.2,185.7 L135.4,185.8 L135.6,178.7 L137.0,177.3 L138.0,172.4 L132.7,166.2 L131.4,163.0 L132.9,159.9 L146.6,160.0 L149.7,158.4 L152.4,152.7 L155.7,152.9 L156.3,149.7 L158.6,147.4 L159.2,144.2 L163.5,144.3 L166.8,142.7 L167.7,140.5 L171.6,145.4 L168.6,150.6 L169.1,154.8 L167.9,158.0 L168.9,161.3 L171.8,162.5 L172.4,164.7 L180.3,172.1 L184.5,179.4 L187.9,181.7 L183.7,184.7 L183.7,186.9 L174.8,187.3 L172.8,191.3 L173.0,194.3 L168.8,200.6 L159.8,203.0 L157.0,202.0 L156.3,203.7 L156.0,202.9 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Alameda",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M113.6,314.6 L115.7,311.2 L114.3,306.5 L117.6,305.9 L120.0,307.8 L122.1,312.1 L124.7,313.4 L130.3,313.9 L133.1,316.6 L132.2,317.7 L135.2,319.9 L158.9,312.9 L158.7,333.2 L161.8,334.5 L163.6,337.7 L163.6,337.7 L163.6,337.7 L163.6,337.7 L163.7,337.8 L163.6,337.7 L140.5,337.3 L137.0,339.5 L130.5,338.6 L127.1,335.7 L124.1,330.0 L123.2,323.7 L117.5,317.8 L120.2,316.7 L113.7,314.9 L113.6,314.7 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Plumas",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M191.7,178.6 L189.4,180.5 L187.9,181.7 L184.5,179.4 L180.3,172.1 L172.4,164.7 L171.8,162.5 L168.9,161.3 L167.9,158.0 L169.1,154.8 L168.6,150.6 L171.6,145.4 L167.7,140.5 L167.6,137.3 L171.6,136.1 L173.0,128.7 L171.0,126.6 L166.0,125.8 L165.8,120.4 L164.5,118.7 L171.9,118.8 L174.1,118.9 L189.1,118.9 L189.0,132.9 L192.3,135.6 L195.6,135.6 L196.6,137.8 L199.8,137.2 L199.8,134.1 L204.1,131.4 L205.9,128.6 L212.2,129.2 L216.5,132.5 L220.3,133.6 L221.8,136.8 L229.9,143.5 L235.2,144.0 L237.4,145.6 L237.8,151.0 L240.0,154.3 L243.1,156.4 L243.1,169.3 L241.0,173.6 L212.1,173.7 L210.5,175.9 L206.6,172.7 L204.2,173.4 L202.8,170.7 L199.6,168.5 L196.1,171.3 L195.2,176.1 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Glenn",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M141.1,197.0 L134.3,196.8 L134.4,194.7 L127.1,194.5 L127.0,196.6 L92.5,196.1 L93.0,181.5 L84.4,181.3 L84.3,171.8 L81.7,168.8 L81.9,165.1 L87.2,165.1 L132.7,166.2 L138.0,172.4 L137.0,177.3 L135.6,178.7 L135.4,185.8 L143.2,185.7 L142.0,187.7 L142.3,192.1 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Colusa",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M141.1,197.0 L140.8,200.1 L140.0,202.8 L137.6,207.5 L137.7,211.9 L140.9,220.0 L143.2,220.1 L144.8,226.2 L143.8,230.9 L133.3,230.7 L114.7,230.5 L110.7,227.5 L110.6,223.3 L106.1,220.8 L105.7,215.7 L107.1,211.9 L105.0,209.2 L101.7,209.5 L95.5,206.8 L91.2,203.3 L90.3,201.3 L92.5,196.1 L127.0,196.6 L127.1,194.5 L134.4,194.7 L134.3,196.8 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Alpine",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M271.0,275.4 L267.4,272.6 L267.3,269.1 L264.2,268.8 L256.7,273.4 L248.8,267.7 L245.7,266.7 L245.7,262.1 L245.6,253.6 L245.6,247.8 L251.8,242.4 L256.7,235.8 L255.2,230.7 L259.4,234.3 L273.8,246.8 L272.1,250.4 L271.9,255.0 L276.4,262.6 L275.4,269.2 L271.9,270.5 L272.8,272.5 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Humboldt",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M44.6,46.8 L53.5,47.0 L55.0,48.3 L56.5,57.0 L55.7,57.9 L58.2,62.2 L56.9,66.7 L54.9,69.7 L57.1,71.2 L58.0,74.5 L53.5,81.7 L49.2,78.9 L45.6,80.2 L48.9,87.8 L49.6,94.5 L47.8,149.0 L36.0,148.6 L20.6,148.1 L17.4,145.5 L15.6,140.1 L11.7,138.3 L9.9,135.6 L2.0,128.1 L3.1,123.9 L2.2,119.6 L0.0,114.6 L1.5,109.8 L6.1,99.8 L10.5,91.7 L9.2,96.1 L11.8,96.0 L14.2,88.5 L17.3,88.3 L19.5,85.4 L15.6,84.2 L11.4,91.8 L10.9,91.1 L14.3,85.2 L17.0,78.8 L18.5,71.0 L16.6,69.6 L15.9,63.7 L18.2,60.6 L20.4,52.7 L22.4,42.0 L22.1,39.8 L38.7,40.5 L38.5,46.6 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Los Angeles",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M345.9,679.0 L341.0,670.4 L339.6,665.5 L346.8,673.8 L355.2,681.2 L350.4,682.5 Z M345.8,637.2 L340.4,635.7 L338.4,632.8 L342.7,632.7 L353.1,637.6 L357.0,642.8 L356.0,645.6 L352.9,644.2 L347.4,644.0 L346.1,642.3 Z M368.1,612.4 L364.6,611.0 L360.8,613.7 L358.9,612.5 L357.4,615.7 L349.9,613.0 L348.9,610.6 L351.0,606.0 L347.6,597.7 L345.1,594.0 L341.3,591.2 L328.7,591.9 L325.2,594.4 L322.3,591.9 L316.6,591.2 L316.8,589.0 L326.0,581.9 L333.5,581.8 L333.4,576.4 L335.5,576.4 L335.2,572.5 L319.6,536.0 L321.2,534.0 L343.4,533.5 L374.0,532.4 L393.5,531.9 L394.1,551.4 L396.0,571.3 L394.3,580.7 L391.1,591.4 L389.1,591.1 L387.1,594.7 L388.3,596.8 L376.4,597.2 L376.5,600.4 L371.5,604.7 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Sonoma",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M110.0,287.8 L109.4,288.8 L104.3,290.3 L100.5,285.0 L95.6,285.0 L90.3,282.9 L81.1,274.6 L75.1,276.0 L71.7,275.9 L70.5,268.8 L68.2,264.5 L61.1,259.7 L56.4,255.4 L52.1,247.9 L45.3,240.2 L47.5,239.5 L55.0,239.8 L55.1,237.7 L68.5,237.9 L68.5,235.6 L71.8,234.8 L86.8,235.3 L90.9,238.8 L94.0,245.8 L96.6,246.2 L97.7,249.1 L96.5,254.1 L97.9,257.0 L102.3,260.1 L103.0,263.8 L105.7,265.1 L104.8,267.2 L107.6,270.6 L110.6,276.2 L110.0,277.9 L112.1,280.5 L111.7,287.0 L109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 L109.7,287.2 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Mariposa",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M227.5,326.9 L227.5,326.8 L227.5,326.8 L227.2,323.2 L231.1,325.7 L232.2,324.5 L229.9,320.1 L238.4,317.2 L240.0,314.6 L242.7,315.9 L245.5,312.4 L255.6,317.6 L258.1,316.5 L261.4,317.7 L270.4,313.6 L270.9,310.9 L273.0,310.4 L275.5,306.8 L277.4,306.7 L280.9,310.1 L283.7,309.3 L285.0,311.4 L288.1,312.2 L290.7,315.7 L274.7,332.0 L274.8,336.8 L272.9,339.3 L270.8,339.3 L270.9,342.6 L264.3,342.7 L247.3,360.1 L244.9,357.1 L241.9,355.9 L234.7,344.0 L234.1,340.9 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Nevada",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M249.3,192.9 L249.2,198.2 L249.2,202.5 L212.5,202.6 L207.8,204.6 L197.3,213.3 L192.9,218.3 L189.6,224.8 L186.0,224.9 L184.1,223.0 L179.3,224.9 L175.9,223.2 L175.9,223.2 L176.1,208.7 L176.8,205.7 L179.5,204.9 L180.3,202.4 L184.9,197.7 L190.9,196.9 L192.6,195.2 L197.1,194.8 L206.2,192.4 L211.8,187.2 L217.7,188.0 L220.6,192.9 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Stanislaus",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M163.7,337.8 L179.6,322.1 L188.2,318.1 L191.8,317.4 L196.2,319.1 L196.0,294.0 L206.1,305.4 L211.9,312.2 L218.4,318.3 L227.5,326.8 L227.5,326.8 L227.5,326.9 L192.3,344.1 L193.5,348.0 L177.9,363.5 L174.6,359.9 L171.9,361.2 L170.4,359.8 L167.4,361.9 L166.7,357.8 L164.4,354.9 L164.3,352.5 L167.4,350.4 L167.1,344.6 L164.5,344.1 L163.6,337.8 L163.6,337.8 L163.6,337.8 L163.6,337.8 L163.6,337.7 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Shasta",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M167.9,64.2 L171.1,64.2 L174.3,64.2 L174.2,82.7 L174.8,84.8 L174.4,115.0 L174.1,118.9 L171.9,118.8 L164.5,118.7 L156.1,119.5 L153.9,118.1 L151.1,119.3 L147.0,118.6 L139.4,120.7 L135.5,119.8 L128.7,121.7 L118.5,123.6 L110.8,123.2 L106.4,121.6 L99.2,126.3 L93.6,123.4 L86.7,124.5 L84.0,127.5 L80.7,126.8 L75.6,128.8 L75.5,125.4 L79.7,120.8 L79.6,119.2 L85.0,117.3 L88.4,113.0 L91.4,112.4 L91.9,110.4 L95.5,108.0 L96.8,108.4 L96.3,103.8 L94.0,99.4 L95.7,99.1 L95.9,95.8 L98.8,93.4 L99.1,89.5 L102.9,84.1 L102.6,79.8 L107.2,75.7 L108.1,70.3 L111.3,69.7 L112.0,65.1 L109.1,63.3 L129.9,63.7 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Sutter",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M156.3,203.7 L156.5,212.0 L158.3,218.9 L156.9,221.3 L159.0,230.1 L160.7,227.6 L163.8,226.2 L168.1,225.9 L168.1,231.1 L164.9,231.1 L164.8,244.0 L163.9,245.2 L161.7,245.1 L157.0,245.1 L157.7,243.1 L152.3,243.0 L150.1,239.9 L150.2,236.4 L144.9,234.5 L145.5,231.7 L143.8,230.9 L144.8,226.2 L143.2,220.1 L140.9,220.0 L137.7,211.9 L137.6,207.5 L140.0,202.8 L156.0,202.9 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Tulare",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M276.1,411.1 L282.4,404.7 L292.0,404.7 L292.0,398.2 L311.0,398.2 L311.1,392.0 L336.5,391.7 L348.0,391.0 L349.6,393.9 L347.8,395.0 L350.0,396.8 L350.6,399.7 L353.4,401.8 L352.5,404.7 L355.6,407.2 L355.1,409.9 L357.2,413.7 L360.7,413.8 L360.6,416.7 L364.4,421.2 L362.7,423.5 L364.4,430.2 L366.8,432.7 L366.2,435.4 L368.9,444.9 L370.7,446.7 L372.3,455.3 L370.8,455.6 L370.8,461.1 L343.1,461.5 L340.8,461.8 L307.0,462.3 L278.8,462.7 L278.6,437.0 L278.9,427.3 L282.2,427.3 L282.1,417.5 L278.9,417.5 L278.8,411.2 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Riverside",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M406.2,629.0 L406.1,626.8 L411.8,617.4 L407.9,614.2 L404.2,613.8 L404.0,610.3 L401.2,609.6 L395.2,602.2 L396.2,598.2 L399.0,598.1 L398.9,594.7 L402.1,593.3 L402.0,590.0 L413.2,589.6 L413.3,590.7 L422.5,590.4 L422.5,591.5 L440.8,590.8 L440.7,588.6 L479.4,587.1 L498.8,586.0 L539.9,584.0 L539.7,580.7 L551.4,579.9 L593.8,577.3 L593.9,581.6 L588.5,589.1 L590.6,593.4 L589.1,594.1 L591.9,605.8 L589.8,608.0 L590.9,616.6 L588.9,618.2 L585.0,625.8 L572.4,626.8 L533.0,629.3 L494.7,631.3 L436.1,633.7 L423.0,633.8 L423.0,632.6 L414.8,629.8 L415.2,628.7 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Lake",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M114.7,230.5 L111.0,230.3 L109.9,232.1 L111.4,234.8 L112.6,238.3 L111.1,239.3 L107.2,246.5 L97.7,249.1 L96.6,246.2 L94.0,245.8 L90.9,238.8 L86.8,235.3 L79.5,231.4 L77.5,224.2 L75.1,224.2 L73.1,219.1 L71.5,218.5 L72.6,211.0 L77.5,206.6 L76.2,200.2 L73.2,193.8 L74.1,186.7 L76.3,185.6 L81.4,185.9 L84.1,185.1 L84.4,181.3 L93.0,181.5 L92.5,196.1 L90.3,201.3 L91.2,203.3 L95.5,206.8 L101.7,209.5 L105.0,209.2 L107.1,211.9 L105.7,215.7 L106.1,220.8 L110.6,223.3 L110.7,227.5 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Madera",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M290.7,315.7 L291.9,318.2 L293.1,318.6 L296.2,320.4 L297.2,318.7 L301.6,318.8 L305.1,322.4 L307.7,329.7 L292.4,345.5 L289.6,350.3 L289.9,358.0 L286.7,362.2 L283.9,361.4 L281.7,365.1 L279.6,362.2 L276.0,364.8 L277.8,365.6 L276.3,368.6 L273.8,368.1 L272.9,371.4 L270.6,370.5 L265.9,375.7 L261.0,384.7 L259.6,383.8 L251.5,385.3 L248.9,387.3 L245.8,386.5 L240.3,388.1 L237.0,390.6 L233.2,390.5 L226.8,386.8 L223.5,383.8 L223.8,380.2 L218.4,370.4 L222.2,366.5 L228.9,364.8 L237.0,361.5 L244.3,361.2 L247.3,360.1 L264.3,342.7 L270.9,342.6 L270.8,339.3 L272.9,339.3 L274.8,336.8 L274.7,332.0 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Tehama",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M81.9,165.1 L81.4,157.0 L83.1,156.3 L82.4,151.8 L81.5,150.3 L81.1,142.8 L79.6,139.4 L80.8,136.4 L79.8,131.6 L75.6,128.8 L80.7,126.8 L84.0,127.5 L86.7,124.5 L93.6,123.4 L99.2,126.3 L106.4,121.6 L110.8,123.2 L118.5,123.6 L128.7,121.7 L135.5,119.8 L139.4,120.7 L147.0,118.6 L151.1,119.3 L153.9,118.1 L156.1,119.5 L164.5,118.7 L165.8,120.4 L166.0,125.8 L171.0,126.6 L173.0,128.7 L171.6,136.1 L167.6,137.3 L167.7,140.5 L166.8,142.7 L163.5,144.3 L159.2,144.2 L158.6,147.4 L156.3,149.7 L155.7,152.9 L152.4,152.7 L149.7,158.4 L146.6,160.0 L132.9,159.9 L131.4,163.0 L132.7,166.2 L87.2,165.1 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "San Bernardino",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M512.7,454.0 L512.7,454.0 L512.7,454.0 L554.2,490.0 L577.4,510.1 L577.7,518.6 L580.6,521.8 L583.4,527.1 L588.6,530.7 L592.0,538.1 L591.3,539.2 L595.0,543.9 L595.0,549.2 L597.9,549.5 L605.3,555.4 L608.3,556.4 L610.9,559.6 L611.3,563.0 L609.6,563.5 L604.5,569.6 L600.3,572.7 L594.9,575.2 L593.8,577.3 L551.4,579.9 L539.7,580.7 L539.9,584.0 L498.8,586.0 L479.4,587.1 L440.7,588.6 L440.8,590.8 L422.5,591.5 L422.5,590.4 L413.3,590.7 L413.2,589.6 L402.0,590.0 L402.1,593.3 L398.9,594.7 L399.0,598.1 L396.2,598.2 L395.2,602.2 L394.8,601.8 L388.3,596.8 L387.1,594.7 L389.1,591.1 L391.1,591.4 L394.3,580.7 L396.0,571.3 L394.1,551.4 L393.5,531.9 L395.7,531.8 L394.1,477.0 L393.4,459.8 L449.9,457.9 L507.5,455.4 L507.4,454.3 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Imperial",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M585.0,625.8 L579.4,628.0 L580.9,633.2 L579.2,635.9 L582.7,638.1 L583.1,646.0 L581.7,651.6 L584.2,655.2 L588.7,655.8 L593.8,655.3 L597.7,664.0 L597.6,668.6 L594.0,672.9 L594.4,675.4 L589.0,677.8 L583.5,676.9 L582.6,679.0 L531.9,686.1 L496.2,691.1 L494.8,657.3 L496.2,657.3 L494.7,631.3 L533.0,629.3 L572.4,626.8 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Calaveras",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M196.0,294.0 L195.2,293.2 L192.0,283.1 L198.0,283.4 L202.8,278.9 L213.2,274.6 L214.2,271.0 L223.1,266.8 L225.3,264.8 L230.7,265.4 L237.9,262.7 L242.6,263.1 L245.7,262.1 L245.7,266.7 L248.8,267.7 L239.7,272.1 L238.0,275.4 L234.2,279.7 L224.2,295.4 L223.0,298.9 L218.9,300.6 L220.0,303.2 L213.0,310.1 L211.9,312.2 L206.1,305.4 Z"
		},
		
			
			
		{
			"enable": false,
			"name": "Siskiyou",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M58.2,62.2 L55.7,57.9 L56.5,57.0 L55.0,48.3 L53.5,47.0 L44.6,46.8 L47.5,40.9 L45.7,35.5 L43.2,33.8 L44.0,31.0 L41.9,30.8 L45.5,22.2 L43.4,13.6 L45.2,13.2 L46.9,9.2 L51.2,8.4 L54.1,1.2 L63.5,1.6 L74.6,1.2 L80.2,1.8 L102.9,2.3 L117.1,2.2 L168.5,3.9 L167.9,7.4 L167.8,20.3 L168.2,20.3 L167.9,64.2 L129.9,63.7 L109.1,63.3 L107.8,61.0 L108.4,55.8 L110.4,53.2 L106.4,50.0 L104.2,52.6 L101.1,52.6 L100.6,55.2 L97.3,56.2 L96.6,58.2 L91.6,61.4 L87.5,61.1 L84.6,63.1 L82.4,67.9 L82.7,70.1 L85.1,70.9 L86.5,74.2 L85.3,76.7 L82.7,75.3 L78.6,75.8 L77.7,72.6 L74.7,70.4 L67.4,70.2 L65.6,66.6 Z"
		},
		
			
			
		{
			"enable": true,
			"name": "Sacramento",
			"abbreviation": "",
			"textX": 0,
			"textY": 0,
			"color": "#E1E3EA",
			"hoverColor": "#A8ADC2",
			"selectedColor": "#515C88",
			"text": "",
			"path": "M158.3,292.3 L155.1,291.6 L152.0,292.5 L150.8,295.6 L148.3,297.1 L145.8,296.1 L149.0,293.2 L150.0,293.1 L150.4,291.9 L151.6,290.2 L151.6,288.5 L153.1,285.9 L155.8,284.9 L157.2,276.3 L161.4,272.9 L162.3,264.5 L159.4,262.7 L162.2,259.1 L162.5,256.2 L160.0,255.2 L159.2,252.0 L157.5,251.8 L155.4,247.9 L157.0,245.1 L161.7,245.1 L163.9,245.2 L183.1,247.1 L183.8,247.1 L183.8,247.1 L185.1,246.7 L190.2,262.2 L190.3,263.6 L190.2,277.5 L188.0,277.6 L181.7,280.8 L176.1,281.0 L171.7,282.7 L167.2,282.0 L164.3,280.3 L160.9,285.1 L160.4,288.2 L158.1,289.9 Z M154.3,293.0 L154.5,293.0 L154.6,293.0 L154.4,293.0 Z M143.0,294.0 L142.3,293.9 L141.4,294.0 L142.4,293.6 Z"
		},
		
	],
}
