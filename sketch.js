/* MoveNet Skeleton - Steve's Makerspace (most of this code is from TensorFlow)

MoveNet is developed by TensorFlow:
https://www.tensorflow.org/hub/tutorials/movenet

*/

let video, detector, dinosaurImg;
let poses = [];

function preload() {
  dinosaurImg = loadImage("dinosaur.gif");
}

async function init() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );
}

async function videoReady() {
  console.log("video ready");
  await getPoses();
}

async function getPoses() {
  if (detector) {
    poses = await detector.estimatePoses(video.elt, {
      maxPoses: 2,
      // flipHorizontal: true,
    });
  }
  requestAnimationFrame(getPoses);
}

async function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.hide();
  await init();

  stroke(255);
  strokeWeight(5);
}

function draw() {
  image(video, 0, 0);
  drawSkeleton();
  // flip horizontal
  let cam = get();
  translate(cam.width, 0);
  scale(1, -1);  //反向
  image(cam, 0, 0);

}

function drawSkeleton () {
  // Draw all the tracked landmark points
  for (let i = 0; i < poses. length; i++) {
  pose = poses [i];
  partA = pose. keypoints [3];
  partB = pose. keypoints [4];
  partC = pose. keypoints [9];
  partD = pose. keypoints [10];
  let speed = 2; 
    let posX = (frameCount * speed) % width;
    let negPosX = width - ((frameCount * speed) % width);
  //line(partA.x, partA.y, partB.x, partB.y);
  if (partA. score > 0.1) {
  image(dinosaurImg,posX, partA. y-25,50,50)
  }
  if (partB.score > 0.1) {
  image (dinosaurImg, posX, partB. y-25,50,50) 
  if (partB.score > 0.1) {
    push();
    textSize(40);
    text("412730748 陳玟慈", partA.x-750,partA.y-100);
    pop();
  }
  if (partC.score > 0.1) {
  image(dinosaurImg, partC.x, partC.y, 50, 50);
  }
  // Draw the GIF at the right wrist if the score is hi
  if (partD. score > 0.1) {
  image (dinosaurImg, partD.x, partD.y, 50, 50);
}
  }
}
}
/* Points (view on left of screen = left part - when mirrored)
  0 nose
  1 left eye
  2 right eye
  3 left ear
  4 right ear
  5 left shoulder
  6 right shoulder
  7 left elbow
  8 right elbow
  9 left wrist
  10 right wrist
  11 left hip
  12 right hip
  13 left knee
  14 right knee
  15 left foot
  16 right foot
*/

