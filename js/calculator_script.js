/*
	Stoichiometric calculator requirements: 
	1. regular input -> calculates the molar mass onto the screen, just as usual
	2. stoic, enter - DONE 
		a. input does a 180° flip and now is asking for the balanced chemical reaction - DONE 
			i. react input + input(invokes the reaction.js plugin) - WAITING ON FEATURE: CHEMICAL REACTION BALANCER
			ii. else, use the equation given
				1. drop down dialog
					a. asks for measurement given...
					b. then shows equation set up...
						i. this is a fraction method that displays the ratios as fractions...
					c. perform multiplication
					d. answer appears below on screen
 */
 function stringExists(target, input1) {
 	return (input1.indexOf(target) > -1);
 }
var input = "";
//acting as main method for execution...
$(document).ready(function() {

	$('body').keydown(function(event) {
		if(event.which == 13) {
			input = $('#stoic_input').val();
			if(stringExists("stoic", input)) {
				flipInput($('.student_input'), "Enter reaction, or reactants if uncertain");
				$('.student_input').keydown(function(event) {
					if(event.which == 13) {
						cascade($('#enter_query'), $('#enter_query h3'), $('#desired_input'), $('#desired_output'));						
						input = $('.student_input').val();
						input = balance(input);
						// alert(input);
						$('#stoic_reaction_final').html(input);
						$('#desired_output').keydown(function(event) {
							if(event.which == 13) {
								var desired_input = $('#desired_input').val();
								var desired_output = $('#desired_output').val();
								fireFunction(desired_input, desired_output);
							}
						});
						$('#desired_input').keydown(function(event) {
							if(event.which == 13) {
								$('#desired_output').focus();
							}
						});
					} else if(event.which == 8) {
						uncascade($('#enter_query'), $('#enter_query h3'), $('#desired_input'), $('#desired_output'));						
						$('#desired_input').val("");
						$('#desired_output').val("");
					}
				});
			} else if (stringExists("balance", input)) {
				flipInput($('.student_input'), "Enter unbalanced, no need for any coefficients at all.");				
				$('.student_input').keydown(function(event) {
					if(event.which == 13) {
						var formulaStr = $(this).val();
						$('.output').html(balance(formulaStr));
					}
				});
			}
		}
	});

	/*front end methods for ease of readability in document.ready() function*/
	function flipInput(input, placeholder) {
		input.transition({
			perspective: '2000px',
			rotateX: '400deg'
		});
		input.val('');
		input.delay(15).attr("placeholder", placeholder);
		input.delay(20).transition({
			perspective: '2000px',
			rotateX: '360deg'
		});		
	}
	function cascade(query, header, input1, input2) {
		query.transition({
			height: '300px'
		});
		header.fadeIn(18);
		input1.delay(32).fadeIn();
		input1.attr("placeholder", "example: 0.9mol O2");
		input2.attr("placeholder", "example: volume H2O");
		input2.delay(32).fadeIn();
		input1.focus();
	}
	function uncascade(query, header, input1, input2) {
		input1.fadeOut();
		input2.fadeOut();
		header.delay(320).fadeOut(18);
		query.delay(32).transition({
			height: '0px'
		});
	}

	/*basic checker methods...*/
	function isMass(str) {
		//if grams are stated in the desired_input or mass is requested in desired_output 
		return (str.toLowerCase().split(" ")[0].indexOf("g") > -1 || str.toLowerCase().indexOf("mass") > -1);
	}	
	function isVolume(str) {
		//if liters are stated in the desired_input or volume is requested in the desired_output
		return (str.toLowerCase().split(" ")[0].indexOf("l") > -1 || str.toLowerCase().indexOf("volume") > -1);
	}	
	function isMol(str) {
		//is mol is stated in the desired_input or mol is requested in the desired_output
		return (str.toLowerCase().indexOf("mol") > -1);
	}

	/*advanced checker methods, checking the desired_input and desired_output of the user, which measurements are to be calculated*/
	function isMassToMol(desired_input, desired_output) {
		var case1 = isMass(desired_input);
		var case2 = isMol(desired_output);
		return (case1 && case2);
	}
	function isMassToMass(desired_input, desired_output) {
		var case1 = isMass(desired_input);
		var case2 = isMass(desired_output);
		return (case1 && case2);
	}
	function isMassToVolume(desired_input, desired_output) {
		var case1 = isMass(desired_input);
		var case2 = isVolume(desired_output);
		return (case1 && case2);
	}
	function isVolumeToMol(desired_input, desired_output) {
		var case1 = isVolume(desired_input);
		var case2 = isMol(desired_output);
		return (case1 && case2);
	}
	function isVolumeToMass(desired_input, desired_output) {
		var case1 = isVolume(desired_input);
		var case2 = isMass(desired_output);
		return (case1 && case2);
	}
	function isVolumeToVolume(desired_input, desired_output) {
		var case1 = isVolume(desired_input);
		var case2 = isVolume(desired_output);
		return (case1 && case2);
	}
	function isMoleToMol(desired_input, desired_output) {
		var case1 = isMol(desired_input);
		var case2 = isMol(desired_output);
		return (case1 && case2);
	}
	function isMoleToMass(desired_input, desired_output) {
		var case1 = isMol(desired_input);
		var case2 = isMass(desired_output);
		return (case1 && case2);
	}
	function isMoleToVolume(desired_input, desired_output) {
		var case1 = isMol(desired_input);
		var case2 = isVolume(desired_output);
		return (case1 && case2);
	}

	/*based on checker methods fire appropriate calculation function*/
	function fireFunction(desired_input, desired_output) {
		if(isMoleToMol(desired_input, desired_output)) {
			printFunction(molToMol(desired_input, desired_output, true), "M", getChemical(desired_output));
		} else if(isMoleToVolume(desired_input, desired_output)) {
			printFunction(molToVolume(desired_input, desired_output, true), "L", getChemical(desired_output));
		} else if(isMoleToMass(desired_input, desired_output)) {
			printFunction(molToMass(desired_input, desired_output, true), "g", getChemical(desired_output));
		} else if(isMassToMol(desired_input, desired_output)) {
			printFunction(massToMol(desired_input, desired_output, true), "M", getChemical(desired_output));
		} else if(isMassToVolume(desired_input, desired_output)) {
			printFunction(massToVolume(desired_input, desired_output, true), "L", getChemical(desired_output));
		} else if(isMassToMass(desired_input, desired_output)) {
			printFunction(massToMass(desired_input, desired_output, true), "g", getChemical(desired_output));
		} else if(isVolumeToMol(desired_input, desired_output)) {
			printFunction(volumeToMol(desired_input, desired_output, true), "M", getChemical(desired_output));
		} else if(isVolumeToVolume(desired_input, desired_output)) {
			printFunction(volumeToVolume(desired_input, desired_output, true), "L", getChemical(desired_output));
		} else if(isVolumeToMass(desired_input, desired_output)) {
			printFunction(volumeToMass(desired_input, desired_output, true), "g", getChemical(desired_output));
		} 
	}

	/*master calculation functions*/
	function molToMol(desired_input, desired_output, toSigFigs) {
		//the following 3 lines give us the input chemical, its quantity in moles, and the number of sig figs that quantity contains
		var chemical_input = getChemical(desired_input);
		var num_moles = getQuantity(desired_input);
		var num_sig_figs = significantFigures(num_moles);

		//the following gives us the output chemical for which we want to find the measurement
		var chemical_output = getChemical(desired_output);

		//this gives us the moles present next to the chemicals in the equation, and based on that, the molar ratio, input : output
		var input_moles_theoretical = getMole(chemical_input, $('#stoic_reaction_final').text());
		// alert(input_moles_theoretical);
		var output_moles_theoretical = getMole(chemical_output, $('#stoic_reaction_final').text());
		// alert(output_moles_theoretical);
		var mol_ratio = input_moles_theoretical/output_moles_theoretical;


		//now we perform calculations according to dimensional analysis
		var returner = num_moles / mol_ratio; //we get the number of input moles and divide by the mol ratio to get the output

		//now we perform final adjustments, based on the toSigFigs boolean...
		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs, chemical_output]; //else, just return an array with the raw number value and number of sig figs
		}
	}


	function molToVolume(desired_input, desired_output, toSigFigs) {
		//quickly perform mol to mol conversion....
		var mol_mol_conversion = molToMol(desired_input, desired_output, false);

		//assign the sig figs based on the 'false' firing return value of molToMol function
		var num_sig_figs = mol_mol_conversion[1];

		//perform one calculation, to get number of liters...
		var returner = mol_mol_conversion[0] * 22.4;

		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs];
		}
	}

	function molToMass(desired_input, desired_output, toSigFigs) {
		//quickly perform mol to mol conversion
		var mol_mol_conversion = molToMol(desired_input, desired_output, false);

		//assign the sig figs based on the 'false' firing return value of molToMol function
		var num_sig_figs = mol_mol_conversion[1];

		//perform one calculation, to get number of grams...
		var returner = mol_mol_conversion[0] * calculate(mol_mol_conversion[2]);

		if(toSigFigs == true) {
//			returner = returner.toPrecision(num_sig_figs);
//			returner = toString(returner);
//			return Number(returner);
			return Number(returner.toPrecision(num_sig_figs).toString()); 
		} else {
			return [returner, num_sig_figs];
		}
	}

	function massToMol(desired_input, desired_output, toSigFigs) {
		//get the chemical and the number of moles of that chemical...
		var chemical_input = getChemical(desired_input);
		var mass_molar_input = getQuantity(desired_input) / calculate(chemical_input);
		var num_sig_figs = significantFigures(getQuantity(desired_input)); //number of sig figs has been stored...
		var molar_input = mass_molar_input + "mol " + chemical_input;
		var returner = molToMol(molar_input, desired_output, false);
		if(toSigFigs == true) {
			return returner[0].toPrecision(num_sig_figs);
		} else {
			return [returner[0], num_sig_figs];
		}
	}

	function massToVolume(desired_input, desired_output, toSigFigs) {
		var mass_mol_conversion = massToMol(desired_input, desired_output, false);

		var returner = mass_mol_conversion[0] * 22.4;		
		var num_sig_figs = mass_mol_conversion[1];

		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs];
		}
	}

	function massToMass(desired_input, desired_output, toSigFigs) {
		var mass_mol_conversion = massToMol(desired_input, desired_output, false);
		var chemical_output = getChemical(desired_output);

		var returner = mass_mol_conversion[0] * calculate(chemical_output);
		var num_sig_figs = mass_mol_conversion[1];

		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs];
		}
	}

	function volumeToMol(desired_input, desired_output, toSigFigs) {
		var liters = getQuantity(desired_input);
		var chemical_input = getChemical(desired_input);
		var volume_mol_conversion = liters/22.4;

		//the following 3 lines give us the input chemical, its quantity in moles, and the number of sig figs that quantity contains
		var num_sig_figs = significantFigures(liters);

		//the following gives us the output chemical for which we want to find the measurement
		var chemical_output = getChemical(desired_output);

		//this gives us the moles present next to the chemicals in the equation, and based on that, the molar ratio, input : output
		var input_moles_theoretical = getMole(chemical_input, $('#stoic_reaction_final').text());
		var output_moles_theoretical = getMole(chemical_output, $('#stoic_reaction_final').text());
		var mol_ratio = input_moles_theoretical/output_moles_theoretical;

		//now we perform calculations according to dimensional analysis
		var returner = volume_mol_conversion / mol_ratio; //we get the number of input moles and divide by the mol ratio to get the output

		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs];
		}
	}

	function volumeToVolume(desired_input, desired_output, toSigFigs) {
		var volume_mol_conversion = volumeToMol(desired_input, desired_output, false);
		var num_sig_figs = volume_mol_conversion[1];
		var returner = volume_mol_conversion[0] * 22.4;

		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs];
		}
	}

	function volumeToMass(desired_input, desired_output, toSigFigs) {
		var volume_mol_conversion = volumeToMol(desired_input, desired_output, false);

		var chemical_output = getChemical(desired_output);

		var num_sig_figs = volume_mol_conversion[1];
		var returner = volume_mol_conversion[0] * calculate(chemical_output);

		if(toSigFigs == true) {
			return returner.toPrecision(num_sig_figs);
		} else {
			return [returner, num_sig_figs];
		}
	}
	/*helper methods for master calculation methods*/

	function getChemical(entry) {
		var split = entry.split(" ");
		return split[split.length - 1];
	}
	function getQuantity(entry, toNum) {
		var returner = "";
		var value = (entry.split(" "))[0];
		for(var i = 0; i<value.length; i++) {
			if(!isNaN(parseInt(value.charAt(i))) || value.charAt(i) == '.') {
				returner += value.charAt(i);
			}
		}
		if(toNum == true) {
			return parseFloat(returner);
		} else {
			return returner;
		}
	}
	function getMoleImproved(chemical, reaction) {
		var mole;
		var chemicals = reaction.split(" ");
		var coefficients = [];

		//copies over the chemicals to an array
		for (var i = 0; i < chemicals.length; i++) {
			if(chemicals[i].indexOf('→') != -1 || chemicals[i] == "+") {
				chemicals.splice(i,1);
			}
		}


		for (var i = 0; i < chemicals.length; i++) {
		}


	}
	function getMole(chemical, reaction) {
		var mole;
		if(reaction.indexOf(chemical) == 0) {
			mole = 0;
		} else {
			var coefficient = reaction.charAt(reaction.indexOf(chemical) - 1);
			if(coefficient == ' ' || coefficient == '+') {
				mole = 1;
			}  else {
				mole = parseInt(coefficient);
			}
		}

		return mole;
	}
	function printFunction(calculation, suffix, chemical) {
		$('#stoic_calculation_final').html(calculation + suffix + " " + chemify(chemical));
	}

		function chemify(str) {
			var newStr = "";
			var index = 0;
			if(isNaN(str.charAt(0)) == false) { //check for coefficient...
				str = "0" + str;
				var number = "";
				var temp_index = index;
				while(isNaN(str.charAt(temp_index)) == false && (temp_index < str.length)) {
					number += str.charAt(temp_index);
					temp_index++;
					if(temp_index < str.length - 1 && isNaN(str.charAt(temp_index + 1)) == false) {
						index++;
					}
				}
				newStr += number;
				index++;				
			}

			for(var i = index; i<str.length; i++) { //loop through and analyze every char of the String chemical
				var character = str.charAt(i);
				if(isNaN(character) == false) {
					var number = "";
					var temp_index = i;
					while(isNaN(str.charAt(temp_index)) == false && (temp_index < str.length)) {
						if(temp_index < str.length - 1 && isNaN(str.charAt(temp_index + 1)) == false) {
							i++;
						}
						number += str.charAt(temp_index);
						temp_index++;
					}
					newStr += "<sub>" + number + "</sub>";
				} else {
					newStr += character;
				}
			}


			return newStr;
		}	
});