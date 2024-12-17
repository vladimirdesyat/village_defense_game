export function robbersLoad(){
    document.addEventListener('DOMContentLoaded', function() {
        const robberPath = document.getElementById('robber-path');
        const robbersContainer = document.getElementById('robbers');
    
        function generateRobbers() {
            const numRobbers = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
            robbersContainer.innerHTML = ''; // Clear previous robbers
    
            for (let i = 0; i < numRobbers; i++) {
                const robber = document.createElement('span');
                robber.classList.add('emoji', 'robber');
                robber.innerText = '👿'; // Robber emoji
                robber.style.fontSize = `${Math.floor(Math.random() * 100) + 10}px`; // Random font size between 1 and 100px
                robbersContainer.appendChild(robber);
            }
        }
    
        // Example usage: Generate robbers when the page loads
        generateRobbers();
    });
}