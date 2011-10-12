$(function(){
	var testwin = function(name, fn) {
		testwin[name] = load_offset_fixture(name);
		var interval = setInterval(function() {
			if (testwin[name] && testwin[name].$ && testwin[name].jQuery.isReady) {
				clearInterval(interval);
				test(name, fn);
			}
		}, 0);
		
		function load_offset_fixture(name) {
			var win = window.open( "./" + name + ".html?num"+parseInt(Math.random()*1000), name, 'left=0,top=0,width=500,height=500,toolbar=1,resizable=0' );
			if ( !win ) { 
				alert("Please disable your popup blocker for the offset test suite");
				throw "Please disable your popup blocker for the offset test suite";
			}
			return win;
		}
	};
	
	module( "basic1" );
	
	var timeoutID;
	var target = $('<div id="target"></div');
	
	asyncTest('first trigger', 1, function(){
		
		$.conditionalTrigger(target).addGetTrueTrigger('myEvent', function(obj){
			return obj.hasClass('someclass');
		});
		
		target.bind('myEvent', function() {
			$(this).addClass('triggered');
		});
		
		target.addClass('someclass');
		
		timeoutID = window.setInterval(function() {
			if ( target.hasClass('triggered') ) {
				ok(true, 'myEvent triggered');
				window.clearTimeout(timeoutID);
				start();
			}
		}, 10);
	});
	
	asyncTest('remove triggered manually', 1, function(){
		
		target.removeClass('triggered');
		target.removeClass('someclass');

		timeoutID = window.setInterval(function() {
			if ( ! target.hasClass('triggered') ) {
				ok(true, 'triggered class removed');
				window.clearTimeout(timeoutID);
				start();
			}
		}, 10);
	});
	
	asyncTest('myEvent triggered twice', 1, function(){
		
		target.addClass('someclass');
		
		timeoutID = window.setInterval(function() {
			if ( target.hasClass('triggered') ) {
				ok(true, 'myEvent triggered twice');
				window.clearTimeout(timeoutID);
				start();
			}
		}, 10);
	});
	
	asyncTest('myEvent triggered removed', 1, function(){
		
		$.conditionalTrigger(target).remove('myEvent');
		target.removeClass('triggered');
		target.removeClass('someclass');
		target.addClass('someclass');
		
		timeoutID = window.setInterval(function() {
			if (! target.hasClass('triggered') ) {
				ok(true, 'myEvent triggered twice');
				window.clearTimeout(timeoutID);
				start();
			}
		}, 10);
	});
	
	module( "basic2" );
});
