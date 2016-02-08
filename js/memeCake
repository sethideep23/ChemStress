function searchEnter(event)
{
	if (event.keyCode === 13)
	{
		ajax_post();
	}
}
function ajax_post()
{
    	// Create our XMLHttpRequest object
	var hr = new XMLHttpRequest();
    	// Create some variables we need to send to our PHP file
	var url = "php.php";
	var input = document.getElementById("amber").value;
	document.getElementById("amber").select(); 
	input = encodeURIComponent(input);
	var vars = "&input=" + input;
	hr.open("POST", url, true);
    	// Set content type header information for sending url encoded variables in the request
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	// Access the onreadystatechange event for the XMLHttpRequest object
	hr.onreadystatechange = function() 
	{
		if(hr.readyState == 4 && hr.status == 200) 
		{
			return_data = hr.responseText;
			document.getElementById("result").innerHTML = return_data + document.getElementById("result").innerHTML;
			
		}
	}
	// Send the data to PHP now... and wait for response to update the status div
	hr.send(vars); // Actually execute the request
}