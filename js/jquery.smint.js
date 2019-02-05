/*

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)
SMINT V3.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function(){


	$.fn.smint = function( options ) {

		var settings = $.extend({
			'scrollSpeed'  : 500,
			'mySelector'     : 'div'
		}, options);

		// adding a class to users div
		$(this).addClass('smint');

		//Set the variables needed
		var optionLocs = new Array(),
				lastScrollTop = 0,
				menuHeight = $(".smint").height(),
				smint = $('.smint'),
      	smintA = $('.smint a.smint-nav-item'),
      	myOffset = smint.height();

		if ( settings.scrollSpeed ) {
				var scrollSpeed = settings.scrollSpeed
			}
		if ( settings.mySelector ) {
				var mySelector = settings.mySelector
		};

		return smintA.each( function(index) {

			var id = $(this).attr('href').split('#')[1];

			if (!$(this).hasClass("extLink")) {
				$(this).attr('id', id+'-nav');
			}

			//Fill the menu
			optionLocs.push(Array(
				$(mySelector+"#"+id).position().top-menuHeight,
				$(mySelector+"#"+id).height()+$(mySelector+"#"+id).position().top, id)
			);

			///////////////////////////////////

			// get initial top offset for the menu
			console.log(smint);
			var stickyTop = smint.offset().top;

			// check position and make sticky if needed
			var stickyMenu = function(direction){

				// current distance top
				var scrollTop = $(window).scrollTop()+myOffset;

				// Check if the position is inside then change the menu
				// Courtesy of Ryan Clarke (@clarkieryan)
				if(optionLocs[index][0] <= scrollTop && scrollTop <= optionLocs[index][1]){
					if(direction == "up" && index < optionLocs.length - 1){
						$("#"+id+"-nav").addClass("selected");
						$("#"+optionLocs[index+1][2]+"-nav").removeClass("selected");
					} else if(index > 0) {
						$("#"+id+"-nav").addClass("selected");
						$("#"+optionLocs[index-1][2]+"-nav").removeClass("selected");
					} else if(direction == undefined){
						$("#"+id+"-nav").addClass("selected");
					}
					$.each(optionLocs, function(i){
						if(id != optionLocs[i][2]){
							$("#"+optionLocs[i][2]+"-nav").removeClass("selected");
						}
					});
				}
			};

			// run functions
			stickyMenu();

			// run function every time you scroll
			$(window).scroll(function() {
				//Get the direction of scroll
				var st = $(this).scrollTop()+myOffset;
				if (st > lastScrollTop) {
				    direction = "down";
				} else if (st < lastScrollTop ){
				    direction = "up";
				}
				lastScrollTop = st;
				stickyMenu(direction);

				// Check if at bottom of page, if so, add class to last <a> as sometimes the last div
				// isnt long enough to scroll to the top of the page and trigger the selected state.

				if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       			smintA.removeClass('selected')
	       			$(".smint a:not('.extLink'):last").addClass('selected')
   				// } else {
   				// 	smintA.last().removeClass('selected')
   				}
			});

			///////////////////////////////////////
    	$(this).on('click', function(e){
				// gets the height of the users div. This is used for off-setting the scroll so the menu doesnt overlap any content in the div they jst scrolled to
				var myOffset = smint.height();
    		// stops hrefs making the page jump when clicked
				e.preventDefault();
				// get the hash of the button you just clicked
				var hash = $(this).attr('href').split('#')[1];
				var goTo =  $(mySelector+'#'+ hash).offset().top-myOffset;

				// Scroll the page to the desired position!
				$("html, body").stop().animate({ scrollTop: goTo }, scrollSpeed);
			});
		});

	};

	$.fn.smint.defaults = { 'scrollSpeed': 500, 'mySelector': 'div'};
})(jQuery);
