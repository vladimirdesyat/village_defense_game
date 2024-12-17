export function villageLoad() {
    document.addEventListener('DOMContentLoaded', function() {
        const village = document.getElementById('village');
        const knights = document.getElementById('knights');
    
        function generateVillage() {
            const numVillagers = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 7
            village.innerHTML = ''; // Clear previous villagers
    
            for (let i = 0; i < numVillagers; i++) {
                const villager = document.createElement('span');
                villager.classList.add('emoji', 'villager');
                villager.innerText = '🏠🏡🏠'; // Replace with actual village emoji
                villager.style.fontSize = `${Math.floor(Math.random() * 100) + 20}px`; // Random font size between 1 and 100px
                village.appendChild(villager);
            }
        }
    
        function generateKnights() {
            const numKnights = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 7
            knights.innerHTML = ''; // Clear previous knights
    
            for (let i = 0; i < numKnights; i++) {
                const knight = document.createElement('span');
                knight.classList.add('emoji', 'knight');
                knight.innerText = '🏛️🏰🏛️'; // Replace with actual castle emoji
                knight.style.fontSize = `${Math.floor(Math.random() * 100) + 20}px`; // Random font size between 1 and 100px
                knights.appendChild(knight);
            }
        }
    
        // Example usage: Generate villagers and knights when the page loads
        generateVillage();
        generateKnights();
    });
}
