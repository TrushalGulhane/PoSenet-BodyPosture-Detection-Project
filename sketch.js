let video;
let bodyPose;
let poses = [];
let connections;


function preload() {
    // Load the bodyPose model
    bodyPose = ml5.bodyPose();
  }

function setup() {
    createCanvas(640, 640);
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    bodyPose.detectStart(video, gotPoses);
    connections = bodyPose.getSkeleton();

    

    

}

function gotPoses(results) {
    // Store the model's results in a global variable
    poses = results;
  }

  function draw() {
    // Display the video
    image(video, 0, 0, width, height);
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < connections.length; j++) {
            let pointAIndex = connections[j][0];
            let pointBIndex = connections[j][1];
            let pointA = pose.keypoints[pointAIndex];
            let pointB = pose.keypoints[pointBIndex];
    if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.confidence > 0.1) {
            fill(0, 255, 0);
            noStroke();
            circle(keypoint.x, keypoint.y, 10);
          }
        }
      }
    }

