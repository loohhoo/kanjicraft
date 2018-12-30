<?php

require "sessionInfo.php";
require "databaseConnector.php";
require "password.php";


//set of recieved values from user 
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

$hash = password_hash($password, PASSWORD_BCRYPT);

$atSplit = explode("@", $email);

//list of illegal email characters
$illegalChars= ' "(),:;<>[\]{}';
$illegalArray = str_split($illegalChars);
$pos=in_array($email, $illegalArray);

//checks to make sure its' a valid email address, also verifies post has needed submission stuff
if(count($atSplit) == 2 && $pos ===false && $password != '' && $username != '' && $email != '' && password_verify($password, $hash))
{
	try
	{
		$sql = $db->prepare("INSERT INTO users (username, password, email, save) VALUES (:uname, :upass, :umail, :usave);");
		
		$save = "{\"progress\": 0, \"inventory\": [{\"char\": \"一\"},{\"char\": \"｜\"},{\"char\": \"丶\"},{\"char\": \"口\"},{\"char\": \"ノ\"},{\"char\": \"宀\"},{\"char\": \"工\"},{\"char\": \"人\"},{\"char\": \"五\"},{\"char\": \"火\"}]}";
		$sql->bindparam(":uname", $username);
		$sql->bindparam(":upass", $hash);
		$sql->bindparam(":umail", $email);
		$sql->bindparam(":usave", $save, PDO::PARAM_LOB);
		
		$sql->execute();
		
		/*echo "
		<!DOCTYPE html>
		<html>
		<head>
		<link rel='stylesheet' type='text/css' href='../style.css' />
		</head>
		<body>
		<div id='login-box'>
		<h1>KANJICRAFT</h1>
		<h2>REGISTRATION SUCCESS, HEADING TO LOGIN PAGE</h2>
		</div>
		</body>
		</html>"; */
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '. $PATHWAY . '/login.php">';
	}

	catch(PDOException $e)
	{
		echo $e->getMessage();
		echo "sql problems be like...";
		//if($debugMode == false)
		//{
		//	echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'/register.php">';
		//}
	}
}
else 
{
	//tells user why their email isn't valid by checking it against conditions such as is blank, has illegal characters, or has too few or too many @ signs...
	if($email == '')
	{
		echo "please insert email";
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'/register.php">';
	}
	if($username=='')
	{
		echo "please insert a username";
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'/register.php">';
	}
	if($password =='')
	{
		echo "you cannot have a blank password";
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'/register.php">';
	}
	if($pos != false)
	{
		echo "your email is illegal";
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'/register.php">';
	}
	if(count($atSplit) !=2)
	{
		echo "looks like you either have too few or too many @'s there buddy";
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'/register.php">';
	}
	else
	{
		echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'">';
	}
}

include "footer.php";
?>
