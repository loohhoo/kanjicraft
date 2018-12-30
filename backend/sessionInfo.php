<?php 

session_start();

$ISLOGGEDIN = false;

$PATHWAY = '/';
$debugMode = false;

//if username isn't declared, sets $ISLOGGEDIN to false
//this affects the index.php and threadViewer.php files by
//prohibiting unlogged in users from viewing the pages
if(!isset($_SESSION['username']))
{
	$ISLOGGEDIN = false;
	$sessionUserId = 0;
}
//if user is logged in; check to see if session expired; if it hasn't
else
{
	//check to see if session is expire
	$now = time();
	if($now > $_SESSION['expire'])
	{
		session_destroy();
		$ISLOGGEDIN = false;
	}
	else
	{
		$ISLOGGEDIN = true;
		$sessionUserId = $_SESSION['uniqueID'];
		$sessionUserName = $_SESSION['username'];
	}
}
 