<?php 
header('Content-Type: application/json');
header('Cache-control: max-age=60');

date_default_timezone_set("America/Los_Angeles");
$img = $_GET['img'];

$exif = @exif_read_data($img, 0, true);

$date = date('F Y', strtotime($exif["EXIF"]["DateTimeOriginal"]));
$time = date('g:i a', $exif["FILE"]["FileDateTime"]);
$fnumber = $exif["EXIF"]["FNUMBER"];
$iso = $exif["EXIF"]["ISOSpeedRatings"];
$shutter = $exif["EXIF"]["ExposureTime"];
$aperture = $exif["COMPUTED"]["ApertureFNumber"];
$focal = $exif["EXIF"]["FocalLength"];
$camera = $exif["IFD0"]["Model"];
$a = substr($camera, 0, 1) === "i" ? "an" : "a";

$result->aperture = $aperture;
$result->iso = $iso;
$result->shutter = $shutter;
$result->focal = $focal;
$result->date = $date;
$result->camera = $camera;
$result->success = true;
echo json_encode($result);
?>