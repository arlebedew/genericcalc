
function launch(){

	let reply = false;

	// Set configuration settings
	conf.init(
		document.getElementById("max_generation").value,
        document.getElementById("pass_nums").value,
        document.getElementById("pass_lettersBig").value,
        document.getElementById("pass_symbols").value,
        document.getElementById("pass_fit").value,
        document.getElementById("pass_mutate").value,
        document.getElementById("fitnessMode").value
    );

	// Update HTML
	document.getElementById('launch').disabled=true;
	document.getElementById('relaunch').disabled=false;

	var pop= new Population();

	if(!has_solution){
		for(var i = 0; i<conf.max.generations()-1; i++){

			if(has_solution){
				document.getElementById('scroll').disabled=false;
				break;
			}else{
				pop.next();
			}

		}
	}

	if(!has_solution){

		reply = confirm('No solution found. Max generation amount reached.\n'+
			pop.age_+"    "+
			"generations created.\n Do you want to retry?" );
		
		document.getElementById('scroll').disabled=true;
		
	}

	conf.fitness.division();
	document.getElementById("pops").innerHTML = pop.html();

	if(reply) relaunch();

}


function relaunch(){

	has_solution=false;
	limit=false;
	scroll.disabled=true;
	solution_rendered=false;
    fitness_min = 0;
    fitness_max = 0;
    fitness_division = {};
    divsdsd = 0;
	document.getElementById('scroll').disabled=true;
	document.getElementById("pops").innerHTML = "";
	launch();

}

function typeAdjustments(select){

	if(select.value == 1){
		document.getElementById("pass_fit").value =200;
	}

	if(select.value == 2){
		document.getElementById("pass_fit").value =50;
	}
}
