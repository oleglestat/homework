/*
1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval
 */

// detonatorTimer(3);
// // 3
// // 2
// // 1
// // BOOM!
//
// function detonatorTimer(delay) {
// 	let countdown = setInterval( function () {
// 		if( delay === 0 ) {
// 			console.log( 'BOOM!' );
// 			clearInterval( countdown );
// 		} else {
// 			console.log( delay );
// 			delay--;
// 		}
// 	}, 1000 );
// }

/*
2. Напишіть функцію detonatorTimer(delay) використовуючи вкладений setTimeout
 */

// detonatorTimer(3);
// // 3
// // 2
// // 1
// // BOOM!
//
// function detonatorTimer( delay ) {
// 	setTimeout( function tik() {
// 		if( delay === 0 ) {
// 			console.log( 'BOOM!' );
// 		} else {
// 			console.log( delay );
// 			delay--;
// 			setTimeout( tik, 1000 );
// 		}
// 	})
// }

/*
3. Напишіть об'єкт в якому опишіть свої довільні властивості та довільні методи що ці властивості виводять.
 */

// let me = {
// 	name: 'Oleg',
// 	residency: 'Zhytomyr',
// 	gender: 'male',
// 	age: 36,
// 	hobby: 'cooking',
// 	defaultMood: 'procrastination',
// 	currentMood: 'sleepy',
// 	introduce() {
// 		console.log(`My name is ${this.name} and I live in ${this.residency}`);
// 	},
// 	passion() {
// 		console.log(`I love ${this.hobby} so much`);
// 	},
// 	whyAreYouLikeThis(){
// 		console.log(`When I'm not in ${this.defaultMood}, I'm ${this.currentMood}`);
// 	}
// }
//
// me.introduce();
// me.passion();
// me.whyAreYouLikeThis();

/*
4. А тепер зробіть всі свої методи з попередньої задачі прив'язаними до контексту свого об'єкту
 */

// let securedSelfIntroduce = me.introduce.bind(me);
// let securedSelfPassione = me.passion.bind(me);
// let securedSelfWhyAreYouLikeThis = me.whyAreYouLikeThis.bind(me);

// setTimeout(securedSelfIntroduce, 1000); // виведе коректний результат
// setTimeout(securedSelfPassione, 2000); // виведе коректний результат
// setTimeout(securedSelfWhyAreYouLikeThis, 3000); // виведе коректний результат

/*
5. Напишіть функцію-декоратор яка вповільнює виконання довільної функції на вказану кількість секунд.
 */

function someFunction( number ) {
	console.log( number + number );
}// тут напишіть довільну функцію яка робить якусь роботу зі своїми аргументами та виводить результат в консоль

function slower(func, seconds) {
	return ( number ) => {
		setTimeout( () => func.call(this, number), seconds * 1000 );
	}
}

let slowedSomeFunction = slower(someFunction, 5); // обгортаєте свою довільну функцію 'someFunction' в декоратор і задає значення вповільнення

slowedSomeFunction( 7 ) // викликаєте декоратор