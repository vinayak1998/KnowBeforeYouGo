
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // the CODE is HERE! :D
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();

    //The full address
    var address = streetStr+", "+cityStr;

    //Friendly greeting text :p
    $greeting.text("Oh nice! So you wanna live at " + address + "? Good choice! ;)");

    //hardocode the size 600x 400 pixels
    //set the location to the full address
    var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location="+address+'';

    //appending the Right image to the page to the Right class with the Right url
    $body.append('<img class="bgimg" src=" ' + streetviewUrl  + ' ">');

    //NY time ajax request goes here(the api key is personal)

    //Steps: fire off ajax request
    //then iterate through the response
    //finally present the articles on the page inside <ul id="nytimes-articles"></ul>

    var nyTimesBaseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch';
    var nyTimesApiKey = '3582b1f2074f4f87bc2aac550c450274';
    var nyTimesUrl = nyTimesBaseUrl + '.json?api-key=' + nyTimesApiKey + '&q=' + cityStr;

    $.getJSON( nyTimesUrl, function( data ) {
        //this anonymous function data gets run as soon as we get the response back from the New York Times

        var docs = data.response.docs;

        //iterate through the data object which is the actual response

        $.each( docs, function( key, val ) {
            var title = '<a href="' + val.web_url +'">' + val.headline.main + '</a>';

            var leadParagraph = '';
            if (val.lead_paragraph) {
                leadParagraph = '<p>' + val.lead_paragraph + '</p>';
            };

            var listItem = '<li class="article">' + title + leadParagraph + '</li>';

            $nytHeaderElem.text('New York Times Articles about ' + cityStr);
            $nytElem.append(listItem);
        });
    }).fail(function(){   //for error handling
        $nytHeaderElem.text('New York Times Articles could not be loaded');
    });

    // Wikipedia

    //Main 3 steps
    // fire off json-p request with $.ajax() (include dataType and success parameters)
    // iterate through the response
    // present articles on the page inside <ul id = "wikipedia-links"></ul>

    var wikiBaseUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=';
    var wikiUrl = wikiBaseUrl + cityStr;
    // the above is simply a wikipedia url with a search string inside

    //error handling
    //thrown after 8 seconds have gone by

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Could not load wikipedia links');
    }, 8000);

    // here we come to the ajax request object
    $.ajax({
        //url parameter created and set equal to wiki url that was just created

        url: wikiUrl,

        dataType: "jsonp", //indicates that this is a jsonp request

        //the success function
        success: function(data){

            //this anonymous function is run when we get the response

            for (var i = 0; i <= data[1].length - 1; i++) {
                var pageLink = '<li><a href="' + data[3][i] + '">' + data[1][i] + '</a></li>';

                //append the articles on the page

                $wikiElem.append(pageLink);
            };

            //clear timeout added to clear the timer and not throw the error once this gets successful

            clearTimeout(wikiRequestTimeout);
        }
    });


    return false;

};

//this loads the function loadData() when someone hits "submit"
$('#form-container').submit(loadData);
