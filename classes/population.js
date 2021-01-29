class Population{


	constructor(){

		this.chromosomes=[];
		this.age=1;
		this.fitness_avg=0;
		this.solution={
			generation:0,
			string:"",
			fitness:0
		};

		for(let i=0; i<conf.max.chromosomes(); i++){
		// Make chromosomes

			this.chromosomes.push(new Chromosome());
			this.fitness_avg+=this.chromosomes[i].fitness;
		}

		this.fitness_avg/= conf.max.chromosomes();
	}

	get age_(){
		return this.age;
	}

	best(chromo){

		this.solution.generation=this.age;
		this.solution.string= chromo.gene_string;
		this.solution.fitness= chromo.fitness;
		has_solution=true;
	}

	next(){
	// Makes next generation
	// manages random mutation
	// manages crossover point

		this.age++;
		this.selection();
		this.crossover();
		this.selected=[];
		this.mutate();
		this.fitness_avg=0;

		for(let i=0; i<conf.max.chromosomes(); i++){
			
			this.chromosomes[i].fitness_();
			this.fitness_avg+=this.chromosomes[i].fitness;
			this.chromosomes[i].check();

			if(this.chromosomes[i].is_solution){

				this.best(this.chromosomes[i]);
			}
		}

		this.fitness_avg/= conf.max.chromosomes();

	}

	selection(){

		let sel = [...this.chromosomes],
			uniqueSel= new Set(sel);

		sel= [...uniqueSel];

		sel.sort(function(a, b) {
			return b.fitness - a.fitness;
		});
		
		for(let i=1; i<=3; i++) sel.pop();

		this.selected= [...sel];

	}

	crossover(){

		function cross(chr1, chr2){

			let newgenes= [],
				crosspoint= conf.random.cross(),
				newchomosize= (chr1.size_+chr2.size_)/2,
				devide_on=4,
				numForUniform= Math.floor(newchomosize/devide_on),
				lastgene1=0,
				lastgene2=0,
				to_add=0;


			// Insert 4 genes of each chromosome
			// per each iteration
			for (let j=1; j<=devide_on; j++){

				if(j%2>=1){

					let last= lastgene1;

					for(var i=last; i<(last+numForUniform); i++){
						if(newgenes.length==newchomosize) return;

						if(chr1.gene[i]==undefined){

							if(chr2.gene[i]!=undefined){
								lastgene2++;
								newgenes.push(chr2.gene[i]);
							}
							
						}else{
							lastgene1++;
							newgenes.push(chr1.gene[i]);
						}

					}
					
				}

				if(j%2==0){

					let last= lastgene2;

					for(let i=last; i<(last+numForUniform); i++){
						if(newgenes.length==newchomosize) return;
						if(chr2.gene[i]==undefined){

							if(chr1.gene[i]!=undefined){
								lastgene1++;
								newgenes.push(chr1.gene[i]);
							}
							
						}else{
							lastgene2++;
							newgenes.push(chr2.gene[i]);
						}

					}
					
				}
			}

			to_add=newchomosize-newgenes.length;

			if(chr1.size_>=chr2.size_){

				for(let i=1; i<=to_add; i++){
					newgenes.push(chr1.genes[chr1.size_-i]);
				}

			}else{

				for(let i=1; i<=to_add; i++){
					newgenes.push(chr2.genes[chr2.size_-i]);
				}

			}


			return new Chromosome(newgenes);
		}
		
		this.chromosomes=[];

		this.chromosomes.push(
			cross(this.selected[0], this.selected[1])
		);

		this.chromosomes.push(
			cross(this.selected[1], this.selected[0])
		);

		this.chromosomes.push(
			cross(this.selected[1], this.selected[2])
		);

		this.chromosomes.push(
			cross(this.selected[2], this.selected[1])
		);

		this.chromosomes.push(
			cross(this.selected[0], this.selected[2])
		);

		this.chromosomes.push(
			cross(this.selected[2], this.selected[0])
		);

	}

	mutate(){

		if(conf.random.mutate()){

			let selected_chr=this.chromosomes[

				Math.floor(
					Math.random() * (conf.max.chromosomes()-1)
					)
				];

			selected_chr.mutate();
		}
	}

	html(){

		let htmlOut= '<div class="generation">';
		htmlOut+= '<h3>Generation Nr. '+this.age+'</h3>';

		for(let i=0; i< this.chromosomes.length; i++){

			htmlOut+= this.chromosomes[i].html();

		}

		htmlOut+='</div>';

		return htmlOut;
	}


}