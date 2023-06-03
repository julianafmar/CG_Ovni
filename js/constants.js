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
const house_length = 13;
const house_height = 4;
const house_width = 7;

//HOUSE ceiling
const ceiling_length = 13;
const ceiling_height = 2;
const ceiling_width = 7;

//HOUSE chimney
const chimney_length = 3;
const chimney_height = 2.5;
const chimney_width = 1;

//HOUSE door
const door_length = 1;
const door_height = 2.5;

//HOUSE windows
const window_edge_length = 1;

const default_width = 0.2;

//TREE
const main_log_radius = 0.75;
const main_log_height = 4;
const trunk_material = new THREE.MeshBasicMaterial({ color: 0x715A17 });

//TREE side log
const side_log_radius = 0.5;
const side_log_height = 2.5;

//TREE leaves
const leaves_radius_X = 3.5/2; //scale y = 1/1.75
const leaves_radius_Y = 1;
const leaves_material = new THREE.MeshBasicMaterial({ color: 0x1C9013 });

const movementSpeed = 10;
const movementVector = new THREE.Vector3(0, 0, 0);
const clock = new THREE.Clock();