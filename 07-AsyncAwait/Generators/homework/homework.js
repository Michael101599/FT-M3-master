function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 1;
  while(max ? num <= max : true){
    let result;
    if(num % 3 === 0){
      result = "Fizz";
    }else if(num % 5 === 0){
      result = 'Buzz'
    }else if(num % 3 === 0 && num % 5 === 0){
      result = 'Fizz Buzz'
    }else{
      result = num;
    }
    yield result;
    num++
  }
}

var generatorObject = fizzBuzzGenerator();

generatorObject.next();

module.exports = fizzBuzzGenerator;
