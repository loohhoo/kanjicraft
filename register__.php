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
			<?php
			if($ISLOGGEDIN == false) {
				echo "<div id='login-box'>
			<h1>KanjiCraft</h1>
				<form id='upload' action='/backend/registerSubmission.php' method='POST' enctype=''><br />
				<label><span>USERNAME</span>  <input type='text' name='username'/></label><br />
				<label><span>PASSWORD</span>  <input type='password' name='password'/></label><br />
				<label><span>PASSWORD</span>  <input type='password' name='verify'/></label><br />
				<label><span>EMAIL</span> <input type='text' name='email'/></label><br />
				<br />
				<button type='submit' form='upload'>REGISTER</button>
				</form>
			</div>";
			}

			if($ISLOGGEDIN == true) {
				echo "<p>You're currently logged in as " . $_SESSION['username'] . ". Would you like to <a href='logout.php'>logout</a> to create a new account or <a href='/'>go back</a>?</p>";
			}

			?>
			
		</div>
	</body>	
</html>