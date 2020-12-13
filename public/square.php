<?php 

$img = $_GET['img'];
$thumbSize = $_GET['size'];
list($width, $height) = getimagesize($img);

$oldImage = imagecreatefromjpeg($img);

// calculating the part of the image to use for thumbnail
if ($width > $height) {
  $y = 0;
  $x = ($width - $height) / 2;
  $smallestSide = $height;
} else {
  $x = 0;
  $y = ($height - $width) / 2;
  $smallestSide = $width;
}

$thumb = imagecreatetruecolor($thumbSize, $thumbSize);
imagecopyresampled($thumb, $oldImage, 0, 0, $x, $y, $thumbSize, $thumbSize, $smallestSide, $smallestSide);


  if (function_exists('exif_read_data')) {
    $exif = @exif_read_data($img);
    if($exif && isset($exif['Orientation'])) {
      $orientation = $exif['Orientation'];
      if($orientation != 1){
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
          $thumb = imagerotate($thumb, $deg, 0);        
        }
      } // if there is some rotation necessary
    } // if have the exif orientation info
  } // if function exists  


//final output
header('Content-type: image/jpeg');
imagejpeg($thumb);
?>