<?php
session_start();

header('Content-Type: application/json');
header('Cache-control: max-age=60');

date_default_timezone_set("America/Los_Angeles");
$img = $_GET['img'];

$exif = @exif_read_data($img, 0, true);

$date = date('F Y', strtotime($exif["EXIF"]["DateTimeOriginal"]));
$iso = $exif["EXIF"]["ISOSpeedRatings"];
$shutter = $exif["EXIF"]["ExposureTime"];
$aperture = $exif["COMPUTED"]["ApertureFNumber"];
$focal = $exif["EXIF"]["FocalLength"];
$camera = $exif["IFD0"]["Model"];

$result = array();
$result['aperture'] = $aperture;
$result['iso'] = "ISO".$iso;
$result['shutter'] = $shutter." s";
$result['focal'] = $focal." mm";
$result['date'] = $date;
$result['camera'] = $camera;
$result['success'] = true;
echo json_encode($result);
