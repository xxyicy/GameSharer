(function () {
    $(document).ready(function () {
        var apiUrl = "/users/";

        $("#register").click(function () {
            console.log("!!!!!!!!!!!")
            var username = $("#signup-form [name='username']").val();
            var password = $("#signup-form [name='password']").val();
            var repassword = $("#signup-form [name='repassword']").val();
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
            var user = {
                username: username,
                email: $("#signup-form [name='email']").val(),
                password: password,
                firstName: $("#signup-form [name='firstName']").val(),
                lastName: $("#signup-form [name='lastName']").val(),
                phoneNumber: $("#signup-form [name='phoneNumber']").val()
            }
            console.log("@222222")
            $.ajax({
                url: apiUrl + "signup",
                type: 'POST',
                data: user,
                dataType: 'JSON',
                success: function (data) {
                    console.log("123120u312u31283u91823")
                    console.log(data)
                    if (!data.succ) {
                        alert(data.result);
                    } else {
                        window.location.reload();
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
        });

        
    });
})();
