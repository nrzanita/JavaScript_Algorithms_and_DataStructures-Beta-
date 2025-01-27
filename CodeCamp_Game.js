//define the variables that we need
let xp = 67;
let health = 9999;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"]; // This is the list of weapons


let myLevel = xp;
let totalLevel= 100;
let fillLevelPercentage = (myLevel / totalLevel) * 100;  // Calculate the fill percentage
let totalHealth = 100000;
let fillHealthPercentage = (health / totalHealth) * 100;
let diamonds = 90;
let totalDiamonds = 100;
let fillDiamondsPercentage = (diamonds/ totalDiamonds) * 100;
let Budget = 10000;
let totalBudget = 100000;
let fillBudgetPercentage = (Budget/ totalBudget) * 100;

document.querySelector('#Profile_Details .Level').style.width = fillLevelPercentage + '%'; // Update the width of the fill element based on the percentage
document.querySelector('#Profile_Details .Health').style.width = fillHealthPercentage + '%';
document.querySelector('#Profile_Details .Diamonds').style.width = fillDiamondsPercentage + "%";
document.querySelector('#Profile_Details .Budget').style.width = fillBudgetPercentage+ "%";


// Selecting the button element with the ID 'button1' from the HTML document
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const profile_Details = document.querySelector("#Profile_Details");
let Leveltext = document.getElementById("Leveltext");
// Array containing different weapons, each represented by an object with properties: name and power
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

// Array containing different types of monsters, each represented by an object with properties: name, level, and health
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
// Array containing different locations in the game, each represented by an object with properties: name, button text, button functions, and text
const locations = [
  {
    name: "town square",     // Location: Town Square  0
    "button text": ["Go to store", "Go to cave", "Fight dragon", "Profile"],    // Button texts for actions in this location
    "button functions": [goStore, goCave, fightDragon, seeProfile],             // Functions corresponding to button actions
    text: "You are in the town square. You see a sign that says \"Store\"."    // Text describing the location
  },
  {
    name: "store",   //1
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square","Profile"],
    "button functions": [buyHealth, buyWeapon, goTown, seeProfile],
    text: "You enter the store."
  },
  {
    name: "cave",  //2
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square","Profile"],
    "button functions": [fightSlime, fightBeast, goTown, seeProfile],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight", //3
    "button text": ["Attack", "Dodge", "Run","Profile"],
    "button functions": [attack, dodge, goTown, seeProfile],
    text: "You are fighting a monster."
  },
  
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square","Profile"],
    "button functions": [goTown, goTown, easterEgg, seeProfile],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  { 
    name: "lose",   //5
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?","Profile"],
    "button functions": [restart, restart, restart, seeProfile],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?","Profile"], 
    "button functions": [restart, restart, restart, seeProfile], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",  //7
    "button text": ["2", "8", "Go to town square?","Profile"],
    "button functions": [pickTwo, pickEight, goTown, seeProfile],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: "Profile",     // profile 8
    "button text": ["My weapons", "My level", "Health", "Profile"],    // Button texts for actions in this location
    "button functions": [goStore, goCave, fightDragon, seeProfile],             // Functions corresponding to button actions
    text: "Your Profile"   // Text describing the location
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = seeProfile;

function updateLevel(){
  if(xp < 30){
    Leveltext.innerText = "Rookie";
  }
  else if(xp < 70 && xp > 29){
    Leveltext.innerText = "Veteran";
  }
  else if(xp>=70){
    Leveltext.innerText = "Legend";
    
  }
}
function update(location) {
  monsterStats.style.display = "none";
  profile_Details.style.display = 'none';
  Leveltext.style.display = 'none';
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}
function seeProfile(){
  update(locations[8]);
  updateLevel();
  profile_Details.style.display = "inline";
  Leveltext.style.display = "block";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;  //update gold value in html
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);  //add new weapon to inventory
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}