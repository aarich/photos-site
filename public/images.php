<?php 
session_start();
header('Content-Type: application/json');
header('Cache-control: max-age=60');
include('utils.php');

$img_dir = "img";

$imgs = array_filter(glob($img_dir.'/*.*'), 'is_file');

function sorter(string $str1, string $str2): int {
    return intval($str1) - intval($str2);
}
$imgs = array_map('cleanName', $imgs);
usort($imgs, 'sorter');

$result->images = array_reverse($imgs);
$result->success = true;

echo json_encode($result);
?>