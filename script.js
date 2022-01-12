


const cleargrid = document.querySelector('#cleargrid');
const gridcontainer = document.querySelector('#gridcontainer');
cleargrid.addEventListener('click', promptGridSize);



const createGrid = (gridSize) => {
    gridcontainer.style.setProperty('grid-template', `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`);
    let i=1;
  for (i=1; i<(gridSize*gridSize)+1; i++){
    var cell = document.createElement("div");
    //console.log(i);
    cell.classList.add('cell');
      //cell.innerHTML = i;
      cell.className = 'cell';
      cell.id = `cell${i}`;
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
    var gridSize = Number(prompt("How many squares do you want each side of the grid to have? Pick a number between 2 and 100",""));
    console.log(gridSize);
    if (gridSize>100 | gridSize<2){
      alert("Please pick a number netween 4 and 100.")
    } else {
  createGrid(gridSize);
    }
}




gridcontainer.onmouseover = function(event) {
    let target = event.target;
    
    target.style.backgroundColor="#D35F46";
    }



//draw with random colors
//gridcontainer.onmouseover = function(event) {
   // let target = event.target;
    //var randomColor = Math.floor(Math.random()*16777215).toString(16);
    //target.style.backgroundColor="#"+randomColor;
    //}
