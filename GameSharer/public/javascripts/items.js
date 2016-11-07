var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function(){
    category = getUrlParameter('category');
    if (category == "game"){
        $("#item-page-title h1").text("Game");
        getGame($("#item-page-content"));
    }else if (category == "console"){
        $("#item-page-title h1").text("Console");
        getConsole($("#item-page-content"));
    }
    if (!category){
        $("#item-page-title h1").text("My Posts");
        getMyItem($("#item-page-content"))
    }
    
})