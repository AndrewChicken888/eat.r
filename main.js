//Tool that returns if the user is on a mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function setCookie(cname) {
	document.getElementById("newName").focus();
	document.getElementById("newName").value = "";
	document.getElementById("newCategory").value = "";
	if (cname.indexOf("|") == 0 || cname.indexOf("|") == cname.length-1) {
		document.getElementById("error").innerHTML = "Please fill in both boxes.";
	} else {
  var d = new Date();
  d.setTime(d.getTime() + (1825*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = "r" + nextR + "=" + cname + ";" + expires + ";path=/";
  tempName = cname.substring(0,cname.indexOf("|"));
				tempCat = cname.substring(cname.indexOf("|")+1,cname.length);
				nameCookie.push(tempName);
				switch(tempCat) {
					case "fast food":
						nameFastFood.push(tempName);
						catFastFood.push(false);
						break;
					case "chain sitdown":
						nameChainSitdown.push(tempName);
						catChainSitdown.push(false);
						break;
					case "mexican":
						nameMexican.push(tempName);
						catMexican.push(false);
						break;
					case "italian":
						nameItalian.push(tempName);
						catItalian.push(false);
						break;
					case "oriental":
						nameOriental.push(tempName);
						catOriental.push(false);
						break;
					case "american":
						nameAmerican.push(tempName);
						catAmerican.push(false);
						break;
					case "chicken":
						nameChicken.push(tempName);
						catChicken.push(false);
						break;
				}
				nameAll.push(tempName);
				catAll.push(false);
				addCheckbox(tempName,nameAll.length-1);
	}
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Delete a cookiefunction setCookie(cname,cvalue,exdays)
function deleteCookie(cname) {
  document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

//Example cookie:
/*
 * setCookie("username", "John Doe", 1825);
 */

//Graphics variables
var cHeight = 0;
var cVisible = false;
var rHeight = 0;
var rVisible = false;

//Arrays to store the names of each restaurant in a category
var nameFastFood = ["Arby's", "BoJangle's", "Chick Fil'A", "McDonald's", "Taco Bell", "Wendy's", "Zaxby's", "KFC"];
var nameChainSitdown = ["Applebee's", "TGIFriday's", "Chipolte", "O'Charlie's", "Fazoli's", "Olive Garden", "Chili's"];
var nameMexican = ["Taco Bell", "Taco John's", "Salsa Rita's", "Moe's"];
var nameItalian = ["Fazoli's", "Olive Garden"];
var nameOriental = ["P.F. Chang's"];
var nameAmerican = ["Arby's", "McDonald's", "Wendy's", "Applebee's", "TGIFriday's", "Chipolte", "O'Charlie's", "Chili's"];
var nameChicken = ["BoJangle's", "Chick Fil'A", "Zaxby's", "KFC"];
var nameAll = ["Arby's", "BoJangle's", "Chick Fil'A", "McDonald's", "Taco Bell", "Wendy's", "Zaxby's", "KFC", "Applebee's", "TGIFriday's", "Chipolte", "O'Charlie's", "Fazoli's", "Olive Garden", "Chili's", "Taco John's", "Salsa Rita's", "Moe's", "P.F. Chang's"];
var nameCookie = [];

//Arrays to store the checked/unchecked values of each restaurant in a category respective to their names in the arrays above
var catFastFood = [false, false, false, false, false, false, false, false];
var catChainSitdown = [false, false, false, false, false, false, false];
var catMexican = [false, false, false, false];
var catItalian = [false, false];
var catOriental = [false];
var catAmerican = [false, false, false, false, false, false, false, false];
var catChicken = [false, false, false, false];
var catAll = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

//Temporary array that will update categories being checked or not based on if all restaurants in that category are checked
var tempCheck = [true];
var nextR = 0;
var tempStorage = "";
var tempName = "";
var tempCat = "";
		
//This function retrieves all restaurant data from the stored cookies
function getCookies() {
	if (document.cookie != "") {		
		for (i=0;i<document.cookie.length;i++) {
			//Make sure there are more cookies to grab
			if (document.cookie.indexOf("r"+i) == -1) {nextR=i;i=document.cookie.length;}
			else {
				//Retrieve the latest cookie
				tempStorage = getCookie("r"+i);
				
				//Split the cookie into restaurant and category (divider = '|')
				tempName = tempStorage.substring(0,tempStorage.indexOf("|"));
				tempCat = tempStorage.substring(tempStorage.indexOf("|")+1,tempStorage.length);
				nameCookie.push(tempName);
				switch(tempCat) {
					case "fast food":
						nameFastFood.push(tempName);
						catFastFood.push(false);
						break;
					case "chain sitdown":
						nameChainSitdown.push(tempName);
						catChainSitdown.push(false);
						break;
					case "mexican":
						nameMexican.push(tempName);
						catMexican.push(false);
						break;
					case "italian":
						nameItalian.push(tempName);
						catItalian.push(false);
						break;
					case "oriental":
						nameOriental.push(tempName);
						catOriental.push(false);
						break;
					case "american":
						nameAmerican.push(tempName);
						catAmerican.push(false);
						break;
					case "chicken":
						nameChicken.push(tempName);
						catChicken.push(false);
						break;
				}
				nameAll.push(tempName);
				catAll.push(false);
			}
		}
	}
}

//This function adds a new restaurant checkboxes
var actualName = "";
var pos = 0;
function addCheckbox(name, number) {
	/*
	for (i=0;i<name.length;i++) {
		if (name.charAt(i)=="'") {
			pos++;
			actualName += "\\";
		}
		//actualname += name.charAt(i);
		pos++;
	}*/
	document.getElementById("restaurants").innerHTML += "<input type='checkbox' id=\""+name+"\" name=\""+name+"\" value='"+name+"'><label for=\""+name+"\"> "+name+"</label><br>";
}

//Runner function
function init() {
	document.getElementById("newName").focus();
	
	//Retrieve cookies
	getCookies();
	
	//Load checkboxes
	for (i=0;i<nameAll.length;i++) {
		addCheckbox(nameAll[i],i+1);
	}
	document.getElementById("main_container").style.top = "120px";
	document.getElementById("categories").style.height = cHeight+"px";
	
	//Check if the user is on a mobile device and fix graphics accordingly
	//alert(isMobileDevice());
	if (!isMobileDevice()) {
		document.getElementById("cCont").style.float = "left";
		document.getElementById("rCont").style.float = "left";
		//Event listener on the input button so it can be pressed on enter:
		document.getElementById("newName").addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				setCookie(document.getElementById('newName').value + '|' + document.getElementById('newCategory').value.toLowerCase());
			}
		});
		document.getElementById("newCategory").addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				setCookie(document.getElementById('newName').value + '|' + document.getElementById('newCategory').value.toLowerCase());
			}
		});
	}
	
	window.setInterval(function(){
		//Graphic update to hide or show the categories and restaurants
		if (cVisible && cHeight < 192) {
			cHeight += 24;
		} else if (!cVisible && cHeight > 0) {
			cHeight -= 24;
		}
		document.getElementById("categories").style.height = cHeight+"px";
		if (rVisible && rHeight < 24*nameAll.length) {
			rHeight += 24;
		} else if (!rVisible && rHeight > 0) {
			rHeight -= 24;
		}
		document.getElementById("restaurants").style.height = rHeight+"px";		
		//Check to make sure all checkboxes are updated		
		tempCheck = [true];
		for (i=0;i<catFastFood.length;i++) {
			tempCheck.push(checkIfChecked(nameFastFood[i]));			
		}
		document.getElementById("c1").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catChainSitdown.length;i++) {
			tempCheck.push(checkIfChecked(nameChainSitdown[i]));			
		}
		document.getElementById("c2").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catMexican.length;i++) {
			tempCheck.push(checkIfChecked(nameMexican[i]));			
		}
		document.getElementById("c3").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catItalian.length;i++) {
			tempCheck.push(checkIfChecked(nameItalian[i]));			
		}
		document.getElementById("c4").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catOriental.length;i++) {
			tempCheck.push(checkIfChecked(nameOriental[i]));			
		}
		document.getElementById("c5").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catAmerican.length;i++) {
			tempCheck.push(checkIfChecked(nameAmerican[i]));			
		}
		document.getElementById("c6").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catChicken.length;i++) {
			tempCheck.push(checkIfChecked(nameChicken[i]));			
		}
		document.getElementById("c7").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catAll.length;i++) {
			tempCheck.push(checkIfChecked(nameAll[i]));			
		}
		document.getElementById("c8").checked = verifyTrue(tempCheck);
	}, 20);
}

//Function to test if the inputted array is true
function verifyTrue(testArray) {
	for (i=0;i<testArray.length;i++) {
		if (!testArray[i]) {
			return false;
		}
	}
	return true;
}

//Generate a random restaurant
var choice = "null";
var previousChoice = "null";
function generate() {
	var choiceList = [];
	for (i=0;i<nameAll.length;i++) {
		if (checkIfChecked(nameAll[i])) {
			choiceList.push(nameAll[i]);
		}		
	}
	if (choiceList.length > 1) {
		while (choice == previousChoice) {
			choice = document.getElementById(choiceList[Math.floor(Math.random()*choiceList.length)]).name;
		}
	} else {
		choice = document.getElementById(choiceList[Math.floor(Math.random()*choiceList.length)]).name;
	}
	previousChoice = choice;
	document.getElementById("answer").innerHTML = '<p style="color:#ffe500;">You should go to ' + choice + '!';
}

function hideCookies() {
	document.getElementById("cookies").style.height = "0px";
}

function updateCategoryArray(array) {
	//Update category array
	var arrLength = 0;
	switch(array) {
		case 1:
			arrLength = catFastFood.length;
			break;
		case 2:
			arrLength = catChainSitdown.length;
			break;
		case 3:
			arrLength = catMexican.length;
			break;
		case 4:
			arrLength = catItalian.length;
			break;
		case 5:
			arrLength = catOriental.length;
			break;
		case 6:
			arrLength = catAmerican.length;
			break;
		case 7:
			arrLength = catChicken.length;
			break;
		default:
			arrLength = catAll.length;
	}
	var checkedBool = checkIfChecked("c"+array);
	for (i=0;i<arrLength;i++) {
		switch(array) {
			case 1:
				document.getElementById(nameFastFood[i]).checked = checkedBool;
				break;
			case 2:
				document.getElementById(nameChainSitdown[i]).checked = checkedBool;
				break;
			case 3:
				document.getElementById(nameMexican[i]).checked = checkedBool;
				break;
			case 4:
				document.getElementById(nameItalian[i]).checked = checkedBool;
				break;
			case 5:
				document.getElementById(nameOriental[i]).checked = checkedBool;
				break;
			case 6:
				document.getElementById(nameAmerican[i]).checked = checkedBool;
				break;
			case 7:
				document.getElementById(nameChicken[i]).checked = checkedBool;
				break;
			default:
				document.getElementById(nameAll[i]).checked = checkedBool;
		}		
	}
}
function checkIfChecked(name) {
	return document.getElementById(name).checked;
}

//This function will toggle whether the categories are visible
function toggleCategories() {
	if (cVisible) {
		cVisible = false;
		document.getElementById("cToggle").innerHTML = "Categories >";
	} else {
		cVisible = true;
		document.getElementById("cToggle").innerHTML = "Categories <";
	}
}

//This function will toggle whether the restaurants are visible
function toggleRestaurants() {
	if (rVisible) {
		rVisible = false;
		document.getElementById("rToggle").innerHTML = "Restaurants >";
	} else {
		rVisible = true;
		document.getElementById("rToggle").innerHTML = "Restaurants <";
	}
}