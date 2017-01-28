<?php

    class KorisniciManager {

        private $konekcija;

        public function __construct() {
            $this->konekcija = new Konekcija();
        }

        public function login($loginModel) {
            $sql = 'SELECT *
                    FROM  korisnici
                    WHERE email="'.$loginModel->email.'" AND lozinka="'.$loginModel->lozinka.'"';
        
            $rezultat = $this->konekcija->izvrsiQueryIVratiRedove($sql);

            $loginRezultat = new stdClass();

            if (count($rezultat) > 0) {
                $token = $this->createGuid();
                $this->kreirajLogin($rezultat[0]['email'], $token);
                $loginRezultat->logovan = true;
                $loginRezultat->isAdmin = $rezultat[0]['rola'] == 'admin';
                $loginRezultat->token = $token;
            }
            else {
                $loginRezultat->logovan = false;
            }

            header('Content-Type: application/json');
            echo json_encode($loginRezultat);
        }

        public function autorizujAdmina(){
            $this->autorizuj(true);
        }

        public function autorizujKorisnika(){
            $this->autorizuj(false);
        }

        function autorizuj($isAdmin) {
            $token = null;
            $headers = apache_request_headers();
            if (isset($headers['Authorization'])){
                $token = $headers['Authorization'];
            }
            else {
                http_response_code(400);
                echo "Autorizacioni header nije prisutan.";
                exit();
            }

            $sql = 'SELECT *
                    FROM  korisnici
                    WHERE login_token="'.$token.'"';

            $rezultat = $this->konekcija->izvrsiQueryIVratiRedove($sql);

            if (count($rezultat) == 0) {
                http_response_code(400);
                echo "Neispravan token.";
                exit();
            }

            $rolaTrenutnogKorisnika = $rezultat[0]['rola'];
            if ($isAdmin && $rolaTrenutnogKorisnika != "admin") {
                http_response_code(400);
                echo "Nemate pravo da pristupite ovom resursu.";
                exit();
            }
        }

        function kreirajLogin($email, $token) {
            $sql = "UPDATE korisnici
                    SET login_token='".$token."'
                    WHERE email='".$email."'";

            $this->konekcija->izvrsiQuery($sql);
        }

        function createGuid()
        {
            if (function_exists('com_create_guid') === true)
            {
                return trim(com_create_guid(), '{}');
            }

            return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
        }

    }
?>