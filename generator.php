<!DOCTYPE html>

<html>

	<head>

		<title>KanjiCraft Code Generator</title>

		<script   

			src="https://code.jquery.com/jquery-3.1.0.min.js"   

			integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   

			crossorigin="anonymous"></script>

		<script src='generator.js'></script>

		<link rel="stylesheet" type="text/css" href="style.css" />

	</head>

	<body>
		
		<style>
		body {
			background-image: none;
		}
		</style>

		<div id='generator'>
			<div id='craftingtable'>
			
			<h2>Recipe Generator</h2>

				<div id='ingredients'>

					<div id='one-one' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='one-two' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='one-three' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='two-one' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='two-two' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='two-three' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='three-one' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='three-two' class='slot'><p class='ingredient' contenteditable='true'></p></div>

					<div id='three-three' class='slot'><p class='ingredient' contenteditable='true'></p></div>

				</div>



				<div id='arrow'>

				</div>



				<div id='output' class='slot'>

					<p class='ingredient' contenteditable='true'>

					</p>

				</div>

			</div>

		</div>

		<div id="recipes">
			<h3>
			<label>Mnemonic: <input id="mem" value=""/></label><br />
				<label>English: <input id="english" value=""></label><br />



				<button id="generate">generate</button><br />

				<h3>Output</h3>

				<textarea id="code" style="width:300px; height: 150px"></textarea>
		</div>

		<div id='dictionary' style='float: left; width: 50%'>
			<h2>Dictionary Entry Generator</h2>
			<label>Kanji: <input id='dic-kanji'></label><br />
			<label>English: <input id='dic-english'></label><br />
			<label>Onyomi: <input id='dic-onyomi'></label><br />
			<label>Kunyomi: <input id='dic-kunyomi'></label><br />
			<label>Grade: <input id='dic-english'></label><br />
			<button id="dic-generate">Generate</button><button id="clear-dic">Clear</button>
			<h3>Output</h3>
			<textarea style="width:300px; height: 150px" id="dic-output"></textarea>
		</div>

		<div id='words' style='float: left; width: 50%'>
			<h2>Dictionary Words Generator</h2>
			<label>word: <input id='words-word'></label><br />
			<label>furigana: <input id='words-furi'></label><br />
			<label>english: <input id='words-english'></label></br />
			<label>sentence: <input id='words-sentence'></label><br />
			<label>sentence english: <input id='words-sen'></label><br />
			<button id='words-generate'>Generate</button><button id="clear-words">Clear</button><br />
			<h3>Output</h3>
			<textarea style="width:300px; height: 150px" id="words-output"></textarea>
		</div>

		<div id="instructions" style="clear: both;">
			<h2>Dev Instructions</h2>
			<h3>Recipe Generator</h3>
			<p>Click on a square to fill in the appropriate radicals / components / kanji. An entry must have at least one recipe component and a character in the output to work correctly.</p>
			<p>"Mnemonic" means a memory trick to recall the character. It doesn't have to make perfect sense, but it should use parts of the character to tie it to the English.</p>
			<p>These entries go into recipes.json, which are separated by commas.</p>

			<h3>Dictionary Generators</h3>
			<p>To use the dictionary generator you must first generate at least one word.</p>
			<p>The word generator has five entries: the word itself (kanji form), the furigana (hiragana), an English translation, an example sentence, and the English for that sentence.</p>
			<p>After generating one word, you can fill out the main part: the kanji, the English, the onyomi (in katakana), the kunyomi (in hiragana, using ・ to indicate okurigana), and its grade (1-6 for elementary).</p>
			<p>The code generated in the main part goes into kanji.json, which are separated by commas.</p>
	</body>

</html>