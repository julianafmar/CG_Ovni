//OVNI's body
const bodyRadius = 3; 

//OVNI´s head
const cockpitRadius = 2;

//ONVI's cilinder
const cylinderHeight = 0.2;
const cylinderRadius = 1;

//OVNI's lights 
const lightRadius = 0.5;
const lightNumber = 6;

//TREE
const mainLogRadius = 0.75;
const mainLogHeight = 4;

//TREE side log
const sideLogRadius = 0.5;
const sideLogHeight = 2.5;

//TREE leaves
const leavesRadiusX = 3.5/2; 
const leavesRadiusY = 1;

// movement
const movementSpeed = 10;
const rotationSpeed = 1;

// Texture
const heightmapTexture = new THREE.TextureLoader().load('images/heightmap.png');
const normalmapTexture = new THREE.TextureLoader().load('images/NormalMap.png');