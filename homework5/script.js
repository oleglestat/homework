document.addEventListener("DOMContentLoaded", () => {
	const button = document.querySelector( 'button' );
	const body = document.querySelector( 'body' );
	const time = document.querySelector( 'span' );
	let date = localStorage.getItem('date' );
	let buttonStatus = localStorage.getItem( 'buttonStatus' );
	if( date ) {
		updatePage( buttonStatus, date );
	}

	button.addEventListener( 'click', turnButton );

	function turnButton() {
		if( !date && !buttonStatus ) {
			updatePage( 'Turn on' );
		} else if( localStorage.getItem( 'buttonStatus' ) === 'Turn off' ) {
			updatePage( 'Turn on' );
		} else if( localStorage.getItem( 'buttonStatus' ) === 'Turn on' ) {
			updatePage( 'Turn off' );

		}
	}

	function updatePage( buttonStatus, date ) {
		let msg;
		if( buttonStatus === 'Turn on' ) {
			body.classList.add( 'dark' );
			msg = 'turn off';
		} else {
			body.classList.remove( 'dark' );
			msg = 'turn on';
		}
		if( !date ) {
			localStorage.setItem( 'date', new Date().toJSON() );
		}
		localStorage.setItem( 'buttonStatus', buttonStatus );
		date = new Date( localStorage.getItem( 'date' ) );
		time.textContent = `Last ${ msg }: ${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		button.textContent = buttonStatus
	}
});