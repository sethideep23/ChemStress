   
    var nextURL="";

        $( document ).ready(function() {
            nextURL="";
            $("input").keydown(function(event){
                if(event.which == 13) {
                    searchExec($('#nameconverter input').val());
                }
            });
        });


        function searchExec(chemName) {
            var gdata = "";
            var chemConvention = "";

            var query = {
                url: 'http://google.com/search?q=' + chemName + "+chemical+wikipedia",
                type: 'html',
                selector: 'h3.r a',
                extract: 'text'
            } ,
            uriQuery = encodeURIComponent(JSON.stringify(query)),
            request  = 'http://example.noodlejs.com/?q=' +
                     uriQuery + '&callback=?';

            console.log("uriQuery:" + uriQuery);
            // Make Ajax request to Noodle server
            jQuery.getJSON(request, function (data) {
                gdata = data[0].results + 'JAKUNDO';
                //alert(data[0].results);
                //alert(gdata);

                if(gdata.indexOf(chemName) == 0) {
                    var endValue =  gdata.substring((SecondIndexOf(',' , gdata)+1) , SecondIndexOf('-' ,  gdata));
                }
                else if (chemName.indexOf(' ') > -1) {
                    var endValue = chemName;

                }
                else {
                    var endValue =  gdata.substring(0 , gdata.indexOf('-'));
                }

  //             alert(endValue);

               //$('input').val("");
               //alert(endValue);
               $('#nameconverter #realTxt').text(endValue);

                var totalSearch = endValue + ' flinn pdf safety msds "' + endValue + '"';

                //alert(totalSearch);

                //document.getElementById("searchTerms").innerHTML = totalSearch;

                //nextURL = "https://google.com/#q="+ endValue +"+flinn+pdf+safety+msds+%22" + endValue + "%22";

//                console.log("next url:" + nextURL);

            }); 


        }


            var term = "NaBr flinn msds safety pdf";

            // this will parse the google page





        function SecondIndexOf(Val, Str)  
        {  
          var Fst = Str.indexOf(Val);  
          var Snd = Str.indexOf(Val, Fst+1)  
          return Snd  
        }

/*
        function energy() {
            alert( gdata.substring(0,indexOf(' ')) );
        }
*/


        function FormExec() {
            var chemForm= $('#amber').val();
            var gdata = "";
            var chemConvention = "";

            var query = {
                url: 'http://google.com/search?q=' + chemForm + "+chemical+formula",
                type: 'html',
                selector: 'div',
                extract: 'text'
            } ,
            uriQuery = encodeURIComponent(JSON.stringify(query)),
            request  = 'http://example.noodlejs.com/?q=' +
                     uriQuery + '&callback=?';

            console.log("uriQuery:" + uriQuery);
            // Make Ajax request to Noodle server
            jQuery.getJSON(request, function (data) {
                kdata = data[0].results;
                alert(kdata);
                endy = kdata.substring((kdata.indexOf("0 results")+9));
                //alert(endy);

                resulty = endy.substring(0,endy.indexOf('-'));

//                alert(resulty);
                $('#nameconverter > #realTxt').text(resulty);

                })

        };