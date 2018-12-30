<?php

require "databaseConnector.php";
require "sessionInfo.php";

if(isset($_GET['char']))
{
	$char = $_GET['char'];
}

if(isset($_POST['requestType'])) {
	$requestType = $_POST['requestType'];
}

if(isset($_POST['saveData'])) {
	$theSaveData = $_POST['saveData'];
}

$userID = $_SESSION['uniqueID'];

switch($requestType) {
	case "getSaveData":
		$saveData = getSaveData($db);
		echo $saveData;
	case "writeSaveData":
		$saveData = writeSaveData($db);
		echo $saveData;

	break;
}


function getSaveData($db)
{
	$sql = "SELECT * FROM users WHERE username = '" . $_SESSION['username'] . "';";

	foreach($db->query($sql) as $row)
	{
		$save = $row['save'];
	}

	return json_encode($save);
}

function writeSaveData($db) 
{
	$sql = $db->prepare("UPDATE users SET save = :savedata WHERE username = '" . $_SESSION['username'] . "';");
	$sql->bindParam(":savedata", $_POST['saveData'], PDO::PARAM_LOB);
	$sql->execute();
	return $theSaveData;
}
