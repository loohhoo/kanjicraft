<?php

//php database connection file
//only include on pages you need to use to access the database

//establish pdo connection

$db = new PDO('mysql:host=localhost;dbname=DATABASENAME', 'DATABASEUSERNAME', 'DATABASEPASSWORD', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);


?>
