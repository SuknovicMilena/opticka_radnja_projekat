<head>

<link rel="stylesheet" href="site.css">
<title> Pretraga slika</title>		

</head>
<body>

    <a href="index.html">Početna strana</a>

<form id="aa" method="GET" action=""> 
Unesite kljucnu rec za pretragu: <input type = "text" name = "tag"/><br/>
Unesite broj slika na strani: <input type = "text" name = "broj"/><br/>
<input type = "submit" id="submitreg" value="Pronadji"/>

</form>
</body>
<?php
@$tagg= $_GET['tag'];
@$broj = $_GET['broj'];

$api_key = '15ced2ad861a4462704c8a5bb6780462';
 
$tag = $tagg;
$perPage = $broj;
$url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
$url.= '&api_key='.$api_key;
$url.= '&tags='.$tag;
$url.= '&per_page='.$perPage;
$url.= '&format=json';
$url.= '&nojsoncallback=1';
 
$response = json_decode(file_get_contents($url));


@$photo_array = $response->photos->photo;
 
// print ("<pre>");
// print_r($response);
// print ("</pre>");
 if (is_array($photo_array))
{
foreach($photo_array as $single_photo){
 
$farm_id = $single_photo->farm;
$server_id = $single_photo->server;
$photo_id = $single_photo->id;
$secret_id = $single_photo->secret;
$size = 'm';
 
$title = $single_photo->title;
 
$photo_url = 'http://farm'.$farm_id.'.staticflickr.com/'.$server_id.'/'.$photo_id.'_'.$secret_id.'_'.$size.'.'.'jpg';
 
print "<img title='".$title."' src='".$photo_url."' />";
 
}
}
?>