//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var renderer, scene, mesh, geometry, material;
var fieldTexture, skyTexture, currentTexture;
var camera;

var house;
var ovni;

var leftArrow = false;
var rightArrow = false;
var upArrow = false;
var downArrow = false;

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
    /*var houseMaterial = new THREE.MeshStandardMaterial({
        color: 0xC8A2C8,
        opacity: 0.3,
        metalness: 0.2,
        roughness: 0.6
    });*/
          

    var houseMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xe4e3e3, wireframe: false }));
    house.add(houseMesh);
    //scene.add(houseMesh);

    var geometry_roof = new THREE.BufferGeometry();
    geometry_roof.setAttribute('position', new THREE.Float32BufferAttribute(roof, 3));

    /*var roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 1
    });*/

    var roofMesh = new THREE.Mesh(geometry_roof, new THREE.MeshBasicMaterial({ color: 0xff8a3d, wireframe: false }));
    house.add(roofMesh);

    var geometry_chimney1 = new THREE.BufferGeometry();
    geometry_chimney1.setAttribute('position', new THREE.Float32BufferAttribute(chimney1, 3));
    //material igual ao da casa

    var chimney1_mesh = new THREE.Mesh(geometry_chimney1, new THREE.MeshBasicMaterial({ color: 0xffbcbc, wireframe: false }));
    house.add(chimney1_mesh);

    var geometry_chimney2 = new THREE.BufferGeometry();
    geometry_chimney2.setAttribute('position', new THREE.Float32BufferAttribute(chimney2, 3));
    //material igual ao da casa

    var chimney2_mesh = new THREE.Mesh(geometry_chimney2, new THREE.MeshBasicMaterial({ color: 0xffbcbc, wireframe: false }));
    house.add(chimney2_mesh);

    var geometry_window1 = new THREE.BufferGeometry();
    geometry_window1.setAttribute('position', new THREE.Float32BufferAttribute(window1, 3));

    /*var windowMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.3,
        metalness: 0.2,
        roughness: 0.0
    });*/

    var window1_mesh = new THREE.Mesh(geometry_window1, new THREE.MeshBasicMaterial({ color: 0xb17e7e, wireframe: false }));
    house.add(window1_mesh);

    var geometry_window2 = new THREE.BufferGeometry();
    geometry_window2.setAttribute('position', new THREE.Float32BufferAttribute(window2, 3));

    var window2_mesh = new THREE.Mesh(geometry_window2, new THREE.MeshBasicMaterial({ color: 0xb17e7e, wireframe: false }));
    house.add(window2_mesh);

    var geometry_door = new THREE.BufferGeometry();
    geometry_door.setAttribute('position', new THREE.Float32BufferAttribute(door, 3));

    var door_mesh = new THREE.Mesh(geometry_door, new THREE.MeshBasicMaterial({ color: 0xb17e7e, wireframe: false }));
    house.add(door_mesh);

    scene.add(house);
}

function createTrees(){
    var sizes = [1, 1.3, 1.5, 1.7, 2];
    const treePositions = [];
    const minX = -50;
    const maxX = 50;
    const minZ = -40;
    const maxZ = 40;
    const numTrees = 25;
    const minTreeDistance = 10;

    for (let i = 1; i < numTrees; i++){
        let x;
        let z;
        let uniquePosition = false;

        while (!uniquePosition){
            x = Math.random() * (maxX - minX) + minX;
            if (x <= 18 && x >= -5)
                continue;
            console.log("x: " + x);
            z = Math.random() * (maxZ - minZ) + minZ;
            if (z <= 11 && z >= -5)
                continue;
            console.log("z: " + z);
            if (!treePositions.includes({x, z}) && hasMinimumDistance(x, z, treePositions, minTreeDistance)){
                uniquePosition = true;
                treePositions.push({x, z});
            }
        }
        let size = sizes[Math.floor(Math.random()*sizes.length)];
        createTree(x, 0, z, size, Math.random());
    }
}

function hasMinimumDistance(x, z, treePositions, minTreeDistance) {
    for (let i = 0; i < treePositions.length; i++) {
        const position = treePositions[i];
        const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(z - position.z, 2));
        if (distance < minTreeDistance) {
        return false; // Position does not meet minimum distance requirement
        }
    }
    return true; // Position meets minimum distance requirement
}

function createTree(x, y, z, size, rot){
    'use strict';

    var tree = new THREE.Object3D();
    tree.name = 'tree';

    geometry = new THREE.CylinderGeometry(main_log_radius*size, main_log_radius*size, main_log_height*size, 32);
    mesh = new THREE.Mesh(geometry, trunk_material);
    tree.add(mesh);

    createBranch(tree, -main_log_radius, main_log_height/2*size, 0, Math.PI/6, size);
    createBranch(tree, main_log_radius, main_log_height/2*size, 0, -Math.PI/6, size);

    createLeaves(tree, (-main_log_radius-side_log_radius-1)*size, (main_log_height/2 + side_log_height/2)*size, 0, size);
    createLeaves(tree, (main_log_radius+side_log_radius+1)*size, (main_log_height/2 + side_log_height/2)*size , 0, size);
    createLeaves(tree, 0, main_log_height*size, 0, size);

    tree.position.set(x, y, z);
    tree.rotateY(Math.PI*rot)
    
    scene.add(tree);
}

function createBranch(obj, x, y, z, rot, size){
    geometry = new THREE.CylinderGeometry(side_log_radius, side_log_radius, side_log_height*size, 32);
    geometry.rotateZ(rot);
    mesh = new THREE.Mesh(geometry, trunk_material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createLeaves(obj, x, y, z, size){
    'use strict';

    geometry = new THREE.SphereGeometry(leaves_radius_X*size, 32, 32);
    geometry.scale(1, leaves_radius_Y*size / (leaves_radius_X*size), 1);
    mesh = new THREE.Mesh(geometry, leaves_material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createOvni() {
    'use strict';

    ovni = new THREE.Object3D();

    var bodyGeometry = new THREE.SphereGeometry(bodyRadius, 32, 32);
    bodyGeometry.scale(2, 2, 0.7);
    var bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xCED5D3 });
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotateX(Math.PI / 2);
    ovni.add(body);

    var headGeometry = new THREE.SphereGeometry(cockpitRadius, 32, 32);
    headGeometry.scale(1.3, 1, 1.3);
    var headMaterial = new THREE.MeshBasicMaterial({ color: 0x2DBAF3 });
    var head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = bodyRadius-1;
    ovni.add(head);

    var cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
    var cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xE1E412 });
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.y -= bodyRadius - 0.8;
    ovni.add(cylinder);

    var spotLight = new THREE.SpotLight(0xFFFFFF, 1, 200, Math.PI / 4, 0.5);
    spotLight.position.y -= bodyRadius - 0.8;
    spotLight.target.position.set(0, -bodyRadius - cylinderHeight - 10, 0);
    ovni.add(spotLight);

    for (var i = 0; i < lightNumber; i++) {
        var angle = (i / lightNumber) * Math.PI * 2;

        var lightGeometry = new THREE.SphereGeometry(lightRadius, 16, 16);
        var lightMaterial = new THREE.MeshBasicMaterial({ color: 0xE1E412 });
        var light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(Math.cos(angle) * lightRadius * 6, -2, Math.sin(angle) * lightRadius * 6);
        light.rotateX(angle);
        ovni.add(light);

        var pointLight = new THREE.PointLight(0xFFFFFF, 1, 20);
        pointLight.position.set(Math.cos(angle) * lightRadius * 6, -2, Math.sin(angle) * lightRadius * 6);
        ovni.add(pointLight);
    }

    ovni.position.set(0, 15, 0);
    scene.add(ovni);
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

    house = new THREE.Object3D();

    createScene();
    createCamera();
    createHouse();
    createOvni();
    createTrees();
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

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const distance = movementSpeed * delta;

    // Parece me que isto esta a fazer o ovni mudar a direçao, mas n sei se estou so louca
    //if (movementVector.x != 0 && movementVector.z !=0)
    //    movementVector.normalize();
    

    ovni.position.add(movementVector.clone().multiplyScalar(distance));

    ovni.rotation.y += 0.01;

    render();

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

    switch (e.key) {
        case "1":
            currentTexture = fieldTexture;
            mesh.material.map = currentTexture;
            mesh.needsUpdate = true;
            break;
        case "2":
            currentTexture = skyTexture;
            mesh.material.map = currentTexture;
            mesh.needsUpdate = true;
            break; 
        case "ArrowLeft":
            leftArrow = true;
            if (rightArrow == true)
                movementVector.x = 0;
            else
                movementVector.x = -1;
            break;
        case "ArrowRight":
            rightArrow = true;
            if (leftArrow == true) {
                movementVector.x = 0;
            } else {
                movementVector.x = 1;
            }
            break;
        case "ArrowUp":
            upArrow = true;
            if(downArrow == true)
                movementVector.z = 0;
            else
                movementVector.z = -1;
            break;
        case "ArrowDown":
            downArrow = true;
            if(upArrow == true)
                movementVector.z = 0;
            else
                movementVector.z = 1;
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch (e.keyCode) {
        case 37: // Left Arrow
            leftArrow = false;
            movementVector.x = 0;
            break;
        case 39: // Right Arrow
            rightArrow = false;
            movementVector.x = 0;
            break;
        case 38: // Up Arrow
            upArrow = false;
            movementVector.z = 0;
            break;
        case 40: // Down Arrow
            downArrow = false;
            movementVector.z = 0;
            break;
    }

    update();

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