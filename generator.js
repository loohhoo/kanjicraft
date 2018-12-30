$(document).ready(function() {

	$("#generate").click(function() {

		if($("#output .ingredient").text() == "") {
			alert("You must put a Kanji in the output box!");
		}

		else {
			$("#code").text("");

			$("#code").append("{\"oneone\":\"" 		+ $("#one-one .ingredient").text() + "\",");
			$("#code").append("\"onetwo\":\"" 		+ $("#one-two .ingredient").text() + "\",");
			$("#code").append("\"onethree\":\"" 	+ $("#one-three .ingredient").text() + "\",");
			$("#code").append("\"twoone\":\"" 		+ $("#two-one .ingredient").text() + "\",");
			$("#code").append("\"twotwo\":\"" 		+ $("#two-two .ingredient").text() + "\",");
			$("#code").append("\"twothree\":\"" 	+ $("#two-three .ingredient").text() + "\",");
			$("#code").append("\"threeone\":\"" 	+ $("#three-one .ingredient").text() + "\",");
			$("#code").append("\"threetwo\":\"" 	+ $("#three-two .ingredient").text() + "\",");
			$("#code").append("\"threethree\":\"" 	+ $("#three-three .ingredient").text() + "\",");
			$("#code").append("\"output\":\"" 		+ $("#output .ingredient").text() + "\",");
			$("#code").append("\"english\":\"" 		+ $("#english").val() + "\",");
			$("#code").append("\"mem\":\"" 			+ $("#mem").val() + "\"}");
			console.log("Recipe file generated successfully!");
		}

	});

	$("#dic-generate").click(function() {
		if($("#words-output").text() == "") {
			alert("Add at least one word first!");
		}

		else {
			$("#dic-output").text("");
			$("#dic-output").append("{\"char\": \""	+ $("#dic-kanji").val() + "\",");
			$("#dic-output").append("\"o\": \""		+ $("#dic-onyomi").val() + "\",");
			$("#dic-output").append("\"k\": \""		+ $("#dic-kunyomi").val() + "\",");
			$("#dic-output").append("\"en\": \""	+ $("#dic-english").val() + "\",");
			$("#dic-output").append("\"grade\": \""	+ $("#dic-kanji").val() + "\",");
			$("#dic-output").append("\"words\": \[ "+ $("#words-output").text() + "\]}");
			console.log("Dictionary file (base) generated successfully!");
		}
	});

	$("#words-generate").click(function() {
		if($("#words-output").text() != "") {
			$("#words-output").append(",");
		}
		$("#words-output").append("{\"word\": \""		+ $("#words-word").val() + "\",");
		$("#words-output").append("\"furigana\": \""	+ $("#words-furi").val() + "\",");
		$("#words-output").append("\"gloss\": \""		+ $("#words-english").val() + "\",");
		$("#words-output").append("\"sentence\": \""	+ $("#words-sentence").val() + "\",");
		$("#words-output").append("\"sentence_en\": \""	+ $("#words-sen").val() + "\"}");

		$("#words-word, #words-furi, #words-english, #words-sentence, #words-sen").val("");
		console.log("Dictionary file (words) generated successfully!");
	});

	$("#clear-words").click(function() {
		$("#words-output").text("");
	});

	$("#clear-dic").click(function() {
		$("#dic-output").text("");
	});

});
