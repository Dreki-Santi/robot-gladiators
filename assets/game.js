
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

//start a new game function
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

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

            //if player is alive and we are not at the last enemy in the array
            if(playerHealth > 0 && i < enemyNames.length - 1) {
                //ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over! \n Would you like to visit the store before the next round?");

                //if yes, cal store()
                if(storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! \nGame Over!");
            break;
        }
    }

    //after the loops ends, player is either out of health or enemies, so run endGame
    endGame();

    startGame();
}

//ends entire game
var endGame = function() {
    //if player is still alive, player wins
    if(playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've losr your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if(playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? \nPlease enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    //use switch to carry out action
    switch(shopOptionPrompt) {
        case "refill":
        case "Refill":
        case "REFILL":
            if(playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

            //increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            } else {
                window.alert("You do not have enough money!");
            }

            break;
        case "upgrade":
        case "Upgrade":
        case "UPGRADE":
            if(playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.")
            

                //increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You do not have enough money!");
            }

            break;
        case "leave":
        case "Leave":
        case "LEAVE":
            window.alert("Leaving the store.");
            
            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

startGame();