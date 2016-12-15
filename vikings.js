//////////////////////////
//        WARRIOR       //
//////////////////////////

var Warrior = function (maxStrength, maxHealth) {
	this.strength=this._calculateRandom(5,maxStrength);
	this.health=this._calculateRandom(30,maxHealth);	
};

Warrior.prototype._calculateRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Warrior.prototype.attack = function () {
	return this.strength;
};

Warrior.prototype.receiveDamage = function (damage) {
	this.health -= damage;
};

/////////////////////////////////////////////////
//        VIKING (extends from Warrior)        //
/////////////////////////////////////////////////

var Viking = function(name, maxStrength, maxHealth) {
	Warrior.call(this, maxStrength, maxHealth);
	this.name=name;
};

Viking.prototype = Object.create(Warrior.prototype);
Viking.prototype.constructor = Viking;

/////////////////////////////////////////////////
//         SAXON (extends from Warrior)        //
/////////////////////////////////////////////////

var Saxon = function (maxStrength, maxHealth) {
	Warrior.call(this, maxStrength, maxHealth);
	this.name=name;
};

Saxon.prototype = Object.create(Warrior.prototype);
Saxon.prototype.constructor = Saxon;

///////////////////////////////////////////
//        PIT (Viking vs Viking)         //
///////////////////////////////////////////

var Pit = function(visitor_warrior, local_warrior, rounds) {
	this.visitor_warrior=visitor_warrior;
	this.local_warrior=local_warrior;
	this.rounds=rounds;
};

Pit.prototype.fight = function() {
	var round = 0;
	console.log("Welcome to this pit!");
	console.log("The visitor warrior is " + this.visitor_warrior.name + 
		" --> Health: " + this.visitor_warrior.health + " & Strength: " + this.visitor_warrior.strength);
	console.log("The local warrior is " + this.local_warrior.name + 
		" --> Health: " + this.local_warrior.health + " & Strength: " + this.local_warrior.strength);

	console.log("The game is going to take place in " + this.rounds + " rounds!")
	
	for (round = 1 ; round <= this.rounds ; round += 1){
		console.log("Round --> " + round);
		this._encounter();
		if (this._endPit() == true) {
			this._finishPit();
			return;
		}
	};
	this._finishPit();
};

Pit.prototype._encounter = function() {
	console.log(this.visitor_warrior.name + " attacks and makes " + this.visitor_warrior.strength
			+ " points of damage");
	this.local_warrior.receiveDamage(this.visitor_warrior.attack());
	console.log(this.local_warrior.name + " attacks and makes " + this.local_warrior.strength
			+ " points of damage");
	this.visitor_warrior.receiveDamage(this.local_warrior.attack());
	console.log(this.visitor_warrior.name + " has Health: " + this.visitor_warrior.health);
	console.log(this.local_warrior.name + " has Health: " + this.local_warrior.health);
};

Pit.prototype._endPit = function() {
	return (this.local_warrior.health < this.visitor_warrior.strength || this.visitor_warrior.health < this.local_warrior.strength)
};

Pit.prototype._finishPit = function() {
	console.log("The pit has arrived to the end.");
	if (this.visitor_warrior.health>this.local_warrior.health) {
		console.log("The winner is " + this.visitor_warrior.name);
	} else {
		console.log("The winner is " + this.local_warrior.name);
	}	
};

///////////////////////////////////////////
//      ASSAULT (Vikings vs Saxons)      //
///////////////////////////////////////////

var Assault = function(vikings_initial_army, saxons_initial_army) {
	this.vikings_army = vikings_initial_army;
	this.initial_vikings_units = this.vikings_army.length;
	this.saxons_army = saxons_initial_army;
	this.initial_saxons_units = this.saxons_army.length;
	this.rounds = this._calculateRandom(5,8);
};

Assault.prototype._calculateRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Assault.prototype._removeDeathUnits = function (army) {
	var filtered_army = army.filter(function (warrior) {
		return warrior.health > 0;
	});
	return filtered_army;
};

Assault.prototype._encounter = function(warrior1, warrior2) {
	warrior2.receiveDamage(warrior1.attack());
	warrior1.receiveDamage(warrior2.attack());
};

Assault.prototype.fight = function () {
	var round = 1;
	console.log("Welcome to this Fight between Vikings and Saxons!");
	// console.log("On the vikings side we have "+this.initial_vikings_units+" units.");
	// console.log("On the saxons side we have "+this.initial_saxons_units+" units.");
	
	for (round = 1 ; round <= this.rounds ; round += 1){
		console.log("Round --> " + round);
		console.log("On the vikings side we have "+(this.vikings_army).length +" units remaining.");
		console.log("On the saxons side we have "+(this.saxons_army).length +" units remaining.");
		console.log(this.vikings_army);
		console.log(this.saxons_army);
		var self = this;
		this.vikings_army.forEach(function(viking_unit){
			var warr = self._getRandomItem(self.saxons_army);
			self._encounter(viking_unit, warr);
		});		
		// Remove casualties on Vikings
		this.vikings_army = this._removeDeathUnits(this.vikings_army);
		// Remove casualties on Saxons
		this.saxons_army = this._removeDeathUnits(this.saxons_army);
		if (this._endAssault() == true) {
			this._finishAssault();
			return;
		}
	};
	this._finishAssault();
};

Assault.prototype._getRandomItem = function(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
};

Assault.prototype._endAssault = function() {
	return (this.vikings_army.length == 0 || this.saxons_army.length == 0);
};

Assault.prototype._getCasualtiesPercentage = function (initial_units, units) {
	return (((initial_units - units) / initial_units) * 100);
};

Assault.prototype._finishAssault = function() {
	console.log("The assault has arrived to the end.");
	if (this._getCasualtiesPercentage(this.initial_saxons_units, this.saxons_army.length) > 
		this._getCasualtiesPercentage(this.initial_vikings_units, this.vikings_army.length)) {
		console.log("The winner are the Vikings");
	} else {
		console.log("The winner are the Saxons");
	}
};


///////////////////////////////////
//      INITIALICE OBJECTS       //
///////////////////////////////////


// Create the Units for vikings --> Random units
// var vikings_units = getRandomInt(10,12);
// var i = 0;
// var list_of_alive_vikings = [];
// for (i = 1; i <= vikings_units ; i += 1){
// 	list_of_alive_vikings.push(new Viking("Viking", getRandomInt(80, 100), getRandomInt(15, 25)));
// };
viking_1 = new Viking("Thor", 25, 90);
viking_2 = new Viking("Fedora", 25, 90);
viking_3 = new Viking("Axel", 25, 90);
viking_4 = new Viking("Rose", 25, 120);
viking_5 = new Viking("Peters", 25, 90);

vikings_intial_army = [];
vikings_intial_army.push(viking_1);
vikings_intial_army.push(viking_2);
vikings_intial_army.push(viking_3);
vikings_intial_army.push(viking_4);
vikings_intial_army.push(viking_5);

console.log(vikings_intial_army);

// Create a pit and see who wins
// pit_test = new Pit (viking_1, viking_2, 30);
// pit_test.fight();

// Create the units for saxons --> Random units
var saxons_units = 20;
var j = 0;
var saxons_initial_army = [];
// Strength & Health
for (j = 1; j <= saxons_units ; j += 1){
	saxons_initial_army.push(new Saxon(10, 40));
};

// Create ASSAULT
assault_test = new Assault (vikings_intial_army, saxons_initial_army);
assault_test.fight();




