/*
1. Задача про обчислення різниці часу
 */

function durationBetweenDates( date1 = new Date(1970-01-01).toString(),
							   date2 = new Date().toString(),
							   units= 'seconds' ) {
	let smallerDate = Math.min( Date.parse( date1 ), Date.parse( date2 ));
	let biggerDate = Math.max( Date.parse( date1 ), Date.parse( date2 ));
	//let [ smallerDate, biggerDate ] = [ Date.parse( date1 ), Date.parse( date2 ) ].sort( ( a, b ) => a - b );

	if( !smallerDate || !biggerDate ) {
		console.log( 'Wrong date format' );
		return;
	}
	const result = (biggerDate - smallerDate)/1000;
	switch ( units ) {
		// 'days', 'hours', 'minutes', seconds)
		case 'days':
			return `${ Math.floor(result/60/60/24 ) } days`;
		case 'hours':
			return `${result/60/60} hours`;
		case 'minutes':
			return `${result/60} minutes`;
		case "seconds":
			return `${result} seconds`;
		default:
			return  'Wrong interval parameter';
	}
}

durationBetweenDates()  //
durationBetweenDates('02 Aug 1985', '03 Aug 1985', 'seconds')  // поверне '86400 seconds'
durationBetweenDates('7 Jan 1980', '03 Feb 2033', 'minutes')  // поверне '27915900 minutes'
durationBetweenDates('31 Jan 1970', '03 Feb 2033', 'hours')  // поверне '552337 hours'
durationBetweenDates('31 Jan 2022', '03 Feb 2021', 'days')  // поверне '362 days'
durationBetweenDates('33 Feb 2022', '03 Feb 2021', 'days')  // поверне 'Wrong date format'
durationBetweenDates('27 Feb 2055', '03 Feb 2021', 'dayz')  // поверне 'Wrong interval parameter'

/*
  2. Задача про перетворення об'єкту
 */

// приклад об'єкту
	const priceData = {
		Apples: '23.4',
		BANANAS: '48',
		oRAngGEs: '48.7584',
		'Pine Apple': '233.73'
	};

function optimizer(data) {
	let result = {};
	for( let key in data ) {
		const name= key.toLowerCase();
		result[ name ] = Number( data[ key ] ).toFixed(2);
	}
	return result
}

let updatedPriceData = optimizer(priceData);

console.log(priceData); // { Apples: '23.4', BANANAS: '48', oRAngGEs: '48.7584', 'Pine Apple': '233.73'}
console.log(updatedPriceData) // {apples: '23.40', bananas: '48.00', oranges: '48.76', 'pine apple': '233.73'}

/*
  3. Задача про рекурсію
 */

function recursiveOddSumTo(number) {
	if( number <= 1 ) {
		return number;
	} else if( number % 2 ) {
		return number + recursiveOddSumTo( number - 1 );
	} else {
		return recursiveOddSumTo( number - 1 );
	}
}

console.log(recursiveOddSumTo(1)) // 1
console.log(recursiveOddSumTo(10)) // 25

/*
  4. Задача про ітерацію
 */

function iterativeOddSumTo(number) {
	let result = 0;
	if( !(number % 2) ) {
		number--;
	}
	while ( number >= 1 ) {
		result += number;
		number -= 2;
	}
	return result;
}

console.log(iterativeOddSumTo(1)) // 1
console.log(iterativeOddSumTo(11)) // 36