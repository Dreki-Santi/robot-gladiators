
//random number for generator
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var fightOrSkip = function() {
    //ask player if they'd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? \nEnter 'FIGHT' or 'SKIP' to choose.");

    //conditional recursive function call
    if(promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    //convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase();

    //if player picks skip, confirm and then stop loop
    if(promptFight === "skip") {
        //confirm they want to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?")

        //if yes (true), leave
        if(confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");

            //subtract the money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            //return true if player wants to leave
            return true;
        }
    }
    return false;
}

//fight function
var fight = function(enemy) {
    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change attack order
    if(Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    //repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        if(isPlayerTurn) {
            //ask player if they want to fight or run
            if(fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }

            //remove enemy's health by subctracting random damage based on player's attack
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //check enemy's health 
            if(enemy.health <= 0) {
                window.alert(enemy.name + " has perished!");

                //award player money for winning
                playerInfo.money = playerInfo.money +20;

                //leave while () loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        //player gets attacked first
        } else {

            ////remove players's health by subctracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //check player's health
            if(playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has perished!");
                //leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        //switch turn order next round
        isPlayerTurn = !isPlayerTurn
    }
}

//start a new game function
var startGame = function() {

    //reset player stats
    playerInfo.reset();

    //looping fight() function for multiple enemies
    for(var i = 0; i < enemyInfo.length; i++) {
        if(playerInfo.health > 0) {
            //let player know what round they are in, remember that the arrays start at 0 so add 1 to it
            window.alert("Welcome to Robot Gladiators! \nRound " + (i + 1));

            //pick new enemy to fight based on the index of the enemyInfo array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40,60);
            
            //use debugger to pause script from running and check what's going on at that moment in the code
            /*debugger;*/

            //pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //if player is alive and we are not at the last enemy in the array
            if(playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
}

//ends entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    //check localStorage for highscore, if it's not there, use 0
    var highScore = localStorage.getItem("highScore");
    if(highScore === null) {
        highScore = 0;
    }
    //if player have more money than the high score, then player has new high score
    if(playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    //ask if player would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if(playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? \nPlease enter one of the following: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch to carry out action
    switch(shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
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

//function to set player name
var getPlayerName = function() {
    var name = "";

while(name === "" || name === null) {
    name = prompt("What is your robot's name?");
}

console.log("Your robot's name is " + name);
return name;
}

//Player and enemy info
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //COMMA IS NEEDED HERE!!!!!!
    refillHealth: function() {
        if(this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }, //HERE TOO!!!!!!
    upgradeAttack: function() {
        if(this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
]

//start the game
startGame();