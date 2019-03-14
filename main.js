//Tool that returns if the user is on a mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

var cHeight = 0;
var cVisible = false;
var rHeight = 0;
var rVisible = false;

var catFastFood = [false, false, false, false, false, false, false, false];
var catMexican = [false, false];
var catItalian = [false, false, false, false];
var catOriental = [false];
var catAmerican = [false, false, false, false, false];
var catChicken = [false, false, false];
var catAll = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

var nameFastFood = ["r2", "r3", "r5", "r9", "r13", "r14", "r15"];
var nameMexican = ["r10", "r13"];
var nameItalian = ["r4", "r7", "r11", "r12"];
var nameOriental = ["r8"];
var nameAmerican = ["r1", "r2", "r6", "r9", "r14"];
var nameChicken = ["r3", "r5", "r15"];
var nameAll = ["r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15"];

var tempCheck = [true];

//Runner function
function init() {
	document.getElementById("main_container").style.top = "120px";
	document.getElementById("categories").style.height = cHeight+"px";
	
	//Check if the user is on a mobile device and fix graphics accordingly
	//alert(isMobileDevice());
	if (isMobileDevice()) {
		document.getElementById("headerText").style.fontSize = "24px";
		document.getElementsByTagName("p")[0].style.fontSize = "14px";
		document.getElementsByTagName("p")[1].style.fontSize = "14px";
		document.getElementsByTagName("h2")[0].style.fontSize = "18px";
		document.getElementById("main_container").style.top = "90px";
	} else {
		document.getElementById("cCont").style.float = "left";
		document.getElementById("rCont").style.float = "left";
	}
	
	window.setInterval(function(){
		//Graphic update to hide or show the categories and restaurants
		if (cVisible && cHeight < 190) {
			cHeight += 10;
		} else if (!cVisible && cHeight > 0) {
			cHeight -= 10;
		}
		document.getElementById("categories").style.height = cHeight+"px";
		if (rVisible && rHeight < 380) {
			rHeight += 15;
		} else if (!rVisible && rHeight > 0) {
			rHeight -= 15;
		}
		document.getElementById("restaurants").style.height = rHeight+"px";		
		//Check to make sure all checkboxes are updated		
		tempCheck = [true];
		for (i=0;i<catFastFood.length;i++) {
			tempCheck.push(checkIfChecked(nameFastFood[i]));			
		}
		document.getElementById("c1").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catMexican.length;i++) {
			tempCheck.push(checkIfChecked(nameMexican[i]));			
		}
		document.getElementById("c2").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catItalian.length;i++) {
			tempCheck.push(checkIfChecked(nameItalian[i]));			
		}
		document.getElementById("c3").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catOriental.length;i++) {
			tempCheck.push(checkIfChecked(nameOriental[i]));			
		}
		document.getElementById("c4").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catAmerican.length;i++) {
			tempCheck.push(checkIfChecked(nameAmerican[i]));			
		}
		document.getElementById("c5").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catChicken.length;i++) {
			tempCheck.push(checkIfChecked(nameChicken[i]));			
		}
		document.getElementById("c6").checked = verifyTrue(tempCheck);
		tempCheck = [true];
		for (i=0;i<catAll.length;i++) {
			tempCheck.push(checkIfChecked(nameAll[i]));			
		}
		document.getElementById("c7").checked = verifyTrue(tempCheck);
	}, 20);
}

//Function to test if the inputted array is true
function verifyTrue(testArray) {
	for (i=0;i<testArray.length;i++) {
		if (!testArray[i]) {
			alert("hi");
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
	for (i=1;i<=15;i++) {
		if (checkIfChecked("r"+i)) {
			choiceList.push("r"+i);
		}		
	}
	while (choice == previousChoice) {
		choice = document.getElementById(choiceList[Math.floor(Math.random()*choiceList.length)]).name;
	}
	previousChoice = choice;
	document.getElementById("answer").innerHTML = '<p style="color:#ffe500;">You should go to ' + choice + '!';
}

function updateCategoryArray(array) {
	//Update category array]
	var arrLength = 0;
	switch(array) {
		case 1:
			arrLength = catFastFood.length;
			break;
		case 2:
			arrLength = catMexican.length;
			break;
		case 3:
			arrLength = catItalian.length;
			break;
		case 4:
			arrLength = catOriental.length;
			break;
		case 5:
			arrLength = catAmerican.length;
			break;
		case 6:
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
				document.getElementById(nameMexican[i]).checked = checkedBool;
				break;
			case 3:
				document.getElementById(nameItalian[i]).checked = checkedBool;
				break;
			case 4:
				document.getElementById(nameOriental[i]).checked = checkedBool;
				break;
			case 5:
				document.getElementById(nameAmerican[i]).checked = checkedBool;
				break;
			case 6:
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