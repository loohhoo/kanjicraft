<?php

require "backend/sessionInfo.php";

?>

<!DOCTYPE html>
<html>
	<head>
		<script   src="https://code.jquery.com/jquery-3.1.0.js"   integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="   crossorigin="anonymous"></script>
		<?PHP if($ISLOGGEDIN == true) echo "<script src='js/scripts2.js'></script>"; ?>
		<link rel="stylesheet" type="text/css" href="style.css" />
		
	</head>
	<body>
		<div id='container'>
			<div id='login-box'>
			<h1>KanjiCraft</h1>
				<form id='upload' action='backend/loginCheck.php' method='POST' enctype=''><br />
				<label><span>USERNAME</span> <input type='text' name='username'/></label><br />
				<label><span>PASSWORD</span> <input type='password' name='password'/></label><br />
				<br />
				<button type='submit' form='upload'>LOGIN</button>
				</form>
			</div>
		</div>
	</body>	
</html>