"use strict";
import { token } from "./constants.js";
let form = document.forms[ 'calculator' ];
let dateInput= document.querySelector( '#date-one' );
let dateSecondInput= document.querySelector( '#date-two' );
let dayButton= document.querySelector( '#day' );
let monthButton= document.querySelector( '#month' );



(() => {
	form.addEventListener( 'submit', function ( event ) {
		event.preventDefault();

		console.log(
			this.dateOne.value,
			this.dateTwo.value,
			this.days.value,
			this.time.value
		);
		if( this.days.value === 'all' && this.time.value === 'days') {
			console.log( (this.dateTwo.valueAsNumber - this.dateOne.valueAsNumber)/ (24 * 60 * 60 * 1000) );
		}
		const start = new Date( this.dateOne.value );
		const end = new Date( this.dateTwo.value );
		let loop = new Date(start);
		while (loop <= end) {
			let newDate = loop.setDate(loop.getDate() + 1);
			loop = new Date(newDate);
		}

		form.reset();
	});

	dateInput.oninput = function() {
		if( this.value ) {
			dateSecondInput.removeAttribute( 'disabled' );
			dayButton.removeAttribute( 'disabled' );
			monthButton.removeAttribute( 'disabled' );
		} else {
			dateSecondInput.setAttribute('disabled', '' );
			dayButton.setAttribute('disabled', '' );
			monthButton.setAttribute('disabled', '' );
		}
	};

	dayButton.onclick = function( event ) {
		event.preventDefault();
		dateSecondInput.valueAsDate = new Date( dateInput.valueAsNumber + 7 * 24 * 60 * 60 * 1000 );
	}

	monthButton.onclick = function( event ) {
		event.preventDefault();
		dateSecondInput.valueAsDate = new Date( dateInput.valueAsNumber + 30 * 24 * 60 * 60 * 1000 );
	}
} )();




