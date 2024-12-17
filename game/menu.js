import { gameState, updateGameState } from "../game/gameState.js";
import { initializeGame } from "../game/game.js";

export function menuLoad() {
    // Event listeners for start window buttons
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('view-credits').addEventListener('click', showCredits);
    document.getElementById('game-options').addEventListener('click', openOptions);
    document.getElementById('save-game').addEventListener('click', saveGame);
    document.getElementById('load-game').addEventListener('click', loadGame);

    // Event listeners for pause window buttons
    document.getElementById('resume-game').addEventListener('click', resumeGame);
    document.getElementById('save-game-pause').addEventListener('click', saveGame);
    document.getElementById('game-options-pause').addEventListener('click', openOptions);
    document.getElementById('quit-to-menu').addEventListener('click', quitToMenu);

    // Event listeners for options window buttons
    document.getElementById('save-options').addEventListener('click', saveOptions);
    document.getElementById('cancel-options').addEventListener('click', function() {
        document.getElementById('options-window').style.display = 'none';
        document.getElementById('start-window').style.display = 'block';
    });

    // Event listener for closing credits
    document.getElementById('close-credits').addEventListener('click', function() {
        document.getElementById('credits-window').style.display = 'none';
        document.getElementById('start-window').style.display = 'block';
    });

    // Event listener for pause game button
    document.getElementById('pause-game').addEventListener('click', pauseGame);

    // Keydown event listener for escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            pauseGame();
        }
    });

    function startGame() {
        document.getElementById('start-window').style.display = 'none';
        document.getElementById('game-screen').style.display = 'grid';
        document.getElementById('status').textContent = '🌞 Great day to live!';
        initializeGame();
    }

    function showCredits() {
        document.getElementById('start-window').style.display = 'none';
        document.getElementById('credits-window').style.display = 'block';
    }

    function openOptions() {
        document.getElementById('start-window').style.display = 'none';
        document.getElementById('options-window').style.display = 'block';
    }

    function saveGame() {
        const state = getGameState();
        const stateStr = JSON.stringify(state);
        localStorage.setItem('gameState', stateStr);
        alert('Game saved.');
    }

    function loadGame() {
        const stateStr = localStorage.getItem('gameState');
        if (stateStr) {
            const state = JSON.parse(stateStr);
            updateGameState({
                day: state.day,
                villagers: state.villagers,
                knights: state.knights,
                pendingRecruits: state.pendingRecruits,
                coins: state.coins,
                robberyTime: state.robberyTime,
                robberyCount: state.robberyCount,
                paymentsMadeThisWeek: state.paymentsMadeThisWeek,
                cropsCollectedToday: state.cropsCollectedToday,
                isRobberyActive: state.isRobberyActive,
            });
           
            updateDisplay();
            alert('Game loaded.');
        } else {
            alert('No saved game found.');
        }
    }

    function pauseGame() {
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('pause-window').style.display = 'block';
        document.querySelectorAll('#game-screen button').forEach(btn => btn.disabled = true);
        updateGameState({
            isPaused: true,
        });
    }

    function resumeGame() {
        document.getElementById('pause-window').style.display = 'none';
        document.getElementById('game-screen').style.display = 'grid';
        document.querySelectorAll('#game-screen button').forEach(btn => btn.disabled = false);
        updateGameState({
            isPaused: false,
        });
    }

    function quitToMenu() {
        document.getElementById('pause-window').style.display = 'none';
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('start-window').style.display = 'block';
    }

    function saveOptions() {
        robberyTime = parseInt(document.getElementById('robbery-time-input').value);
        document.getElementById('robbery-time').textContent = robberyTime;
        document.getElementById('options-window').style.display = 'none';
        document.getElementById('start-window').style.display = 'block';
    }

    function getGameState() {
        return {
            day: day,
            villagers: villagers,
            knights: knights,
            pendingRecruits: pendingRecruits,
            coins: coins,
            robberyTime: robberyTime,
            robberyCount: robberyCount,
            paymentsMadeThisWeek: paymentsMadeThisWeek,
            cropsCollectedToday: cropsCollectedToday,
            isRobberyActive: isRobberyActive
        };
    }
}