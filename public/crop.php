<?php

$img = $_GET['img'];
$newW = $_GET['w'];
$newH = $_GET['h'];

$oldImage = imagecreatefromjpeg($img);

$swap = false;
if (function_exists('exif_read_data')) {
  $exif = @exif_read_data($img);
  if ($exif && isset($exif['Orientation'])) {
    $orientation = $exif['Orientation'];
    if ($orientation != 1){
      $deg = 0;
      switch ($orientation) {
        case 3:
          $deg = 180;
          break;
        case 6:
          $deg = 270;
          break;
        case 8:
          $deg = 90;
          break;
      }
      if ($deg) {
        ini_set('memory_limit', '-1');
        $oldImage = imagerotate($oldImage, $deg, 0);
        $swap = true;
      }
    } // if there is some rotation necessary
  } // if have the exif orientation info
} // if function exists

if ($swap) {
  list($height, $width) = getimagesize($img);
} else {
  list($width, $height) = getimagesize($img);
}

$ratio = $width / $height;
$newRatio = $newW / $newH;

if ($ratio == $newRatio) {
  $x = 0;
  $y = 0;
  $smallerWidth = $width;
  $smallerHeight = $height;
} elseif ($newRatio < $ratio) {
  $y = 0;
  $x = ($width - $height * $newRatio) / 2;
  $smallerWidth = $width - $x * 2;
  $smallerHeight = $height;
} else {
  $x = 0;
  $y = ($height - $width / $newRatio) / 2;
  $smallerWidth = $width;
  $smallerHeight = $height - $y * 2;
}

if ($smallerWidth > $width) {
  $smallerWidth = $width;
  $smallerHeight = $height;
  $x = 0;
  $y = 0;
}

$thumb = imagecreatetruecolor($newW, $newH);
imagecopyresampled($thumb, $oldImage, 0, 0, $x, $y, $newW, $newH, $smallerWidth, $smallerHeight);

header('Content-type: image/jpeg');
header('Cache-control: max-age='.(60*60*24*14));
imagejpeg($thumb);
