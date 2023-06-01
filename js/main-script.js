//////////////////////
/* GLOBAL VARIABLES */
//////////////////////


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    // Configuração básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionando uma geometria para representar o terreno
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundTexture = new THREE.TextureLoader().load('images/woodland.jpg');
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotação para posicionar o plano horizontalmente
scene.add(ground);

// Adicionando árvores dispersas no cenário
const treeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
const treeTexture = new THREE.TextureLoader().load('images/trunk.jpg');
const treeMaterial = new THREE.MeshBasicMaterial({ map: treeTexture });
for (let i = 0; i < 20; i++) {
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.x = Math.random() * 10 - 5; // Posição x aleatória
  tree.position.z = Math.random() * 10 - 5; // Posição z aleatória
  tree.position.y = 0.5; // Altura do tronco da árvore
  scene.add(tree);
}

// Adicionando uma casa alentejana à direita do cenário
//const houseGeometry = new THREE.BoxGeometry(2, 1, 2);
//const houseTexture = new THREE.TextureLoader().load('textures/house.jpg');
//const houseMaterial = new THREE.MeshBasicMaterial({ map: houseTexture });
//const house = new THREE.Mesh(houseGeometry, houseMaterial);
//house.position.x = 3; // Posição x da casa
//house.position.y = 0.5; // Altura da casa
//scene.add(house);

// Configuração da câmera
camera.position.z = 5;
camera.position.y = 1;
camera.lookAt(new THREE.Vector3(0, 0, 0));

animate();


}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}