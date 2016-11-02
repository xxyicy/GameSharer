(function () {
    window.onclick = function (event) {
        if (event.target == document.getElementById('login-form')) {
            document.getElementById('login-form').style.display = "none";
        }
        if (event.target == document.getElementById('signup-form')) {
            document.getElementById('signup-form').style.display = "none";
        }
    }

    $(document).ready(function () {
        var apiUrl = "http://localhost:3000/users/";

        if (document.cookie != "") {
            $(".in").replaceWith("<li id='profile' class='right'><a>Profile</a></li>");
            $(".up").replaceWith("<li id='logout' class='right'><a>Logout</a></li>");
        }

        $(".up").click(function () {
            document.getElementById('signup-form').style.display = 'block';
        });

        $(".in").click(function () {
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

        $("#register").click(function () {
            var username = $("#signup-form [name='username']").val();
            var password = $("#signup-form [name='password']").val();
            var repassword = $("#signup-form [name='repassword']").val();
            if (username == 0) {
                alert("Username cannot be empty.");
                return;
            }
            if (password.length < 6) {
                alert("Length of your password must be greater than six.");
                return;
            }
            if (password != repassword) {
                alert("Please comfirm your password");
                return;
            }
            var user = {
                username: username,
                email: $("#signup-form [name='email']").val(),
                password: password,
                firstName: $("#signup-form [name='firstName']").val(),
                lastName: $("#signup-form [name='lastName']").val(),
                phoneNumber: $("#signup-form [name='phoneNumber']").val()
            }
            $.ajax({
                url: apiUrl + "signup",
                type: 'POST',
                data: user,
                dataType: 'JSON',
                success: function (data) {
                    if (data.code == 11000) {
                        alert("Username has been used, please use another one.");
                    } else {
                        document.getElementById('signup-form').style.display = 'none';
                    }
                    console.log(data);
                },
                error: function (request, status, error) {
                    console.log(error);
                }
            });
        });

        $("#login").click(function () {
            var username = $("#login-form [name='username']").val();
            var password = $("#login-form [name='password']").val();
            if (username == 0) {
                alert("Username cannot be empty.");
                return;
            }
            if (password == 0) {
                alert("Password cannot be empty.");
                return;
            }
            var user = {
                username: username,
                password: password
            }
            $.ajax({
                url: apiUrl + "login",
                type: 'POST',
                data: user,
                dataType: 'JSON',
                success: function (data) {
                    console.log(data);
                    if (data.err) {
                        alert(data.err);
                        return;
                    }
                    window.location.href = "./index.html"
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        });

        $("#logout").click(function () {
            $.ajax({
                url: apiUrl + "logout",
                type: 'DELETE',
                data: {},
                dataType: 'JSON',
                success: function (data) {
                    console.log(data);
                    window.location.href = "./index.html"
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        });
    });
})();