

function launch(){

	// Set configuration settings
	conf.init(
		document.getElementById("max_generation").value,
        document.getElementById("pass_nums").value,
        document.getElementById("pass_lettersBig").value,
        document.getElementById("pass_symbols").value,
        document.getElementById("pass_fit").value,
        document.getElementById("pass_mutate").value
    );

	var pop= new Population();

	// Update HTML
	document.getElementById('launch').disabled=true;
	document.getElementById("pops")
	.insertAdjacentHTML(
		'beforeend',
		pop.html()
	);

	while(has_solution==false&&limit==false){

		if(conf.max.generations()<=pop.age_){
			alert('No solution found.');
			limit=true;
			return;
		}

		pop.next();

		document.getElementById("pops")
		.insertAdjacentHTML(
			'beforeend',
			pop.html()
		);

	}

	if(has_solution){

		document.getElementById('scroll').disabled=false;

	}else{
		
		alert('No solution found.');
		document.getElementById('scroll').disabled=true;
	}

}


function relaunch(){

	has_solution=false;
	limit=false;
	scroll.disabled=true;
	document.getElementById('scroll').disabled=true;
	document.getElementById("pops").innerHTML = "";
	launch();

}
