/*
* 1. Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку:
* */
const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];
let initials;

initials = userNames.map( ( person ) => {
	person = person.match( /[А-ЯЄІЇҐ]/g);
	return person.join( '.' ) + '.';
	// person = person.reduce( (accumulator, currentValue) => accumulator + '.' + currentValue);
	// return person + '.';
} );

initials.sort();
console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]

/*
* 2. Задача на фільтрування масиву
* */

const userNames2 = ['Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];
let vowels = 'АЕЄИІЇОУЮЯ';
let filteredNames = [];

// 2.1 через умовну конструкцію

// for( let name= 0; name < userNames2.length; name++ ) {
// 	for( let vowel = 0; vowel < vowels.length; vowel++ ) {
// 		if( userNames[name][0] === vowels[vowel] ) {
// 			filteredNames.push( userNames[name] );
// 			break;
// 		}
// 	}
// }

// 2.2 через вбудований метод масивів

filteredNames = userNames2.filter( name => vowels.indexOf(name[0]) >= 0 );

console.log(filteredNames); // ['Емма', 'Юстин', 'Ілля', 'Яна', 'Антон', 'Олена']

/*
* 3. Задача на розворот числа:
* */

const currentMaxValue = 4589;
let reverseMaxValue = '';
const stringNumber = currentMaxValue.toString();

for( let i = stringNumber.length - 1; i >= 0; i--) {
	reverseMaxValue+= stringNumber[i];
}
reverseMaxValue = Number(reverseMaxValue);

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

/*
* Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:
* */

const resultsArray = [1, 2, [3, [4]]];
let productOfArray;
// productOfArray = resultsArray.flat(Infinity).reduce( ( i, j ) => i+=j );

function counting( array ) {
	let sum = 1;
	for( const i of array ) {
		if( typeof i === 'number' ) sum *= i;
		if( typeof i === 'object') sum *= counting( i );
	}
	return sum;
}

productOfArray = counting(resultsArray);

console.log(productOfArray); // 24