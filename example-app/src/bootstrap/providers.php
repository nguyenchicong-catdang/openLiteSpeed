<?php
// src/bootstrap/providers.php

$providerFiles = glob(__DIR__ . '/../app/Providers/*Provider.php');

return array_map(function ($file) {
    $class = 'SrcApp\\Providers\\' . basename($file, '.php');
    return $class;
}, $providerFiles);
