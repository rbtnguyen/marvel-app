$(document).ready(function(){

	// Waits for events to be requested and then adds Bootstrap popovers to events
	$('#event-btn').click(function(){
		setTimeout(function(){
			$('.event_li').popover({
				trigger: 'hover',
				html: true
			});
		}, 1000);

		// In case the load took long, re-searches the DOM to create popovers
		setTimeout(function(){
			$('.event_li').popover({
				trigger: 'hover',
				html: true
			});
		}, 6000);
		
	});

	// Waits for comics to be requested and then adds Bootstrap popovers to comics
	$('#comic-btn').click(function(){				
		setTimeout(function(){
			$('.comic_li').popover({
				trigger: 'hover',
				html: true
			});
		}, 1000);

		// In case the load took long, re-searches the DOM to create popovers
		setTimeout(function(){
			$('.comic_li').popover({
				trigger: 'hover',
				html: true
			});
		}, 6000);

	});

});