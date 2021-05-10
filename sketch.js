var backgroundImg
var obstaclesGroup,coinsGroup
var score=0;
var gameOver
var restart
var PLAY = 1
var END = 0
var gameState = PLAY;

function preload(){
  coinImage = loadImage("coin.png");
  fishImage = loadImage("fish.png");
  weedImage = loadImage("weed.png");
  waterImage = loadImage("water.png");
  algaeImage = loadImage("algae.png");
  endImage = loadImage("endimg.PNG");
  restartImage = loadImage("restartimg.jpg"); 
  coinsound = loadSound("coin-drop-1.mp3");
  endsound = loadSound("end sound.wav");

}

function setup(){
  canvas = createCanvas(1500,800);
  water = createSprite(500,300,200,200);
  water.addImage(waterImage);
  water.scale = 3;
  water.velocityX = -(3+score/10)

  fish = createSprite(300,200,10,10);
  fish.addImage(fishImage);
  fish.debug = false;
  fish.setCollider("rectangle",0,0,40,40)

obstaclesGroup = new Group();
coinsGroup = new Group();

gameOver = createSprite(400,200,10,10);
gameOver.addImage(endImage);
gameOver.visible  = false;

restart = createSprite(400,350,10,10);
restart.addImage(restartImage);
restart.visible  = false;
restart.scale = 0.5;


}
function draw(){
background("blue");

if(gameState === PLAY){
  if(water.x<0){
    water.x = 100
    }

    fish.addImage(fishImage);
    fish.x = mouseX;
    fish.y = mouseY;
    
    Obstacle();
    Coin();  
    
    if(obstaclesGroup.isTouching(fish)){
      fish.destroy();
      endsound.play();
      gameOver.visible =true;
      restart.visible =true;
      gameState = END

    
    
    }
    if(coinsGroup.isTouching(fish)){
      score = score+1
      coinsound.play();
      coinsGroup.destroyEach();
    }
    
}

if(gameState === END ){
  if(mousePressedOver(restart)){
    reset();
  }

}


drawSprites();
fill("black")
textSize(20)
text("score:"+score,100,100)

}


function Obstacle(){
  if(frameCount% 150===0){
  var obstacles = createSprite(Math.round(random(200,1200),Math.round(random(200,500))))
  obstacles.velocityX = -(3+score/10);
  var rand  = Math.round(random(1,2))
  switch(rand){
    case 1:obstacles.addImage(algaeImage)
    break;
    case 2:obstacles.addImage(weedImage)
    break;
    default:break

  }
  obstaclesGroup.debug = true;
  obstacles.setCollider("rectangle",0,0,40,40)
  obstaclesGroup.add(obstacles);
  
}
}

function Coin(){
  if(frameCount% 160===0){
  var coin = createSprite(Math.round(random(100,1200),Math.round(random(200,300))))
   coin.addImage(coinImage);
   var x=Math.round(random(1,10))
   coin.velocityX = Math.sign(-x)
   coin.velocityY = 4;
   coinsGroup.add(coin)
   coin.debug = false;
   coin.setCollider("rectangle",0,0,40,40)
}
}


function reset(){
  score = 0
  gameOver.visible = false;
  restart.visible  =false;
  gameState = PLAY
  fish = createSprite(300,200,10,10);
fish.addImage(fishImage);
}







