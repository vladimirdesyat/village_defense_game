export const gameState = {

    day: 1,

    villagers: 10,

    knights: 0,

    pendingRecruits: 0,

    coins: 0,

    robberyTime: 8,

    robberyCount: 0,

    paymentsMadeThisWeek: false,

    cropsCollectedToday: false,

    isRobberyActive: false

};

export function updateGameState(updates) {

    Object.assign(gameState, updates);

    // Trigger any necessary updates, like updating the display
}