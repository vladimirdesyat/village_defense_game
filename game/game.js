import { gameState, updateGameState } from "../game/gameState.js";

export function initializeGame() {
    document.getElementById('crops').addEventListener('click', () => {
        if (!gameState.cropsCollectedToday) {
            if (gameState.villagers >= 15) {
                updateGameState({ 
                    coins: gameState.coins + Math.floor(Math.random()*5) + 5,
                    cropsCollectedToday: true,
                });
            } else if (gameState.villagers >= 10) {
                updateGameState({ 
                    coins: gameState.coins + 5,
                    cropsCollectedToday: true,
                });
            } else {
                updateGameState({ 
                    coins: gameState.coins + Math.floor(Math.random() * 5 + 1),
                    cropsCollectedToday: true,
                });
            }
            
            document.getElementById('crops').disabled = true;
        }
        updateDisplay();
    });

    document.getElementById('payment').addEventListener('click', () => {
        if (gameState.day % 7 === 0) {
            if (gameState.coins < 3) {
                updateGameState({ 
                    villagers: Math.floor(gameState.villagers / 2),
                    knights: 0,
                });         
                document.getElementById('status').textContent = `Insufficient coins! Lost half of villagers and all knights.`;
            } else {                
                updateGameState({ 
                    coins: gameState.coins - 3,
                });
                document.getElementById('status').textContent = '🌞 Great day to live!';
            }

            document.getElementById('payment').disabled = true;
            updateGameState({ 
                paymentsMadeThisWeek: true,
            });   
            document.getElementById('pass-day').disabled = false;
        }
        updateDisplay();
    });

    document.getElementById('recruits').addEventListener('click', () => {
        if (gameState.coins >= 2) {
            updateGameState({ 
                coins: gameState.coins - 2,
                pendingRecruits: gameState.pendingRecruits + 1,
            });
        }
        updateDisplay();
    });

    document.getElementById('pass-day').addEventListener('click', passDay);

    function passDay() {
        if (gameState.day % 14 === 0){
            updateGameState({ 
                villagers: gameState.villagers + Math.floor(Math.random() + 1),
            });
        }

        if (gameState.day % 7 === 0) {
            document.getElementById('payment').disabled = false;
            document.getElementById('pass-day').disabled = true;
            document.getElementById('status').textContent = `Payments not made. Cannot pass to next week.`;
            if (gameState.paymentsMadeThisWeek === false) {
                return;
            } else {
                performWeeklyChecks();            
                document.getElementById('pass-day').disabled = false;
            }
        } else {
            // Set default status message
            document.getElementById('payment').disabled = true;
            document.getElementById('status').textContent = '🌞 Great day to live!';
        }

        updateGameState({ 
            day: gameState.day + 1,
            cropsCollectedToday: false,
        });
        if (gameState.isRobberyActive) {
            updateGameState({ 
                isRobberyActive: false,
            });
            
        }

        updateGameState({ 
            paymentsMadeThisWeek: false,
        });        
        document.getElementById('day-count').textContent = gameState.day;
        document.getElementById('crops').disabled = false;

        checkForRobbery();
        updateDisplay();
        updateRobberPosition();
    }

    function performWeeklyChecks() {
        if (gameState.paymentsMadeThisWeek === true) {
        updateGameState({ 
            knights: gameState.knights + gameState.pendingRecruits,
            pendingRecruits: 0,
            villagers: gameState.villagers + Math.floor(gameState.villagers * 0.1),
        });
        if (gameState.robberyTime > 8) {
            updateGameState({ 
                robberyTime: gameState.robberyTime - 1,
            });
        }
        updateDisplay();
        }
    }

    function checkForRobbery() {
        if (gameState.day % gameState.robberyTime === 0) {
            handleRobbery();
        }
    }

    function handleRobbery() {
        updateGameState({ 
            isRobberyActive: true, // Set robbery active
        });
        if (gameState.knights > gameState.robberyCount) {
            let loss = Math.floor(gameState.knights * (0.1 + Math.random() * 0.2));
            if (loss > gameState.knights) {
                loss = gameState.knights;
            }

            updateGameState({ 
                knights: gameState.knights - loss,
            });
            updateEmojis(true, gameState.knights);
            document.getElementById('status').textContent = `Robbery attempted! Lost ${loss} knights.`;
        } else {
            updateGameState({ 
                knights: 0,
            });
            let villagerLoss = Math.floor(gameState.villagers * (0.3 + Math.random() * 0.2));
            if (villagerLoss > gameState.villagers) {
                villagerLoss = gameState.villagers;
            }
            updateGameState({ 
                villagers: gameState.villagers - villagerLoss,
            });
            if (gameState.villagers === 0 || gameState.villagers === 1) {
                document.getElementById('status').textContent = `Village overrun! Game over.`;
                endGame();
            } else {
                updateEmojis(true, 0);
                document.getElementById('status').textContent = `Robbery succeeded! Lost all knights and ${villagerLoss} villagers.`;
            }
        }
        updateGameState({ 
            robberyCount: gameState.robberyCount + 1,
        });
        updateDisplay();
    }


    function updateDisplay() {
        document.getElementById('villagers-count').textContent = gameState.villagers;
        document.getElementById('knights-count').textContent = gameState.knights;
        document.getElementById('pending-recruits-count').textContent = gameState.pendingRecruits;
        document.getElementById('coin-count').textContent = gameState.coins;
        document.getElementById('robbery-time').textContent = gameState.robberyTime;
        document.getElementById('robbery-count').textContent = gameState.robberyCount;
        document.getElementById('day-count').textContent = gameState.day;    
        updateEmojis(gameState.isRobberyActive, gameState.knights);
    }

    function updateRobberPosition() {
        const robberyTime = parseInt(document.getElementById('robbery-time').textContent);
        const day = parseInt(document.getElementById('day-count').textContent);
        const path = document.getElementById('robber-path');
        const robber = document.getElementById('robbers');
        const pathWidth = path.offsetWidth;
        const step = pathWidth / robberyTime;
        robber.style.right = (pathWidth - (day % robberyTime) * step).toString() + 'px';
    }

    function updateEmojis(isRobberyActive, knights) {
        if (gameState.isRobberyActive) {
            if (gameState.knights === 0) {
                document.getElementById('village').innerHTML = '🏠🔥👿';
                document.getElementById('knights').innerHTML = '🏰🔥';
                document.getElementById('robbers').innerHTML = '';
            } else {
                document.getElementById('village').innerHTML = '🏠';
                document.getElementById('knights').innerHTML = '🏰🔥👿';
                document.getElementById('robbers').innerHTML = '';
            }
        } else {
            document.getElementById('village').innerHTML = '🏠🏡🏠';
            document.getElementById('knights').innerHTML = '🏛️🏰🏛️';
            document.getElementById('robbers').innerHTML = '👿';
        }
    }

    function endGame() {
        document.getElementById('status').textContent = 'Game Over!';
        document.querySelectorAll('button').forEach(btn => btn.disabled = true);
    }
}