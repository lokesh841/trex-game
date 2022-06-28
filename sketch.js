
var trex ,trex_running;
var gameState=1

function preload(){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png") 
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  trexCollided=loadAnimation("trex_collided.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkPoint=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  //create a trex sprite
  trex=createSprite(40,height-150,10,40)
  trex.addAnimation("ABC",trex_running)
  trex.addAnimation("collided",trexCollided)
  trex.scale=0.7
  trex.debug=false
  trex.setCollider("circle",0,0,30)
  ground=createSprite(300,height-100,600,10)
  ground.addImage(groundImage  )
  ground2=createSprite(300,height-90,600,10)
  ground2.visible=false
  score=0
  cactusGroup=createGroup()
  cloudsGroup=createGroup()
  gameOver=createSprite(width/2,height/2,10,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.7
  restart=createSprite(width/2,height/2+50,10,10)
  restart.addImage(restartImage)
  restart.scale=0.5
}
function draw(){
  background("white")
  drawSprites()
  text("score="+score,width-100,50)

  trex.collide(ground2)
 
  if(gameState===1){
  if(touches.length>0|| keyDown("space")&&trex.y>height-130 ){
    trex.velocityY=-16
    jumpSound.play()
    touches=[]
  }
  trex.velocityY+=1
  gameOver.visible=false
  restart.visible=false
  ground.velocityX=-(3+score/100)
  if(ground.x<0){
    ground.x=ground.width/2

  }
  console.log(trex.y)
  spawnCloud()
  spawnCactus()
  if(cactusGroup.isTouching(trex)){
  gameState=2
  dieSound.play()
  
  }
  if(score%500===0&&score>0){
    checkPoint.play()
  }

  score=score+Math.round(getFrameRate()/60)

}
if(gameState===2){
  ground.velocityX=0
  cactusGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  gameOver.visible=true
  restart.visible=true
  cloudsGroup.setLifetimeEach(-1)
  cactusGroup.setLifetimeEach(-1) 
  trex.velocityY=0 
  trex.changeAnimation("collided")
  if(mousePressedOver(restart)){
  reset()

  }
}


}
function spawnCloud(){
if(frameCount%100===0){
cloud=createSprite(width,80,70,10)
cloud.velocityX=-3
cloud.addImage(cloudImage)
cloud.y=Math.round(random(100,200))
cloud.scale=0.7
trex.depth=cloud.depth
trex.depth+=1
cloud.lifetime=500 
cloudsGroup.add(cloud)
}





}
function spawnCactus(){
if(frameCount%60===0){
cactus=createSprite(width,height-120,10,40)
cactus.velocityX=-(6+score/100)
cactus.lifetime=150
cactusGroup.add(cactus)
cactus.scale=0.6 
rand=Math.round(random(1,6))
switch(rand){
case 1: cactus.addImage(cactus1)
break
case 2: cactus.addImage (cactus2)
break
case 3: cactus.addImage (cactus3)
break
case 4: cactus.addImage (cactus4)
break
case 5: cactus.addImage (cactus5)
break
case 6: cactus.addImage (cactus6)
break
default:break

}








}




}
function reset(){
gameState=1
cloudsGroup.destroyEach()
cactusGroup.destroyEach()
trex.changeAnimation("ABC")
score=0

}




