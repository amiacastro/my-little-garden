/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random, button, createButton, doubleClicked, fontBold, dist, noFill, 
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, collideRectRect, startConfetti, text, millis, createImg, mouseButton, CENTER,
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, floor, mouseClicked, LEFT, RIGHT, loadFont, createInput, textAlign, loadTable,
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, delayTime, reset, loadImage, image, seconds, doubleClicked  */

let  canvasWidth, canvasHeight, click, showInput, drop, drops, x, y, xpos, ypos, pictureURL, bkgd2, bkgd3, 
    time, m, key, potAndMouse, lockAndMouse, input, button, morse, roomBkgd, n, frequancy, plant = [], showNewScreen,
    poster1, poster2, poster3, shower, skelly, bkgd, darken, inputNum, final, radius, diameter, startNP, endNP, showInfoScreen,
    clickDoor, mouseHasKey, boxAndKey, showPaperKey, wrong, clickTriangle, keyEntered, startPI, endPI;
let pot1, pot2, pot3, pot4, pot5, pot6, npot1, npot2, npot3, npot4, npot5, npot6, loadedip1, loadedip2, loadedip3, loadedip4, loadedip5, loadedip6;

function preload() {
  loadTable("info.csv", "csv", "header", loadData);
  //load all images in
  loadImages();
  //loadData();
}

function setup(){
  canvasWidth = 1800;
  canvasHeight = 1200;
  createCanvas(canvasWidth, canvasHeight);
  showNewScreen = false;
  showInfoScreen = false;
  //loadData();
}

function draw(){ 
  //background
  image(bkgd, 0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < plant.length; i++) plant[i].display();
  newPlant();
  plantInfo()
}

//setup function, to help load images
function loadImages(){
  bkgd = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0527.PNG?v=1614523065814");
  bkgd2 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0521.PNG?v=1614442494593");
  bkgd3 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0524.PNG?v=1614499985680");
  //pots with just plants
  pot1 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0513.PNG?v=1614363784887");
  pot2 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0514.PNG?v=1614363818827");
  pot3 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0512.PNG?v=1614363824430");
  pot4 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0511.PNG?v=1614363828086");
  pot5 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0510.PNG?v=1614363834781");
  pot6 = loadImage("https://cdn.glitch.com/3d6459ea-6a97-4d52-8284-bf1ec4326cad%2FIMG-0509.PNG?v=1614363846390");
  drop = loadImage("https://cdn.glitch.com/2eb07d0a-f140-4313-bd57-63d635d56d06%2FUntitled-Artwork.png?v=1594849541954")
}

// Convert saved Bubble data into Bubble Objects
function loadData(table) {
  const plantData = table.getRows();
  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  const length = table.getRowCount();

  for (let i = 0; i < length; i++) {
    // Get name, xpos, ypos, pictureURL, frequancy
    const name = plantData[i].getString("name");
    const xpos = plantData[i].getNum("xpos");
    const ypos = plantData[i].getNum("ypos");
    const pictureURL = loadImage(plantData[i].getString("pictureURL"));
    const frequancy = plantData[i].getString("frequancy");
  

    // Put object in array
    plant.push(new Plants(name, xpos, ypos, pictureURL, frequancy));
  }
}


function pots(){ 
  //background
  loadedip1 = image(pot1, 149, 670);
  loadedip2 = image(pot2, 435, 722);
  loadedip3 = image(pot3, 660, 743);
  loadedip4 = image(pot4, 1150, 665);
  loadedip5 = image(pot5, 1410, 737);
  loadedip6 = image(pot6, 900, 741);
}

class Plants{
  constructor(name, xpos, ypos, pictureURL, frequancy){
    this.xpos = xpos;
    this.ypos = ypos;
    this.pictureURL = pictureURL;
    this.name = name;
    this.frequancy = frequancy;
    radius = 50;
    diameter = 100;
    
    this.over = false;
  }
  
  // Display name of Plant
  display() {
    image(this.pictureURL, this.xpos, this.ypos);
    dayofWeek(this.frequancy, this.xpos, this.ypos)
    
    if(collideRectCircle(this.xpos + 20, this.ypos + 40, 200, 200, mouseX, mouseY, 20)){
      fill(0);
      textSize(35)
      textAlign(CENTER);
      text(this.name, this.xpos + 10, this.ypos)
    }
  }
}

function newPlant(){
  //rect(145, 1029, 245, 55);
  //rect(1335,1029,350,55);
  startNP = collideRectCircle(145, 1029, 245, 50, mouseX, mouseY, 20);
  if (startNP && mouseIsPressed){
    showNewScreen= true;
  }
  
  if(showNewScreen){
    image(bkgd2, 0, 0, canvasWidth, canvasHeight);
    pots();
  }
  endNP = collideRectCircle(1335,1029,350,55, mouseX, mouseY, 20);
  if (endNP && mouseIsPressed && showNewScreen){
    showNewScreen= false;
  }
}

function plantInfo(){
  //rect(390,1029,357,55);
  startPI = collideRectCircle(390,1029,357,55, mouseX, mouseY, 20);
  if (startPI && mouseIsPressed){
    showInfoScreen= true;
  }
  
  if(showInfoScreen){
    image(bkgd3, 0, 0, canvasWidth, canvasHeight);
    
  }
  endPI = collideRectCircle(1335,1029,350,55, mouseX, mouseY, 20);
  if (endPI && mouseIsPressed && showInfoScreen){
    showInfoScreen= false;
  }
}

function dayofWeek(frequancy, x, y){
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var n = weekday[d.getDay()];
  
  textSize(15)
  textAlign(LEFT)
  fill(50);
  text(n, 10, 10, 70, 80);
  text("Drop: Need to Water", 10, 40);

  if(frequancy === n){
    image(drop, x, y, 50, 50)
  }
}


