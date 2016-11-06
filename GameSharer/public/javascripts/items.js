var apiUrl = "/items/"
var getGame = function (number) {
    var url;
    if (number) {
        url = apiUrl + "?category=game&num=" + number
    }else {
        url = apiUrl + "?category=game";
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                if (data && data.succ) {
                    displayGame(data.result)
                } else {
                    alert(data.result)
                }
            } else {
                alert("Does not get item");
            }
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    })
}

var getConsole = function (number) {
    var url;
    if (number) {
        url = apiUrl + "?category=console&num=" + number
    }else {
        url = apiUrl + "?category=console";
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                if (data && data.succ) {
                    displayConsole(data.result)
                } else {
                    alert(data.result)
                }
            } else {
                alert("Does not get item");
            }
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    })
}

var displayGame = function (games) {
    var i;
    var gameDiv = $("#game_div content")
    for (i = 0; i < games.length && i < 5; i++) {
        var content = item_template(games[i])
        gameDiv.appendChild(content);
    }
}

var displayConsole = function (consoles) {
    var i;
    var gameDiv = $("#console_div content")
    for (i = 0; i < consoles.length && i < 5; i++) {
        var content = item_template(consoles[i])
        gameDiv.appendChild(content);
    }
}

