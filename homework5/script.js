document.addEventListener("DOMContentLoaded", () => {
	const button = document.querySelector( 'button' );
	const body = document.querySelector( 'body' );
	const time = document.querySelector( 'span' );
	let date = localStorage.getItem('date' );
	let buttonStatus = localStorage.getItem( 'buttonStatus' );
	if( date ) {
		updatePage( buttonStatus, date );
	}

	button.addEventListener( 'click', () => {
		date = new Date().toJSON();
		buttonStatus = buttonStatus === 'Turn on' ? 'Turn off' : 'Turn on';
		updatePage( buttonStatus, date );
		localStorage.setItem( 'date', date );
		localStorage.setItem( 'buttonStatus', buttonStatus );

	} );

	function updatePage( buttonStatus, date ) {
		date = new Date( date );
		const msg = buttonStatus === 'Turn on' ? 'turn off' : 'turn on';
		button.textContent = buttonStatus;
		time.textContent = `Last ${ msg }: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		body.classList.toggle( 'dark', buttonStatus === 'Turn on' );
	}
});