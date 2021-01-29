class Gene{

	constructor(old, save){

		if(save!=undefined&&save==true){
			
			this.val= old;
			return;
		}

		if(old!=undefined) {

			this.val= conf.random.char(old);

		}else{

			this.val= conf.random.char();

		}
		
	}

	get value(){
		return this.val;
	}

	mutate(){
	
		this.val= conf.random.char(this.val);
		
	}

}
