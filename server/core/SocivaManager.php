<?php

    class SocivaManager{

        private $konekcija;

        public function __construct() {
            $this->konekcija = new Konekcija();
        }

        public function vratiSociva() {
            $sql = 'SELECT s.id, s.ime as ime, p.ime as proizvodjac
                    FROM   kontaktna_sociva s 
                    JOIN proizvodjac p ON (p.proizvodjac_id = s.proizvodjac_id)';
            $rezultat = $this->konekcija->izvrsiQueryIVratiRedove($sql);

            header('Content-Type: application/json');
            echo json_encode($rezultat);
        }

        function dodajSociva($kontaktaSociva) {
            $sql = 'INSERT INTO kontaktna_sociva (ime, proizvodjac_id)  VALUES ("'. $kontaktaSociva->ime . '","' . $kontaktaSociva->proizvodjac_id . '")';
        
            $insertovanId = $this->konekcija->izvrsiInsertQuery($sql);
            
            $kontaktaSociva->id = $insertovanId;
            header('Content-Type: application/json');
            echo json_encode($kontaktaSociva); 
        }

        function izmeniSociva($socivaZaIzmenu) {
            $sql = "UPDATE kontaktna_sociva
                    SET 
                        ime='$socivaZaIzmenu->ime',
                        proizvodjac_id=$socivaZaIzmenu->proizvodjac_id
                    WHERE id= $socivaZaIzmenu->id";
            $this->konekcija->izvrsiQuery($sql);
            
            header('Content-Type: application/json');
            echo json_encode($socivaZaIzmenu); 
        }

        function obrisiSociva($socivaId) {
          

            $sql = "DELETE FROM kontaktna_sociva WHERE id=$socivaId";
            $this->konekcija->izvrsiQuery($sql);
            echo true;
        }
    }
?>