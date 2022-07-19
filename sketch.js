var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();
  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
}

function spawnDoors() {
  if(frameCount % 240 == 0){
    door = createSprite(200,-50);
    climber = createSprite(200, 10);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.debug = true;
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    door.addImage("door",doorImg);
    climber.addImage("cimber", climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.lifetime = 700; 
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth = door.depth;
    ghost.depth += 1;
  }
  
}



function draw() {
  background(200);

  if(gameState == "play"){
    spawnDoors();

    if(keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x +3;
    }

    if(keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x -3;
    }

    if(keyDown("space")) {
      ghost.velocityY = -3;
    }

    ghost.velocityY = ghost.velocityY + 0.5;
    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0; 

    }

    if(invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy();
      gameState = 'end';
    }
   
    
    if(tower.y > 400){
        tower.y = 300
      }
      drawSprites();
  }

  if(gameState == "end"){
    text("Game Over",300,250);
  }
  
  
}
