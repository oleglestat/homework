'use strict';
const token = 't329PUlvMnIEt9m6Ml5DrltuMq8ROeu2';
const countrySelect = document.querySelector( '#country');
const yearSelect = document.querySelector( '#year');
const button = document.querySelector( '.submit');
const tableWrapper = document.querySelector( '.table-wrapper' );
let sort = 'desc';
let data;

(() => {
	initialization();

	countrySelect.oninput = function() {
		if( this.value ) {
			yearSelect.removeAttribute( 'disabled' );
		} else {
			yearSelect.setAttribute('disabled', '' );
		}
	};

	button.onclick = function() {
		getHolidays( countrySelect.value, yearSelect.value );
	}
})();

async function initialization() {
	const url = `https://calendarific.com/api/v2/countries?api_key=${token}`;
	try {
		let response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		let data = await response.json();
		data.response.countries.forEach(item => {
			let option = document.createElement('option');
			option.value = item['iso-3166'];
			option.innerText = item['country_name'];
			countrySelect.appendChild(option);
		});
		for (let i = 2001; i <= 2049; i++) {
			let option = document.createElement('option');
			option.value = `${i}`;
			option.innerText = `${i}`;
			yearSelect.appendChild(option);
		}
		yearSelect.querySelector(`option[value='${new Date().getFullYear()}']`).setAttribute('selected', '');
	} catch (e) {
		console.error(e);
		alert("An error occurred while fetching initial data. Contact site administrator.");
	}
}

async function getHolidays( country, year ) {
	const url = `https://calendarific.com/api/v2/holidays?&api_key=${token}&country=${country}&year=${year}`;
	try {
		let response = await fetch( url );

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		data = await response.json();
	} catch (e) {
		console.error(e)
		alert("An error occurred while fetching final data. Contact site administrator.");
	} finally {
		buildTable();
	}
}

function buildTable() {
	tableWrapper.innerHTML = `
		<button class="sort">Sort desc</button>
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
	const tableBody = tableWrapper.querySelector( 'tbody' );
	data.response.holidays.forEach( item => {
		const tr= document.createElement( 'tr' );
		tr.innerHTML = `
				<tr>
				  <td>${item.date.iso}</td>
				  <td>${item.name}</td>
				</tr>
		`
		tableBody.appendChild( tr );
	})
	const sortButton = document.querySelector( '.sort');
	sortButton.onclick = function () {
		sortTable( sort );
		sort === 'desc' ? sort = 'asc' : sort = 'desc';
		this.textContent === 'Sort desc' ? this.textContent = 'Sort asc' : this.textContent = 'Sort desc';
	}
}

function sortTable( direction ) {
	let table, rows, switching, i, x, y, shouldSwitch;
	table = document.querySelector("table");
	switching = true;

	while (switching) {
		switching = false;
		rows = table.rows;

		for (i = 1; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("td")[0];
			y = rows[i + 1].getElementsByTagName("td")[0];

			if( direction === 'asc' ) {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}

		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}
