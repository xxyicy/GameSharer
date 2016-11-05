(function () {
    $(document).ready(function () {
        var apiUrl = "http://localhost:5000/users/";

        if (document.cookie != "") {
            $(".sign-in").replaceWith("<li id='profile' class='right'><a>Profile</a></li>");
            $(".sign-up").replaceWith("<li id='logout' class='right'><a>Logout</a></li>");
        }
        
        $("#logout").click(function () {
            $.ajax({
                url: apiUrl + "logout",
                type: 'DELETE',
                data: {},
                dataType: 'JSON',
                success: function (data) {
                    console.log(data);
                    window.location.href = "http://localhost:5000/"
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        });
    });
})();