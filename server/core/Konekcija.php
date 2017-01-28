<?php

    class Konekcija {

        private function otvoriKonekciju(){
            $mysql_server = "localhost";
            $mysql_user = "root";
            $mysql_password = "";
            $mysql_db = "naocaredb2";
            $mysqli = new mysqli($mysql_server, $mysql_user, $mysql_password, $mysql_db);
            if ($mysqli->connect_errno) {
                printf("Konekcija neuspešna: %s\n", $mysqli->connect_error);
                echo("GRESKA SA BAZOM: ".$mysqli->connect_error);
                die();
            }
            $mysqli->set_charset("utf8");
            return $mysqli;
        }

        public function izvrsiQuery($sql){
            $mysqli = $this->otvoriKonekciju();
            if ($q = $mysqli->query($sql)) {
                return true; 
            } else {
                echo("GRESKA SA BAZOM: ".$mysqli->error);
                die();
                return false;
            }
            $this->zatvoriKonekciju($mysqli);
        }

        public function izvrsiInsertQuery($sql){
            $mysqli = $this->otvoriKonekciju();
            if ($q = $mysqli->query($sql)) {
                return $mysqli->insert_id; 
            } else {
                echo("GRESKA SA BAZOM: ".$mysqli->error);
                die();
                return false;
            }
            $this->zatvoriKonekciju($mysqli);
        }

        public function izvrsiQueryIVratiRedove($sql){
            $mysqli = $this->otvoriKonekciju();
            $rezultat = $mysqli->query($sql);
            $data = array();
            
            while ($row = $rezultat->fetch_assoc()){
                $data[] = $row;
            }
            $this->zatvoriKonekciju($mysqli);
            return $data;
        }

        private function zatvoriKonekciju($mysqli){
            $mysqli->close();
        }
    }
?>
