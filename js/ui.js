$(document).ready(function() {
	isOpen = false;
		$('#enterMenu').click(function() {
			if(isOpen == false) {
				var width = $('#menu').css('width');
				$('#menu').animate({left: '0%'}, 275);
				$('#enterMenu').animate({left: width},800);
				$('#enterMenu > h3').fadeOut(180, function() {
					$(this).animate({marginLeft: '-7.5px'}).html('&#xf0d9;');
				}).fadeIn(180);
				isOpen = true;
			} else if(isOpen==true) {
				$('#enterMenu > h3').fadeOut(180, function() {
					$(this).animate({marginLeft: '7.5px'}).html('&#xf054;');
				}).fadeIn(180);
				var width = $('#menu').css('width');
				$('#menu').animate({left: '-100%'}, 800);
				$('#enterMenu').animate({left: '0'},150);
				isOpen = false;
			}
		});
	for(var i = 0; i<10; i++) {
		document.body.style.backgroundImage = "url('assets/1.png')";
		document.body.style.backgroundImage = "url('assets/2.png')";
	}
	$('#two').click(function() {
		$('#reactions').animate({height: '100px',marginTop: '10%'});
		//alert("Welcome");
		$('#reactions .overlay').delay(10).fadeIn();
	});
});