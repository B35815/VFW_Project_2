/*
Ricardo Aviles
VFW 1302
Project 2
02/17/2013
*/

// Wait for DOM to be ready.
window.addEventListener("DOMContentLoaded", function(){
    // Function getElementById
    function $(x) {
	var theElement = document.getElementById(x);
	return theElement;
    };

    // Create select field element, populate with options.
    function createList(selector, listOptions){
        // Array of all of the form tags.
	var formTag = document.getElementsByTagName("form");
	var selectLi = $(selector);
	var makeSelect = document.createElement("select");
	    makeSelect.setAttribute("id", "list");
	for(var i=0, j=listOptions.length; i<j; i++){
	    var makeOption = document.createElement("option");
	    var optText = listOptions[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	};
	selectLi.appendChild(makeSelect);
    };

    // Value of selected radio button.
    function getSelectedRadio(){
	var radios = document.forms[0].priority;
	for(var i=0; i<radios.length; i++){
	    if(radios[i].checked){
		priorityValue = radios[i].value;
	    };
	};
	console.log(priorityValue);
    };

    function getCheckboxValue(itemName){
	if($(itemName).checked){
	    return value = $(itemName).value;
	    } else {
		return value = "No"
        };
    };

    function toggleControls(x){
	switch(x){
	    // Display data and Clear Data
	    case "on":
		$("addChore").style.display = "none";
		$("clearData").style.display = "inline";
		$("displayData").style.display = "none";			
		$("addNew").style.display = "inline";
	    break;
	    case "off":
		$("addChore").style.display = "block"; 
		$("clearData").style.display = "inline";
		$("displayData").style.display = "inline";
		$("addNew").style.display = "none";
		$("items").style.display = "none";
	    break;
	    default:
		return false;
	};
    };

    function storeData(){
	var id = Math.floor(Math.random()*100000001);
	    // Variables that gather information to display
	    getSelectedRadio();

	    var item           		= {};
		item.choreName 		= ["Chore Name:", $("choreName").value];
		item.location 		= ["location:", $("list").value];
		item.dueDate 		= ["Due Date:", $("dueDate").value];
                item.needTools 		= ["Need Tools:", getCheckboxValue("needTools")];
		item.needMaterials 	= ["Need Materials:", getCheckboxValue("needMaterials")];
		item.needAssistance 	= ["Need Assistance:", getCheckboxValue("needAssistance")];
                item.importance 	= ["Importance:", $("importance").value];
                item.priority 		= ["Priority:", priorityValue];
		item.addNotes		= ["Additional Notes:", $("addNotes").value];

	// Save data to Local Storage
	localStorage.setItem(id, JSON.stringify(item));
	alert("Chore Saved!");
    };

    function getData(){
	toggleControls("on");
	    if(localStorage.length ===0){
		alert("There are no chores stored.")
	    };
	// Write Data from Storage to browser.
	var makeDiv = document.createElement("div");
            makeDiv.setAttribute("id", "items");
	var makeUl = document.createElement("ul");
	    makeDiv.appendChild(makeUl);
        // Loop to use id key and value
	for(var i = 0, j=localStorage.length; i<j; i++){
	    if(parseInt(localStorage.key(i)/1) === parseInt(localStorage.key(i))) {
		var makeli = document.createElement("li");
		    makeUl.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
                //convert string from local storage back into an object using JSON.parse
		var object = JSON.parse(value);
		var makeSubUl = document.createElement("ul");
		    makeli.appendChild(makeSubUl)
		for(var x in object){
		    var makeSubli = document.createElement("li");
			makeSubUl.appendChild(makeSubli);
		    var objSubText = object[x][0]+ " " +object[x][1];
			makeSubli.innerHTML = objSubText;
		};
	    };	
	};
	document.body.appendChild(makeDiv);
    };

    function clearLocal(){
	if(localStorage.length === 0){
	    alert("There is nothing on your list.");
	} else {
	    localStorage.clear();
	    alert("Deleted all chores!");
	    window.location.reload();
	    return false;
	};
    };

    //Variable defaults
    var locationOptions = ["Select Location", "Home", "Work", "Other"];
	createList("location", locationOptions);
    var priorityValue;
    var value;


    // Set Link and Submit
    var displayData = $('displayData');
	displayData.addEventListener("click", getData);
    var clearData = $('clearData');
	clearData.addEventListener("click", clearLocal);
    var save = $("submit");
	save.addEventListener("click", storeData);
});