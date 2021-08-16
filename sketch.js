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
  
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
}

function draw() 
{
  background(200);
  if(gameState == "play")
  {
    if(ghost.y > 600){
      gameState = "end";
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space"))
  {
    ghost.velocityY = -10;
  }

  if(keyDown("left"))
  {
    ghost.x = ghost.x - 3;
  }

  if(keyDown("right"))
  {
    ghost.x = ghost.x + 3;
  }

  if(climbersGroup.isTouching(ghost))
  {
    ghost.velocityY = 0;
  }
  spawnObstacles();
  drawSprites();
  }

  if(gameState == "end")
  {
    textSize(40);
    fill("yellow");
    stroke("yellow");
    text("Game Over", 300, 300);
  }
 
}

function spawnObstacles(){
  if(frameCount % 200 == 0){
    var door = createSprite(200, -50);
    door.velocityY = 1;
    var climber = createSprite(200, 10);
    climber.velocityY = 1;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.x = Math.round(random(120,400));
    climber.x = door.x;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
}
