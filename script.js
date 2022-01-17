


const cleargrid = document.querySelector('#cleargrid');
const singlecolor = document.querySelector('#singlecolor');
const darker = document.querySelector('#darker');
const randomrainbow = document.querySelector('#randomrainbow');
const HSLArainbow = document.querySelector('#HSLArainbow');
const grayscale = document.querySelector('#grayscale');
const moreopaque = document.querySelector('#moreopaque');
const gridcontainer = document.querySelector('#gridcontainer');


const pickersinglecolor = document.querySelector('#pickersinglecolor');




  


//Event Listeners
cleargrid.addEventListener('click', promptGridSize);
document.addEventListener("DOMContentLoaded", function(){
    createGrid(16);
});



//Functions


//Clears the grid by removing all cells.
const emptyGrid = () => {
    document.querySelectorAll('.cell').forEach(e => e.remove());
    }





//Creates grid with gridSize specifying how many cells across each side.
const createGrid = (gridSize) => {
    gridcontainer.style.setProperty('grid-template', `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`);
    let i=1;
  for (i=1; i<(gridSize*gridSize)+1; i++){
    var cell = document.createElement("div");
    cell.classList.add('cell');
      cell.className = 'cell';
      cell.id = `cell${i}`;
      cell.style.backgroundColor="rgb(242,13,242,0)";
      gridcontainer.style.backgroundColor="white";
     gridcontainer.appendChild(cell);
  }
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


//Takes RGBA color and makes it 10% more opaque
const moreOpaqueRGB = function(r,g,b,a) {
        return "rgba(" + r + "," + g + "," + b + "," + (Number(a) +.1) + ")";
    }

//Takes RGB color and makes it Grayscale
const RGBtoGray = function(r,g,b) {
    let value = Math.round((Number(r)+Number(g)+Number(b))/3);
    if (value === 255){
        return "rgba(165,165,165,0)";
    }else{
    return "rgb(" + value +  "," + value + "," + value + ")"; }
}

//Takes RGBA color and makes it Grayscale
const RGBAtoGray = function(r,g,b,a) {
    

let r2 = Math.round(((1-a)*255)+(a*r));
console.log(r2);
let g2 = Math.round(((1-a)*255)+(a*g));
console.log(g2);
let b2 = Math.round(((1-a)*255)+(a*b));
console.log(b2);

    let value = Math.round((Number(r2)+Number(g2)+Number(b2))/3);
    console.log(value);
    if (value >= 255){
        return "rgba(165,165,165,0)";
    }else{

        return "rgb(" + value +  "," + value + "," + value + ")"; }    

        //this makes it too light
    //return "rgba(" + value +  "," + value + "," + value + "," + a + ")"; }
}


//estimate transparency RGB to RGBA
//this formula does not work, I just winged it.
//const RGBgetAlpha = function(r,g,b){
//let grayValue = Math.round((Number(r)+Number(g)+Number(b))/3);
//console.log(grayValue);
//let newAlpha = (Number(grayValue)/255)+.1;
//if (newAlpha<=1){
//return "rgba(" + r +  "," + g + "," + b + "," + Number(newAlpha.toFixed(2)) + ")";
//}else{
//return "rgba(" + r +  "," + g + "," + b + "," + 1 + ")";}
//}


//this doesn't do anything at the moment
function RGBtoRGBA(r, g, b){
    if((g == null) && (typeof r === 'string')){
        var hex = r.replace(/^\s*#|\s*$/g, '');
        if(hex.length === 3){
            hex = hex.replace(/(.)/g, '$1$1');
        }
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 2), 16);
        b = parseInt(hex.substring(4, 2), 16);
    }

    var min, a = (255 - (min = Math.min(r, g, b))) / 255;

    return {
        r    : r = 0|(r - min) / a,
        g    : g = 0|(g - min) / a,
        b    : b = 0|(b - min) / a,
        a    : a = (0|1000*a)/1000,
        rgba : 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
    };
}



//converts RGB to HSL and then darkens it
function RGBtoHSLdarker(r, g, b){

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

  return "hsl(" + h + "," + s + "%," + (l-10) + "%)";
    }



    //RGBA to HSLA darker and more opaque
    function RGBAtoHSLAdarker(r, g, b, a){
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
        
        //converted color is …
        console.log("hsl(" + h + "," + s + "%," + (l-10) + "%," + a + ")");
        return "hsl(" + h + "," + s + "%," + (l-10) + "%," + a + ")";
        }


    
        





//Erases.

eraser.onclick = function(event) {

    gridcontainer.onmouseover = function(event) {
let target = event.target;
if (event.target.className === 'cell') {
target.style.backgroundColor = "";
target.style.opacity = "";
target.style.backgroundColor="rgba(242,13,242,0)";
} else {
    return;
}
}}


//Draws with pink transparent pen

moreopaque.onclick = function(event) {

gridcontainer.onmouseover = function(event) {
    let target = event.target;

    if (event.target.className === 'cell') {
    //gets background color of cell that was clicked
    let style = getComputedStyle(target);
    //saves that color as variable targetColor
    let targetColor = style.backgroundColor;
    console.log(targetColor);

    let RGBAcheck = targetColor.includes("rgba");
    console.log(RGBAcheck);
    if (RGBAcheck == true) {
        var rgbaArray = targetColor.substring(4, targetColor.length-1).replace(/ /g, '').replace(/\(|\)/g, '').split(",");
        let newColor = moreOpaqueRGB(rgbaArray[0],rgbaArray[1],rgbaArray[2],rgbaArray[3]);
        console.log(newColor);
target.style.backgroundColor=newColor;
    } else if (RGBAcheck == false){
        var rgbArray = targetColor.substring(3, targetColor.length-1).replace(/ /g, '').replace(/\(|\)/g, '').split(",");
        let newColor = RGBtoRGBA(rgbArray[0],rgbArray[1],rgbArray[2]);
        console.log(newColor);
target.style.backgroundColor=newColor;
    }      

    } else {
        return;
    }
}}



//Converts to Gray

grayscale.onclick = function(event) {

    gridcontainer.onmouseover = function(event) {
        let target = event.target;
    
        if (event.target.className === 'cell') {

        let style = getComputedStyle(target);
        let targetColor = style.backgroundColor;
        console.log(targetColor);

        let RGBAcheck = targetColor.includes("rgba");
        console.log(RGBAcheck);
        if (RGBAcheck == true) {
            var rgbaArray = targetColor.substring(4, targetColor.length-1).replace(/ /g, '').replace(/\(|\)/g, '').split(",");
            let newColor = RGBAtoGray(rgbaArray[0],rgbaArray[1],rgbaArray[2],rgbaArray[3]);
console.log(newColor);
target.style.backgroundColor=newColor;
        } else if (RGBAcheck == false){
            var rgbArray = targetColor.substring(3, targetColor.length-1).replace(/ /g, '').replace(/\(|\)/g, '').split(",");
            let newColor = RGBtoGray(rgbArray[0],rgbArray[1],rgbArray[2]);
            console.log(newColor);
            target.style.backgroundColor=newColor;
        }      
        } else {
            return;
        }
    }}





    //Darkens color. Maintains transparency if there.

darker.onclick = function(event) {

    gridcontainer.onmouseover = function(event) {
        let target = event.target;
    if (event.target.className === 'cell') {
    
        let style = getComputedStyle(target);
        let targetColor = style.backgroundColor;
        console.log(targetColor);

        let RGBAcheck = targetColor.includes("rgba");
        console.log(RGBAcheck);
            
            if (RGBAcheck == true) {
                var rgbaArray = targetColor.substring(4, targetColor.length-1).replace(/ /g, '').replace(/\(|\)/g, '').split(",");
                console.log(rgbaArray);

                //something wrong here.
                let newColor = RGBAtoHSLAdarker(rgbaArray[0],rgbaArray[1],rgbaArray[2],rgbaArray[3]);
                console.log(newColor);
                target.style.backgroundColor=newColor;
               

            } else {
                var rgbArray = targetColor.substring(3, targetColor.length-1).replace(/ /g, '').replace(/\(|\)/g, '').split(",");
                let newColor = RGBtoHSLdarker(rgbArray[0],rgbArray[1],rgbArray[2]);
                console.log(newColor);
                target.style.backgroundColor=newColor;
            }

        } else {
            return;
        }}}



let myColor = "rgb(255,0,0)";

pickersinglecolor.addEventListener('input', function(){
        myColor = pickersinglecolor.value;
        //figure out how to close color picker too
        console.log(myColor);
         });


//single color
singlecolor.onclick = function(event) {

        gridcontainer.onmouseover = function(event) {
    let target = event.target;
        if (event.target.className === 'cell') {
    target.style.backgroundColor=myColor; 
    }else{
        console.log("WHAT!!!");
        return;
    }
    }}
        


//Draws with random rainbow pen.

randomrainbow.onclick = function(event) {

    gridcontainer.onmouseover = function(event) {
let target = event.target;
if (event.target.className === 'cell') {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
console.log(randomColor);
target.style.backgroundColor="#"+randomColor;
}else{
    console.log("WHAT!!!");
    return;
}
}}


//Draws with random pastel rainbow HSLA pen.
//hmm when you do grayscale pen over this it doesn't maintain alpha

HSLArainbow.onclick = function(event) {

    gridcontainer.onmouseover = function(event) {
let target = event.target;
if (event.target.className === 'cell') {

    var randomPastel = `hsla(${~~(360 * Math.random())},70%,85%,0.7)`
console.log(randomPastel);
target.style.backgroundColor=randomPastel;
}else{
    console.log("WHAT!!!");
    return;
}
}}
