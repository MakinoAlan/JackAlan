// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this! 
var normalMaterial = new THREE.MeshNormalMaterial();

// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

// GEOMETRY
var torsoGeometry = makeCube();
// var non_uniform_scale = new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,8,0, 0,0,0,1);
var non_uniform_scale = new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,8,0, 0,0,0,1);
torsoGeometry.applyMatrix(non_uniform_scale);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set
var limb_scale = new THREE.Matrix4().set(2,0,0,0, 0,5,0,0, 0,0,1,0, 0,0,0,1);
var l_hand_geo = makeCube();
l_hand_geo.applyMatrix(limb_scale);  

var tail_scale = new THREE.Matrix4().set(0.5,0,0,0, 0,0.5,0,0, 0,0,8,0, 0,0,0,1);
var tail_geo = makeCube();
tail_geo.applyMatrix(tail_scale); 

var head_scale = new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,5,0, 0,0,0,1);
var head_geo = makeCube();
head_geo.applyMatrix(head_scale);

var nose_scale = new THREE.Matrix4().set(2,0,0,0, 0,2,0,0, 0,0,4,0, 0,0,0,1);
var nose_geo = makeCube();
nose_geo.applyMatrix(nose_scale);

var paw_scale = new THREE.Matrix4().set(2,0,0,0, 0,0.8,0,0, 0,0,2,0, 0,0,0,1);
var paw_geo = makeCube();
paw_geo.applyMatrix(paw_scale);

var claw_scale = new THREE.Matrix4().set(0.3,0,0,0, 0,0.3,0,0, 0,0,2,0, 0,0,0,1);
var claw_geo = makeCube();
claw_geo.applyMatrix(claw_scale);

var ten_big_scale = new THREE.Matrix4().set(0.15,0,0,0, 0,0.15,0,0, 0,0,4,0, 0,0,0,1);
var ten_big_geo = makeCube();
ten_big_geo.applyMatrix(ten_big_scale);

var ten_small_scale = new THREE.Matrix4().set(0.2,0,0,0, 0,0.2,0,0, 0,0,2.5,0, 0,0,0,1);
var ten_small_geo = makeCube();
ten_small_geo.applyMatrix(ten_small_scale);

// MATRICES
// var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,5, 0,0,1,0, 0,0,0,1);

// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the headTorsoMatrix values, what changes in the render? Why? 
var l_hand_pos = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-2, 0,0,1,3, 0,0,0,1);  
var l_hand_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,l_hand_pos); 

var r_hand_pos = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-2, 0,0,1,3, 0,0,0,1);
var r_hand_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,r_hand_pos);

var l_foot_pos = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-2, 0,0,1,-3, 0,0,0,1);
var l_foot_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,l_foot_pos);


var r_foot_pos = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-2, 0,0,1,-3, 0,0,0,1);
var r_foot_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,r_foot_pos);  

var tail_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-8, 0,0,0,1);
var tail_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tail_pos);  

var head_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,4, 0,0,0,1);
var head_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,head_pos); 

var nose_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,2, 0,0,0,1);
var nose_pos_abs = new THREE.Matrix4().multiplyMatrices(head_pos_abs,nose_pos); 

var l_ten_big1_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,0, 0,0,1,2, 0,0,0,1);
var l_ten_big1_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big1_pos);
var l_ten_big2_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,0.3, 0,0,1,2, 0,0,0,1);
var l_ten_big2_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big2_pos);
var l_ten_big3_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,0.6, 0,0,1,2, 0,0,0,1);
var l_ten_big3_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big3_pos);
var l_ten_big4_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,0.9, 0,0,1,2, 0,0,0,1);
var l_ten_big4_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big4_pos);
var l_ten_big5_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,-0.3, 0,0,1,2, 0,0,0,1);
var l_ten_big5_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big5_pos);
var l_ten_big6_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,-0.6, 0,0,1,2, 0,0,0,1);
var l_ten_big6_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big6_pos);
var l_ten_big7_pos = new THREE.Matrix4().set(1,0,0,0.9, 0,1,0,-0.9, 0,0,1,2, 0,0,0,1);
var l_ten_big7_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big7_pos);
var l_ten_big8_pos = new THREE.Matrix4().set(1,0,0,0.6, 0,1,0,-0.9, 0,0,1,2, 0,0,0,1);
var l_ten_big8_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big8_pos);
var l_ten_big9_pos = new THREE.Matrix4().set(1,0,0,0.6, 0,1,0,0.9, 0,0,1,2, 0,0,0,1);
var l_ten_big9_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_big9_pos);
var l_ten_samll1_pos = new THREE.Matrix4().set(1,0,0,0.3, 0,1,0,-0.9, 0,0,1,2, 0,0,0,1);
var l_ten_samll1_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_samll1_pos);
var l_ten_samll2_pos = new THREE.Matrix4().set(1,0,0,0.3, 0,1,0,0.9, 0,0,1,2, 0,0,0,1);
var l_ten_samll2_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,l_ten_samll2_pos);


var r_ten_big1_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,0, 0,0,1,2, 0,0,0,1);
var r_ten_big1_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big1_pos);
var r_ten_big2_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,0.3, 0,0,1,2, 0,0,0,1);
var r_ten_big2_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big2_pos);
var r_ten_big3_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,0.6, 0,0,1,2, 0,0,0,1);
var r_ten_big3_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big3_pos);
var r_ten_big4_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,0.9, 0,0,1,2, 0,0,0,1);
var r_ten_big4_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big4_pos);
var r_ten_big5_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,-0.3, 0,0,1,2, 0,0,0,1);
var r_ten_big5_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big5_pos);
var r_ten_big6_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,-0.6, 0,0,1,2, 0,0,0,1);
var r_ten_big6_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big6_pos);
var r_ten_big7_pos = new THREE.Matrix4().set(1,0,0,-0.9, 0,1,0,-0.9, 0,0,1,2, 0,0,0,1);
var r_ten_big7_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big7_pos);
var r_ten_big8_pos = new THREE.Matrix4().set(1,0,0,-0.6, 0,1,0,-0.9, 0,0,1,2, 0,0,0,1);
var r_ten_big8_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big8_pos);
var r_ten_big9_pos = new THREE.Matrix4().set(1,0,0,-0.6, 0,1,0,0.9, 0,0,1,2, 0,0,0,1);
var r_ten_big9_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_big9_pos);
var r_ten_samll1_pos = new THREE.Matrix4().set(1,0,0,-0.3, 0,1,0,-0.9, 0,0,1,2, 0,0,0,1);
var r_ten_samll1_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_samll1_pos);
var r_ten_samll2_pos = new THREE.Matrix4().set(1,0,0,-0.3, 0,1,0,0.9, 0,0,1,2, 0,0,0,1);
var r_ten_samll2_pos_abs = new THREE.Matrix4().multiplyMatrices(nose_pos_abs,r_ten_samll2_pos);

var l_front_paw_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-2.1, 0,0,1,1, 0,0,0,1);
var l_front_paw_pos_abs = new THREE.Matrix4().multiplyMatrices(l_hand_pos_abs,l_front_paw_pos);

var l_front_paw_claw_pos1 = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_front_paw_claw_pos1_abs = new THREE.Matrix4().multiplyMatrices(l_front_paw_pos_abs,l_front_paw_claw_pos1);
var l_front_paw_claw_pos2 = new THREE.Matrix4().set(1,0,0,0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_front_paw_claw_pos2_abs = new THREE.Matrix4().multiplyMatrices(l_front_paw_pos_abs,l_front_paw_claw_pos2);
var l_front_paw_claw_pos3 = new THREE.Matrix4().set(1,0,0,0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_front_paw_claw_pos3_abs = new THREE.Matrix4().multiplyMatrices(l_front_paw_pos_abs,l_front_paw_claw_pos3);
var l_front_paw_claw_pos4 = new THREE.Matrix4().set(1,0,0,0.-0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_front_paw_claw_pos4_abs = new THREE.Matrix4().multiplyMatrices(l_front_paw_pos_abs,l_front_paw_claw_pos4);
var l_front_paw_claw_pos5 = new THREE.Matrix4().set(1,0,0,0.-0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_front_paw_claw_pos5_abs = new THREE.Matrix4().multiplyMatrices(l_front_paw_pos_abs,l_front_paw_claw_pos5);


var r_front_paw_pos = new THREE.Matrix4().set(-1,0,0,0, 0,1,0,-2.1, 0,0,1,1, 0,0,0,1);
var r_front_paw_pos_abs = new THREE.Matrix4().multiplyMatrices(r_hand_pos_abs,r_front_paw_pos);

var r_front_paw_claw_pos1 = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_front_paw_claw_pos1_abs = new THREE.Matrix4().multiplyMatrices(r_front_paw_pos_abs,r_front_paw_claw_pos1);
var r_front_paw_claw_pos2 = new THREE.Matrix4().set(1,0,0,0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_front_paw_claw_pos2_abs = new THREE.Matrix4().multiplyMatrices(r_front_paw_pos_abs,r_front_paw_claw_pos2);
var r_front_paw_claw_pos3 = new THREE.Matrix4().set(1,0,0,0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_front_paw_claw_pos3_abs = new THREE.Matrix4().multiplyMatrices(r_front_paw_pos_abs,r_front_paw_claw_pos3);
var r_front_paw_claw_pos4 = new THREE.Matrix4().set(1,0,0,0.-0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_front_paw_claw_pos4_abs = new THREE.Matrix4().multiplyMatrices(r_front_paw_pos_abs,r_front_paw_claw_pos4);
var r_front_paw_claw_pos5 = new THREE.Matrix4().set(1,0,0,0.-0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_front_paw_claw_pos5_abs = new THREE.Matrix4().multiplyMatrices(r_front_paw_pos_abs,r_front_paw_claw_pos5);

var l_rare_paw_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-2.1, 0,0,1,0.5, 0,0,0,1);
var l_rare_paw_pos_abs = new THREE.Matrix4().multiplyMatrices(l_foot_pos_abs,l_rare_paw_pos);

var l_rare_paw_claw_pos1 = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_rare_paw_claw_pos1_abs = new THREE.Matrix4().multiplyMatrices(l_rare_paw_pos_abs,l_rare_paw_claw_pos1);
var l_rare_paw_claw_pos2 = new THREE.Matrix4().set(1,0,0,0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_rare_paw_claw_pos2_abs = new THREE.Matrix4().multiplyMatrices(l_rare_paw_pos_abs,l_rare_paw_claw_pos2);
var l_rare_paw_claw_pos3 = new THREE.Matrix4().set(1,0,0,0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_rare_paw_claw_pos3_abs = new THREE.Matrix4().multiplyMatrices(l_rare_paw_pos_abs,l_rare_paw_claw_pos3);
var l_rare_paw_claw_pos4 = new THREE.Matrix4().set(1,0,0,0.-0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_rare_paw_claw_pos4_abs = new THREE.Matrix4().multiplyMatrices(l_rare_paw_pos_abs,l_rare_paw_claw_pos4);
var l_rare_paw_claw_pos5 = new THREE.Matrix4().set(1,0,0,0.-0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var l_rare_paw_claw_pos5_abs = new THREE.Matrix4().multiplyMatrices(l_rare_paw_pos_abs,l_rare_paw_claw_pos5);

var r_rare_paw_pos = new THREE.Matrix4().set(-1,0,0,0, 0,1,0,-2.1, 0,0,1,0.5, 0,0,0,1);
var r_rare_paw_pos_abs = new THREE.Matrix4().multiplyMatrices(r_foot_pos_abs,r_rare_paw_pos);

var r_rare_paw_claw_pos1 = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_rare_paw_claw_pos1_abs = new THREE.Matrix4().multiplyMatrices(r_rare_paw_pos_abs,r_rare_paw_claw_pos1);
var r_rare_paw_claw_pos2 = new THREE.Matrix4().set(1,0,0,0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_rare_paw_claw_pos2_abs = new THREE.Matrix4().multiplyMatrices(r_rare_paw_pos_abs,r_rare_paw_claw_pos2);
var r_rare_paw_claw_pos3 = new THREE.Matrix4().set(1,0,0,0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_rare_paw_claw_pos3_abs = new THREE.Matrix4().multiplyMatrices(r_rare_paw_pos_abs,r_rare_paw_claw_pos3);
var r_rare_paw_claw_pos4 = new THREE.Matrix4().set(1,0,0,0.-0.4, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_rare_paw_claw_pos4_abs = new THREE.Matrix4().multiplyMatrices(r_rare_paw_pos_abs,r_rare_paw_claw_pos4);
var r_rare_paw_claw_pos5 = new THREE.Matrix4().set(1,0,0,0.-0.8, 0,1,0,0, 0,0,1,1, 0,0,0,1);
var r_rare_paw_claw_pos5_abs = new THREE.Matrix4().multiplyMatrices(r_rare_paw_pos_abs,r_rare_paw_claw_pos5);


// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
torso.setMatrix(torsoMatrix)
scene.add(torso);

// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.
var l_hand = new THREE.Mesh(l_hand_geo,normalMaterial);
l_hand.setMatrix(l_hand_pos_abs);
scene.add(l_hand);

var l_front_paw = new THREE.Mesh(paw_geo,normalMaterial);
l_front_paw.setMatrix(l_front_paw_pos_abs);
scene.add(l_front_paw);
/*front-left paw's 5 claws */
var l_front_paw_claw1 = new THREE.Mesh(claw_geo,normalMaterial);
l_front_paw_claw1.setMatrix(l_front_paw_claw_pos1_abs);
scene.add(l_front_paw_claw1);
var l_front_paw_claw2 = new THREE.Mesh(claw_geo,normalMaterial);
l_front_paw_claw2.setMatrix(l_front_paw_claw_pos2_abs);
scene.add(l_front_paw_claw2);
var l_front_paw_claw3 = new THREE.Mesh(claw_geo,normalMaterial);
l_front_paw_claw3.setMatrix(l_front_paw_claw_pos3_abs);
scene.add(l_front_paw_claw3);
var l_front_paw_claw4 = new THREE.Mesh(claw_geo,normalMaterial);
l_front_paw_claw4.setMatrix(l_front_paw_claw_pos4_abs);
scene.add(l_front_paw_claw4);
var l_front_paw_claw5 = new THREE.Mesh(claw_geo,normalMaterial);
l_front_paw_claw5.setMatrix(l_front_paw_claw_pos5_abs);
scene.add(l_front_paw_claw5);

var l_foot = new THREE.Mesh(l_hand_geo,normalMaterial);
l_foot.setMatrix(l_foot_pos_abs);
scene.add(l_foot);

var l_rare_paw = new THREE.Mesh(paw_geo,normalMaterial);
l_rare_paw.setMatrix(l_rare_paw_pos_abs);
scene.add(l_rare_paw);

var l_rare_paw_claw1 = new THREE.Mesh(claw_geo,normalMaterial);
l_rare_paw_claw1.setMatrix(l_rare_paw_claw_pos1_abs);
scene.add(l_rare_paw_claw1);
var l_rare_paw_claw2 = new THREE.Mesh(claw_geo,normalMaterial);
l_rare_paw_claw2.setMatrix(l_rare_paw_claw_pos2_abs);
scene.add(l_rare_paw_claw2);
var l_rare_paw_claw3 = new THREE.Mesh(claw_geo,normalMaterial);
l_rare_paw_claw3.setMatrix(l_rare_paw_claw_pos3_abs);
scene.add(l_rare_paw_claw3);
var l_rare_paw_claw4 = new THREE.Mesh(claw_geo,normalMaterial);
l_rare_paw_claw4.setMatrix(l_rare_paw_claw_pos4_abs);
scene.add(l_rare_paw_claw4);
var l_rare_paw_claw5 = new THREE.Mesh(claw_geo,normalMaterial);
l_rare_paw_claw5.setMatrix(l_rare_paw_claw_pos5_abs);
scene.add(l_rare_paw_claw5);

var r_hand = new THREE.Mesh(l_hand_geo,normalMaterial);
r_hand.setMatrix(r_hand_pos_abs);
scene.add(r_hand);

var r_front_paw = new THREE.Mesh(paw_geo,normalMaterial);
r_front_paw.setMatrix(r_front_paw_pos_abs);
scene.add(r_front_paw);

var r_front_paw_claw1 = new THREE.Mesh(claw_geo,normalMaterial);
r_front_paw_claw1.setMatrix(r_front_paw_claw_pos1_abs);
scene.add(r_front_paw_claw1);
var r_front_paw_claw2 = new THREE.Mesh(claw_geo,normalMaterial);
r_front_paw_claw2.setMatrix(r_front_paw_claw_pos2_abs);
scene.add(r_front_paw_claw2);
var r_front_paw_claw3 = new THREE.Mesh(claw_geo,normalMaterial);
r_front_paw_claw3.setMatrix(r_front_paw_claw_pos3_abs);
scene.add(r_front_paw_claw3);
var r_front_paw_claw4 = new THREE.Mesh(claw_geo,normalMaterial);
r_front_paw_claw4.setMatrix(r_front_paw_claw_pos4_abs);
scene.add(r_front_paw_claw4);
var r_front_paw_claw5 = new THREE.Mesh(claw_geo,normalMaterial);
r_front_paw_claw5.setMatrix(r_front_paw_claw_pos5_abs);
scene.add(r_front_paw_claw5);

var r_foot = new THREE.Mesh(l_hand_geo,normalMaterial);
r_foot.setMatrix(r_foot_pos_abs);
scene.add(r_foot);

var r_rare_paw = new THREE.Mesh(paw_geo,normalMaterial);
r_rare_paw.setMatrix(r_rare_paw_pos_abs);
scene.add(r_rare_paw);

var r_rare_paw_claw1 = new THREE.Mesh(claw_geo,normalMaterial);
r_rare_paw_claw1.setMatrix(r_rare_paw_claw_pos1_abs);
scene.add(r_rare_paw_claw1);
var r_rare_paw_claw2 = new THREE.Mesh(claw_geo,normalMaterial);
r_rare_paw_claw2.setMatrix(r_rare_paw_claw_pos2_abs);
scene.add(r_rare_paw_claw2);
var r_rare_paw_claw3 = new THREE.Mesh(claw_geo,normalMaterial);
r_rare_paw_claw3.setMatrix(r_rare_paw_claw_pos3_abs);
scene.add(r_rare_paw_claw3);
var r_rare_paw_claw4 = new THREE.Mesh(claw_geo,normalMaterial);
r_rare_paw_claw4.setMatrix(r_rare_paw_claw_pos4_abs);
scene.add(r_rare_paw_claw4);
var r_rare_paw_claw5 = new THREE.Mesh(claw_geo,normalMaterial);
r_rare_paw_claw5.setMatrix(r_rare_paw_claw_pos5_abs);
scene.add(r_rare_paw_claw5);

var tail = new THREE.Mesh(tail_geo,normalMaterial);
tail.setMatrix(tail_pos_abs);
scene.add(tail);

var head = new THREE.Mesh(head_geo,normalMaterial);
head.setMatrix(head_pos_abs);
scene.add(head);

var nose = new THREE.Mesh(nose_geo,normalMaterial);
nose.setMatrix(nose_pos_abs);
scene.add(nose);

var l_ten_big1 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big1.setMatrix(l_ten_big1_pos_abs);
scene.add(l_ten_big1);
var l_ten_big2 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big2.setMatrix(l_ten_big2_pos_abs);
scene.add(l_ten_big2);
var l_ten_big3 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big3.setMatrix(l_ten_big3_pos_abs);
scene.add(l_ten_big3);
var l_ten_big4 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big4.setMatrix(l_ten_big4_pos_abs);
scene.add(l_ten_big4);
var l_ten_big5 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big5.setMatrix(l_ten_big5_pos_abs);
scene.add(l_ten_big5);
var l_ten_big6 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big6.setMatrix(l_ten_big6_pos_abs);
scene.add(l_ten_big6);
var l_ten_big7 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big7.setMatrix(l_ten_big7_pos_abs);
scene.add(l_ten_big7);
var l_ten_big8 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big8.setMatrix(l_ten_big8_pos_abs);
scene.add(l_ten_big8);
var l_ten_big9 = new THREE.Mesh(ten_big_geo,normalMaterial);
l_ten_big9.setMatrix(l_ten_big9_pos_abs);
scene.add(l_ten_big9);
var l_ten_small1 = new THREE.Mesh(ten_small_geo,normalMaterial);
l_ten_small1.setMatrix(l_ten_samll1_pos_abs); 
scene.add(l_ten_small1);
var l_ten_small2 = new THREE.Mesh(ten_small_geo,normalMaterial);
l_ten_small2.setMatrix(l_ten_samll2_pos_abs);
scene.add(l_ten_small2);

var r_ten_big1 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big1.setMatrix(r_ten_big1_pos_abs);
scene.add(r_ten_big1);
var r_ten_big2 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big2.setMatrix(r_ten_big2_pos_abs);
scene.add(r_ten_big2);
var r_ten_big3 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big3.setMatrix(r_ten_big3_pos_abs);
scene.add(r_ten_big3);
var r_ten_big4 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big4.setMatrix(r_ten_big4_pos_abs);
scene.add(r_ten_big4);
var r_ten_big5 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big5.setMatrix(r_ten_big5_pos_abs);
scene.add(r_ten_big5);
var r_ten_big6 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big6.setMatrix(r_ten_big6_pos_abs);
scene.add(r_ten_big6);
var r_ten_big7 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big7.setMatrix(r_ten_big7_pos_abs);
scene.add(r_ten_big7);
var r_ten_big8 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big8.setMatrix(r_ten_big8_pos_abs);
scene.add(r_ten_big8);
var r_ten_big9 = new THREE.Mesh(ten_big_geo,normalMaterial);
r_ten_big9.setMatrix(r_ten_big9_pos_abs);
scene.add(r_ten_big9);
var r_ten_small1 = new THREE.Mesh(ten_small_geo,normalMaterial);
r_ten_small1.setMatrix(r_ten_samll1_pos_abs); 
scene.add(r_ten_small1);
var r_ten_small2 = new THREE.Mesh(ten_small_geo,normalMaterial);
r_ten_small2.setMatrix(r_ten_samll2_pos_abs);
scene.add(r_ten_small2);

// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?
var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?
var smooth = true;

// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

function updateBody() {
  switch(true)
  {
      case(key == "U" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      if (smooth){
        p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      }
      else{p = p1;
      }
      


      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);

      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
      torso.setMatrix(torsoRotMatrix);

      var l_hand_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,l_hand_pos);
      l_hand.setMatrix(l_hand_rot); 

      var l_front_paw_rot = new THREE.Matrix4().multiplyMatrices(l_hand_rot,l_front_paw_pos);
      l_front_paw.setMatrix(l_front_paw_rot);

      var l_front_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos1);
      l_front_paw_claw1.setMatrix(l_front_paw_claw1_rot);
      var l_front_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos2);
      l_front_paw_claw2.setMatrix(l_front_paw_claw2_rot);
      var l_front_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos3);
      l_front_paw_claw3.setMatrix(l_front_paw_claw3_rot);
      var l_front_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos4);
      l_front_paw_claw4.setMatrix(l_front_paw_claw4_rot);
      var l_front_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos5);
      l_front_paw_claw5.setMatrix(l_front_paw_claw5_rot);

      var r_hand_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,r_hand_pos);
      r_hand.setMatrix(r_hand_rot); 

      var r_front_paw_rot = new THREE.Matrix4().multiplyMatrices(r_hand_rot,r_front_paw_pos);
      r_front_paw.setMatrix(r_front_paw_rot);

      var r_front_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos1);
      r_front_paw_claw1.setMatrix(r_front_paw_claw1_rot);
      var r_front_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos2);
      r_front_paw_claw2.setMatrix(r_front_paw_claw2_rot);
      var r_front_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos3);
      r_front_paw_claw3.setMatrix(r_front_paw_claw3_rot);
      var r_front_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos4);
      r_front_paw_claw4.setMatrix(r_front_paw_claw4_rot);
      var r_front_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos5);
      r_front_paw_claw5.setMatrix(r_front_paw_claw5_rot);

      
      var l_foot_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,l_foot_pos);
      l_foot.setMatrix(l_foot_rot); 

      var l_rare_paw_rot = new THREE.Matrix4().multiplyMatrices(l_foot_rot,l_rare_paw_pos);
      l_rare_paw.setMatrix(l_rare_paw_rot);

      var l_rare_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos1);
      l_rare_paw_claw1.setMatrix(l_rare_paw_claw1_rot);
      var l_rare_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos2);
      l_rare_paw_claw2.setMatrix(l_rare_paw_claw2_rot);
      var l_rare_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos3);
      l_rare_paw_claw3.setMatrix(l_rare_paw_claw3_rot);
      var l_rare_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos4);
      l_rare_paw_claw4.setMatrix(l_rare_paw_claw4_rot);
      var l_rare_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos5);
      l_rare_paw_claw5.setMatrix(l_rare_paw_claw5_rot);
      
      var r_foot_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,r_foot_pos);
      r_foot.setMatrix(r_foot_rot); 

      var r_rare_paw_rot = new THREE.Matrix4().multiplyMatrices(r_foot_rot,r_rare_paw_pos);
      r_rare_paw.setMatrix(r_rare_paw_rot);

      var r_rare_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos1);
      r_rare_paw_claw1.setMatrix(r_rare_paw_claw1_rot);
      var r_rare_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos2);
      r_rare_paw_claw2.setMatrix(r_rare_paw_claw2_rot);
      var r_rare_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos3);
      r_rare_paw_claw3.setMatrix(r_rare_paw_claw3_rot);
      var r_rare_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos4);
      r_rare_paw_claw4.setMatrix(r_rare_paw_claw4_rot);
      var r_rare_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos5);
      r_rare_paw_claw5.setMatrix(r_rare_paw_claw5_rot);

      var tail_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tail_pos);
      tail.setMatrix(tail_rot);

      var head_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,head_pos);
      head.setMatrix(head_rot);

      var nose_rot = new THREE.Matrix4().multiplyMatrices(head_rot,nose_pos);
      nose.setMatrix(nose_rot);

      var l_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big1_pos);
      l_ten_big1.setMatrix(l_ten_big1_rot);
      var l_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big2_pos);
      l_ten_big2.setMatrix(l_ten_big2_rot);
      var l_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big3_pos);
      l_ten_big3.setMatrix(l_ten_big3_rot);
      var l_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big4_pos);
      l_ten_big4.setMatrix(l_ten_big4_rot);
      var l_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big5_pos);
      l_ten_big5.setMatrix(l_ten_big5_rot);
      var l_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big6_pos);
      l_ten_big6.setMatrix(l_ten_big6_rot);
      var l_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big7_pos);
      l_ten_big7.setMatrix(l_ten_big7_rot);
      var l_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big8_pos);
      l_ten_big8.setMatrix(l_ten_big8_rot);
      var l_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big9_pos);
      l_ten_big9.setMatrix(l_ten_big9_rot);
      var l_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll1_pos);
      l_ten_small1.setMatrix(l_ten_small1_rot);
      var l_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll2_pos);
      l_ten_small2.setMatrix(l_ten_small2_rot);

      var r_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big1_pos);
      r_ten_big1.setMatrix(r_ten_big1_rot);
      var r_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big2_pos);
      r_ten_big2.setMatrix(r_ten_big2_rot);
      var r_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big3_pos);
      r_ten_big3.setMatrix(r_ten_big3_rot);
      var r_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big4_pos);
      r_ten_big4.setMatrix(r_ten_big4_rot);
      var r_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big5_pos);
      r_ten_big5.setMatrix(r_ten_big5_rot);
      var r_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big6_pos);
      r_ten_big6.setMatrix(r_ten_big6_rot);
      var r_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big7_pos);
      r_ten_big7.setMatrix(r_ten_big7_rot);
      var r_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big8_pos);
      r_ten_big8.setMatrix(r_ten_big8_rot);
      var r_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big9_pos);
      r_ten_big9.setMatrix(r_ten_big9_rot);
      var r_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll1_pos);
      r_ten_small1.setMatrix(r_ten_small1_rot);
      var r_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll2_pos);
      r_ten_small2.setMatrix(r_ten_small2_rot);

      break;

      case(key == "E" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      if (smooth){
        p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      }
      else{p = p1;
      }
      


      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p),   0, 
                                            0, Math.sin(p), Math.cos(p),   0,
                                            0,        0,         0,        1);

      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
      torso.setMatrix(torsoRotMatrix);

      var l_hand_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,l_hand_pos);
      l_hand.setMatrix(l_hand_rot); 

      var l_front_paw_rot = new THREE.Matrix4().multiplyMatrices(l_hand_rot,l_front_paw_pos);
      l_front_paw.setMatrix(l_front_paw_rot);

      var l_front_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos1);
      l_front_paw_claw1.setMatrix(l_front_paw_claw1_rot);
      var l_front_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos2);
      l_front_paw_claw2.setMatrix(l_front_paw_claw2_rot);
      var l_front_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos3);
      l_front_paw_claw3.setMatrix(l_front_paw_claw3_rot);
      var l_front_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos4);
      l_front_paw_claw4.setMatrix(l_front_paw_claw4_rot);
      var l_front_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(l_front_paw_rot,l_front_paw_claw_pos5);
      l_front_paw_claw5.setMatrix(l_front_paw_claw5_rot);

      var r_hand_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,r_hand_pos);
      r_hand.setMatrix(r_hand_rot); 

      var r_front_paw_rot = new THREE.Matrix4().multiplyMatrices(r_hand_rot,r_front_paw_pos);
      r_front_paw.setMatrix(r_front_paw_rot);

      var r_front_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos1);
      r_front_paw_claw1.setMatrix(r_front_paw_claw1_rot);
      var r_front_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos2);
      r_front_paw_claw2.setMatrix(r_front_paw_claw2_rot);
      var r_front_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos3);
      r_front_paw_claw3.setMatrix(r_front_paw_claw3_rot);
      var r_front_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos4);
      r_front_paw_claw4.setMatrix(r_front_paw_claw4_rot);
      var r_front_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(r_front_paw_rot,r_front_paw_claw_pos5);
      r_front_paw_claw5.setMatrix(r_front_paw_claw5_rot);

      
      var l_foot_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,l_foot_pos);
      l_foot.setMatrix(l_foot_rot); 

      var l_rare_paw_rot = new THREE.Matrix4().multiplyMatrices(l_foot_rot,l_rare_paw_pos);
      l_rare_paw.setMatrix(l_rare_paw_rot);

      var l_rare_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos1);
      l_rare_paw_claw1.setMatrix(l_rare_paw_claw1_rot);
      var l_rare_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos2);
      l_rare_paw_claw2.setMatrix(l_rare_paw_claw2_rot);
      var l_rare_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos3);
      l_rare_paw_claw3.setMatrix(l_rare_paw_claw3_rot);
      var l_rare_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos4);
      l_rare_paw_claw4.setMatrix(l_rare_paw_claw4_rot);
      var l_rare_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(l_rare_paw_rot,l_rare_paw_claw_pos5);
      l_rare_paw_claw5.setMatrix(l_rare_paw_claw5_rot);
      
      var r_foot_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,r_foot_pos);
      r_foot.setMatrix(r_foot_rot); 

      var r_rare_paw_rot = new THREE.Matrix4().multiplyMatrices(r_foot_rot,r_rare_paw_pos);
      r_rare_paw.setMatrix(r_rare_paw_rot);

      var r_rare_paw_claw1_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos1);
      r_rare_paw_claw1.setMatrix(r_rare_paw_claw1_rot);
      var r_rare_paw_claw2_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos2);
      r_rare_paw_claw2.setMatrix(r_rare_paw_claw2_rot);
      var r_rare_paw_claw3_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos3);
      r_rare_paw_claw3.setMatrix(r_rare_paw_claw3_rot);
      var r_rare_paw_claw4_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos4);
      r_rare_paw_claw4.setMatrix(r_rare_paw_claw4_rot);
      var r_rare_paw_claw5_rot = new THREE.Matrix4().multiplyMatrices(r_rare_paw_rot,r_rare_paw_claw_pos5);
      r_rare_paw_claw5.setMatrix(r_rare_paw_claw5_rot);

      var tail_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tail_pos);
      tail.setMatrix(tail_rot);

      var head_rot = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,head_pos);
      head.setMatrix(head_rot);

      var nose_rot = new THREE.Matrix4().multiplyMatrices(head_rot,nose_pos);
      nose.setMatrix(nose_rot);

      var l_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big1_pos);
      l_ten_big1.setMatrix(l_ten_big1_rot);
      var l_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big2_pos);
      l_ten_big2.setMatrix(l_ten_big2_rot);
      var l_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big3_pos);
      l_ten_big3.setMatrix(l_ten_big3_rot);
      var l_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big4_pos);
      l_ten_big4.setMatrix(l_ten_big4_rot);
      var l_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big5_pos);
      l_ten_big5.setMatrix(l_ten_big5_rot);
      var l_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big6_pos);
      l_ten_big6.setMatrix(l_ten_big6_rot);
      var l_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big7_pos);
      l_ten_big7.setMatrix(l_ten_big7_rot);
      var l_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big8_pos);
      l_ten_big8.setMatrix(l_ten_big8_rot);
      var l_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big9_pos);
      l_ten_big9.setMatrix(l_ten_big9_rot);
      var l_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll1_pos);
      l_ten_small1.setMatrix(l_ten_small1_rot);
      var l_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll2_pos);
      l_ten_small2.setMatrix(l_ten_small2_rot);

      var r_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big1_pos);
      r_ten_big1.setMatrix(r_ten_big1_rot);
      var r_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big2_pos);
      r_ten_big2.setMatrix(r_ten_big2_rot);
      var r_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big3_pos);
      r_ten_big3.setMatrix(r_ten_big3_rot);
      var r_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big4_pos);
      r_ten_big4.setMatrix(r_ten_big4_rot);
      var r_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big5_pos);
      r_ten_big5.setMatrix(r_ten_big5_rot);
      var r_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big6_pos);
      r_ten_big6.setMatrix(r_ten_big6_rot);
      var r_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big7_pos);
      r_ten_big7.setMatrix(r_ten_big7_rot);
      var r_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big8_pos);
      r_ten_big8.setMatrix(r_ten_big8_rot);
      var r_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big9_pos);
      r_ten_big9.setMatrix(r_ten_big9_rot);
      var r_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll1_pos);
      r_ten_small1.setMatrix(r_ten_small1_rot);
      var r_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll2_pos);
      r_ten_small2.setMatrix(r_ten_small2_rot);
      break;

      case(key == "G" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      if (smooth){
        p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      }
      else{p = p1;
      }
      
      p = p/3.5;

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p),   0, 
                                            0, Math.sin(p), Math.cos(p),   0,
                                            0,        0,         0,        1);
      var rotateY = new THREE.Matrix4().set(Math.cos(p),0, Math.sin(p),  0, 
                                            0, 1,0,   0, 
                                            -Math.sin(p),0, Math.cos(p),   0,
                                            0,        0,         0,        1);


      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateY);
      //torso.setMatrix(torsoRotMatrix);
      var pivot = new THREE.Matrix4().set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
      pivot.getInverse(pivot);
      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,head_pos);
      headRotMatrix.multiply(pivot);
      head.setMatrix(headRotMatrix);

      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,nose_pos);
      nose.setMatrix(noseRotMatrix);

      var nose_rot = noseRotMatrix;

      var l_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big1_pos);
      l_ten_big1.setMatrix(l_ten_big1_rot);
      var l_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big2_pos);
      l_ten_big2.setMatrix(l_ten_big2_rot);
      var l_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big3_pos);
      l_ten_big3.setMatrix(l_ten_big3_rot);
      var l_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big4_pos);
      l_ten_big4.setMatrix(l_ten_big4_rot);
      var l_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big5_pos);
      l_ten_big5.setMatrix(l_ten_big5_rot);
      var l_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big6_pos);
      l_ten_big6.setMatrix(l_ten_big6_rot);
      var l_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big7_pos);
      l_ten_big7.setMatrix(l_ten_big7_rot);
      var l_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big8_pos);
      l_ten_big8.setMatrix(l_ten_big8_rot);
      var l_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big9_pos);
      l_ten_big9.setMatrix(l_ten_big9_rot);
      var l_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll1_pos);
      l_ten_small1.setMatrix(l_ten_small1_rot);
      var l_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll2_pos);
      l_ten_small2.setMatrix(l_ten_small2_rot);
      var r_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big1_pos);
      r_ten_big1.setMatrix(r_ten_big1_rot);
      var r_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big2_pos);
      r_ten_big2.setMatrix(r_ten_big2_rot);
      var r_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big3_pos);
      r_ten_big3.setMatrix(r_ten_big3_rot);
      var r_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big4_pos);
      r_ten_big4.setMatrix(r_ten_big4_rot);
      var r_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big5_pos);
      r_ten_big5.setMatrix(r_ten_big5_rot);
      var r_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big6_pos);
      r_ten_big6.setMatrix(r_ten_big6_rot);
      var r_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big7_pos);
      r_ten_big7.setMatrix(r_ten_big7_rot);
      var r_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big8_pos);
      r_ten_big8.setMatrix(r_ten_big8_rot);
      var r_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big9_pos);
      r_ten_big9.setMatrix(r_ten_big9_rot);
      var r_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll1_pos);
      r_ten_small1.setMatrix(r_ten_small1_rot);
      var r_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll2_pos);
      r_ten_small2.setMatrix(r_ten_small2_rot);

      break;

      
           case(key == "H" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      if (smooth){
        p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      }
      else{p = p1;
      }
      
      p = 0-p/3.5;

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p),   0, 
                                            0, Math.sin(p), Math.cos(p),   0,
                                            0,        0,         0,        1);
      var rotateY = new THREE.Matrix4().set(Math.cos(p),0, Math.sin(p),  0, 
                                            0, 1,0,   0, 
                                            -Math.sin(p),0, Math.cos(p),   0,
                                            0,        0,         0,        1);


      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateY);
      //torso.setMatrix(torsoRotMatrix);
      var pivot = new THREE.Matrix4().set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
      pivot.getInverse(pivot);
      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,head_pos);
      headRotMatrix.multiply(pivot);
      head.setMatrix(headRotMatrix);

      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,nose_pos);
      nose.setMatrix(noseRotMatrix);

      var nose_rot = noseRotMatrix;

      var l_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big1_pos);
      l_ten_big1.setMatrix(l_ten_big1_rot);
      var l_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big2_pos);
      l_ten_big2.setMatrix(l_ten_big2_rot);
      var l_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big3_pos);
      l_ten_big3.setMatrix(l_ten_big3_rot);
      var l_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big4_pos);
      l_ten_big4.setMatrix(l_ten_big4_rot);
      var l_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big5_pos);
      l_ten_big5.setMatrix(l_ten_big5_rot);
      var l_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big6_pos);
      l_ten_big6.setMatrix(l_ten_big6_rot);
      var l_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big7_pos);
      l_ten_big7.setMatrix(l_ten_big7_rot);
      var l_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big8_pos);
      l_ten_big8.setMatrix(l_ten_big8_rot);
      var l_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_big9_pos);
      l_ten_big9.setMatrix(l_ten_big9_rot);
      var l_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll1_pos);
      l_ten_small1.setMatrix(l_ten_small1_rot);
      var l_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,l_ten_samll2_pos);
      l_ten_small2.setMatrix(l_ten_small2_rot);
      var r_ten_big1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big1_pos);
      r_ten_big1.setMatrix(r_ten_big1_rot);
      var r_ten_big2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big2_pos);
      r_ten_big2.setMatrix(r_ten_big2_rot);
      var r_ten_big3_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big3_pos);
      r_ten_big3.setMatrix(r_ten_big3_rot);
      var r_ten_big4_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big4_pos);
      r_ten_big4.setMatrix(r_ten_big4_rot);
      var r_ten_big5_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big5_pos);
      r_ten_big5.setMatrix(r_ten_big5_rot);
      var r_ten_big6_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big6_pos);
      r_ten_big6.setMatrix(r_ten_big6_rot);
      var r_ten_big7_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big7_pos);
      r_ten_big7.setMatrix(r_ten_big7_rot);
      var r_ten_big8_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big8_pos);
      r_ten_big8.setMatrix(r_ten_big8_rot);
      var r_ten_big9_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_big9_pos);
      r_ten_big9.setMatrix(r_ten_big9_rot);
      var r_ten_small1_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll1_pos);
      r_ten_small1.setMatrix(r_ten_small1_rot);
      var r_ten_small2_rot = new THREE.Matrix4().multiplyMatrices(nose_rot,r_ten_samll2_pos);
      r_ten_small2.setMatrix(r_ten_small2_rot);

      break;


      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate!

      


    default:
      break;
  }
}

// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}
  else if(keyboard.eventMatches(event,"D")){ 
    (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "D")}
  else if(keyboard.eventMatches(event,"E")){ 
    (key == "E")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "E")}
  else if(keyboard.eventMatches(event,"H")){ 
    (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "H")}
  else if(keyboard.eventMatches(event,"G")){ 
    (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "G")}

  else if(keyboard.eventMatches(event," ")){
     smooth = !smooth;
  }


  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });

// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
  updateBody();

  requestAnimationFrame(update);
  renderer.render(scene,camera);
}

update();