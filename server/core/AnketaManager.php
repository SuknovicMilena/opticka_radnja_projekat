<?php

    class AnketaManager {

        private $konekcija;

        public function __construct() {
            $this->konekcija = new Konekcija();
        }

         function dodajAnketu($anketa) {
            $sql = 'INSERT INTO anketa (ime, prezime,email,kritike)  VALUES ("'. $anketa->ime . '",
            "' . $anketa->prezime . '","' . $anketa->email . '",
            "' . $anketa->kritike. '")';
        
            $insertovanId = $this->konekcija->izvrsiInsertQuery($sql);
            
            $anketa->anketa_id = $insertovanId;
            header('Content-Type: application/json');
            echo json_encode($anketa); 
        }
       }
?>