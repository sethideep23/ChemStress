/*
 * This is the file in which the scrape functions are written for us to pull data that we need to enrich our servers.
 * Methods are called in script.js
 */

 //method returns the appropriate pdf link
function searchLink(link, input, target, keyword) {
    var returner;
    var gdata = "";
    var chemConvention = "";

    var query = {
        url: link + input + keyword,
        type: 'html',
        selector: target,
        extract: 'text'
    },
    uriQuery = encodeURIComponent(JSON.stringify(query)),
    request  = 'http://example.noodlejs.com/?q=' +
             uriQuery + '&callback=?';

//    console.log("uriQuery:" + uriQuery);
    // Make Ajax request to Noodle server
    jQuery.getJSON(request, function (data) {
        //console.log(query.url);
        if(data[0].results[0] == "www.flinnsci.com/msds-search.aspx" || data[0].results[0].toUpperCase().indexOf("LESS") != -1) {
            alert("wrong");
            gdata = "http://" + data[0].results[1];
        } else {
            gdata = "http://" + data[0].results[0];
        }
        window.open(gdata);
        returner =  data[0].results[0];
        //confirm(data[0].results[0]);
    }); 

    return returner;
}

function linked(input) {
    var inputTrue = "";
    for(var i = 0; i<input.length; i++) {
        if(input.charAt(i) != ' ') {
            inputTrue += input.charAt(i);
        }
    }
    console.log("http://www.flinnsci.com/Documents/SDS/S/" + inputTrue + ".pdf");
    return "http://www.flinnsci.com/Documents/SDS/S/" + inputTrue + ".pdf";
}