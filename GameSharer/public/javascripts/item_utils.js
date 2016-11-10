var itemsUrl = "/items/"
var getGame = function (div, number) {
    var url;
    if (number) {
        url = itemsUrl + "?category=game&num=" + number
    } else {
        url = itemsUrl + "?category=game";
    }
    requireItem(div, url)
}

var getConsole = function (div, number) {
    var url;
    if (number) {
        url = itemsUrl + "?category=console&num=" + number
    } else {
        url = itemsUrl+ "?category=console";
    }
    requireItem(div, url)
}

var getMyItem = function (div) {
    var url;
    url = apiUrl + "/my-items";
    requireItem(div, url)
}

var requireItem = function (div, url) {
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
        console.log(items[i])
        var content = item_template(items[i])
        div.append(content);
    }
    var script = script_template();
    div.append(script);
}


