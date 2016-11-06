

$(document).ready(function () {
    if (document.cookie != "") {
        $(".sign-in").replaceWith("<li id='profile' class='right'><a>Profile</a></li>");
        $(".sign-up").replaceWith("<li id='logout' class='right'><a>Logout</a></li>");
    }

    window.onclick = function (event) {
        if (event.target == document.getElementById('login-form')) {
            document.getElementById('login-form').style.display = "none";
        }
        if (event.target == document.getElementById('signup-form')) {
            document.getElementById('signup-form').style.display = "none";
        }
    }

    $(".sign-up").click(function () {
        document.getElementById('signup-form').style.display = 'block';
    });

    $(".sign-in").click(function () {
        document.getElementById('login-form').style.display = 'block';
    });

    $(".close").click(function () {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
    });

    $(".cancelbtn").click(function () {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
    });

    $("#logout").click(function () {
        $.ajax({
            url: apiUrl + "logout",
            type: 'DELETE',
            dataType: 'JSON',
            success: function (data) {
                window.location = "/"
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
    });

    $("#profile").click(function () {
        window.location = "/profile"
    })
})

