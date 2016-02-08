/* Method list: *
 * onServer() -> boolean returns if a given String exists on the server
 * pullResearch(): pulls research, based on user keyword
   - append a card
   - on the card, add information from the database
 * addData(): add the appropriate data to the server as child
   - setWord(): name keyword
   - getLink(): scraped link(pdf link)
      - scrapeSite(website, target)
          - performs noodle.js scraping
   - scraped data from link(pdf data)
      - scrapePdf(link of file, target)
          - performs the pdf.js parsing
          - build the data structure:
      		- Firebase children of child:
      			- Section 1(Chem Name, formula, mass)
      			- Section 2(Signal Word)
      			- Section 3(Hazard ID)
      			- Section 4(First Aid)
      			- Section 5(ORL-RAT-LD50)
   - common uses(scraped off of Google)
   	- implement scrapeSite(website, target)
   	- Firebase child of child: 
   		- Section 6(Common Uses)
	- then perform pullResearch()
 */
//

$(document).ready(function() {
  $('#input').keydown(function(event) {
    if(event.which == 13) {
        var input = getInputData("#input");
        var link = linked(input);
        searchLink("http://google.com/search?q=",link,"cite","");
    }
  });
});