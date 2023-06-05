//OVNI's body
const bodyRadius = 3; // usar scale para diminuir em y = 1/3*body

//OVNI´s head
const cockpitRadius = 2;

//ONVI's cilinder
const cylinderHeight = 0.2;
const cylinderRadius = 1;

//OVNI's lights 
const lightRadius = 0.5;
const lightNumber = 6;

//HOUSE 
const houseLength = 13;
const houseHeight = 4;
const houseWidth = 7;

//HOUSE ceiling
const ceilingLength = 13;
const ceilingHeight = 2;
const ceilingWidth = 7;

//HOUSE chimney
const chimneyLength = 3;
const chimneyHeight = 2.5;
const chimneyWidth = 1;

//HOUSE door
const doorLength = 1;
const doorHeight = 2.5;

//HOUSE windows
const windowEdgeLength = 1;

const defaultWidth = 0.2;

//TREE
const mainLogRadius = 0.75;
const mainLogHeight = 4;
const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x715A17 });

//TREE side log
const sideLogRadius = 0.5;
const sideLogHeight = 2.5;

//TREE leaves
const leavesRadiusX = 3.5/2; //scale y = 1/1.75
const leavesRadiusY = 1;
const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x1C9013 });

// movement
const movementSpeed = 10;
const movementVector = new THREE.Vector3(0, 0, 0);
var clock;