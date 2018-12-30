<?php

require "databaseConnector.php";
require "sessionInfo.php";


if(isset($_POST['requestType']))
{
	$requestType = $_POST['requestType'];

	if($requestType == "getSaveData")
	{
		$saveData = getSaveData($sessionUserId, $db);
		echo json_encode($saveData);
	}
	if($requestType == "uploadSaveData")
	{
		if(isset($_POST['hp']) && isset($_POST['maxHp']) && isset($_POST['xp']) && isset($_POST['xpToNextLevel']) && isset($_POST['mp']) && isset($_POST['maxMp']) && isset($_POST['level']) && isset($_POST['money']) && isset($_POST['currentXPosition']) && isset($_POST['currentYPosition']) && isset($_POST['attackPoints']) && isset($_POST['defensePoints']) && isset($_POST['currentMap']) && isset($_POST['inventoryString']))
		{

			$hp = $_POST['hp'];
			$maxHp = $_POST['maxHp'];
			$xp = $_POST['xp'];
			$xpToNextLevel = $_POST['xpToNextLevel'];
			$mp = $_POST['mp'];
			$maxMp = $_POST['maxMp'];
			$level = $_POST['level'];
			$money = $_POST['money'];
			$currentXPosition = $_POST['currentXPosition'];
			$currentYPosition = $_POST['currentYPosition'];
			$attackPoints = $_POST['attackPoints'];
			$defensePoints = $_POST['defensePoints'];
			$currentMap = $_POST['currentMap'];
			$inventoryString = $_POST['inventoryString'];

			$uploadresult = uploadSaveData($sessionUserId, $db, $hp, $maxHp, $xp, $xpToNextLevel, $mp, $maxMp, $level, $money, $currentXPosition, $currentYPosition, $attackPoints, $defensePoints, $currentMap, $inventoryString);
			echo $uploadresult;
		}
	}
	if($requestType == "getPlayerInventory")
	{
		$playerInventory = getPlayerInventory($sessionUserId, $db);
		echo json_encode($playerInventory);
	}
	if($requestType == "savePlayerInventory")
	{
		if(isset($_POST['itemIdArray']) && isset($_POST['quantityArray']))
		{
			$itemArray = $_POST['itemIdArray'];
			$quantityArray = $_POST['quantityArray'];
			$saveResult = savePlayerInventory($sessionUserId, $db, $itemArray, $quantityArray);

			echo $saveResult;
		}
	}
	if($requestType == "fetchAllItems")
	{
		$itemsArray = fetchAllItems($db);
		echo json_encode($itemsArray);
	}
}

function fetchAllItems($db)
{
	$returnArray = array();
	$itemIdArray = array();
	$itemNameArray = array();
	$itemTypeArray = array();

	$sql = "SELECT * FROM itemList";

	foreach($db->query($sql) as $row)
	{
		array_push($itemIdArray, $row['itemId']);
		array_push($itemNameArray, $row['itemName']);
		array_push($itemTypeArray, $row['itemtype']);
	}
	$returnArray['itemId'] = $itemIdArray;
	$returnArray['itemName'] = $itemNameArray;
	$returnArray['itemType'] = $itemTypeArray;
	return $returnArray;

}

function savePlayerInventory($sessionUserId, $db, $itemIdArray, $quantityArray)
{
	if($sessionUserId && $sessionUserId > 0)
	{
		//step one; delete all currently existing items in player inventory since they will change at save time... this is rather simple so... 
		$sql = $db->prepare("DELETE FROM inventoryReference WHERE userId = :userId");
		$sql->bindParam(":userId", $sessionUserId, PDO::PARAM_INT);
		$sql->execute();

		//afterwords we insert the new save data accordingly
		$sql = "INSERT INTO inventoryReference(userId, itemId, quantity) VALUES ";
		for($i=0; $i<count($itemIdArray); $i++)
		{
			$sql .= "(" . $sessionUserId . ", " . $itemIdArray[$i] . ", " . $quantityArray[$i] . ") ";
		}
		$executeSql = $db->prepare($sql);
		$executeSql->execute();

	}

}

function getPlayerInventory($sessionUserId, $db)
{
	if($sessionUserId && $sessionUserId > 0)
	{
		$inventoryArray = array();
		$itemIdArray = array();
		$itemNameArray = array();
		$quantityArray = array();
		$itemTypeArray = array();
		$sql = "SELECT a.itemId, a.itemName, a.itemType, b.userId, b.itemId, b.quantity FROM itemList a, inventoryReference b WHERE a.itemId = b.itemId AND b.userId = '" . $sessionUserId . "';";
		
		foreach($db->query($sql) as $row)
		{
			array_push($itemIdArray, $row['itemId']);
			array_push($itemNameArray, $row['itemName']);
			array_push($quantityArray, $row['quantity']);
			array_push($itemTypeArray, $row['itemType']);
		}
		$inventoryArray['itemId'] = $itemIdArray;
		$inventoryArray['itemName'] = $itemNameArray;
		$inventoryArray['quantity'] = $quantityArray;
		$inventoryArray['itemType'] = $itemTypeArray;
		return $inventoryArray;
	}
}

function getSaveData($sessionUserId, $db)
{
	if($sessionUserId && $sessionUserId > 0)
	{
		$saveDataArray = array();
		$userIdArray = array();
		$hpArray = array();
		$maxHpArray = array();
		$xpArray = array();
		$xpToNextLevelArray = array();
		$mpArray = array();
		$maxMpArray = array();
		$levelArray = array();
		$moneyArray = array();
		$currentXPositionArray = array();
		$currentYPositionArray = array();
		$attackPointsArray = array();
		$defensePointsArray = array();
		$currentMapArray = array();
		$inventoryStringArray = array();


		$sql = "SELECT * FROM saveData WHERE userId = '" . $sessionUserId . "';";
		foreach($db->query($sql) as $row)
		{
			array_push($userIdArray, $row['userId']);
			array_push($hpArray, $row['hp']);
			array_push($maxHpArray, $row['maxHp']);
			array_push($xpArray, $row['xp']);
			array_push($xpToNextLevelArray, $row['xpToNextLevel']);
			array_push($mpArray, $row['mp']);
			array_push($maxMpArray, $row['maxMp']);
			array_push($levelArray, $row['level']);
			array_push($moneyArray, $row['money']);
			array_push($currentXPositionArray, $row['currentXPosition']);
			array_push($currentYPositionArray, $row['currentYPosition']);
			array_push($attackPointsArray, $row['attackPoints']);
			array_push($defensePointsArray, $row['defensePoints']);
			array_push($currentMapArray, $row['currentMap']);
			array_push($inventoryStringArray, $row['inventoryString']);
		}
		$saveDataArray['userId'] = $userIdArray;
		$saveDataArray['hp'] = $hpArray;
		$saveDataArray['maxHp'] = $maxHpArray;
		$saveDataArray['xp'] = $xpArray;
		$saveDataArray['xpToNextLevel'] = $xpToNextLevelArray;
		$saveDataArray['mp'] = $mpArray;
		$saveDataArray['maxMp'] = $maxMpArray;
		$saveDataArray['level'] = $levelArray;
		$saveDataArray['money'] = $moneyArray;
		$saveDataArray['currentXPosition'] = $currentXPositionArray;
		$saveDataArray['currentYPosition'] = $currentYPositionArray;
		$saveDataArray['attackPoints'] = $attackPointsArray;
		$saveDataArray['defensePoints'] = $defensePointsArray;	
		$saveDataArray['currentMap'] = $currentMapArray;	
		$saveDataArray['inventoryString'] = $inventoryStringArray;	
		return $saveDataArray;
	}
	else
	{
		//return "you must be logged in to fetch save data";

	}
}

function uploadSaveData($sessionUserId, $db, $hp, $maxHp, $xp, $xpToNextLevel, $mp, $maxMp, $level, $money, $currentXPosition, $currentYPosition, $attackPoints, $defensePoints, $currentMap, $inventoryString)
{
	if($sessionUserId && $sessionUserId > 0)
	{

		$sql = $db->prepare("SELECT userId FROM saveData WHERE userId = :userId");
		$sql->bindParam(":userId", $sessionUserId, PDO::PARAM_INT);
		$sql->execute();
		$userId = $sql->fetchColumn();


		if($userId)
		{
			$sql = $db->prepare("UPDATE saveData SET hp = :hp, maxHp = :maxHp, xp = :xp, xpToNextLevel = :xpToNextLevel, mp = :mp, maxMp = :maxMp, level = :level, money = :money, currentXPosition = :currentXPosition, currentYPosition = :currentYPosition, attackPoints = :attackPoints, defensePoints = :defensePoints, currentMap = :currentMap, inventoryString = :inventoryString WHERE userId = :userId");
			$sql->bindParam(":hp", $hp, PDO::PARAM_INT);
			$sql->bindParam(":maxHp", $maxHp, PDO::PARAM_INT);
			$sql->bindParam(":xp", $xp, PDO::PARAM_INT);
			$sql->bindParam(":xpToNextLevel", $xpToNextLevel, PDO::PARAM_INT);
			$sql->bindParam(":mp", $mp, PDO::PARAM_INT);
			$sql->bindParam(":maxMp", $maxMp, PDO::PARAM_INT);
			$sql->bindParam(":level", $level, PDO::PARAM_INT);
			$sql->bindParam(":money", $money, PDO::PARAM_INT);
			$sql->bindParam(":currentXPosition", $currentXPosition, PDO::PARAM_INT);
			$sql->bindParam(":currentYPosition", $currentYPosition, PDO::PARAM_INT);
			$sql->bindParam(":attackPoints", $attackPoints, PDO::PARAM_INT);
			$sql->bindParam(":defensePoints", $defensePoints, PDO::PARAM_INT);
			$sql->bindParam(":userId", $sessionUserId, PDO::PARAM_INT);
			$sql->bindParam(":currentMap", $currentMap, PDO::PARAM_STR);
			$sql->bindParam(":inventoryString", $inventoryString, PDO::PARAM_LOB);
			$sql->execute();
			return "updated save file";

			
		}
		else
		{
			$sql = $db->prepare("INSERT INTO saveData(userId, hp, maxHp, xp, xpToNextLevel, mp, maxMp, level, money, currentXPosition, currentYPosition, attackPoints, defensePoints, currentMap, inventoryString) VALUES (:userId, :hp, :maxHp, :xp, :xpToNextLevel, :mp, :maxMp, :level, :money, :currentXPosition, :currentYPosition, :attackPoints, :defensePoints, :currentMap, :inventoryString)");
			$sql->bindParam(":hp", $hp, PDO::PARAM_INT);
			$sql->bindParam(":maxHp", $maxHp, PDO::PARAM_INT);
			$sql->bindParam(":xp", $xp, PDO::PARAM_INT);
			$sql->bindParam(":xpToNextLevel", $xpToNextLevel, PDO::PARAM_INT);
			$sql->bindParam(":mp", $mp, PDO::PARAM_INT);
			$sql->bindParam(":maxMp", $maxMp, PDO::PARAM_INT);
			$sql->bindParam(":level", $level, PDO::PARAM_INT);
			$sql->bindParam(":money", $money, PDO::PARAM_INT);
			$sql->bindParam(":currentXPosition", $currentXPosition, PDO::PARAM_INT);
			$sql->bindParam(":currentYPosition", $currentYPosition, PDO::PARAM_INT);
			$sql->bindParam(":attackPoints", $attackPoints, PDO::PARAM_INT);
			$sql->bindParam(":defensePoints", $defensePoints, PDO::PARAM_INT);
			$sql->bindParam(":userId", $sessionUserId, PDO::PARAM_INT);			
			$sql->bindParam(":currentMap", $currentMap, PDO::PARAM_STR);
			$sql->bindParam(":inventoryString", $inventoryString, PDO::PARAM_LOB);

			$sql->execute();
			return "created save file";
		}

	}
	else
	{
		//return "you must be logged in to save data";
	}
}
