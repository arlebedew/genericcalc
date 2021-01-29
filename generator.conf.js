var has_solution=false,
    limit=false,
conf = (function() {

    "use strict";

    // Default values
    var max_chromosomes = 6,
        max_generations = 3000,
        min_genes       = 5,
        max_genes       = 20,
        mutation_probability= 0.4,
        symbols         =   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                            "0123456789"+
                            "~`!@#$%^&*()_-+={[}]|\:;<,>.?/",
        nums=0,
        big_let=0,
        syms=0,
        fit=0;

    return {
        init:            initialize,
        max: {
            chromosomes: getChromosomes,
            generations: getGenerations,
            genes:       getGenes,
            count:       getGenerationCount,
            nums:        getNumbers,
            bletters:    getBigLetters,
            symbol:      getSymbols,
            fitness:     getFitness
        },
        random: {
            char:       getRandomChar,
            size:       getRandomSize,
            mutate:     getMutate,
            cross:      getCrossPoint
        },
        analize:        analizeChromosomeValue

    };

    function initialize(
        generatio,
        numbers,
        bigletters,
        symbols,
        fitness,
        mutatio

    ) {
        max_generations     = generatio;
        mutation_probability= mutatio;
        nums                =numbers;
        big_let             =bigletters;
        syms                =symbols;
        fit                 =fitness;
    }
  

    function getChromosomes(){
        return max_chromosomes;
    }

    function getGenerations(){
        return max_generations;
    }

    function getGenerationCount(){
        return generations_cnt;
    }

    function getGenes(){
        return max_genes;
    }

    function getNumbers(){
        return nums;
    }

    function getBigLetters(){
        return big_let;
    }

    function getSymbols(){
        return syms;
    }

    function getFitness(){
        return fit;
    }

    function getRandomChar(letter){

        let syms="";

        if(letter!= undefined){

            syms=symbols.replace(letter, "");

        }else{

            syms=symbols;
        }

        return syms[
            Math.floor(Math.random() * syms.length)
        ];
    }

    function getRandomSize(){

        return Math.floor(Math.random()*(max_genes - min_genes)) + min_genes;
    }

    function getMutate(){
        return Math.random() < mutation_probability;
    }

    function getCrossPoint(){

        return Math.floor(Math.random() * (min_genes-2)) +2;

    }

    function analizeChromosomeValue(
        value
    ){
    // Analize chromosome string 
    // and return results
        let strArray = Array.from(value),
            findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index),
            duplicate_amt= findDuplicates(strArray).length;

        return {
            numbers:        (value.replace(/[^0-9]/g,"")!=null)     ? value.replace(/[^0-9]/g,"").length    : 0,
            letters:        (value.replace(/[^a-z]/g, "")!=null)    ? value.replace(/[^a-z]/g, "").length   : 0,
            lettersBig:     (value.replace(/[^A-Z]/g, "")!=null)    ? value.replace(/[^A-Z]/g, "").length   : 0,
            symbols:        (value.match(/[@#$%^&*~()_+\-=\[\]{};':"\\|,.<>\/?]/g)!=null)
                            ? value.match(/[@#$%^&*~()_+\-=\[\]{};':"\\|,.<>\/?]/g).length : 0,
            dublicates:     (/([0-9a-zA-Z@#$%^&*~()_+\-=\[\]{};':"\\|,.<>\/?]).*?\1/).test(value),
            dublicates_amount: duplicate_amt,
            size:           value.length 

        };
    }

})();