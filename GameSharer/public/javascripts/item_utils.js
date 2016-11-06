var apiUrl = "/items/"
var getGame = function (number, div) {
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
                    displayItems(data.result, div)
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

var getConsole = function (number, div) {
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
                    displayItems(data.result, div)
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

var displayItems = function (items, div) {
    var i;
    for (i = 0; i < items.length && i < 3; i++) {
        var content = item_template(items[i])
        div.append(content);
    }
}


