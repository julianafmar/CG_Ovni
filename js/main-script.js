//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var renderer, scene;

var cameras = [];
var activeCamera = 0;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFEEAC2);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    // Camera frontal
    const cameraFrontal = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);
    cameras.push(cameraFrontal);

    // Camera lateral
    const cameraLateral = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraLateral.position.set(-500, 0, 0);
    cameraLateral.lookAt(scene.position);
    cameras.push(cameraLateral);

    // Camera de topo
    const cameraTopo = new THREE.OrthographicCamera(window.innerWidth/-40, window.innerWidth/40, window.innerHeight/40, window.innerHeight/-40, 1, 1000);
    cameraTopo.position.set(0, 500, -5);
    cameraTopo.lookAt(0, 0, -5);
    cameras.push(cameraTopo);

    // Camera isometrica (projecao ortogonal)
    const cameraIsometrica = new THREE.OrthographicCamera(-15*(window.innerWidth/window.innerHeight), 15*(window.innerWidth/window.innerHeight), 12, -12, 1, 1000);
    cameraIsometrica.position.set(500, 500, 500);
    cameraIsometrica.lookAt(scene.position);
    cameras.push(cameraIsometrica);

    // Camera isometrica (projecao perspectiva)
    const cameraPerspectiva = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    cameraPerspectiva.position.set(20, 20, 20);
    cameraPerspectiva.lookAt(scene.position);
    cameras.push(cameraPerspectiva);

}

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

    renderer.render(scene, cameras[activeCamera]);

    update();

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);

    // Configuração básica
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    
    render();

    requestAnimationFrame(animate);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        cameras[activeCamera].aspect = window.innerWidth / window.innerHeight;
        cameras[activeCamera].updateProjectionMatrix();
    }

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