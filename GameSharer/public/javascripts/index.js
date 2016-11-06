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
    });
})();
