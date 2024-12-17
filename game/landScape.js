export function landscapeLoad() {
    document.addEventListener('DOMContentLoaded', function() {
        const mountainContainer = document.querySelector('.mountain-container');
        const containerWidth = mountainContainer.clientWidth;
        const maxMountainWidth = 100; // Maximum width of a mountain
        const minSpacing = 50; // Minimum spacing between mountains
    
        let currentX = 0;
    
        while (currentX < containerWidth) {
            const shouldPlaceMountain = Math.random() > 0.5; // 50% chance to place a mountain
    
            if (shouldPlaceMountain) {
                const mountain = document.createElement('div');
                mountain.classList.add('mountain');
                mountain.style.left = `${currentX}px`;
    
                // Randomize mountain size
                const mountainWidth = Math.floor(Math.random() * maxMountainWidth) + 1;
                mountain.style.borderLeft = `${mountainWidth / 2}px solid transparent`;
                mountain.style.borderRight = `${mountainWidth / 2}px solid transparent`;
                mountain.style.borderBottom = `${mountainWidth}px solid #333`;
    
                // Add snow on top of the mountain
                const snow = document.createElement('div');
                snow.classList.add('snow');
                snow.style.left = `${mountainWidth / 2 - 10}px`; // Center the snow on the mountain peak
                mountain.appendChild(snow);
    
                mountainContainer.appendChild(mountain);
                currentX += mountainWidth;
            } else {
                // Skip some space
                const spacing = Math.floor(Math.random() * minSpacing) + minSpacing;
                currentX += spacing;
            }
        }
    
        // Add background layers
        const sky = document.createElement('div');
        sky.classList.add('sky');
    
        const stars = document.createElement('div');
        stars.classList.add('stars');
    
        const clouds = document.createElement('div');
        clouds.classList.add('clouds');
    
        const grass = document.createElement('div');
        grass.classList.add('grass');
    
        const road = document.createElement('div');
        road.classList.add('road');
    
        mountainContainer.appendChild(sky);
        mountainContainer.appendChild(stars);
        mountainContainer.appendChild(clouds);
        mountainContainer.appendChild(grass);
        mountainContainer.appendChild(road);
    });
}