/* @TODO
1) Implement the scripting feature which grants achievements
2) Individual icons for those achievements
5) Tidy up the search feature
7) Add settings
8) Input data for the 1006 Kanji + radicals 
9) Add on-screen controls + keyboard shortcuts
10) Get a domain for KanjiCraft and move the code */

var kanjiList;
var progress;

var kanjiCount = {
	"total":0,
  	"jy_1": 0,
  	"jy_2": 0,
  	"jy_3": 0,
  	"jy_4": 0,
  	"jy_5": 0,
  	"jy_6": 0
};

var flags = {
	"kanji_10":false,
	"kanji_25":false,
	"kanji_50":false,
	"kanji_jy_1":false	
};

var DEBUG = true;

$(document).ready(function() {
	loadGame();

	function main() {
		// progress is a variable that determines
		// what stage of the guide the user should be at. 
		// if you are at 0, you are brand new and it should
		// start from the beginning.
		$("#next").unbind();

		$("#next").click(function() {
			$("#guide").html("");
			$("#inventory .ingredient, #ingredients .ingredient").css("border", "1px solid #573921");
			progress++;
			saveGame();
			main();
		});

		checkProgress();
	}

	function checkProgress() {
		if(progress == 0) {
			//explain the concept of the game
			$("#guide").html("<h2>Introduction</h2><p>Chinese characters, called Kanji in Japanese, are complex letters that represent both meaning and sound at the same time. In English, our writing system just tells us how to pronounce the word. The letters themselves don't mean anything, but when we put them together we get words.</p>");
			$("#guide").append("<p>But in Kanji this is not so. Kanji are complex ideograms, whose parts may show meaning with a drawing (such as a hand or a bird) or an abstract of the concept (such as up or down). The Kanji 手 \"hand\", a literal drawing of a hand, appears in the left side of many Kanji, such as 捨 \"throw away\", 拾 \"pick up\"、把 \"grasp\"、抱 \"hug\"、持 \"have\" etc. There are also Kanji that appear in other Kanji that indicates how to pronounce the character. The Kanji 相 appears in 想 and both have the on'yomi ソウ, just as 白 appears in 伯, 拍, and 泊 which all have the on'yomi ハク.</p>");
			$("#guide").append("<p>To understand Kanji, you have to know how they're put together. You can think of Kanji as little puzzles. For instance:</p>");
			$("#guide").append("<p>吾　＝　五 \"five\" (phonetic) + 口 \"mouth\" (semantic) -> \"me\"</p>");
			$("#guide").append("<p>語　＝　言 \"speak\" 吾 \"me\" -> \"language\" (\"thing that I speak\"</p>");
			$("#guide").append("<p>Click next to continue.</p>");
		}

		else if(progress == 1) {
			//show the user how to create 二
			$("#guide").html("<h2>1 + 1 = ...</h2><p>The easiest Kanji is 一, which means \"one\". Let's use this Kanji to create \"two\".");
			$("#inventory .slot .ingredient").each(function() {
				if($(this).text() == "一") {
					$("#guide").append("<p>Click the highlighted 一 on the right.</p>");
					$(this).css("border", "1px dotted white");
					$(this).one("click", function() {
						$("#one-two .ingredient, #two-two .ingredient").css("border", "1px dotted white");
						$("#guide").append("<p>Good! Now place it in the highlighted slots in the crafting table to the left. When you see 二 in the output, double click it to add it to your inventory.</p>");
					});
				}
			});

			if($("#output .ingredient").text() == "二") {
				$("#output .ingredient").dblclick(function() {
					$("#guide").append("<p>Click next to continue.</p>");
				});
			}
		}

		else if(progress == 2) {
			//show the user how to create 三
			$("#guide").html("<h2>1 + 2 = ...</h2><p>Now that we have \"one\" and \"two\", let's create \"three\". Using just one of each, place them onto the crafting table and try to create 三.");
			$("#one-two .ingredient, #two-two .ingredient").css("border", "1px dotted white");
			$("#inventory .slot .ingredient").each(function() {
				if($(this).text() == "一" || $(this).text() == "二") {
					$(this).css("border", "1px dotted white");
				}
			});

			$("#ingredients").click(function() {
				if($("#output .ingredient").text() == "三") {
					$("#output .ingredient").dblclick(function() {
						$(".ingredient").css("border", "1px solid #573921");
						$("#guide").append("<p>Click next to continue.</p>");
					});
				}
			});
		}

		else if(progress == 3) {
			//elaborate on composition
			$("#guide").html("<p>By using simpler Kanji, we can make more complicated Kanji. One and one is two, and one and two is three. Many Kanji are like this. Let's do one with three parts. </p>");
			$("#guide").append("<p>Select ニ and place it in the highlighted squares on the crafting table. </p>");
			$("#one-two .ingredient, #two-two .ingredient").css("border", "1px dotted white");
			$("#guide").append("<p>Next, select 口 and place it directly underneath the two ニ.");
			$("#inventory .ingredient").each(function() {
				if($(this).text() == "口") {
					$(this).one("click", function() {
						$("#one-two .ingredient, #two-two .ingredient").css('border', '1px solid #573921');
						$("#three-two .ingredient").css('border', '1px dotted white');
					});
				}
			});
		}

		else if(progress == 4) {
			$("#guide").html("<p>We got 言, which means \"to speak\". How does two and two and a mouth come to represent speech? Well, the lines above the mouth actually represent the sounds coming out of your mouth, not a pair of twos. This is an example of a more complex pictograph.</p>");
			$("#guide").append("<p>Using 言, we can make a multitude of more complex Kanji. Select 人 \"person\" and place it in the highlighted square. Then, place 言 to the right of it.</p>");
			$("#two-one .ingredient").css("border", "1px dotted white");
			$("#inventory .ingredient").each(function() {
				if($(this).text() == "言") {
					$(this).one("click", function() {
						$("#two-two .ingredient").css('border', '1px dotted white');
						$("#two-one .ingredient").css("border", "1px solid #573921");
					});
				}
			});
		}

		else if(progress == 5) {
			$("#guide").html("<p>We got 信, which means \"to believe\". We \"believe\" the words that \"people\" 人 \"say\" 言.");
			$("#guide").append("<p>Let's make 吾, which means \"me\" from earlier. Take 五 \"five\" (phonetic) and 口 \"mouth\".</p>")
			$("#one-two .ingredient, #two-two .ingredient").css('border', '1px dotted white');
			$("#inventory .ingredient").each(function() {
				if($(this).text() == "口") {
					$(this).css('border', '1px dotted white');
					$(this).one("click", function() {
						$("#two-two .ingredient").css('border', '1px dotted white');
						$("#one-two .ingredient").css("border", "1px solid #573921");
					});
				}

				else if($(this).text() == "五") {
					$(this).css('border', '1px dotted white');
					$(this).one("click", function() {
						$("#two-two .ingredient").css('border', '1px solid #573921');
						$("#one-two .ingredient").css("border", "1px dotted white");
					});
				}
			});
		}

		else if(progress == 6) {
			$("#guide").html("<p>Now, combine 吾 with 言 on the left. You'll get 語 which means \"language\". The right side, 吾 \"me\", tells us that the on'yomi of 語 is ゴ. That way, we know that this particular ゴ means \"language\" and not \"me\" 吾 or just \"five\" 五.");
			$("#two-one .ingredient, #two-two .ingredient").css('border', '1px dotted white');
			$("#inventory .ingredient").each(function() {
				if($(this).text() == "言") {
					$(this).css('border', '1px dotted white');
					$(this).one("click", function() {
						$("#two-one .ingredient").css('border', '1px dotted white');
						$("#two-two .ingredient").css("border", "1px solid #573921");
					});
				}

				else if($(this).text() == "吾") {
					$(this).css('border', '1px dotted white');
					$(this).one("click", function() {
						$("#two-two .ingredient").css('border', '1px dotted white');
						$("#two-one .ingredient").css("border", "1px solid #573921");
					});
				}
			});
		}

		else if(progress == 7) {
			$("#guide").html("<p>Let's use another Kanji. Place two 火 \"fire\" right on top of each other, just like we did to make ニ using 一. </p>");
			$("#one-two .ingredient, #two-two .ingredient").css('border', '1px dotted white');
			$("#inventory .ingredient").each(function() {
				if($(this).text() == "火") {
					$(this).css('border', '1px dotted white');
				}
			});
		}

		else if(progress == 8) {
			$("#guide").html("<p>We got 炎, which means \"flame\". Taking 言 and 炎, try to make a new Kanji. (Hint: 言 should be on the left.)</p>");
			$("#guide").append("<p>When you think you've got the right Kanji, or if you're stuck, click next.");
		}

		else if(progress == 9) {
			$("#guide").html("<p>You should have gotten 談, which means \"discuss\". This completes the tutorial!</p>");
			$("#guide").append("<p>Having explored the ways Kanji can be combined, try crafting some on your own! The list of the 1006 Elementary School Kanji is available in your menu. There, you can peek at their recipes and learn why the character means what it does. Each Kanji has a few example words in a sentence, taken from the Tanaka corpus. This menu isn't a dictionary, so if you're looking for more complete information on a Kanji, head to <a href='jisho.org'>Jisho.org</a>.</p>");
		}

		else if(progress >=10) {
			$("#guide, #next").css("visibility", "hidden");
		}
	}

	function updateCounts() {
		var save = "";
		$.post("backend/fetch.php", { requestType: "getSaveData"})
			.done(function(data){
			save = JSON.parse(JSON.parse(data)); //this has to be done twice due to formatting lol
			//Calculate the Kanji counts
			$.getJSON("kanji.json?r=" + Date.now(), function(data) {
				for(var i = 0; i < data.kanji.length; i++) {
					for(var j = 0; j < save.inventory.length; j++) {
						if(save.inventory[j].char == data.kanji[i].char) {
							kanjiCount.total++;
							if(data.kanji[i].grade == "jy_1") {
								kanjiCount.jy_1++;
							}

							else if(data.kanji[i].grade == "jy_2") {
								kanjiCount.jy_2++;
							}

							else if(data.kanji[i].grade == "jy_3") {
								kanjiCount.jy_3++;
							}

							else if(data.kanji[i].grade == "jy_4") {
								kanjiCount.jy_4++;
							}

							else if(data.kanji[i].grade == "jy_5") {
								kanjiCount.jy_5++;
							}

							else if(data.kanji[i].grade == "jy_6") {
								kanjiCount.jy_6++;
							}
						}
					}
				}
			}).done(function() {
				if(DEBUG == true) {
					console.log("Kanji counts - updateCounts(): ");
					console.log(kanjiCount);
					saveGame();
				}
			});

		});
	}

	function checkAchievements() {
		/*
		achievement 1: find 10 Kanji
		achievement 2: find 25 Kanji
		achievement 3: find 50 Kanji
		achievement 4: find all 80 Year 1 Kanji
		achievement 5: open the dictionary
		*/
		if(DEBUG == true) {
			var achievementUnlocked;
		}

		//Achievement 1: Find 10 Kanji
		if(kanjiCount.total >= 3 && flags.kanji_10 == false) {
			$("#achievement_1").removeClass("locked");
			$("#achievement_1").addClass("unlocked");
			flags.kanji_10 = true;
			saveGame();

			if(DEBUG == true) {
				achievementUnlocked = "kanji_10";
			}
		}

		//Achievement 2: Find 25 Kanji
		if(kanjiCount.total >= 25 && flags.kanji_25 == false) {
			$("#achievement_2").removeClass("locked");
			$("#achievement_2").addClass("unlocked");
			flags.kanji_25 = true;
			saveGame();
			
			if(DEBUG == true) {
				achievementUnlocked = "kanji_25";
			}
		}

		//Achievement 3: Find 50 Kanji
		if(kanjiCount.total >= 50 && flags.kanji_50 == false) {
			$("#achievement_3").removeClass("locked");
			$("#achievement_3").addClass("unlocked");
			flags.kanji_50 = true;
			saveGame();
			
			if(DEBUG == true) {
				achievementUnlocked = "kanji_50";
			}
		}

		if(DEBUG == true) {
			console.log("Achievement check - checkAchievements(): ");
			if(achievementUnlocked != null) {
				console.log(achievementUnlocked);
			}
		}
	}

	function loadGame() {
		var save = "";
		$.post("backend/fetch.php", { requestType: "getSaveData"})
			.done(function(data){
			save = JSON.parse(JSON.parse(data)); //this has to be done twice due to formatting lol
			console.log("Initial game load: ");
			console.log(save);
			progress = save.progress;

			$("#inventory .slot .ingredient").each(function(index) {
				if(index < save.inventory.length) {
					$(this).text(save.inventory[index].char);
				}
			});

			if(save.inventory.length > 16) {
				for(var i = 16; i < save.inventory.length; i++) {
					$("#inventory").append('<div class="slot"><p class="ingredient">' + save.inventory[i].char + '</p></div>');

				}

				//make the number of boxes in the inventory an even amount (divisible by 4)
				if((save.inventory.length) % 4 != 0) {
					while(($("#inventory .slot .ingredient").length) % 4 != 0) {
						$("#inventory").append('<div class="slot"><p class="ingredient"></p></div>');
					}
				}
			}

			var isLocked;

			for(var j = 0; j < save.achievements.length; j++) {
				if(save.achievements[j].achievement == true) { 
					isLocked = 'unlocked';
				}

				else {
					isLocked = 'locked';
				}

				$("#achievements").append('<div class="achievement ' + isLocked + '" id="achievement_'+(j+1)+'"></div>')
			}

			$("#inventory .slot, #ingredients .slot").click(function() {
				//if there is an element in the slot
				if($(this).find("p").text() != "") {
					//unselect it if selected
					if($(this).hasClass("selected")) {
						$(this).removeClass("selected");
					}

					//select it if it isn't selected
					else {
						$(".selected").removeClass("selected");
						$(this).addClass("selected");
					}
				}

				//if there is not an element in the slot
				else {
					//move the selected element into it
					$(this).find(".ingredient").text($(".selected").text());
					//delete the item if it's on the crafting table
					//$(".selected .ingredient").text("");
					$(".selected").removeClass("selected");
					checkRecipes();
					//checkAchievements();
					checkSlots();
					saveGame();
				}
			});	



		}).done(function() {
			saveGame();
			main();
			updateCounts();
		});
	}

	function saveGame() {
		//Convert the save data into a JSON array
		var SaveData = '\{\"progress\": ' + progress + '\, \"inventory\": \[';
		//Saves the inventory state
		$("#inventory .slot").each(function() {
			if($(this).text() != "") {
				SaveData += '\{\"char\": \"' + $(this).text() + '\"';
				SaveData += '\}\,';
			}
		});

		//Trim off the last ,
		SaveData = SaveData.substring(0, SaveData.length-1);

		//Achievement state
		SaveData += "\], \"achievements\": \[";

		$("#achievements .achievement").each(function() {
			var unlocked = false;
			if($(this).hasClass("unlocked")) {
				unlocked = true;
			}

			else  {
				unlocked = false;
			}
			SaveData += '\{\"achievement\": ' + unlocked + '\}\,'; 

			if(DEBUG == true) {
				console.log(unlocked);
			}
		});

		//Trim off the last ,
		SaveData = SaveData.substring(0, SaveData.length-1);

		//Kanji counts
		SaveData += '\], \"kanji_count\": \[\{';
		SaveData += '\"total\": ' + kanjiCount.total + ',';
		SaveData += '\"jy_1\": ' + kanjiCount.jy_1 + ',';
		SaveData += '\"jy_2\": ' + kanjiCount.jy_2 + ',';
		SaveData += '\"jy_3\": ' + kanjiCount.jy_3 + ',';
		SaveData += '\"jy_4\": ' + kanjiCount.jy_4 + ',';
		SaveData += '\"jy_5\": ' + kanjiCount.jy_5 + ',';
		SaveData += '\"jy_6\": ' + kanjiCount.jy_6;
		SaveData += '\}\],';

		//Flags
		SaveData += '\"flags\": \[\{';
		SaveData += '\"kanji_10\": ' + flags.kanji_10 + ',';
		SaveData += '\"kanji_25\": ' + flags.kanji_25 + ',';
		SaveData += '\"kanji_50\": ' + flags.kanji_50 + ',';
		SaveData += '\"kanji_jy_1\": ' + flags.kanji_jy_1;
		SaveData += '\}\]\}';

		if(DEBUG == true) {
			console.log("Saving game: \n" + SaveData);
		}

		//Send to backend to be saved
		$.ajax({
			url: "backend/fetch.php", 
			method: "POST",
			data: { 
				requestType: "writeSaveData", 
				saveData: SaveData 
			}
		});
	}



	function checkRecipes() {

		//recipe values
		var oneone, onetwo, onethree, 
		twoone, twotwo, twothree, 
		threeone, threetwo, threethree;
		
		// values on the grid
		var coneone = $("#one-one p").text(), 
		conetwo 	= $("#one-two p").text(), 
		conethree 	= $("#one-three p").text(), 
		ctwoone 	= $("#two-one p").text(), 
		ctwotwo 	= $("#two-two p").text(), 
		ctwothree 	= $("#two-three p").text(), 
		cthreeone 	= $("#three-one p").text(), 
		cthreetwo 	= $("#three-two p").text(), 
		cthreethree = $("#three-three p").text();
		
		$.getJSON("recipes.json?r=" + Date.now(), function(data) {
			var foundRecipe = false;
			var i = 0;

			//check each recipe (data.recipes) one by one 
			//until we find it (foundRecipe == true)
			while(foundRecipe == false && i < data.recipes.length) {
				//check all of the grid values against the recipes
				oneone = data.recipes[i].oneone;
				onetwo = data.recipes[i].onetwo; //oatmeal
				onethree = data.recipes[i].onethree;
				twoone = data.recipes[i].twoone;
				twotwo = data.recipes[i].twotwo;
				twothree = data.recipes[i].twothree;
				threeone = data.recipes[i].threeone;
				threetwo = data.recipes[i].threetwo;
				threethree = data.recipes[i].threethree;

				//if we have a match...
				if(coneone == oneone && conetwo == onetwo && conethree == onethree
					&& ctwoone == twoone && ctwotwo == twotwo && ctwothree == twothree
					&& cthreeone == threeone && cthreetwo == threetwo && cthreethree == threethree) {
					//output the result and stop checking
					$("#output").html("<p class='ingredient'>"+data.recipes[i].output+"</p>");
					foundRecipe = true;
				}

				//check next recipe
				i++;
			}

			if(foundRecipe == false) {
				$("#output").html("<p class='ingredient'></p>");
			}
		});

		if(DEBUG == true) {
			console.log("Checked recipes - checkRecipes()");
		}
	}

	function lookUpRecipe(kanji) {
		$.getJSON("recipes.json?r=" + Date.now(), function(data) {
			
			if(DEBUG == true) {
				console.log("Looking up recipe for " + kanji);
			}

			for(var i = 0; i < data.recipes.length; i++) {
				if(data.recipes[i].output == kanji) {
					$("#one-one p").text(data.recipes[i].oneone); 
					$("#one-two p").text(data.recipes[i].onetwo); 
					$("#one-three p").text(data.recipes[i].onethree); 
					$("#two-one p").text(data.recipes[i].twoone);
					$("#two-two p").text(data.recipes[i].twotwo); 
					$("#two-three p").text(data.recipes[i].twothree); 
					$("#three-one p").text(data.recipes[i].threeone); 
					$("#three-two p").text(data.recipes[i].threetwo); 
					$("#three-three p").text(data.recipes[i].threethree);
					$("#output").html("<p class='ingredient'>"+data.recipes[i].output+"</p>");
					return false;
				}
			}
		}).fail(function(jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
    		console.log( "Request Failed: " + err );
    		console.log("Failed to load recipes.json. Check formatting!");
		});
	}

	//adds more inventory space if there is not enough to the menu
	function checkSlots() {
		//check each inventory slot
		var slotsFull = true;
		$("#inventory .slot").each(function() {
			//if one is not empty, then we don't add more
			if($(this).text() == "") {
				slotsFull = false;
			}
		});

		if(slotsFull == true) {
			$("#inventory").append('<div class="slot"><p class="ingredient"></p></div><div class="slot"><p class="ingredient"></p></div><div class="slot"><p class="ingredient"></p></div><div class="slot"><p class="ingredient"></p></div>');
			
			$("#inventory .slot, #ingredients .slot").unbind();
			$("#inventory .slot, #ingredients .slot").click(function() {
				//if there is an element in the slot
				if($(this).find("p").text() != "") {
					//unselect it if selected
					if($(this).hasClass("selected")) {
						$(this).removeClass("selected");
					}

					//select it if it isn't selected
					else {
						$(".selected").removeClass("selected");
						$(this).addClass("selected");
					}
				}

				//if there is not an element in the slot
				else {
					//move the selected element into it
					$(this).find(".ingredient").text($(".selected").text());
					//delete the item if it's on the crafting table
					//$(".selected .ingredient").text("");
					$(".selected").removeClass("selected");
					checkRecipes();
					checkSlots();
					saveGame();
				}

			});
		}
	}

	// var prevSelection;
	// var currSelection;

	//move the new kanji into your inventory & clear the board
	$("#output").on('dblclick', function() {
		var hasKanji = false;
		$("#inventory .ingredient, #ingredients .ingredient").css("border", "1px solid #573921");
		//Check to see if the user has the Kanji already
		$("#inventory .slot .ingredient").each(function() {
			
			//If you already found the character don't create a new slot for it
			if($(this).text() == $("#output .ingredient").text() && $(this).text() != "") {
				alert("You already found " + $("#output .ingredient").text());
				hasKanji = true;
				return false;
			}

			//otherwise check for an empty slot
			if(hasKanji == false) {
				//found an empty slot to put the new character in
				if($(this).text() == "") {
					$(this).text($("#output .ingredient").text());
					$("#output .ingredient").text("");
					return false;
				}
			}
		});

		$("#ingredients .slot .ingredient, #output .ingredient").text("");
		checkSlots();
		saveGame();
	});

	$("#trash").click(function() {
		var ok = window.confirm("Are you sure you want to delete this Kanji?");
		if(ok == true) {
			$(".selected p").text("");
			$(".selected").removeClass("selected");
		}
		checkRecipes();
	});

	$("#inventory .slot").dblclick(function(){
		lookUpRecipe($(this).find(".ingredient").text());	
    });

    $("#menubutton").click(function() {
    	var toggleWidth = $("#menu").width() == 0 ? "500px" : "0px";
        $('#menu').animate({ width: toggleWidth }, function() {});
    });

    $("#dismiss").click(function() {
    	$("#intro").animate({
    		opacity: 0
    	}, 500, function() {
    		$("#intro").remove();
    	});
    });

    $("#save").click(function() {
    	saveGame();
    });

    $("#menu-browse").click(function() {
    	$("#menu-list").css("display", "none");
    	$("#browse").html("");
    	$("#browse, #menu-back").css("display", "block");
    	$("#browse").append("<h2>The 1006 Jouyou Kanji</h2>");
    	$.getJSON("kanji.json?r=" + Date.now(), function(data) {
			for(var i = 0; i < data.kanji.length; i++) {
				$("#browse").append("<span class='browse-kanji'>" + data.kanji[i].char + "</span>");
				$(".browse-kanji").click(function() {
					var Kanji = $(this).text();
					$.getJSON("kanji.json?r=" + Date.now(), function(data) {
						for(var i = 0; i < data.kanji.length; i++) {
							if(data.kanji[i].char == Kanji) {
								var kanji = data.kanji[i];
								$("#browse").html("");
								$("#browse").append("<div class='kanji'><h2>Kanji Info</h2>");
								$("#browse").append("<div class='char'><h3>"+kanji.char+"</h3></div>");
								$("#browse").append("<div class='english'><strong>English:</strong> "+kanji.en+"</div>");
								$("#browse").append("<div class='onyomi'><strong>Onyomi:</strong> "+kanji.o+"</div>");
								$("#browse").append("<div class='kunyomi'><strong>Kunyomi:</strong> "+kanji.k+"</div>");
								//$("#search-results").append("<div class='external'><a target='_blank' href='http://jisho.org/search/"+kanji.char+"%20%23kanji'>Denshi Jisho</a>");
								$("#browse").append("<button id='recipe'>RECIPE</button><button id='add'>ADD</button><h2>Example Words</h2></div>");


								for(var j = 0; j < kanji.words.length; j++) {
									var words = kanji.words[j];
									$("#browse").append("<div class='words'><ul><li><p>"+words.word+" ("+words.furigana+") - "+words.gloss+"</p><p>"+words.sentence+" - "+words.sentence_en+"</p></li></ul></div>");
								}

								//look up the recipe for the character
								$("#recipe").on('click', function() {
									lookUpRecipe($(".char").text());
								});

								//add the character to your inventory
								$("#add").on('click', function() {
									$("#inventory .slot .ingredient").each(function() {
										if($(this).text() == "") {
											$(this).text($(".char").text());
											checkSlots();
											saveGame();
											return false;
										}
									});
								});

								break;
							}

							if(i == data.kanji.length) {
								$("#search-results").html("");
								$("#search-results").append("<h2>Something happened that wasn't supposed to!</h2>");
							}
						}
					});
				});
			}
		}).fail(function(jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
    		console.log( "Request Failed: " + err );
    		console.log("Failed to load kanji.json. Check formatting!");
		});
    });

    $("#menu-search").click(function() {
    	$("#menu-list").css("display", "none");
    	$("#search, #menu-back").css("display", "block");
    });

    $("#menu-achievements").click(function() {
    	$("#menu-list").css("display", "none");
    	$("#achievements, #menu-back").css("display", "block");
    });

    $("#menu-settings").click(function() {
    	$("#menu-list").css("display", "none");
    	$("#settings, #menu-back").css("display", "block");
    });

    $("#menu-back").click(function() {
    	$("#menu-back").css("display", "none");
    	$("#browse, #search, #achievements, #settings").css("display", "none");
    	$("#menu-list").css("display", "block");
    });

    $("#search-submit").click(function() {
    	$.getJSON("kanji.json?r=" + Date.now(), function(data) {
			for(var i = 0; i < data.kanji.length; i++) {
				if(data.kanji[i].char == $("#search-value").val()) {
					var kanji = data.kanji[i];
					$("#search-results").html("");
					$("#search-results").append("<div class='kanji'><h2>Kanji Info</h2>");
					$("#search-results").append("<div class='char'><h3>"+kanji.char+"</h3></div>");
					$("#search-results").append("<div class='english'><strong>English:</strong> "+kanji.en+"</div>");
					$("#search-results").append("<div class='onyomi'><strong>Onyomi:</strong> "+kanji.o+"</div>");
					$("#search-results").append("<div class='kunyomi'><strong>Kunyomi:</strong> "+kanji.k+"</div>");
					//$("#search-results").append("<div class='external'><a target='_blank' href='http://jisho.org/search/"+kanji.char+"%20%23kanji'>Denshi Jisho</a>");
					$("#search-results").append("<button id='recipe'>RECIPE</button><button id='add'>ADD</button><h2>Example Words</h2></div>");

					for(var j = 0; j < kanji.words.length; j++) {
						var words = kanji.words[j];
						$("#search-results").append("<div class='words'><ul><li><p>"+words.word+" ("+words.furigana+") - "+words.gloss+"</p><p>"+words.sentence+" - "+words.sentence_en+"</p></li></ul></div>");
					}

					//look up the recipe for the character
					$("#recipe").on('click', function() {
						lookUpRecipe($(".char").text());
					});

					//add the character to your inventory
					$("#add").on('click', function() {
						$("#inventory .slot .ingredient").each(function() {
							if($(this).text() == "") {
								$(this).text($(".char").text());
								checkSlots();
								saveGame();
								return false;
							}
						});
					});

					break;
				}

				if(i == data.kanji.length) {
					$("#search-results").html("");
					$("#search-results").append("<h2>Kanji Not Found :(</h2>");
				}
			}
		});
    });

	document.addEventListener('keydown', function(event) {
		//r key = look up recipe for selected character
		if(event.keyCode == 82) {
			lookUpRecipe($(".selected p").text());
		}

		//e key = open / close the menu
		if(event.keyCode == 69) {
    		var toggleWidth = $("#menu").width() == 0 ? "500px" : "0px";
        	$('#menu').animate({ width: toggleWidth }, function() {});
		}

		//t key = put character in trash
		if(event.keyCode == 84) {
			if($("#ingredients .selected p").text() != "") {
				var ok = window.confirm("Are you sure you want to delete this Kanji?");
				if(ok == true) {
					$("#ingredients .selected p").text("");
					$("#ingredients .selected").removeClass("selected");
				}
				checkRecipes();
			}
		}

		//c key = clear the crafting table
		if(event.keyCode == 67) {
			var ok = window.confirm("Are you sure you want to clear the crafting table?");
			if(ok == true) {
				$("#ingredients .slot .ingredient, #output .ingredient").text("");
			}
		}
	})
});