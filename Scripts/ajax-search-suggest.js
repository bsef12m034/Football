/*
Demo: AJAX Search Suggest (WeAreHunted.com Style)
Version 1.0
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Demo URL: http://www.ianlunn.co.uk/demos/ajax-search-suggest-wearehunted/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/ajax-search-suggest-wearehunted/
GitHub: https://github.com/IanLunn/AJAX-Search-Suggest--WeAreHunted.com-Style-/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

$(document).ready(function(){ //when the browser has rendered the page...
	
	//save selectors we'll be using more than once into variables for better performance
	var $hiddenSearch = $("#hidden-search"),
		$displaySearch = $("#display-search"),
		$searchOverlay = $("#search-overlay"),
		$artistsList = $("#artists");

	$("#search").click(function(){ //when the search link is clicked...
		$searchOverlay.show(); //show the search overlay
		$hiddenSearch.focus(); //give the hidden input box focus
	});
	
	$searchOverlay.click(function(event){ //when the search overlay is clicked...
		$hiddenSearch.focus(); //give the hidden input box focus
		if(event.target.id == "search-overlay" || event.target.id == "close"){ //...only if the user is clicking the empty areas of the overlay (and not child elements)...
			$hiddenSearch.blur(); //remove focus from the hidden input
			$(this).animate({"opacity": 0}, 500, function(){ //...animate it's opacity to 0...
				$(this).hide().css("opacity", 1); //...hide it (so the user can click the elements behind it again) and reset its opacity
			});
		}
	});
		
	//when the user pushes a key whilst the input box has focus...
	$hiddenSearch.keydown(function(e){
		currentQuery = $displaySearch.val(); //get the current value of the search input
		if(e.keyCode == 8){ //if the user hits backspace...
		
			latestQuery = currentQuery.substring(0, currentQuery.length - 1); //...remove the last character
			$displaySearch.val(latestQuery); //...update the search input box
			updateResults(latestQuery); //...update the results
		
		}else if(e.keyCode == 32 || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57)){ //if the user hits spacebar (32), characters a - z (65 - 90) or numeric keys(0 - 9)...
			latestQuery = currentQuery + String.fromCharCode(e.keyCode); //...add the newly entered key onto the current query
			$displaySearch.val(latestQuery); //...update the search input value with the latest query
			updateResults(latestQuery); //...update the results
		}
	});
	
	function updateResults(latestQuery){
	    if (latestQuery.length > 0) {
	        $.getJSON("/adminPanel/searchResult?latestQuery=" + latestQuery, function (data) {//if there is a query to process...
	            //..send that query to the php script "auto-suggest.php" via ajax

	            if (data.length > 0) { //if the php script returns a result...
	                //turn the string from the PHP script into a JavaScript object
	                //remove the "No results" text if it's being displayed
	                //show the results container



	                //keepTerms = new Array();


	                if (data == "") {
	                    var items = document.getElementById("list");
	                    var item = document.createElement("li");



	                    item.innerHTML = "No Record Found...";
	                    items.appendChild(item);
	                }
	                else {

	                    var items = document.getElementById("list");
	                    for (var i = 0; i < data.length; i++) { //for each term in the displayed list...
	                        if (latestQuery == "ADMIN") {

	                            var item = document.createElement("li");
	                            item.innerHTML = data[i].Id + "  " + data[i].username + "   (" + data[i].email + ")";
	                            items.appendChild(item);

	                        }

	                        if (latestQuery == "TEAM") {

	                            var item = document.createElement("li");
	                            item.innerHTML = data[i].Id + "  " + data[i].name + "   (" + data[i].club + ")";
	                            items.appendChild(item);

	                        }

	                        if (latestQuery == "USER") {

	                            var item = document.createElement("li");
	                            item.innerHTML = data[i].Id + "  " + data[i].username + "   (" + data[i].email + ")";
	                            items.appendChild(item);

	                        }

	                        if (latestQuery == "RESULT") {
	                            var item = document.createElement("li");
	                            item.innerHTML = "Id Win Lose Points";
	                            items.appendChild(item);
	                        }

	                        if (latestQuery == "RESULT") {

	                            var item = document.createElement("li");
	                            item.innerHTML = data[i].TeamId + "  " + data[i].win + "   " + data[i].lose + " " + data[i].points;
	                            items.appendChild(item);

	                        }

	                        

	                    }
	                }

	            }
	        });
	    } else {
	        if (data == "") {
	            var items = document.getElementById("list");
	            var item = document.createElement("li");



	            item.innerHTML = "No Record Found...";
	            items.appendChild(item);
	        }

	    }	    }
	});