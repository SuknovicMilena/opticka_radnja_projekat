var loginUrl = 'http://localhost:8000/api/login';

$(window).load(function () {
    if (localStorage.getItem("token")) {
        window.location.href = "/index.html";
        return;
    }

    $(document).on('click', "#login", function () {
        login();
    });

    $(document).on('keyup', function (e) {
        if (event.which == 13 || event.keyCode == 13) {
            login();
        }
    });

    function login() {
        var loginData = {
            email: $("#email").val(),
            lozinka: $("#lozinka").val()
        };

        $.ajax({
            url: loginUrl,
            type: 'POST',
            data: JSON.stringify(loginData),
            success: function (logovanKorisnik) {
                if (logovanKorisnik.logovan) {
                    localStorage.setItem("token", logovanKorisnik.token);
                    localStorage.setItem("isAdmin", logovanKorisnik.isAdmin);
                    window.location.href = "/index.html";
                }
                else {
                    alert(JSON.stringify("Neispravni kredencijali! Pokusajte ponovo"));
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }
});
