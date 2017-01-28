var galerija = "Galerija proizvoda";
var kontakt = "Kontakt";
var anketa = "Anketa";
var korisniLinkovi = "Korisni linkovi";
var search = "Pronadji jos neku radnju";
var grafikoni = "Grafikoni";
var pretraga_slika="Pretraga slika";
var uslovi_kupovine= "Uslovi kupovine";


var current_page = 1;
var records_per_page = 2;

var objJson = [
    { adName: result = galerija.link("/galerija.html") },
    { adName: result = kontakt.link("/kontakt.html") },
    { adName: result = anketa.link("/anketa.html") },
    { adName: result = korisniLinkovi.link("/korisniLinkovi.html") },
    { adName: result = search.link("/search.html") },
    { adName: result = grafikoni.link("/grafikoni.html") },
    { adName: result = grafikoni.link("/grafikoni.html") },
     { adName: result = uslovi_kupovine.link("/usloviKupovine.html") },
    { adName: result = pretraga_slika.link("/restgalerija.php") }
]; // Can be obtained from another source, such as your objJson variable

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        listing_table.innerHTML += objJson[i].adName + "<br>";
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function () {
    changePage(1);
};