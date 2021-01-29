class Chromosome{


	constructor(geno){

		this.genes=[];
		this.genesStr="";
		this.size=0;
		this.solution_found=false;

		if(geno!=undefined){
			this.genes=[...geno];

			for(let i=0; i<conf.max.genes(); i++){

				if(this.genes[i]!=undefined){

					this.genesStr+=this.genes[i].value;
					this.size++;

				}

			}

		}else{

			this.size= conf.random.size();
			for(let i=0; i<conf.max.genes(); i++){
			// Set initial values of genes

				this.genes.push(undefined);
			}

			for(let i=0; i<this.size; i++){
			// Update gene values
			// generate chromosome's string
			// representation.

				this.genes[i]= new Gene();
				this.genesStr+=this.genes[i].value;
			}

		}

		// Initial fitness value for
		// newly generated chromosome
		this.fitness_();

	}

	get fitness(){
		return this.fitnessVal;
	}

	get gene(){
		return this.genes;
	}

	get gene_string(){
		return this.genesStr;
	}

	get size_(){
		return this.size;
	}

	get is_solution(){
		return this.solution_found;
	}

	check(){

		let results= conf.analize(this.genesStr);

		if(
			results.size>=8&&
			results.numbers>=conf.max.nums()&&
			results.lettersBig>=conf.max.bletters()&&
			results.symbols>=conf.max.symbol()&&
			this.fitness>=conf.max.fitness()
		){

			this.solution_found=true;
		}
	}

	fitness_(){

		let results= conf.analize(this.genesStr);

		// Scoring
		this.fitnessVal=0;

		if(results.size<8) return;
		this.fitnessVal+= results.size*5;

		this.fitnessVal+= results.letters*5;
		this.fitnessVal+= results.numbers*5;
		this.fitnessVal+= results.lettersBig*10;
		this.fitnessVal+= results.symbols*10;

		if(results.dublicates) this.fitnessVal-=results.dublicates_amount*15;
	}

	mutate(){

		let to_mutate=[],
			gens=[...this.genes],
			newgens=[];

		function selectGene(gen, size){

			let mutant= Math.floor(Math.random() * (size-1));

			if(gen[mutant]==undefined){

				selectGene(gen, size);

			}else{

				if(to_mutate.indexOf(mutant)<0){

					to_mutate.push(mutant);

				}else{
					selectGene(gen, size);
				}
			}
		}

		// Mutate a part of genes
		for(let i=0; i<=this.size*0.7; i++ ){

			selectGene(gens, this.size);
		}

		for(let i=0; i<gens.length;i++){

			if(to_mutate.indexOf(i)>=0){
				newgens.push(new Gene(gens[i].value,false));

			}else{
				newgens.push(new Gene(gens[i].value,true));
			}

		}
		
		
		this.genes=[];
		this.genes=[...newgens];
		this.genesStr="";

		for(let i=0; i<this.size; i++){
		// Update string

			this.genesStr+=this.genes[i].value;
		}
	}

	html(){

		let htmlOut= '<h4>Fitness: '+
					this.fitnessVal+
					'</h4>',
			solutionId='';
		
		htmlOut+='<input class="chromosomeVal" value="'+ this.genesStr +'" disabled>';


		if(this.is_solution&&!solution_rendered){

			solution_rendered=true;
			solutionId= "id='solution'";
		}

		return '<div '+solutionId+' class="chromosome">'+htmlOut+'</div>';
	}

}