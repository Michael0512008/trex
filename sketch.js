var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds, CloudsGroup, cloudsImage
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, ObstaclesGroup
var count

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")

cloudsImage = loadImage("cloud.png")  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  count=0
ObstaclesGroup = new Group()
CloudsGroup = new Group()


}

function draw() {
  background(180);
  
  count = count + Math.round(getFrameRate()/60);
  text("Score: "+ count, 250, 100);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds()
  spawnObstacles()
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
    switch(rand) {
      case 1 : obstacle.addImage("o1", obstacle1)
        break;
              case 2 : obstacle.addImage("o2", obstacle2)
        break;
              case 3 : obstacle.addImage("o3", obstacle3)
        break;
              case 4 : obstacle.addImage("o4", obstacle4)
        break;
              case 5 : obstacle.addImage("o5", obstacle5)
        break;
              case 6 : obstacle.addImage("o6", obstacle6)
        default : break;
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y =Math.round( random(80,120));
    cloud.addImage("c1", cloudsImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
