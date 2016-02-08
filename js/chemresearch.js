 // WORKING VERSION FOR ONLY ONE CHEMICAL AT A TIME

  var nextURL="";

    $(document).ready(function() {
        $("#researchInput").keydown(function(event){
            if(event.which == 13) {
                chemExec($('#researchInput').val());
                $('#chemresearch #praise').empty();
                $('#chemresearch #praise').html('<img id="load" style="display: none;" src="http://stoy.com/skin/frontend/stoy/default/images/spinner-white.gif"></img>');
                $('#load').show();
            }
        });
        $('#scrollUpOne').click(function() {
          $('#researchInput').val("");          
          $('#flow').empty();
          $('#chemresearch #praise').text("Hit enter to view");
        });
    });


        function chemExec(chemName) {
            // EXAMPLE CODE BLOCK
            var d = new Date();
            var n = d.getTime();


            // working for now

            var myFirebaseRef = new Firebase("https://memejuice.firebaseio.com/");


            var getLink = "";
            var string = "";
            for(var i = 0; i<chemName.length; i++) {
              if(chemName.charAt(i) != ' ') {
                string += chemName.charAt(i);
              }
            }
            // alert(string);
            var found = false;


              myFirebaseRef.on("child_added", function(snapshot) {
                // alert(snapshot.val().link);
                if(snapshot.val().link == string) {
                  alert(snapshot.val().link);
                }
              });

            // Find the item with id "flow" and make an <object>
            document.getElementById("flow").innerHTML = 
              '<object data="' + 'http://' +  getLink + '" type="application/pdf" style="height:50vh;width:100%;">';

            if(found==false) {
              // Make Ajax request to Noodle server

              var query = {
                  url: 'http://google.com/search?q=+' + chemName + '+sds+flinnsci+pdf',
                  // url: 'https://www.google.com/search?hl=en&as_q=sds&as_epq=' + chemName + '&as_oq=safety+data+sheet&as_eq=&as_nlo=&as_nhi=&lr=&cr=&as_qdr=all&as_sitesearch=flinnsci.com&as_occt=any&safe=images&as_filetype=pdf&as_rights=',
                  type: 'html',
                  selector: 'cite',
                  extract: 'text'
                },
                uriQuery = encodeURIComponent(JSON.stringify(query)),
                request  = 'http://example.noodlejs.com/?q=' +
                           uriQuery + '&callback=?';

              jQuery.getJSON(request, function (data) {
                var meme = 0;
                var dataRaw = data[0].results;
                // alert(dataRaw);

                var isCorrect = false;

                while(isCorrect == false && dataRaw[meme] != null) {
                  // alert(dataRaw[meme]);
                  var stringy = "";                
                  var temp = dataRaw[meme].split("/")[dataRaw[meme].split("/").length - 1];
                  var index1 = temp.indexOf("(");                  
                  var index2 = temp.indexOf(")");                  
                  if(index1 != -1 && index2 != -1) {
                    for(var i = 0; i<temp.length; i++) {
                      if(i >= index1 && i <=index2) {

                      } else {
                        stringy+=temp.charAt(i);
                      }
                    }
                  } else {
                    for(var i = 0; i<temp.length; i++) {
                      stringy += temp.charAt(i);
                    }
                  }
                  // alert(stringy);
                  if(stringy != (string + ".pdf")) {
                    meme++;

                  } else {
                    isCorrect = true;
                    break;
                  }
                }

                for(var i = 0; i<dataRaw; i++) {
                  myFirebaseRef.push({
                    link: dataRaw[i]
                  });
                }


                getLink = dataRaw[meme];

                if(chemName.toLowerCase() == "water") {
                  getLink = "www.flinnsci.com/Documents/SDS/WXYZ/Water.pdf"
                } else if(chemName.toLowerCase() == "sodium") {
                  getLink = "www.flinnsci.com/Documents/SDS/S/Sodium.pdf";
                }

                

                //window.open("http://" + getLink);
                
                var index;
                if(getLink != null) {
                  index = getLink.indexOf("MSDS");
                  getLink = getLink.substring(0, index) + getLink.substring(index + 1);
                }



                var m = d.getTime();
                if((m - n) >= 5000) {
                  $('#flow').empty();
                  $('#chemresearch #praise').empty();
                  $('#chemresearch #praise').text("Ah, stress. It didn't load.");
                } else {
                // Find the item with id "flow" and make an <object>
                document.getElementById("flow").innerHTML = 
                  '<object data="' + 'http://' +  getLink + '" type="application/pdf" style="height:50vh;width:100%;">';

                  $('#chemresearch #praise').empty();
                }
              });
            }


            /*
            

            */
            




        }