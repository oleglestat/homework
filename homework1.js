/*
* 1. Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку:
* */
const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];
let initials;

initials = userNames.map( ( person ) => {
	person = person.split( ' ' );
	person = person.map( name => name[0] );
	return person.join( '.' ) + '.';
} );

initials.sort();
console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]

/*
* 2. Задача на фільтрування масиву
* */

const userNames2 = [ 'Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена' ];
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

filteredNames = userNames2.filter( name => vowels.includes( name[0] ) );

console.log(filteredNames); // ['Емма', 'Юстин', 'Ілля', 'Яна', 'Антон', 'Олена']

/*
* 3. Задача на розворот числа:
* */

const currentMaxValue = 4589;
let reverseMaxValue = currentMaxValue.toString().split( '' ).reverse().join( '' );
reverseMaxValue = Number(reverseMaxValue);

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'

/*
* Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:
* */

const resultsArray = [1, 2, [3, [4]]];
let productOfArray;
// productOfArray = resultsArray.flat(Infinity).reduce( ( accumulator, currentValue ) => accumulator*=currentValue );

function counting( array ) {
	if( !array.length ) {
		return 0
	}
	let sum = 1;
	for( const value of array ) {
		if( typeof value === 'number' ) {
			sum *= value;
		}
		if( Array.isArray( value ) ) {
			sum *= counting( value );
		}
	}
	return sum;
}

productOfArray = counting(resultsArray);

console.log(productOfArray); // 24