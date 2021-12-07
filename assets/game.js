
//Getting started
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//fight function
var fight = function(enemyName) {
    //repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0 && playerHealth > 0   ) {
        //ask player if they want to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? \nEnter 'FIGHT' or 'SKIP' to choose.");

        //if player choses to skip, confirm and then stop the loop
        if(promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave the fight
            if(confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                
                //subtract the money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney is" + playerMoney);
                break;
            }
        }

        //remove enemy's health by subctracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        //check enemy's health 
        if(enemyHealth <= 0) {
            window.alert(enemyName + " has perished!");

            //award player money for winning
            playerMoney = playerMoney +20;

            //leave while () loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        ////remove players's health by subctracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        //check player's health
        if(playerHealth <= 0) {
            window.alert(playerName + " has perished!");
            //leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
}

//looping fight() function for multiple enemies
for(var i = 0; i < enemyNames.length; i++) {
    if(playerHealth > 0) {
        //let player know what round they are in, remember that the arrays start at 0 so add 1 to it
        window.alert("Welcome to Robot Gladiators! \nRound " + (i + 1));

        //pick new enemy to fight based on the indez of the enemyNames array
        var pickedEnemyName = enemyNames[i];

        //reset enemyHealth before starting new fight
        enemyHealth = 50;
        
        //use debugger to pause script from running and check what's going on at that moment in the code
        /*debugger;*/

        //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
    } else {
        window.alert("You have lost your robot in battle! \nGame Over!");
        break;
    }
}    