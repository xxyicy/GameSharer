(function () {
    $(document).ready(function () {
        var apiUrl = "/users/";

        $("#register").click(function () {
            var username = $("#signup-form [name='username']").val();
            var password = $("#signup-form [name='password']").val();
            var repassword = $("#signup-form [name='repassword']").val();
            var email = $("#signup-form [name='email']").val();
            if (!username) {
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
            if (!ValidateEmail(email)) {
                alert("Please enter correct email address");
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
                    console.log(data)
                    if (!data.succ) {
                        alert(data.result);
                    } else {
                        var user = {
                            username: data.result.username,
                            password: password
                        }
                        login(user);
                    }
                },
                error: function (request, status, error) {
                    if (error) {
                        console.log(error)
                    } else {
                    }
                }
            });
        });

        $("#login").click(function () {
            var username = $("#login-form [name='username']").val();
            var password = $("#login-form [name='password']").val();
            if (!username) {
                alert("Username cannot be empty.");
                return;
            }
            if (!password) {
                alert("Password cannot be empty.");
                return;
            }
            var user = {
                username: username,
                password: password
            }
            login(user);
        });

        function login(user) {
            $.ajax({
                url: apiUrl + "login",
                type: 'POST',
                data: user,
                dataType: 'JSON',
                success: function (data) {
                    console.log(data);
                    if (!data.succ) {
                        return alert(data.result);
                    }
                    window.location = "/"
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        }

        function ValidateEmail(email) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return (true)
            }
            return (false)
        }

    });
})();
