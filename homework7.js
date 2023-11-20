// 1) чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)

// 2) у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)

// 3) у кожного класу має бути своя унікальна властивість

// 4) у кожного класу має бути приватна властивість

// 4) у двох класів має бути спільний предок та спільний метод характерний тільки для них

// 5) у всіх чотирьох класів має бути один (крім проміжних) клас-предок

class LotrCharacter {
	constructor(name, weaponOfChoice, skills) {
		this.name = name;
		this.weaponOfChoice = weaponOfChoice;
		this.skills = skills;
	}
}

class Man extends LotrCharacter {
	#corruptedByTheRing;
	constructor(name, weaponOfChoice, skills, age) {
		super(name, weaponOfChoice, skills);
		this.#corruptedByTheRing = false;
		this.age = age;
	}
	corrupt() {
		this.#corruptedByTheRing = true;
	}
	isCorrupt() {
		return this.#corruptedByTheRing;
	}
}

class ManOfRohan extends Man {
	constructor(name, weaponOfChoice, skills, age) {
		super(name, weaponOfChoice, skills, age);
		this.horseman = true;
		this.ridingNorth = true;
	}
	sing() {
		console.log( 'Look at my horse, my horse is amazing Give it a lick');
	}
	stopRiding() {
		this.ridingNorth = false;
	}
	newDestination( destination ) {
		this.ridingDirection = destination;
		this.ridingNorth = false;
	}
}

class ManOfGondor extends Man {
	constructor(name, weaponOfChoice, skills, age) {
		super(name, weaponOfChoice, skills, age);
		this.defenderOfGates = true;
		this.seenWhiteCity = true;
	}
	tellAbout() {
		console.log( `My name is ${this.name}, you can have my ${this.weaponOfChoice}.`);
	}
	showSkills() {
		console.log( this.skills );
	}
}

class Elf extends LotrCharacter {
	#favoriteStar;
	constructor(name, weaponOfChoice, skills) {
		super(name, weaponOfChoice, skills);
		this.song = 'They taking the hobbits to Isengard';
		this.walkingOnSnow = true;
	}

	setFavoriteStar( star ) {
		this.#favoriteStar = star;
	}

	getFavoriteStar() {
		return this.#favoriteStar;
	}
	countKilled( killed ) {
		this.killed = killed;
	}
}

class Dwarf extends LotrCharacter {
	#beardLength;
	constructor(name, sonOf, weaponOfChoice, skills, beverage) {
		super(name, weaponOfChoice, skills);
		this.father = sonOf;
		this.favBeverage = beverage;
		this.ridesHorses = false;
	}
	setBeard( length ) {
		this.#beardLength = length;
	}
	getBeard() {
		return this.#beardLength;
	}
	countKilled( killed ) {
		this.killed = killed;
	}
}

class Hobbit extends LotrCharacter {
	#gotRing;
	constructor(name, weaponOfChoice, skills, adventure, ring) {
		super(name, weaponOfChoice, skills);
		this.residence = 'a hole';
		this.secondBreakfast = true;
		this.lovesAdventure = adventure;
		this.#gotRing = ring;
	}
	proposeRing() {
		console.log( 'I will give ring to you! Take it!' );
	}
	makeFriends( person ) {
		this.friend = person;
		console.log( `Call me a "master" ${this.friend}` );
	}
	potatoes() {
		console.log( 'Po-ta-toes! Boil em, mash em, stick em in a stew - even you couldn\'t say no to that!' );
	}
}

const gendalf = new LotrCharacter( 'Gendalf', 'staff', [ 'smoking', 'magic', 'fireworks', 'resurrection'] );
const peasant = new Man( 'Noname', 'rake', [ 'drinking', 'sleeping' ], 56 );
const eoten = new ManOfRohan( 'Eoten', 'spear', [ 'riding horses', 'archery' ], 36 );
const aragorn = new ManOfGondor( 'Aragorn', 'sword', [ 'tracking', 'elf language' ], 89 );
const legolas = new Elf( 'Legolas', 'bow', [ 'walking on snow', 'farsight' ] );
const gimli = new Dwarf( 'Gimli', 'Torin', 'axe', [ 'sprinting', 'alcoholism' ], 'meed' );
const frodo = new Hobbit( 'Frodo', 'dagger', [ 'gardening', 'sneaky' ], 10, true );




console.log( gendalf );
console.log( peasant );
console.log( peasant.isCorrupt() );
console.log( eoten.ridingNorth );
eoten.sing();
eoten.newDestination( 'Gondor' );
console.log( eoten.ridingDirection );
console.log( aragorn );
aragorn.showSkills();
aragorn.tellAbout();
console.log( legolas );
legolas.countKilled( 50 );
console.log( legolas.killed );
legolas.setFavoriteStar( 'Polar' );
console.log( legolas.getFavoriteStar() );
console.log( gimli );
gimli.setBeard( '40 inch' );
gimli.countKilled( 49 );
console.log( gimli.getBeard() );
console.log( gimli.ridesHorses );
console.log( frodo );
frodo.proposeRing();
