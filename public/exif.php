<?php 
header('Content-Type: application/json');

	date_default_timezone_set("America/Los_Angeles");
	$img = $_GET['img'];
	$img_dir = "img";

	$imgs = array_filter(glob($img_dir.'/*.*'), 'is_file');
	$random_img = $imgs[array_rand($imgs)];
	$key = array_search($img, $imgs);
	$next_img = $key < count($imgs) - 1 ? $imgs[$key+1] : $imgs[0];
	$prev_img = $key == 0 ? $imgs[count($imgs) - 1] : $imgs[$key - 1];

				$exif = @exif_read_data($img_dir.'/'.$img, 0, true);
				
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
					echo json_encode($result);
				?>