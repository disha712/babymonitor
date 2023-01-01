var status="";
var object=[];
var alarm="";
function preload(){
    alarm=loadSound("alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Is Loaded");
    status=true;
}
function gotResult(error,results){
if(error){
console.log(error);
}
console.log(results);
object=results;
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
r=random(255);
g=random(255);
b=random(255);
 objectDetector.detect(video,gotResult);
for (i=0;i<object.length;i++){
document.getElementById("numberofobjects").innerHTML="Number of Objects Detected: "+object.length;
document.getElementById("status").innerHTML="Status: Object Detected";
fill(r,g,b);
percent=floor(object[i].confidence*100);
text(object[i].label +" "+percent+"%",object[i].x,object[i].y);
noFill();
stroke(r,g,b);
rect(object[i].x,object[i].y,object[i].width,object[i].height);
if (object[i].label=="person"){
    document.getElementById("status").innerHTML="Status: A Person is being detected";
    alarm.stop();
}
else{
    document.getElementById("status").innerHTML="Status: A person is not being detected!";
    alarm.play();
}
}
    }
}