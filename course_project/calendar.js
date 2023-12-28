export class Calendar {
	constructor() {
		this.token = 't329PUlvMnIEt9m6Ml5DrltuMq8ROeu2';
		this.countrySelect = document.querySelector( '#country');
		this.yearSelect = document.querySelector( '#year');
		this.submitButton = document.querySelector( '.submit');
		this.tableWrapper = document.querySelector( '.table-wrapper' );
		this.holiday = [];

		this.fetchCountriesData();
		this.attachEventListeners();
	}

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

	async fetchCountriesData() {
		const url = `https://calendarific.com/api/v2/countries?api_key=${this.token}`;
		try {
			let response = await fetch(url);
			let countryData = await response.json();
			this.fillCountriesData( countryData );
		} catch ( error ) {
			console.error( error );
			alert("An error occurred while fetching country data. Contact site administrator.");
		}
	}

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

	async getHolidays( country, year ) {
		const url = `https://calendarific.com/api/v2/holidays?&api_key=${this.token}&country=${country}&year=${year}`;
		try {
			let response = await fetch( url );
			let holidayData = this.holiday = await response.json();
			this.buildTable( holidayData );
		} catch ( error ) {
			console.error( error )
			alert("An error occurred while fetching holiday data. Contact site administrator.");
		}
	}

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

	populateTable( holidayData, sorting= '' ) {
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
