export class Calendar {
	constructor() {
		this.token = 't329PUlvMnIEt9m6Ml5DrltuMq8ROeu2';
		this.countrySelect = document.querySelector( '#country');
		this.yearSelect = document.querySelector( '#year');
		this.submitButton = document.querySelector( '.submit');
		this.tableWrapper = document.querySelector( '.table-wrapper' );
		this.holiday = [];

		// class instance initialisation
		this.fetchCountriesData();
		this.attachEventListeners();
	}

	/**
	 * This function adds event listeners to UI elements
	 *
	 * @function
	 * @name attachEventListeners
	 */
	attachEventListeners() {
		this.countrySelect.addEventListener( 'input', ( event ) => {
			if( event.target.value ) {
				this.yearSelect.removeAttribute( 'disabled' );
			} else {
				this.yearSelect.setAttribute( 'disabled', '' );
			}
		});

		this.submitButton.addEventListener( 'click', () => {
			this.getHolidays( this.countrySelect.value, this.yearSelect.value );
		} )
	}

	/**
	 * This function checks if local storage has country
	 * requests cache. If there is no cache it makes a call.
	 *
	 * @function
	 * @async
	 * @name fetchCountriesData
	 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
	 */
	async fetchCountriesData() {
		// checking if cache has data stored. Cqche is valid for a day.
		const today = new Date().toDateString();
		const cache = JSON.parse( localStorage.getItem( `${today} countries` ) );
		if( cache ) {
			// use cache if available
			this.fillCountriesData( cache );
		} else {
			// request data if not cached
			const url = `https://calendarific.com/api/v2/countries?api_key=${this.token}`;
			try {
				const response = await fetch(url);
				const countryData = await response.json();
				const dataJson = JSON.stringify( countryData );
				localStorage.setItem( `${today} countries`, dataJson );
				this.fillCountriesData( countryData );
			} catch ( error ) {
				console.error( error );
				alert("An error occurred while fetching country data. Contact site administrator.");
			}
		}
	}

	/**
	 * This function fills selectors with options with country list and years.
	 *
	 * @function
	 * @name fillCountriesData
	 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
	 * @param {object} data - countries object with response from https://calendarific.com
	 */
	fillCountriesData( data ) {
		data.response.countries.forEach(item => {
			let option = document.createElement('option');
			option.value = item['iso-3166'];
			option.innerText = item['country_name'];
			this.countrySelect.appendChild(option);
		});
		for (let i = 2001; i <= 2049; i++) {
			let option = document.createElement('option');
			option.value = `${i}`;
			option.innerText = `${i}`;
			this.yearSelect.appendChild(option);
		}
		this.yearSelect.querySelector(`option[value='${new Date().getFullYear()}']`).setAttribute('selected', '');
	}

	/**
	 * This function checks if local storage has holiday
	 * requests cache. If there is no cache it makes a call.
	 *
	 * @function
	 * @async
	 * @name getHolidays
	 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
	 * @param {string} country - value from country selector
	 * @param {string} year - value from year selector
	 */
	async getHolidays( country, year ) {
		// checking if cache has data stored. Cqche is valid for a day.
		const today = new Date().toDateString();
		const cache = JSON.parse( localStorage.getItem( `${today} ${country} ${year}` ) );
		if( cache ) {
			// use cache if available
			this.holiday = cache;
			this.buildTable( cache );
		} else {
			// request data if not cached
			const url = `https://calendarific.com/api/v2/holidays?&api_key=${this.token}&country=${country}&year=${year}`;
			try {
				const response = await fetch( url );
				const holidayData = this.holiday = await response.json();
				const dataJson = JSON.stringify( holidayData );
				localStorage.setItem( `${today} ${country} ${year}`, dataJson );
				this.buildTable( holidayData );
			} catch ( error ) {
				console.error( error )
				alert("An error occurred while fetching holiday data. Contact site administrator.");
			}
		}
	}

	/**
	 * This function creates table and call other function to
	 * fill it with data.
	 *
	 * @function
	 * @name buildTable
	 * @param {object} data - object with list of holidays
	 */
	buildTable( data ) {
		this.tableWrapper.innerHTML = `
			<button class="sort">Reverse sorting</button>
			<table>
				<thead>
					<tr>
					  <th>Date</th>
					  <th>Holiday</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>`
		this.populateTable( data );

		this.tableWrapper.querySelector( '.sort' ).addEventListener( 'click', ( event ) => {
			this.populateTable( this.holiday, 'sort' );
		});
	}

	/**
	 * Function that fills table with data, used for sorting as well.
	 *
	 * @function
	 * @name populateTable
	 * @param {object} holidayData - object with list of holidays
	 * @param {string} sorting - flag that is used to reverse sorting
	 */
	populateTable( holidayData, sorting= '' ) {
		console.log( holidayData )
		const tableBody = this.tableWrapper.querySelector( 'tbody' );
		while ( tableBody.firstChild ) {
			tableBody.removeChild( tableBody.firstChild );
		}
		if( sorting === 'sort' ) {
			holidayData.response.holidays.reverse();
		}
		holidayData.response.holidays.forEach( item => {
			const tr= document.createElement( 'tr' );
			tr.innerHTML = `
					<tr>
					  <td>${item.date.iso}</td>
					  <td>${item.name}</td>
					</tr>
			`
			tableBody.appendChild( tr );
		})
	}
}
