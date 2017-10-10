
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
    var nyTimesApiKey = '07abd192a7c66b4fe1603702aa976a7f:17:71194010';
    var nyTimesUrl = nyTimesBaseUrl + '.json?api-key=' + nyTimesApiKey + '&q=' + city;

    $.getJSON( nyTimesUrl, function( data ) {
        var docs = data.response.docs;
        $.each( docs, function( key, val ) {
            var title = '<a href="' + val.web_url +'">' + val.headline.main + '</a>';

            var leadParagraph = '';
            if (val.lead_paragraph) {
                leadParagraph = '<p>' + val.lead_paragraph + '</p>';
            };

            var listItem = '<li class="article">' + title + leadParagraph + '</li>';

            $nytHeaderElem.text('New York Times Articles about ' + city);
            $nytElem.append(listItem);
        });
    }).fail(function(){
        $nytHeaderElem.text('New York Times Articles could not be loaded');
    });




    return false;

};

//this loads the function loadData() when someone hits "submit"
$('#form-container').submit(loadData);
