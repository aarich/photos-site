<?php
session_start();

include('utils.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/xml');
header('Cache-control: max-age=60');

$baseUrl = "https://photos.mrarich.com";

echo '<?xml version="1.0" encoding="utf-8"?'.">\n";
?>

<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
	<title>Alex Rich's Image Feed</title>
	<link><?php echo $baseUrl; ?></link>
	<description>Photos by Alex</description>
	<atom:link href="<?php echo $baseUrl; ?>/feed.php" rel="self" type="application/rss+xml" />

<?php
date_default_timezone_set("America/Los_Angeles");
$img_dir = "img";
$imgs = array_filter(glob($img_dir.'/*.*'), 'is_file');
$imgs = array_reverse($imgs);

foreach($imgs as $img) {
	$exif = @exif_read_data($img, 0, true);
	$date = date("D, d M Y H:i:s T", strtotime($exif["EXIF"]["DateTimeOriginal"]));
	$title = date('D, F j Y', strtotime($exif["EXIF"]["DateTimeOriginal"]));
	$link = $baseUrl . "/view/".cleanName($img);
	$guid = $link;
	$directLink = $baseUrl . "/" . $img;
	$desc = "<![CDATA[<img src=".$directLink." alt=\"\"/>]]>";
?>
<item><title><?php echo $title; ?></title><link><?php echo $link; ?></link><guid><?php echo $guid; ?></guid><pubDate><?php echo $date; ?></pubDate><description><?php echo $desc; ?></description></item>
<?php } ?>

</channel>
</rss>
