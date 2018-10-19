/*
	This function is called on button click and pulls together the remediation	input and outputs formatted code for accordion remediation.

	Remediate() will only pull in remediation for the text boxes that
	have text in them.
*/

function remediate() {
	//Constant values for the header/footer information
	//e.g., "That's correct/incorrect,"
	//and sets up the HTML for the accordion.
	var headerCorrect = `<p><strong>That's correct! Below are the steps to find the correct answer.</strong></p>
<div style="padding: 10px; height: 450px; width: 80%; display: block; margin-left: auto; margin-right: auto;" class="ui-widget-content">
<div class="doAccordion">`;

	var headerIncorrect = `<p><strong>Sorry, that's incorrect. Take a moment to review the steps to find the correct answer.</strong></p>
<div style="padding: 10px; height: 450px; width: 80%; display: block; margin-left: auto; margin-right: auto;" class="ui-widget-content">
<div class="doAccordion">`;

	var footer = `</div>
<noscript>This is page features dynamic HTML content. Your browser either does not support JavaScript or has JavaScipt disabled. The content of the dynamic elements will be available to you, but the interactivity will not.</noscript></div>`;

	//var preformat = `<div style="white-space: pre;">`;

	var currentStep = "";
	var remediation = "";

	//Go through each text field and add each step to the remediation
	if (document.getElementById("step1").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 1</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("step1").value) + '\n</div>\n';
		remediation += currentStep;
	}
	if (document.getElementById("step2").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 2</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("step2").value) + '\n</div>\n';
		remediation += currentStep;
	}
	if (document.getElementById("step3").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 3</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("step3").value) + '\n</div>\n';
		remediation += currentStep;
	}
	if (document.getElementById("step4").value!= "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 4</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("step4").value) + '\n</div>\n';
		remediation += currentStep;
	}
	if (document.getElementById("step5").value != "") {
		currentStep = '<h3 class="accordion-header"><a href="#">Step 5</a></h3>\n<div>\n';
		currentStep += htmlEscape(document.getElementById("step5").value) + '\n</div>\n';
		remediation += currentStep;
	}

	//Set correct and incorrect final values
	document.getElementById("correct").value = headerCorrect + remediation + footer;
	document.getElementById("incorrect").value = headerIncorrect + remediation + footer;
}


/*
	This function does the opposite of the remediate function. Given a set of
	remediation inputs, it will deconstruct it into its original steps.
*/

function unremediate() {
	// Gets the remediation from whichever field is not empty
	var remediation = (document.getElementById("correct").value == "") ? document.getElementById("incorrect").value : document.getElementById("correct").value;

	// Loop through for all 5 step textboxes
	for (var i = 1; i <= 5; i++) {
		// Generate a dynamic regex with i
		var pattern = new RegExp("Step " + i + "<\\/a><\\/h3>\\n?<div>\\n?([^]*?)<\\/div>", "gm");

		// Run the expression for a match
		var matches = pattern.exec(remediation);

		// If match found, update the right element using a dynamic id
		var id = "step" + i;
		if (matches != null) {
			document.getElementById(id).value = matches[1];
		}
	}
}


/*
	This function is called on button click and clears the output textbox.
*/

function clearAll() {
	//Set the output text to blank
	document.getElementById("correct").value = "";
	document.getElementById("incorrect").value = "";

	//Set the input text to blank
	document.getElementById("step1").value = "";
	document.getElementById("step2").value = "";
	document.getElementById("step3").value = "";
	document.getElementById("step4").value = "";
	document.getElementById("step5").value = "";
}


/*
	Replaces all occurrences of common characters with their HTML-friendly
	equivalents. This will replace the following: <, >, -.
*/

function htmlEscape(str) {
	return String(str);
		//.replace(/</g, '&lt;')
		//.replace(/>/g, '&gt;')
		//.replace(/-/g, '&minus;');
}
