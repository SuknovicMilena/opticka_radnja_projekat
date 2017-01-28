<?php
    header('Access-Control-Allow-Origin: *');

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Accept, Authorization");
        header("Access-Control-Max-Age: ‎1728000");
        return;
    }

    require 'flight/Flight.php';
    require 'core/Konekcija.php';
    require 'core/NaocareZaSunceManager.php';
    require 'core/NaocareZaVidManager.php';
    require 'core/ProizvodjaciManager.php';
    require 'core/SocivaManager.php';
    require 'core/KorisniciManager.php';
    require 'core/AnketaManager.php';
  
    
        
    ////////////////GET

    Flight::route('GET /api/naocare-za-sunce', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujKorisnika();

        $naocareZaSunceManager = new NaocareZaSunceManager();
        $naocareZaSunceManager->vratiSveNaocare();
    });

    Flight::route('GET /api/naocare-za-vid', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujKorisnika();

        $naocareZaVidManager = new NaocareZaVidManager();
        $naocareZaVidManager->vratiSveNaocare();
    });

    Flight::route('GET /api/proizvodjaci', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujKorisnika();

        $proizvodjaciManager = new proizvodjaciManager();
        $proizvodjaciManager->vratiSveProizvodjace();
    });

    Flight::route('GET /api/sociva', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujKorisnika();

        $socivaManager = new socivaManager();
        $socivaManager->vratiSociva();
    });
    
   

    ////POST
    Flight::route('POST /api/login', function(){
        $korisniciManager = new KorisniciManager();
        $request = Flight::request();
        $loginModel = json_decode($request->getBody());
        $korisniciManager->login($loginModel);
    });

    Flight::route('POST /api/naocare-za-sunce', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $naocareZaSunceManager = new NaocareZaSunceManager();
        $request = Flight::request();
        $naocare = json_decode($request->getBody());
        $naocareZaSunceManager->dodajNaocare($naocare);
    });
    Flight::route('POST /api/naocare-za-vid', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $naocareZaVidManager = new NaocareZaVidManager();
        $request = Flight::request();
        $naocare = json_decode($request->getBody());
        $naocareZaVidManager->dodajNaocare($naocare);
    });
    Flight::route('POST /api/proizvodjaci', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $proizvodjaciManager = new proizvodjaciManager();
        $request = Flight::request();
        $proizvodjac = json_decode($request->getBody());
        $proizvodjaciManager->dodajProizvodjaca($proizvodjac);
    });

    Flight::route('POST /api/sociva', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $socivaManager = new socivaManager();
        $request = Flight::request();
        $sociva = json_decode($request->getBody());
        $socivaManager->dodajSociva($sociva);
    });
        Flight::route('POST /api/anketa', function(){
     

        $anketaManager = new AnketaManager();
        $request = Flight::request();
        $anketa = json_decode($request->getBody());
        $anketaManager->dodajAnketu($anketa);
    });


    ////////PUT

    Flight::route('PUT /api/naocare-za-sunce', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $naocareZaSunceManager = new NaocareZaSunceManager();
        $request = Flight::request();
        $naocare = json_decode($request->getBody());
        $naocareZaSunceManager->izmeniNaocare($naocare);
    });

    Flight::route('PUT /api/naocare-za-vid', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $naocareZaVidManager = new NaocareZaVidManager();
        $request = Flight::request();
        $naocare = json_decode($request->getBody());
        $naocareZaVidManager->izmeniNaocare($naocare);
    });

    Flight::route('PUT /api/proizvodjaci', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $proizvodjaciManager = new proizvodjaciManager();
        $request = Flight::request();
        $proizvodjac = json_decode($request->getBody());
        $proizvodjaciManager->izmeniProizvodjaca($proizvodjac);
    });

    Flight::route('PUT /api/sociva', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $socivaManager = new socivaManager();
        $request = Flight::request();
        $sociva = json_decode($request->getBody());
        $socivaManager->izmeniSociva($sociva);
    });


    //////////DELETE
    Flight::route('DELETE /api/naocare-za-sunce', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $naocareZaSunceManager = new NaocareZaSunceManager();
        $request = Flight::request();
        
        $naocareId = $request->query->naocareId;
        $naocareZaSunceManager->obrisiNaocare($naocareId);
    });

    Flight::route('DELETE /api/naocare-za-vid', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $naocareZaVidManager = new NaocareZaVidManager();
        $request = Flight::request();
        
        $naocareId = $request->query->naocareId;
        $naocareZaVidManager->obrisiNaocare($naocareId);
    });

    Flight::route('DELETE /api/proizvodjaci', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $proizvodjaciManager = new ProizvodjaciManager();
        $request = Flight::request();
        
        $proizvodjacID = $request->query->proizvodjacID;  //TACNO OVAKO PROIZVODJACID SMO PROSLEDLI U MANAGERU
        $proizvodjaciManager->obrisiProizvodjaca($proizvodjacID);
    });

    Flight::route('DELETE /api/sociva', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujAdmina();

        $socivaManager = new socivaManager();
        $request = Flight::request();
        
        $socivaID = $request->query->socivaId;  //TACNO OVAKO PROIZVODJACID SMO PROSLEDLI U MANAGERU
        $socivaManager->obrisiSociva($socivaID);
    });

    Flight::route('GET /api/kursna-lista', function(){
        $korisniciManager = new KorisniciManager();
        $korisniciManager->autorizujKorisnika();

        $api_id = '239f2f7e7bd96b810078c4d76d267869';
        $url = 'http://api.kursna-lista.info/'.$api_id.'/kursna_lista/json';
        $content = file_get_contents($url);

        if (empty($content))
        {
            die('Greška u preuzimanju podataka');
        }

        $data = json_decode($content, true);

        if ($data['status'] == 'ok')
        {
            header('Content-Type: application/json');
            echo json_encode($data['result']);
        }
        else
        {
            echo "Došlo je do greške: " . $data['code'] . " - " . $data['msg'];
        }
    });

    Flight::start();
?>