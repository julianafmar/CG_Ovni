//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var renderer, scene, mesh, material;
var fieldTexture, skyTexture, currentTexture;

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

function generateFieldTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext('2d');

    // Fundo verde claro
    ctx.fillStyle = '#C1E685';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Círculos brancos, amarelos, lilases e azuis-claros
    var colors = ['#FFFFFF', '#FFFF00', '#C8A2C8', '#ADD8E6'];
    var numCircles = 50;
    var radiusRange = [1, 5];
    var margin = 10; // Margin to avoid flowers near the edges

    for (var i = 0; i < numCircles; i++) {
        var x = Math.random() * (canvas.width - margin * 2) + margin;
        var y = Math.random() * (canvas.height - margin * 2) + margin;
        var radius = Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0];
        var color = colors[Math.floor(Math.random() * colors.length)];

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    fieldTexture = new THREE.Texture(canvas);
    fieldTexture.needsUpdate = true;
}


function generateSkyTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext('2d');

    // Fundo degradê de azul-escuro para violeta-escuro
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#00008B'); // Azul-escuro
    gradient.addColorStop(1, '#8A2BE2'); // Violeta-escuro

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pontilhado de estrelas brancas
    var numStars = 300;
    var radiusRange = [0.5, 2];

    ctx.fillStyle = '#FFFFFF';

    for (var i = 0; i < numStars; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * (radiusRange[1] - radiusRange[0]) + radiusRange[0];

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }

    skyTexture = new THREE.Texture(canvas);
    skyTexture.needsUpdate = true;
}

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
    generateFieldTexture();
    currentTexture = fieldTexture;

    var geometry = new THREE.PlaneGeometry(10, 10);
    material = new THREE.MeshBasicMaterial({ map: currentTexture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);

    // Adicionando uma geometria para representar o terreno
    /*const groundGeometry = new THREE.PlaneGeometry(10, 10);
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
    }*/

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

    switch (e.keyCode) {
        case 49: // Tecla 1
            currentTexture = fieldTexture;
            mesh.material.map = currentTexture;
            break;
        case 50: // Tecla 2
            currentTexture = skyTexture;
            mesh.material.map = currentTexture;
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}