song = "";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet está inicializado')
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("Crimson");
    stroke("Crimson");

    circle(leftWristX,leftWristY,20);
    circle(rightWristX,rightWristY,20);

    if(scoreLeftWrist>0.2)
    {
        num_leftWristY=Number(leftWristY);
        remove_decimals=floor(num_leftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume= "+volume;
        song.setVolume(volume);  
    }
    if(scoreRightWrist>0.2)
    {
     if(rightWristY > 0 && rightWristY <=100)
     {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
     }
     else  if(rightWristY > 100 && rightWristY <=200)
     {
        document.getElementById("speed").innerHTML="Speed = 1x";
        song.rate(1);
     } 
     else  if(rightWristY > 200 && rightWristY <=300)
     {
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
     } 
     else  if(rightWristY > 300 && rightWristY <=400)
     {
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);
     } 
     else  if(rightWristY > 400)
     {
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
     } 
    }
}

function play(){
    song.play();
    song.setValue(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score_leftWrist=" +scoreLeftWrist)
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score_RightWrist=" +scoreLeftWrist)

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("Muñeca izquierda X= "+ leftWristX + "\nMuñeca izquierda Y= "+ leftWristY);
        console.log("Muñeca derecha X= "+ rightWristX + "\nMuñeca derecha Y= "+ rightWristY);
    }

}