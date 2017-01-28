<?php

    class NaocareZaSunceManager{

        private $konekcija;

        public function __construct() {
            $this->konekcija = new Konekcija();
        }

        public function vratiSveNaocare() {
            $sql = 'SELECT n.id, n.ime as ime, p.ime as proizvodjac
                    FROM naocare_za_sunce n 
                    JOIN proizvodjac p ON (p.proizvodjac_id = n.proizvodjac_id)';
            $rezultat = $this->konekcija->izvrsiQueryIVratiRedove($sql);

            header('Content-Type: application/json');
            echo json_encode($rezultat);
        }

        function dodajNaocare($naocareZaCuvanje) {
            $sql = 'INSERT INTO naocare_za_sunce (ime, proizvodjac_id)  VALUES ("'. $naocareZaCuvanje->ime . '","' . $naocareZaCuvanje->proizvodjac_id . '")';
        
            $insertovanId = $this->konekcija->izvrsiInsertQuery($sql);
            
            $naocareZaCuvanje->id = $insertovanId;
            header('Content-Type: application/json');
            echo json_encode($naocareZaCuvanje); 
        }

        function izmeniNaocare($naocareZaIzmenu) {
            $sql = "UPDATE naocare_za_sunce
                    SET 
                        ime='$naocareZaIzmenu->ime',
                        proizvodjac_id=$naocareZaIzmenu->proizvodjac_id
                    WHERE id= $naocareZaIzmenu->id";
            $this->konekcija->izvrsiQuery($sql);
            
            header('Content-Type: application/json');
            echo json_encode($naocareZaIzmenu); 
        }

        function obrisiNaocare($naocareId) {
          

            $sql = "DELETE FROM naocare_za_sunce WHERE id=$naocareId";
            $this->konekcija->izvrsiQuery($sql);
            echo true;
        }
    }
?>