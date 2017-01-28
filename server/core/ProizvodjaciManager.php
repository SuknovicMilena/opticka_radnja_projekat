<?php

 class ProizvodjaciManager {

        private $konekcija;

        public function __construct() {
            $this->konekcija = new Konekcija();
        }

     function vratiSveProizvodjace() {
        $sql = 'SELECT * FROM proizvodjac';
        $rezultat = $this->konekcija->izvrsiQueryIVratiRedove($sql);
        
        header('Content-Type: application/json');
        echo json_encode($rezultat);
    }

    function dodajProizvodjaca($proizvodjacZaCuvanje) {

        $sql = 'INSERT INTO proizvodjac (ime) 
        VALUES ("'. $proizvodjacZaCuvanje->ime .'")';

            $insertovanId = $this->konekcija->izvrsiInsertQuery($sql);
            $proizvodjacZaCuvanje->proizvodjac_id = $insertovanId;        // my sqli ubacuje id jer smo stavili da je AI PRI KREIRANJU BAZE
            header('Content-Type: application/json');
            echo json_encode($proizvodjacZaCuvanje); 
    
    }

    function izmeniProizvodjaca($proizvodjacZaIzmenu) {

           $sql = "UPDATE proizvodjac 
                SET 
                      ime='$proizvodjacZaIzmenu->ime'
                      WHERE proizvodjac_id= $proizvodjacZaIzmenu->proizvodjac_id";

                    
            $this->konekcija->izvrsiQuery($sql);
            header('Content-Type: application/json');
            echo json_encode($proizvodjacZaIzmenu); 
    
    }

    function obrisiProizvodjaca($proizvodjacID) {
 
        $sql = "DELETE FROM proizvodjac WHERE proizvodjac_id=$proizvodjacID";
         $this->konekcija->izvrsiQuery($sql);
            echo true; 
    
    }
    
  }
?>