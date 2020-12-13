<?php 

$img = $_GET['img'];
$newwidth = $_GET['w'];

list($width, $height) = getimagesize($img);
$img = imagecreatefromjpeg($img); 

if ($newwidth > $width) {
	$newwidth = $width;
}

$newheight = $newwidth * $height / $width;
$create = imagecreatetruecolor($newwidth, $newheight); 

imagecopyresized($create, $img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
header('Content-type: image/jpeg'); 
header('Cache-control: max-age='.(60*60*24*14));

imagejpeg($create, null, 100); 
?>