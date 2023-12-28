export class Calculator {
	constructor() {
		this.form = document.forms[ 'calculator' ];
		this.firstDateInput = document.querySelector( '#date-one' );
		this.secondDateInput = document.querySelector( '#date-two' );
		this.dayButton = document.querySelector( '#day' );
		this.monthButton = document.querySelector( '#month' );
		this.display = document.querySelector( '.result' );
		this.history = document.querySelector( '.history' );

		this.attachEventListeners();
		this.prepareDisplay();
	}

	attachEventListeners() {
		this.form.addEventListener( 'submit', ( event ) => {
			event.preventDefault();
			// Clearing last results and history
			this.prepareDisplay();

			// Calculate number of days
			const numberOfDays = this.calculateDays( event.target.dateOne.value, event.target.dateTwo.value );
			// Convert according to options
			const convertedResult = this.convertDays( numberOfDays, event.target.time.value, event.target.days.value );
			// Update display and save state to local storage
			this.updateDisplay( convertedResult, event.target.time.value, event.target.days.value, event.target.dateOne.value, event.target.dateTwo.value );

			this.form.reset();
		});

		this.firstDateInput.addEventListener( 'input',( event ) => {
			if( event.target.value ) {
				this.secondDateInput.removeAttribute( 'disabled' );
				this.secondDateInput.setAttribute( 'min', this.firstDateInput.value );
				this.dayButton.removeAttribute( 'disabled' );
				this.monthButton.removeAttribute( 'disabled' );
			} else {
				this.secondDateInput.setAttribute('disabled', '' );
				this.secondDateInput.value = '';
				this.dayButton.setAttribute('disabled', '' );
				this.monthButton.setAttribute('disabled', '' );
			}
		});

		this.secondDateInput.addEventListener( 'input', ( event ) => {
			if( event.target.value ) {
				this.firstDateInput.setAttribute( 'max', this.secondDateInput.value );
			} else {
				this.firstDateInput.removeAttribute( 'max' );
			}
		});

		this.dayButton.addEventListener( 'click', function( event ) {
			event.preventDefault();
			this.secondDateInput.valueAsDate = new Date( this.firstDateInput.valueAsNumber + 7 * 24 * 60 * 60 * 1000 );
			this.secondDateInput.dispatchEvent( new Event( 'input' ) );
		}.bind( this )); // Little binding exercise

		this.monthButton.addEventListener( 'click', function( event ) {
			event.preventDefault();
			this.secondDateInput.valueAsDate = new Date( this.firstDateInput.valueAsNumber + 30 * 24 * 60 * 60 * 1000 );
			this.secondDateInput.dispatchEvent( new Event( 'input' ) );
		}.bind( this )); // Little binding exercise
	}

	prepareDisplay() {
		// Clearing last results and history
		if( this.display.firstChild ) {
			this.display.removeChild( this.display.firstChild );
		}
		while ( this.history.firstChild ) {
			this.history.removeChild( this.history.firstChild );
		}
		// Loading history from local storage and parse
		const log = JSON.parse( localStorage.getItem( 'history' ) );
		if( log ) {
			log.forEach( item => {
				const div = document.createElement( 'div' );
				item = document.createTextNode( item )
				div.appendChild( item )
				this.history.appendChild( div )
			})
		}
	}

	calculateDays( date1, date2 ) {
		const start = new Date( date1 );
		const end = new Date( date2 );
		let loop = new Date(start);
		// object to store days of week
		const result = {
			workday: 0,
			weekend: 0,
			get all() {
				return this.workday + this.weekend
			},
		};
		// detecting weekend or workday by iteration
		while (loop < end) {
			[1,2,3,4,5].includes( loop.getDay() ) ? result.workday += 1 : result.weekend += 1;
			let newDate = loop.setDate(loop.getDate() + 1);
			loop = new Date(newDate);
		}

		return result;
	}

	convertDays( daysObj, timeUnits, dayUnits ) {
		switch (timeUnits) {
			case('hours'):
				return daysObj[dayUnits]*24;
			case('minutes'):
				return daysObj[dayUnits]*24*60;
			case('seconds'):
				return daysObj[dayUnits]*24*60*60;
			default:
				return daysObj[dayUnits];
		}
	}

	updateDisplay( data, unit, days, date1, date2 ) {
		const message = `${ date1 } - ${ date2 }, ${ days } = ${ data } ${ unit }`;
		this.display.appendChild( document.createTextNode( `Result: ${message}` ) );
		let log = JSON.parse( localStorage.getItem( 'history' ) );
		if( log ) {
			log = [...log];

			if( log.length === 10 ) {
				log.shift();
				log.push( message );
			} else {
				log.push( message );
			}
			log = JSON.stringify( log );
			localStorage.setItem( 'history', log );
		} else {
			log = JSON.stringify( [ message ] );
			localStorage.setItem( 'history', log );
		}
	}
}

// (() => {
// 	prepareDisplay();
//
// 	form.addEventListener( 'submit', function ( event ) {
// 		event.preventDefault();
// 		// Clearing last results and history
// 		prepareDisplay();
//
// 		// Calculate number of days
// 		const numberOfDays = calculateDays( this.dateOne.value, this.dateTwo.value );
// 		// Convert according to options
// 		const convertedResult = convertDays( numberOfDays, this.time.value, this.days.value );
// 		// Update display and save state to local storage
// 		updateDisplay( convertedResult, this.time.value, this.days.value, this.dateOne.value, this.dateTwo.value );
//
// 		form.reset();
// 	});
//
// 	dateInput.oninput = function() {
// 		if( this.value ) {
// 			dateSecondInput.removeAttribute( 'disabled' );
// 			dateSecondInput.setAttribute( 'min', dateInput.value );
// 			dayButton.removeAttribute( 'disabled' );
// 			monthButton.removeAttribute( 'disabled' );
// 		} else {
// 			dateSecondInput.setAttribute('disabled', '' );
// 			dateSecondInput.value = '';
// 			dayButton.setAttribute('disabled', '' );
// 			monthButton.setAttribute('disabled', '' );
// 		}
// 	};
//
// 	dateSecondInput.oninput = function() {
// 		if( this.value ) {
// 			dateInput.setAttribute( 'max', dateSecondInput.value );
// 		} else {
// 			dateInput.removeAttribute( 'max' );
// 		}
// 	}
//
// 	dayButton.onclick = function( event ) {
// 		event.preventDefault();
// 		dateSecondInput.valueAsDate = new Date( dateInput.valueAsNumber + 7 * 24 * 60 * 60 * 1000 );
// 		dateSecondInput.dispatchEvent( new Event( 'input' ) );
// 	}
//
// 	monthButton.onclick = function( event ) {
// 		event.preventDefault();
// 		dateSecondInput.valueAsDate = new Date( dateInput.valueAsNumber + 30 * 24 * 60 * 60 * 1000 );
// 		dateSecondInput.dispatchEvent( new Event( 'input' ) );
// 	}
// } )();
//
// function prepareDisplay() {
// 	// Clearing last results and history
// 	if( display.firstChild ) {
// 		display.removeChild( display.firstChild );
// 	}
// 	while ( history.firstChild ) {
// 		history.removeChild( history.firstChild );
// 	}
// 	// Loading history from local storage and parse
// 	const log = JSON.parse( localStorage.getItem( 'history' ) );
// 	if( log ) {
// 		log.forEach( item => {
// 			const div = document.createElement( 'div' );
// 			item = document.createTextNode( item )
// 			div.appendChild( item )
// 			history.appendChild( div )
// 		})
// 	}
// }
//
// function calculateDays( date1, date2 ) {
// 	let start = new Date( date1 );
// 	let end = new Date( date2 );
// 	let loop = new Date(start);
// 	// object to store days of week
// 	const result = {
// 		workday: 0,
// 		weekend: 0,
// 		get all() {
// 			return this.workday + this.weekend
// 		},
// 	};
// 	// detecting weekend or workday by iteration
// 	while (loop < end) {
// 		[1,2,3,4,5].includes( loop.getDay() ) ? result.workday += 1 : result.weekend += 1;
// 		let newDate = loop.setDate(loop.getDate() + 1);
// 		loop = new Date(newDate);
// 	}
//
// 	return result;
// }
//
// function convertDays( daysObj, timeUnits, dayUnits ) {
// 	switch (timeUnits) {
// 		case('hours'):
// 			return daysObj[dayUnits]*24;
// 		case('minutes'):
// 			return daysObj[dayUnits]*24*60;
// 		case('seconds'):
// 			return daysObj[dayUnits]*24*60*60;
// 		default:
// 			return daysObj[dayUnits];
// 	}
// }
//
// function updateDisplay( data, unit, days, date1, date2 ) {
// 	let message = `${ date1 } - ${ date2 }, ${ days } = ${ data } ${ unit }`;
// 	display.appendChild( document.createTextNode( `Result: ${message}` ) );
// 	let log = JSON.parse( localStorage.getItem( 'history' ) );
// 	if( log ) {
// 		log = [...log];
//
// 		if( log.length === 10 ) {
// 			log.shift();
// 			log.push( message );
// 		} else {
// 			log.push( message );
// 		}
// 		log = JSON.stringify( log );
// 		localStorage.setItem( 'history', log );
// 	} else {
// 		log = JSON.stringify( [ message ] );
// 		localStorage.setItem( 'history', log );
// 	}
// }