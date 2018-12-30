<?php

require "backend/sessionInfo.php";

?>

<!DOCTYPE html>
<html>
	<head>
		<title>KanjiCraft</title>
		<script   
			src="https://code.jquery.com/jquery-3.1.0.min.js"   
			integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   
			crossorigin="anonymous"></script>
		<script src='scripts.js'></script>
		<link rel="stylesheet" type="text/css" href="style.css" />

			
	</head>
	<body>
		<div id='container'>
			<?php

			if($ISLOGGEDIN == false) {
				include "welcome.php";
			}

			if($ISLOGGEDIN == true) {
				include "game.php";
			}

			?>
		</div>
	</body>
</html>