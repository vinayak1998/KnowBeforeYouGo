
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

    //NY time ajax request goes here
    return false;
};

//this loads the function loadData() when someone hits "submit"
$('#form-container').submit(loadData);
