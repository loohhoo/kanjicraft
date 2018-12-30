		<!--<div id='intro'>
        <h2>HOW TO</h2>
        <button style="float: right; width:75px; height:20px; margin-top: -24px" id="dismiss">DISMISS</button>
        <span style="clear: both;">&nbsp;</span>
        <p>In KanjiCraft, your goal is to learn all 1006 Elementary School Kanji by "crafting"
        	them from their parts. When you craft a Kanji you haven't seen before, it is added
        	to your collection which is accessible in the menu. You also get experience points.</p>
        <p>In your inventory (on the right) you'll see all the indivisible parts you can select 
        	from to craft. Combine these together to create new Kanji! Here's an example: </p>
        <p>二 + 二 + 口 → 言</p>
        <p>In the menu you can search for a Kanji if you're not sure how to make it. Its dictionary
        	entry will contain the recipe with a few basic words for you to get started with. The recipe
        	is hidden by default but you can click "peek" to show it at the cost of 5 experience points.</p>
    	</div>-->
    	
    	<div id="game">
		<button id='menubutton'></button>
    	<h1>KANJICRAFT</h1>
    	<div style="clear: both;">&nbsp;</div>
			<div id='craftingtable'>
				<div id='ingredients'>
					<div id='one-one' class='slot'><p class='ingredient'></p></div>
					<div id='one-two' class='slot'><p class='ingredient'></p></div>
					<div id='one-three' class='slot'><p class='ingredient'></p></div>
					<div id='two-one' class='slot'><p class='ingredient'></p></div>
					<div id='two-two' class='slot'><p class='ingredient'></p></div>
					<div id='two-three' class='slot'><p class='ingredient'></p></div>
					<div id='three-one' class='slot'><p class='ingredient'></p></div>
					<div id='three-two' class='slot'><p class='ingredient'></p></div>
					<div id='three-three' class='slot'><p class='ingredient'></p></div>
				</div>

				<div id='arrow'>
				</div>

				<div id='output' class='slot'>
					<p class='ingredient'>
					</p>
				</div>
			</div>

			<div id="ads">
				<!-- <h2>Sponsored Content</h2> 
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
			
				<ins class="adsbygoogle"
				     style="display:inline-block;width:728px;height:90px"
				     data-ad-client="ca-pub-3886926723086152"
				     data-ad-slot="1749505068"></ins>
				<script>
				(adsbygoogle = window.adsbygoogle || []).push({});
				</script> -->
			</div>

			<h2 id='inventory-title'>INVENTORY</h2>
				<div id='inventory'>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
					<div class="slot"><p class="ingredient"></p></div>
				</div>


			<!-- <div id="guide">
    		</div>

			<button id='next'>next</button> -->

			<div id="trash">
			</div>

			<div id='menu'>
				<h2>MENU</h2>
				<hr />
				<ul id="menu-list">
					<li id="menu-browse">BROWSE KANJI</li>
					<li id="menu-search">SEARCH KANJI</li>
					<li id="menu-achievements">ACHIEVEMENTS</li> 
					<li id="menu-settings">SETTINGS</li>
				</ul>

				<div id="browse">

				</div>

				<div id="search">
					<input type="text" id="search-value" />
					<button id="search-submit">SEARCH</button>
					<div id="search-results">
					</div>
				</div>

				<div id="achievements">
				</div>
				<div id="settings">
					<h2>KEYBOARD SHORTCUTS</h2>
					<img src="keyboardshortcuts.png" />
				</div>

				<button id="menu-back">BACK</button>
			</div>
		</div>