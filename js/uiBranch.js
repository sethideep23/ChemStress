function getInputData(el) {
	return $(el).val();
}
function enterPressed(el) {
	$(el).keydown(function(event) {
		if(event.which == 13 && $(el).val().length()>0) {
			return true;
		}
	});
}