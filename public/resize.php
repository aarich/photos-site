<?php

$filename = $_GET['img'];

$screenW = $_GET['w'];
$screenH = $_GET['h'];

$img = imagecreatefromjpeg($filename);

$swap = false;
  if (function_exists('exif_read_data')) {
    $exif = @exif_read_data($filename);
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
          $img = imagerotate($img, $deg, 0);
          $swap = true;
        }
      } // if there is some rotation necessary
    } // if have the exif orientation info
  } // if function exists

if ($swap) {
  list($height, $width) = getimagesize($filename);
} else {
  list($width, $height) = getimagesize($filename);
}

if ($width / $height > $screenW / $screenH) {
  $newwidth = 0.95 * $screenW;
  $newheight = $newwidth * $height / $width;
} else {
  $newheight = 0.95 * $screenH;
  $newwidth = $newheight * $width / $height;
}

if ($newheight > $height) {
  $newheight = $height;
  $newwidth = $width;
}

$create = imagecreatetruecolor($newwidth, $newheight);

imagecopyresized($create, $img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
header('Content-type: image/jpeg');
header('Cache-control: max-age='.(60*60*24*14));

imagejpeg($create, null, 100);
