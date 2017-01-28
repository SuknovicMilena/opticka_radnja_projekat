var naocareZaSunceUrl = 'http://localhost:8000/api/naocare-za-sunce';
var naocareZaVidUrl = 'http://localhost:8000/api/naocare-za-vid';
var proizvodjaciUrl = 'http://localhost:8000/api/proizvodjaci';
var socivaUrl = 'http://localhost:8000/api/sociva';
var loginUrl = 'http://localhost:8000/api/login';
var anketaUrl='http://localhost:8000/api/anketa';
var sveNaocareZaSunce = [];
var sveNaocareZaVid = [];
var sviProizvodjaci = [];
var svaSociva = [];
var slikeUrl = ['img/slike.jpg', 'img/naocaree.jpg', 'img/fendi.jpg'];
var isAdmin = false;

$(window).load(function () {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login.html";
        return;
    }

    isAdmin = localStorage.getItem("isAdmin") == 'true';

    if (!isAdmin) {
        $('.admin-only').hide();
    }

    carousel();
    setInterval(carousel, 2000);
    ucitajApiZaKursnuListu();

    $(document).on('change', "#proizvod-tip", function () {

        var selectedValue = $(this).val();
        switch (selectedValue) {

            // NAOCARE ZA VID/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'NaocareZaVid':
                $("div.proizvodjaci-holder").hide();
                $("div.proizvodi-holderSunce").hide();
                if (isAdmin) {
                    $("#dodaj-naocareSunce").hide();
                    $("#dodaj-naocare").show();
                }
                $("div.proizvodi-holderSunce").hide();
                $("div.proizvodi-holder").show();
                $("#otkazi-naocareSunce").hide();
                $("#dodaj-proizvodjaca").hide();

                prikaziSveNaocareZaVid();
                break;

            // NAOCARE ZA SUNCE/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'NaocareZaSunce':
                if (isAdmin) {
                    $("#dodaj-naocare").hide();
                    $("#dodaj-naocareSunce").show();
                }
                $("div.proizvodjaci-holder").hide();
                $("div.proizvodi-holder").hide();
                $("div.proizvodi-holderSunce").show();
                $("#dodaj-proizvodjaca").hide();
                $("#otkazi-naocare").hide();
                $("#otkazi-proizvodjace").hide();
                prikaziSveNaocareZaSunce();
                break;

            //proizvodjaci///////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'Proizvodjac':

                if (isAdmin) {
                    $("#dodaj-naocare").hide();
                    $("#dodaj-naocareSunce").hide();
                }
                $("div.proizvodi-holderSunce").hide();
                $("div.proizvodi-holder").hide();
                $("div.proizvodjaci-holder").show();
                prikaziProizvodjace();
                $("#otkazi-naocare").hide();
                $("#otkazi-naocareSunce").hide();
                $("#dodaj-proizvodjaca").show();

                break;
            case 'KontaktnaSociva':
                $("div.proizvodi-holder-kontaktnasociva").show();
                if (isAdmin) {
                    $("#dodaj-sociva").show();
                }
                prikaziSociva();
                break;
            default:
                break;
        }
    });
    //naredba insert //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).on('click', "#dodaj-naocareSunce", function () {

        $("div.forma-holderSunce").show();
        $("#otkazi-naocareSunce").show();
        getProizvodjaci($('#proizvodjacSunce'));
        $(this).hide();
    });

    $(document).on('click', "#dodaj-sociva", function () {

        $("div.forma-holder-kontaktnasociva").show();
        $("#otkazi-sociva").show();
        getProizvodjaci($('#proizvodjacSociva'));
        $(this).hide();
    });

    $(document).on('click', "#dodaj-naocare", function () {

        $("div.forma-holder").show();
        $("#otkazi-naocare").show();
        getProizvodjaci($('#proizvodjac'));
        $(this).hide();
    });

    $(document).on('click', "#dodaj-proizvodjaca", function () {

        $("div.forma-holder-proizvodjaci").show();
        $("#otkazi-proizvodjaca").show();
        $(this).hide();
    });

    $(document).on('click', "#otkazi-naocare", function () {
        $("div.forma-holder").hide();
        $(this).hide();
        $("#dodaj-naocare").show();
    });

    $(document).on('click', "#otkazi-naocareSunce", function () {
        $("div.forma-holderSunce").hide();
        $(this).hide();
        $("#dodaj-naocareSunce").show();
    });
    $(document).on('click', "#otkazi-sociva", function () {
        $("div.forma-holder-kontaktnasociva").hide();
        $(this).hide();
        $("#dodaj-sociva").show();
    });
    $(document).on('click', "#otkazi-proizvodjaca", function () {
        $("div.forma-holder-proizvodjaci").hide();
        $(this).hide();
        $("#dodaj-proizvodjaca").show();
    });


    $(document).on('click', "#sacuvaj", function () {

        var naocare;
        naocare = {
            ime: $("#ime").val(),
            proizvodjac_id: $("#proizvodjac").val()
        };


        if (naocare.ime.length < 3 || naocare.ime.length > 8) {
            alert("Niste dobro uneli, unesite ponovo! ");
        }
        else {
            $.ajax({
                url: naocareZaVidUrl,
                type: 'POST',
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data: JSON.stringify(naocare),
                success: function (sacuvaneNaocare) {
                    $("div.forma-holder").hide();
                    $(this).hide();
                    $("#dodaj-naocare").show();
                    prikaziSveNaocareZaVid();
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                }
            });
        }
    });

    $(document).on('click', "#sacuvajSunce", function () {

        var naocare = {
            ime: $("#imeSunce").val(),
            proizvodjac_id: $("#proizvodjacSunce").val()
        };

        $.ajax({
            url: naocareZaSunceUrl,
            type: 'POST',
            headers: {
                Authorization: localStorage.getItem("token")
            },
            data: JSON.stringify(naocare),
            success: function (sacuvaneNaocareSunce) {
                $("div.forma-holderSunce").hide();
                $(this).hide();
                $("#dodaj-naocareSunce").show();
                prikaziSveNaocareZaSunce();
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });

    $(document).on('click', "#sacuvajSociva", function () {

        var sociva = {
            ime: $("#imeSociva").val(),
            proizvodjac_id: $("#proizvodjacSociva").val()
        };

        $.ajax({
            url: socivaUrl,
            type: 'POST',
            headers: {
                Authorization: localStorage.getItem("token")
            },
            data: JSON.stringify(sociva),
            success: function (sacuvanaSociva) {
                $("div.forma-holderSunce").hide();
                $(this).hide();
                $("#dodaj-sociva").show();
                prikaziSociva();
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });

    $(document).on('click', "#sacuvajProizvodjaca", function () {

        var proizvodjac = { ime: $("#imeProizvodjac").val() };

        $.ajax({
            url: proizvodjaciUrl,
            type: 'POST',
            headers: {
                Authorization: localStorage.getItem("token")
            },
            data: JSON.stringify(proizvodjac),
            success: function (sacuvaniProizvodjaci) {
                $("div.forma-holder-proizvodjaci").hide();
                $(this).hide();
                $("#dodaj-proizvodjaca").show();
                prikaziProizvodjace();
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    });
    // naredbe koje su u celijama//////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('click', ".izmeni", function () {

        // get the contents of the attribute 
        var naocareId = $(this).attr('data-id');

        var naocareZaUpdate = sveNaocareZaVid.filter(function (n) {
            return n.id == naocareId;
        })[0];

        var tdIme = $('#proizvodi td.ime[data-id="' + naocareId + '"]');
        var input = $('<input type="text" class="ime-edit" data-id="' + naocareId + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        var tdProizvodjac = $('#proizvodi td.proizvodjac[data-id="' + naocareId + '"]');
        var select = $('<select class="proizvodjac-edit" data-id="' + naocareId + '"/>');
        getProizvodjaci(select, function (finalSelectObject) {
            tdProizvodjac.html(finalSelectObject);
        });
        showEditButtons(naocareId);
    });

    $(document).on('click', ".izmeniSunce", function () {


        // get the contents of the attribute 
        var naocareId = $(this).attr('data-id');

        var naocareZaUpdate = sveNaocareZaSunce.filter(function (n) {
            return n.id == naocareId;
        })[0];

        var tdIme = $('#proizvodiSunce td.imeSunce[data-id="' + naocareId + '"]');
        var input = $('<input type="text" class="ime-edit-sunce" data-id="' + naocareId + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        var tdProizvodjac = $('#proizvodiSunce td.proizvodjacSunce[data-id="' + naocareId + '"]');
        var select = $('<select class="proizvodjac-edit-sunce" data-id="' + naocareId + '"/>');
        getProizvodjaci(select, function (finalSelectObject) {
            tdProizvodjac.html(finalSelectObject);
        });
        showEditButtonsSunce(naocareId);
    });

    $(document).on('click', ".izmeniSociva", function () {


        // get the contents of the attribute 
        var socivaId = $(this).attr('data-id');

        var socivaZaUpdate = svaSociva.filter(function (s) {
            return s.id == socivaId;
        })[0];

        var tdIme = $('#proizvodiSociva td.imeSociva[data-id="' + socivaId + '"]');
        var input = $('<input type="text" class="ime-edit-sociva" data-id="' + socivaId + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        var tdProizvodjac = $('#proizvodiSociva td.proizvodjacSociva[data-id="' + socivaId + '"]');
        var select = $('<select class="proizvodjac-edit-sociva" data-id="' + socivaId + '"/>');
        getProizvodjaci(select, function (finalSelectObject) {
            tdProizvodjac.html(finalSelectObject);
        });
        showEditButtonsSociva(socivaId);
    });



    $(document).on('click', ".izmeniProizvodjac", function () {

        // get the contents of the attribute 
        var proizvodjacID = $(this).attr('data-id');

        var proizvodjacZaUpdate = sviProizvodjaci.filter(function (p) {
            return p.proizvodjac_id == proizvodjacID;
        })[0];

        var tdIme = $('#proizvodjaci td.imeProizvodjac[data-id="' + proizvodjacID + '"]');
        var input = $('<input type="text" class="ime-edit-proizvodjac" data-id="' + proizvodjacID + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        showEditButtonsProizvodjac(proizvodjacID);
    });

    $(document).on('click', ".save-edit", function () {
        var naocareId = $(this).attr('data-id');
        var naocare = {
            id: naocareId,
            ime: $('.ime-edit[data-id="' + naocareId + '"]').val(),
            proizvodjac_id: $('.proizvodjac-edit[data-id="' + naocareId + '"]').val()
        };
        updateNaocare(naocare);
    });

    $(document).on('click', ".save-edit-sunce", function () {
        var naocareId = $(this).attr('data-id');
        var naocare = {
            id: naocareId,
            ime: $('.ime-edit-sunce[data-id="' + naocareId + '"]').val(),
            proizvodjac_id: $('.proizvodjac-edit-sunce[data-id="' + naocareId + '"]').val()
        };
        updateNaocareSunce(naocare);
    });
    $(document).on('click', ".save-edit-sociva", function () {
        var socivaId = $(this).attr('data-id');
        var sociva = {
            id: socivaId,
            ime: $('.ime-edit-sociva[data-id="' + socivaId + '"]').val(),
            proizvodjac_id: $('.proizvodjac-edit-sociva[data-id="' + socivaId + '"]').val()
        };
        updateSociva(sociva);
    });

    $(document).on('click', ".save-edit-proizvodjac", function () {
        var proizvodjacId = $(this).attr('data-id');
        var proizvodjac = {
            proizvodjac_id: proizvodjacId,
            ime: $('.ime-edit-proizvodjac[data-id="' + proizvodjacId + '"]').val()
        };
        updateProizvodjace(proizvodjac);
    });


    $(document).on('click', ".cancel-edit", function () {
        var naocareId = $(this).attr('data-id');
        var naocareZaUpdate = sveNaocareZaVid.filter(function (n) {
            return n.id == naocareId;
        })[0];

        $('#proizvodi td[data-id="' + naocareId + '"]').each(function () {
            if ($(this).hasClass('ime')) {
                $(this).html(naocareZaUpdate.ime);
            }
            else if ($(this).hasClass('proizvodjac')) {
                $(this).html(naocareZaUpdate.proizvodjac);
            }
        });

        hideEditButtons(naocareId);
    });

    $(document).on('click', ".cancel-edit-sunce", function () {
        var naocareId = $(this).attr('data-id');
        var naocareZaUpdate = sveNaocareZaSunce.filter(function (n) {
            return n.id == naocareId;
        })[0];

        $('#proizvodi td[data-id="' + naocareId + '"]').each(function () {
            if ($(this).hasClass('imeSunce')) {
                $(this).html(naocareZaUpdate.ime);
            }
            else if ($(this).hasClass('proizvodjacSunce')) {
                $(this).html(naocareZaUpdate.proizvodjac);
            }
        });

        hideEditButtonsSunce(naocareId);
    });

    $(document).on('click', ".cancel-edit-proizvodjac", function () {
        var imeId = $(this).attr('data-id');
        var proizvodjacZaUpdate = sviProizvodjaci.filter(function (p) {
            return p.proizvodjac_id == imeId;
        })[0];

        $('#proizvodjaci td[data-id="' + imeId + '"]').each(function () {
            if ($(this).hasClass('imeProizvodjac')) {
                $(this).html(proizvodjacZaUpdate.ime);
            }
        });

        hideEditButtonsProizvodjac(imeId);
    });


    $(document).on('click', ".cancel-edit-sociva", function () {
        var socivaId = $(this).attr('data-id');
        var socivaZaUpdate = svaSociva.filter(function (s) {
            return s.id == socivaId;
        })[0];

        $('#proizvodi td[data-id="' + socivaId + '"]').each(function () {
            if ($(this).hasClass('imeSociva')) {
                $(this).html(socivaZaUpdate.ime);
            }
        });

        hideEditButtonsSociva(socivaId);
    });

    $(document).on('click', ".obrisi", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ove naocare?")) {
            var naocareId = $(this).attr('data-id');
            $.ajax({
                url: naocareZaVidUrl + '?naocareId=' + naocareId,
                type: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (result) {
                    prikaziSveNaocareZaVid();
                },
                error: function (error) {
                    alert(error.responseText);
                }
            });
        }
    });

    $(document).on('click', ".obrisiSunce", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ove naocare?")) {
            var naocareId = $(this).attr('data-id');
            $.ajax({
                url: naocareZaSunceUrl + '?naocareId=' + naocareId,
                type: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (result) {
                    prikaziSveNaocareZaSunce();
                },
                error: function (error) {
                    alert(error.responseText);
                }
            });
        }
    });

    $(document).on('click', ".obrisiProizvodjac", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ove naocare?")) {
            var proizvodjacID = $(this).attr('data-id');
            $.ajax({
                url: proizvodjaciUrl + '?proizvodjacID=' + proizvodjacID,
                type: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (result) {
                    prikaziProizvodjace();
                },
                error: function (error) {
                    alert(error.responseText);
                }
            });
        }
    });

    $(document).on('click', ".obrisiSociva", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ova sociva?")) {
            var socivaID = $(this).attr('data-id');
            $.ajax({
                url: socivaUrl + '?socivaID=' + socivaID,
                type: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                success: function (result) {
                    prikaziSociva();
                },
                error: function (error) {
                    alert(error.responseText);
                }
            });
        }
    });

    $(document).on('change', "#valute", function () {
        var izabranaValuta = $(this).val();
        var vrednostiKursa = kursnaLista[izabranaValuta];
        $("#kupovni").html(vrednostiKursa.kup);
        $("#srednji").html(vrednostiKursa.sre);
        $("#prodajni").html(vrednostiKursa.pro);
    });

    $(document).on('click', "#logout", function () {
        localStorage.clear();
        window.location.href = "/login.html";
    });

});

//funkcija vraca sve naocare za vid i sunce/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function prikaziProizvodjace() {

    $.ajax({
        url: proizvodjaciUrl,
        type: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (proizvodjaciSaServera) {
            // napakuj html koji treba da se prikaze
            sviProizvodjaci = proizvodjaciSaServera;
            var sviProizvodjaciHtml = '';

            for (var i = 0; i < proizvodjaciSaServera.length; i++) {
                var proizvodjac = proizvodjaciSaServera[i];

                var proizvodjacHtml = '<tr>' +

                    '<td>' + proizvodjac.proizvodjac_id + '</td>' +

                    '<td class="imeProizvodjac" data-id=' + proizvodjac.proizvodjac_id + '>' + proizvodjac.ime + '</td>' +
                    (isAdmin ? '<td class="admin-only">' +
                        '<button class="izmeniProizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Izmeni</button>' +
                        '<button class="obrisiProizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Obrisi</button>' +
                        '<button class="save-edit-proizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Sacuvaj</button>' +
                        '<button class="cancel-edit-proizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Otkazi</button>' +
                        '</td>' : '') +
                    '</tr>';
                sviProizvodjaciHtml += proizvodjacHtml;
            }
            //postavi html u tbody tabele
            $('#proizvodjaci tbody').html(sviProizvodjaciHtml);
            if (!isAdmin) {
                $('.admin-only').hide();
            }
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

function prikaziSveNaocareZaSunce() {

    $.ajax({
        url: naocareZaSunceUrl,
        type: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (naocareSunceServer) {
            // napakuj html koji treba da se prikaze
            sveNaocareZaSunce = naocareSunceServer;
            var sveNaocareSunceHtml = '';

            for (var i = 0; i < naocareSunceServer.length; i++) {
                var naocareSunce = naocareSunceServer[i];

                var naocareHtml = '<tr>' +
                    '<td>' + naocareSunce.id + '</td>' +                     //td je jedna celija!!!!!
                    '<td class="imeSunce" data-id=' + naocareSunce.id + '>' + naocareSunce.ime + '</td>' +
                    '<td class="proizvodjacSunce" data-id=' + naocareSunce.id + '>' + naocareSunce.proizvodjac + '</td>' +
                    (isAdmin ? '<td class="admin-only">' +
                        '<button class="izmeniSunce" data-id="' + naocareSunce.id + '">Izmeni</button>' +
                        '<button class="obrisiSunce" data-id="' + naocareSunce.id + '">Obrisi</button>' +
                        '<button class="save-edit-sunce" data-id="' + naocareSunce.id + '">Sacuvaj</button>' +
                        '<button class="cancel-edit-sunce" data-id="' + naocareSunce.id + '">Otkazi</button>' +
                        '</td>' : '') +
                    '</tr>';
                sveNaocareSunceHtml += naocareHtml;
            }
            //postavi html u tbody tabele
            $('#proizvodiSunce tbody').html(sveNaocareSunceHtml);
            if (!isAdmin) {
                $('.admin-only').hide();
            }
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

function prikaziSociva() {

    $.ajax({
        url: socivaUrl,
        type: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (socivaServer) {
            // napakuj html koji treba da se prikaze
            svaSociva = socivaServer;
            var sveSocivaHtml = '';

            for (var i = 0; i < socivaServer.length; i++) {
                var sociva = socivaServer[i];

                var socivaHtml = '<tr>' +
                    '<td>' + sociva.id + '</td>' +                     //td je jedna celija!!!!!
                    '<td class="imeSociva" data-id=' + sociva.id + '>' + sociva.ime + '</td>' +
                    '<td class="proizvodjacSociva" data-id=' + sociva.id + '>' + sociva.proizvodjac + '</td>' +
                    (isAdmin ? '<td class="admin-only">' +
                        '<button class="izmeniSociva" data-id="' + sociva.id + '">Izmeni</button>' +
                        '<button class="obrisiSociva" data-id="' + sociva.id + '">Obrisi</button>' +
                        '<button class="save-edit-sociva" data-id="' + sociva.id + '">Sacuvaj</button>' +
                        '<button class="cancel-edit-sociva" data-id="' + sociva.id + '">Otkazi</button>' +
                        '</td>' : '') +
                    '</tr>';
                sveSocivaHtml += socivaHtml;
            }
            //postavi html u tbody tabele
            $('#proizvodiSociva tbody').html(sveSocivaHtml);
            if (!isAdmin) {
                $('.admin-only').hide();
            }
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

function prikaziSveNaocareZaVid() {

    $.ajax({
        url: naocareZaVidUrl,
        type: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (naocareSaServera) {
            // napakuj html koji treba da se prikaze
            sveNaocareZaVid = naocareSaServera;
            var sveNaocareVidHtml = '';

            for (var i = 0; i < naocareSaServera.length; i++) {
                var naocare = naocareSaServera[i];

                var naocareHtml = '<tr>' +
                    '<td>' + naocare.id + '</td>' +
                    '<td class="ime" data-id=' + naocare.id + '>' + naocare.ime + '</td>' +
                    '<td class="proizvodjac" data-id=' + naocare.id + '>' + naocare.proizvodjac + '</td>' +
                    (isAdmin ? '<td class="admin-only">' +
                        '<button class="izmeni" data-id="' + naocare.id + '">Izmeni</button>' +
                        '<button class="obrisi" data-id="' + naocare.id + '">Obrisi</button>' +
                        '<button class="save-edit" data-id="' + naocare.id + '">Sacuvaj</button>' +
                        '<button class="cancel-edit" data-id="' + naocare.id + '">Otkazi</button>' +
                        '</td>' : '') +
                    '</tr>';
                sveNaocareVidHtml += naocareHtml;
            }
            //postavi html u tbody tabele
            $('#proizvodi tbody').html(sveNaocareVidHtml);
            if (!isAdmin) {
                $('.admin-only').hide();
            }
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}


// VRACA SVE PROIZVODJACE//////////////////////////////////////////////////////////////////////////////////////////////////////

function getProizvodjaci(dropdown, callBack) {
    $.ajax({
        url: proizvodjaciUrl,
        type: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (proizvodjaci) {
            sviProizvodjaci = proizvodjaci;
            var proizvodjaciHtml = '';
            for (var i = 0; i < proizvodjaci.length; i++) {

                var proizvodjac = proizvodjaci[i];
                proizvodjaciHtml += '<option value="' + proizvodjac.proizvodjac_id + '">' + proizvodjac.ime + '</option>';
            }
            dropdown.html(proizvodjaciHtml);
            if (callBack) callBack(dropdown);
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });
}


//UPDATE NAOCARE////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateNaocare(naocareZaUpdate) {
    $.ajax({
        url: naocareZaVidUrl,
        type: 'PUT',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data: JSON.stringify(naocareZaUpdate),
        success: function (result) {
            prikaziSveNaocareZaVid();
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}

function updateNaocareSunce(naocareZaUpdate) {
    $.ajax({
        url: naocareZaSunceUrl,
        type: 'PUT',
        data: JSON.stringify(naocareZaUpdate),
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            prikaziSveNaocareZaSunce();
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}
function updateSociva(socivaZaUpdate) {
    $.ajax({
        url: socivaUrl,
        type: 'PUT',
        data: JSON.stringify(socivaZaUpdate),
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            prikaziSociva();
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}
function updateProizvodjace(proizvodjacZaUpdate) {
    $.ajax({
        url: proizvodjaciUrl,
        type: 'PUT',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data: JSON.stringify(proizvodjacZaUpdate),
        success: function (result) {
            prikaziProizvodjace();
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}


//Prikazivanje i skrivanje dugmica//////////////////////////////////////////////////////////////////////////////////////////////
function showEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').show();
    $('.cancel-edit[data-id="' + naocareId + '"]').show();
    $('.izmeni[data-id="' + naocareId + '"]').hide();
    $('.obrisi[data-id="' + naocareId + '"]').hide();
}

function showEditButtonsSunce(naocareId) {
    $('.save-edit-sunce[data-id="' + naocareId + '"]').show();
    $('.cancel-edit-sunce[data-id="' + naocareId + '"]').show();
    $('.izmeniSunce[data-id="' + naocareId + '"]').hide();
    $('.obrisiSunce[data-id="' + naocareId + '"]').hide();
}

function showEditButtonsProizvodjac(imeId) {
    $('.save-edit-proizvodjac[data-id="' + imeId + '"]').show();
    $('.cancel-edit-proizvodjac[data-id="' + imeId + '"]').show();
    $('.izmeniProizvodjac[data-id="' + imeId + '"]').hide();
    $('.obrisiProizvodjac[data-id="' + imeId + '"]').hide();
}
function showEditButtonsSociva(socivaId) {
    $('.save-edit-sociva[data-id="' + socivaId + '"]').show();
    $('.cancel-edit-sociva[data-id="' + socivaId + '"]').show();
    $('.izmeniSociva[data-id="' + socivaId + '"]').hide();
    $('.obrisiSociva[data-id="' + socivaId + '"]').hide();
}
function hideEditButtonsSociva(socivaId) {
    $('.save-edit-sociva[data-id="' + socivaId + '"]').hide();
    $('.cancel-edit-sociva[data-id="' + socivaId + '"]').hide();
    $('.izmeniSociva[data-id="' + socivaId + '"]').show();
    $('.obrisiSociva[data-id="' + socivaId + '"]').show();
}
function hideEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').hide();
    $('.cancel-edit[data-id="' + naocareId + '"]').hide();
    $('.izmeni[data-id="' + naocareId + '"]').show();
    $('.obrisi[data-id="' + naocareId + '"]').show();
}

function hideEditButtonsSunce(naocareId) {
    $('.save-edit-sunce[data-id="' + naocareId + '"]').hide();
    $('.cancel-edit-sunce[data-id="' + naocareId + '"]').hide();
    $('.izmeniSunce[data-id="' + naocareId + '"]').show();
    $('.obrisiSunce[data-id="' + naocareId + '"]').show();
}


function hideEditButtonsProizvodjac(imeId) {
    $('.save-edit-proizvodjac[data-id="' + imeId + '"]').hide();
    $('.cancel-edit-proizvodjac[data-id="' + imeId + '"]').hide();
    $('.izmeniProizvodjac[data-id="' + imeId + '"]').show();
    $('.obrisiProizvodjac[data-id="' + imeId + '"]').show();
}

var currentIndex = 0;
function carousel() {
    var carouselHolder = $(".slajder")[0];
    var imageToUse = slikeUrl[currentIndex];
    carouselHolder.style.backgroundImage = 'url(' + imageToUse + ')';
    if (currentIndex < slikeUrl.length - 1) currentIndex++;
    else currentIndex = 0;
}

var kursnaLista = {};

function ucitajApiZaKursnuListu() {
    $.ajax({
        url: 'http://localhost:8000/api/kursna-lista',
        type: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: successCallback,
        error: function (error) {
            alert(error.responseText);
        }
    });
}

function successCallback(kursnaListaSaServera) {
    kursnaLista = kursnaListaSaServera;
    $('#dan').html(kursnaLista.date);

    var html = '<option selected disabled>-Izaberite-</option>';

    for (var property in kursnaLista) {
        if (kursnaLista.hasOwnProperty(property) && property != 'date') {
            html += '<option value="' + property + '">' + property.toUpperCase() + '</option>'
        }
    }

    $('#valute').html(html);
}