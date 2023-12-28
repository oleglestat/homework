'use strict';

import {Calculator} from "./calculator.js";
import {Calendar} from "./calendar.js";

(() => {
	attachEventListeners();

	new Calculator();
	new Calendar();
})();

function attachEventListeners() {
	const timeButton = document.querySelector( '.time-button' );
	const holidayButton = document.querySelector( '.holiday-button' );
	const calculatorSection = document.querySelector( '.time-section' );
	const holidaySection = document.querySelector( '.holiday-section' );

	timeButton.addEventListener( 'click', () => {
		calculatorSection.removeAttribute( 'hidden' );
		holidaySection.setAttribute( 'hidden', '' );
		timeButton.setAttribute( 'disabled', '' );
		holidayButton.removeAttribute( 'disabled' );
	} );

	holidayButton.addEventListener( 'click', () => {
		calculatorSection.setAttribute( 'hidden', '' );
		holidaySection.removeAttribute( 'hidden' );
		timeButton.removeAttribute( 'disabled' );
		holidayButton.setAttribute( 'disabled', '' );
	} );
}
