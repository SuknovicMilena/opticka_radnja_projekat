var anketaUrl = "http://localhost:8000/api/anketa";

$(window).load(function () {

    $(document).on('click', "#anketapotvrdi", function () {
        ubaciAnketu();
    });

    function ubaciAnketu() {
        var anketa = {
            ime: $("#ime").val(),
            prezime: $("#prezime").val(),
            email: $("#email").val(),
            kritike: $("#kritike-saveti").val(),
        };

        $.ajax({
            url: anketaUrl,
            type: 'POST',
            data: JSON.stringify(anketa),
            success: function () {
                alet("Hvala vam sto ste nam pomogli!");
            }
         
        });
    }



});