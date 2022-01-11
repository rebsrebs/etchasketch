


const cleargrid = document.querySelector('#cleargrid');
cleargrid.addEventListener('click', promptGridSize);


const createGrid = (gridSize) => {
    gridcontainer.style.setProperty('grid-template', `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`);
    let i=1;
  for (i=1; i<(gridSize*gridSize)+1; i++){
    var cell = document.createElement("div");
    console.log(i);
    cell.classList.add('cell');
      cell.innerHTML = i;
      cell.className = 'cell';
     gridcontainer.appendChild(cell);
  }
    }

    document.addEventListener("DOMContentLoaded", function(){
        createGrid(16);
    });

    const emptyGrid = () => {
        document.querySelectorAll('.cell').forEach(e => e.remove());
        }


function promptGridSize() {
    emptyGrid();
    var gridSize = Number(prompt("How many squares do you want each side of the grid to have?",""));
    console.log(gridSize);
  createGrid(gridSize);
}