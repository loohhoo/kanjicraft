<?php

require "backend/sessionInfo.php";

session_destroy();
$ISLOGGEDIN = false;

echo "
		<!DOCTYPE html>
		<html>
		<head>
		<link rel='stylesheet' type='text/css' href='style.css' />
		</head>
		<body>
		<div id='login-box'>
		<h1>KANJICRAFT</h1>
		<h2>LOGGED OUT</h2>
		</div>
		</body>
		</html>";
echo '<META HTTP-EQUIV=REFRESH CONTENT="1; '.$PATHWAY.'">';

?>