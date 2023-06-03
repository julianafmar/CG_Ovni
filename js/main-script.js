//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var renderer, scene, mesh, material;
var fieldTexture, skyTexture, currentTexture;
var house = [];

var camera;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    camera = new THREE.PerspectiveCamera(70,
        window.innerWidth / window.innerHeight,
        1,
        1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);

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

function createHouse() {

    const vertices = houseTriangles.flat();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // DUVIDA: ver material(cores não funcionam)
    var houseMaterial = new THREE.MeshStandardMaterial({
        color: 0xC8A2C8,
        opacity: 0.3,
        metalness: 0.2,
        roughness: 0.6
    });
          

    var houseMesh = new THREE.Mesh(geometry, houseMaterial);
    
    scene.add(houseMesh);

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

    renderer.render(scene, camera);

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
    createHouse();
    //generateFieldTexture();
    //generateSkyTexture();
    //currentTexture = fieldTexture;

    /*var geometry = new THREE.PlaneGeometry(10, 10);
    material = new THREE.MeshBasicMaterial({ map: currentTexture });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = - 7;
    scene.add(mesh);*/

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);

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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
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

    mesh.needsUpdate = true;

    render();

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}


/*

// Variáveis globais
var scene, camera, renderer;
var fieldTexture, terrainTexture;
var terrainMaterial;

// Tamanho do terreno
var terrainWidth = 10;
var terrainHeight = 10;

init();
generateTextures();
generateTerrain();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Adicionar luz ambiente
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Adicionar luz direcional
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
}

function generateTextures() {
    // Gerar a textura do campo floral
    // ...

    var textureLoader = new THREE.TextureLoader();
    var fieldTextureImage = textureLoader.load('path/to/field_texture.jpg', function() {
        fieldTexture = new THREE.Texture(fieldTextureImage);
        fieldTexture.wrapS = THREE.RepeatWrapping;
        fieldTexture.wrapT = THREE.RepeatWrapping;
        fieldTexture.repeat.set(terrainWidth / 2, terrainHeight / 2);
        fieldTexture.needsUpdate = true;
    });

    // Gerar a textura do terreno
    var terrainTextureImage = textureLoader.load('path/to/terrain_heightmap.png', function() {
        terrainTexture = new THREE.Texture(terrainTextureImage);
        terrainTexture.wrapS = THREE.RepeatWrapping;
        terrainTexture.wrapT = THREE.RepeatWrapping;
        terrainTexture.repeat.set(terrainWidth, terrainHeight);
        terrainTexture.needsUpdate = true;
    });
}

function generateTerrain() {
    var terrainGeometry = new THREE.PlaneGeometry(terrainWidth, terrainHeight, 64, 64);
    var terrainVertices = terrainGeometry.attributes.position.array;
    var terrainIndices = terrainGeometry.index.array;

    // Aplicar o mapa de alturas ao terreno
    for (var i = 0; i < terrainVertices.length; i += 3) {
        var x = terrainVertices[i];
        var z = terrainVertices[i + 2];
        var height = getTerrainHeight(x, z); // Função para obter a altura do mapa de alturas

        terrainVertices[i + 1] = height;
    }

    // Criar o material do terreno com a textura do campo floral
    terrainMaterial = new THREE.MeshBasicMaterial({ map: fieldTexture });

    // Criar a malha do terreno
    var terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    scene.add(terrainMesh);
}

function getTerrainHeight(x, z) {
    // Função para obter a altura do mapa de alturas
    // Implemente aqui a lógica para obter a altura do mapa de alturas
    // Pode usar a posição (x, z) para mapear para as coordenadas do mapa de alturas

    return 0; // Retorna uma altura padrão para fins de exemplo
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
*/