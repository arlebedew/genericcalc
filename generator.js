
function launch(){

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

	console.log(pop.age_);

	for(var i = 0; i<conf.max.generations()-1; i++){

		if(has_solution){
			document.getElementById('scroll').disabled=false;
			break;
		}else{
			pop.next();
		}

	}

	if(!has_solution){
		
		alert('No solution found. Max generation amount reached.\n'+
			pop.age_+"    "+
			"generations created.");
		document.getElementById('scroll').disabled=true;
		
	}

	document.getElementById("pops").innerHTML = pop.html();

}


function relaunch(){

	has_solution=false;
	limit=false;
	scroll.disabled=true;
	solution_rendered=false;
	document.getElementById('scroll').disabled=true;
	document.getElementById("pops").innerHTML = "";
	launch();

}
