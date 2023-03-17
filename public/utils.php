<?php

function cleanName($name) {
    $start = strlen('img/IMG_');
    $prefixRemoved = substr($name, $start);
    return substr($prefixRemoved, 0, strpos($prefixRemoved, "."));
}
