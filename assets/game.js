
//Game states
//"WIN" - Player robot has defeated all enemy-robots
    //fight all ememy robots
    //defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

//Getting started
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//You van also log multiple values at once like this:
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

window.alert("Welcome to Robot Gladiators!");

var fight = function(enemyName) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? \nEnter 'FIGHT' or 'SKIP' to choose.");

    //if player choses to fight, then fight
    if(promptFight === "fight" || promptFight === "FIGHT" || promptFight === "Fight") {
        //remove enemy's health by subctracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        //check enemy's health 
        if(enemyHealth <= 0) {
            window.alert(enemyName + " has perished!");
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        ////remove players's health by subctracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        //check player's health
        if(playerHealth <= 0) {
            window.alert(playerName + " has perished!");
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }

    //if player choses to skip
    } else if(promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
        //confirm if player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave the fight
        if(confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight. Goodbye!");

            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 2;
        /*if no (false), ask question again by running fight() again*/
        } else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again!");
    }
}

//looping fight() function for multiple enemies
for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}
//fight();