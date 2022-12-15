class Population{


	constructor(){

		let firstGeneration = new Generation();
		firstGeneration.first();

		this.genCnt = 0;
		this.age =1;
		this.generations=[];
		this.generations.push(
			firstGeneration
		);

	}

	get age_(){
		return this.age;
	}

	next(){

		let dataforNext = this.generations[this.genCnt].forNext,
			nextGeneration = new Generation();

		nextGeneration.next(
				dataforNext.chr,
				dataforNext.a,
				dataforNext.fit_a,
				dataforNext.sol,
				dataforNext.fit_avg
		);


		this.generations.push(nextGeneration);

		this.genCnt++;
		this.age++;

	}

	html(){

		let html_="";

		this.generations.forEach((gen) => {
			html_+=gen.html();
		});

		return html_;

	}




}