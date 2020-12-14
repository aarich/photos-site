<?php 
session_start();
header('Content-Type: application/json');
header('Cache-control: max-age=60');

$img_dir = "img";

$imgs = array_filter(glob($img_dir.'/*.*'), 'is_file');

function cleanName($name) {
    $start = strlen('img/IMG_');
    return substr($name, $start, 4);
}

$result->images = array_reverse(array_map('cleanName', $imgs));
$result->success = true;

echo json_encode($result);
?>