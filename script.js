


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




    const RGBtoHSLdarken = function(r,g,b) {
        console.log(r);
        console.log(g);
        console.log(b);
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;
     
      
        // Find greatest and smallest channel values
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

              // Calculate hue
  // No difference
  if (delta == 0)
  h = 0;
// Red is max
else if (cmax == r)
  h = ((g - b) / delta) % 6;
// Green is max
else if (cmax == g)
  h = (b - r) / delta + 2;
// Blue is max
else
  h = (r - g) / delta + 4;

h = Math.round(h * 60);
  
// Make negative hues positive behind 360°
if (h < 0)
    h += 360;
      
      // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

 //converted color is "hsl(" + h + "," + s + "%," + l + "%)";
 console.log("hsl(" + h + "," + s + "%," + (l-10) + "%)");
 return "hsl(" + h + "," + s + "%," + (l-10) + "%)";
 
  }
    

gridcontainer.onmouseover = function(event) {
    let target = event.target;

    var isCell = target.hasAttribute(".cell");
    if (isCell = true) {

    //gets background color of cell that was clicked
    let style = getComputedStyle(target);
    //saves that color as variable targetColor
    let targetColor = style.backgroundColor;
    console.log(targetColor);

    //save targetColor as an array of separate R G B
   var rgbArr = targetColor.substring(4, targetColor.length-1).replace(/ /g, '').split(',');
   //console.log(rgbArr);

   //put targetColor into function that converts it to HSL 
   //and darkens it by 10%
let newColor = RGBtoHSLdarken(rgbArr[0],rgbArr[1],rgbArr[2]);

//set clicked cell background color to new darker color
    target.style.backgroundColor=newColor;
    } else {
        return;
    }
}



//option to draw with random colors

//gridcontainer.onmouseover = function(event) {
   // let target = event.target;
    //var randomColor = Math.floor(Math.random()*16777215).toString(16);
    //target.style.backgroundColor="#"+randomColor;
    //}
