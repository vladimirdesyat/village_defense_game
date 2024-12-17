export const buildings = {
    barracks: {
        name: 'Barracks',
        size: { width: 5, height: 4 },
        className: 'building-barracks'
      },
      temple: {
        name: 'Temple',
        size: { width: 2, height: 3 },
        className: 'building-temple'
      }
  };
  

export function cityView(){
    document.addEventListener('DOMContentLoaded', function() {
        const cityGrid = document.querySelector('.city-grid');
        const grid_size = 3; // 3x3 grid
      
        for (let i = 0; i < grid_size * grid_size; i++) {
          const plot = document.createElement('div');
          plot.classList.add('plot');
          plot.dataset.plotIndex = i;
          plot.addEventListener('click', handlePlotClick);
          cityGrid.appendChild(plot);
        }
      });      
}

export function handlePlotClick(event) {
    const plot = event.target;
    const plotIndex = parseInt(plot.dataset.plotIndex);
    const buildingToPlace = buildings.barracks; // For demonstration, always place barracks
  
    const grid_size = 3;
    const col = plotIndex % grid_size;
    const row = Math.floor(plotIndex / grid_size);
  
    if (row + buildingToPlace.size.height > grid_size || col + buildingToPlace.size.width > grid_size) {
      console.log('Building does not fit here.');
      return;
    }
  
    let canPlace = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const index = row + i * grid_size + col + j;
        const targetPlot = cityGrid.children[index];
        if (targetPlot.querySelector('.building')) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) break;
    }
  
    if (canPlace) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const index = row + i * grid_size + col + j;
          const targetPlot = cityGrid.children[index];
          const building = document.createElement('figure');
          building.classList.add('building', buildingToPlace.className);
          targetPlot.appendChild(building);
        }
      }
    } else {
      console.log('Cannot place building here.');
    }
}
  