//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var renderer, scene, mesh, geometry, material, groundMesh;
var fieldTexture, skyTexture, textureMesh, gradientTexture;
var cameras = [];
var activeCamera = 0;

var lights = [];
var objects = [];

var house = new THREE.Object3D();
var ovni;
var trees;

var leftArrow = false;
var rightArrow = false;
var upArrow = false;
var downArrow = false;

var movementVector = new THREE.Vector3(0, 0, 0);
var clock;
var target;
var moon;

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

    var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
    cameras.push(camera);

    camera = new THREE.OrthographicCamera(window.innerWidth/-32, window.innerWidth/32, window.innerHeight/32, window.innerHeight/-32, -200, 500 );
    camera.position.set(200, 0, 60);
    cameras.push(camera);

}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

function createLights() {
    'use strict';

    var ambientLight = new THREE.AmbientLight(0xf9f8d2, 0.2);
    scene.add(ambientLight);
    lights.push(ambientLight);

    for (var i = 0; i < lightNumber; i++) {
        var angle = (i / lightNumber) * Math.PI * 2;

        var pointLight = new THREE.PointLight(0xFFFFFF, 0.2, 40);
        pointLight.position.set(Math.cos(angle) * lightRadius * 6, -2, Math.sin(angle) * lightRadius * 6);

        lights.push(pointLight);
    }

}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function generateFieldTexture() {
    'use strict'

    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#C1E685';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var colors = ['#FFFFFF', '#FFFF00', '#C8A2C8', '#ADD8E6'];
    var numCircles = 500;
    var radiusRange = [1, 2];
    var margin = 10;

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
    fieldTexture.wrapS = fieldTexture.wrapT = THREE.RepeatWrapping;
    fieldTexture.repeat.set(7, 7); 
    fieldTexture.needsUpdate = true;

}

function generateSkyTexture() {
    'use strict'

    var canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    var ctx = canvas.getContext('2d');

    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#00008B');
    gradient.addColorStop(1, '#8A2BE2');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var numStars = 3000;
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
    'use strict'

    const vertices = houseTriangles.flat();

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    material = new THREE.MeshStandardMaterial({ color: 0xF6F6F7, roughness: 0.8 });
    var houseMesh = new THREE.Mesh(geometry, material);
    house.add(houseMesh);
    objects.push(houseMesh);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(roof, 3));
    geometry.computeVertexNormals();
    material = new THREE.MeshStandardMaterial({ color: 0xFF8A3D, roughness: 0.8 });
    var roofMesh = new THREE.Mesh(geometry, material);
    house.add(roofMesh);
    objects.push(roofMesh);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(chimney1, 3));
    geometry.computeVertexNormals();
    material = new THREE.MeshStandardMaterial({ color: 0xABABAB, roughness: 0.8 });
    var chimney1Mesh = new THREE.Mesh(geometry, material);
    house.add(chimney1Mesh);
    objects.push(chimney1Mesh);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(chimney2, 3));
    geometry.computeVertexNormals();
    var chimney2Mesh = new THREE.Mesh(geometry, material);
    house.add(chimney2Mesh);
    objects.push(chimney2Mesh);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(window1, 3));
    geometry.computeVertexNormals();
    material = new THREE.MeshStandardMaterial({ color: 0x2DBAF3, metalness: 0.1, roughness: 0.1, transparent: true, opacity: 0.5 })
    var window1Mesh = new THREE.Mesh(geometry, material);
    house.add(window1Mesh);
    objects.push(window1Mesh);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(window2, 3));
    geometry.computeVertexNormals();
    var window2Mesh = new THREE.Mesh(geometry, material);
    house.add(window2Mesh);
    objects.push(window2Mesh);

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(door, 3));
    geometry.computeVertexNormals();
    material = new THREE.MeshStandardMaterial({ color: 0xB17E7E, roughness: 0.2 });
    var doorMesh = new THREE.Mesh(geometry, material);
    house.add(doorMesh);
    objects.push(doorMesh);

    house.position.set(-13,-1,-7);

    scene.add(house);

}

function createField() {
    'use strict'

    geometry = new THREE.PlaneGeometry(200, 200, 600, 600); 
    
    heightmapTexture.wrapS = heightmapTexture.wrapT = THREE.RepeatWrapping;
    heightmapTexture.repeat.set(10, 10); 

    material = new THREE.MeshPhongMaterial ({
        color: 0x808080, displacementMap: heightmapTexture, displacementScale: 10, map: fieldTexture, normalMap: normalmapTexture
    });
    groundMesh = new THREE.Mesh(geometry, material);

    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -10;
    scene.add(groundMesh);

}

function createTrees(){
    'use strict'

    var sizes = [1, 1.3, 1.5, 1.7, 2];
    const minX = -60;
    const maxX = 60;
    const minZ = -50;
    const maxZ = 50;
    const numTrees = 20;
    const minTreeDistance = 10;
    const treePositions = [];

    trees = new THREE.Object3D();

    for (let i = 1; i < numTrees; i++){
        let x;
        let z;
        let uniquePosition = false;

        while (!uniquePosition){
            x = Math.random() * (maxX - minX) + minX;
            if (x <= 5 && x >= -18)
                continue;
            z = Math.random() * (maxZ - minZ) + minZ;
            if (z <= 4 && z >= -12)
                continue;
            if (!treePositions.includes({x, z}) && hasMinimumDistance(x, z, treePositions, minTreeDistance)){
                uniquePosition = true;
                treePositions.push({x, z});
            }
        }
        let size = sizes[Math.floor(Math.random()*sizes.length)];
        createTree(x, -3, z, size, Math.random());
    }

    scene.add(trees);

}

function hasMinimumDistance(x, z, treePositions, minTreeDistance) {
    'use strict'

    for (let i = 0; i < treePositions.length; i++) {
        const position = treePositions[i];
        const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(z - position.z, 2));
        if (distance < minTreeDistance) {
        return false;
        }
    }
    return true;

}

function createTree(x, y, z, size, rot){
    'use strict';

    var tree = new THREE.Object3D();
    tree.name = 'tree';

    geometry = new THREE.CylinderGeometry(mainLogRadius*size, mainLogRadius*size, mainLogHeight*size, 32);
    material = new THREE.MeshStandardMaterial({ color: 0x715A17 });
    mesh = new THREE.Mesh(geometry, material);
    tree.add(mesh);
    objects.push(mesh);

    createBranch(tree, -mainLogRadius, mainLogHeight/2*size, 0, Math.PI/6, size);
    createBranch(tree, mainLogRadius, mainLogHeight/2*size, 0, -Math.PI/6, size);

    createLeaves(tree, (-mainLogRadius-sideLogRadius-1)*size, (mainLogHeight/2 + sideLogHeight/2)*size, 0, size);
    createLeaves(tree, (mainLogRadius+sideLogRadius+1)*size, (mainLogHeight/2 + sideLogHeight/2)*size , 0, size);
    createLeaves(tree, 0, mainLogHeight*size, 0, size);

    tree.position.set(x, y, z);
    tree.rotateY(Math.PI*rot)
    
    trees.add(tree);

}

function createBranch(obj, x, y, z, rot, size){
    'use strict'
    
    geometry = new THREE.CylinderGeometry(sideLogRadius, sideLogRadius, sideLogHeight*size, 32);
    geometry.rotateZ(rot);
    material = new THREE.MeshStandardMaterial({ color: 0x715A17 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    objects.push(mesh);

}

function createLeaves(obj, x, y, z, size){
    'use strict';

    geometry = new THREE.SphereGeometry(leavesRadiusX*size, 32, 32);
    geometry.scale(1, leavesRadiusY*size / (leavesRadiusX*size), 1);
    material = new THREE.MeshStandardMaterial({ color: 0x1C9013 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
    objects.push(mesh);

}

function createSkydoom() {
    'use strict';
    
    geometry = new THREE.SphereGeometry(100, 32, 32);
    material = new THREE.MeshPhongMaterial({ map: skyTexture,  side: THREE.BackSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotateX(Math.PI/3);
    scene.add(mesh);

}

function createOvni() {
    'use strict';

    ovni = new THREE.Object3D();

    geometry = new THREE.SphereGeometry(bodyRadius, 32, 32);
    geometry.scale(2, 2, 0.7);
    material = new THREE.MeshStandardMaterial({ color: 0xCED5D3, metalness: 0.6 });
    var body = new THREE.Mesh(geometry, material);
    body.rotateX(Math.PI / 2);
    ovni.add(body);
    objects.push(body);

    geometry = new THREE.SphereGeometry(cockpitRadius, 32, 32);
    geometry.scale(1.3, 1, 1.3);
    material = new THREE.MeshStandardMaterial({ color: 0x2DBAF3, transparent: true, opacity: 0.5 });
    var head = new THREE.Mesh(geometry, material);
    head.position.y = bodyRadius-1;
    ovni.add(head);
    objects.push(head);

    geometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
    material = new THREE.MeshStandardMaterial({ color: 0xE1E412 });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.y -= bodyRadius - 0.8;
    ovni.add(cylinder);
    objects.push(cylinder);

    var spotLight = new THREE.SpotLight(0xFFFFFF, 1, 200, Math.PI / 4, 0.5);
    spotLight.position.set(0, bodyRadius - 1, 0);
    lights.push(spotLight);
    ovni.add(spotLight);
    target = new THREE.Object3D();
    target.position.set(0, 0, 0);
    scene.add(target);
    spotLight.target = target;

    for (var i = 0; i < lightNumber; i++) {
        var angle = (i / lightNumber) * Math.PI * 2;
        var lightGeometry = new THREE.SphereGeometry(lightRadius, 16, 16);
        var lightMaterial = new THREE.MeshStandardMaterial({ color: 0xE1E412 });
        var light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(Math.cos(angle) * lightRadius * 6, -2, Math.sin(angle) * lightRadius * 6);
        light.rotateX(angle);
        ovni.add(light);
        ovni.add(lights[i+1]);
    }

    ovni.position.set(0, 15, 0);
    scene.add(ovni);
    
}

function createMoon() {
    'use strict';

    geometry = new THREE.SphereGeometry(7, 32, 32);
    material = new THREE.MeshStandardMaterial({ color: 0xFAFE85, emissive: 0xF8FC91 });
    moon = new THREE.Mesh(geometry, material);
    moon.position.set(30, 50, 0);
    scene.add(moon);

    const directionalLight = new THREE.DirectionalLight(0xFBFEAA, 0.2);
    const angle = -Math.PI / 4;
    const direction = new THREE.Vector3(30 - 2 * Math.cos(angle), 50 - 2, 2 * Math.sin(angle)).normalize();
    directionalLight.position.copy(direction);
    lights.push(directionalLight);
    scene.add(directionalLight);

}

function showTexture() {
    'use strict';

    geometry = new THREE.PlaneGeometry(30, 30);
    material = new THREE.MeshBasicMaterial({ map: fieldTexture });
    textureMesh = new THREE.Mesh(geometry, material);
    textureMesh.position.set(200, 0, 60);
    scene.add(textureMesh);

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';
    
    movementVector.set(0,0,0);

    const delta = clock.getDelta();
    ovni.rotation.y += rotationSpeed * delta;

    const distance = movementSpeed * delta;

    if(rightArrow) movementVector.x += 1;
    if(leftArrow) movementVector.x -= 1;
    if(upArrow) movementVector.z -= 1;
    if(downArrow) movementVector.z += 1;

    movementVector.normalize();
    movementVector.multiplyScalar(distance);
    
    ovni.position.add(movementVector);
    
    lights[7].updateMatrixWorld(); 
    target.position.set(ovni.position.x, 0, ovni.position.z); 

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';

    renderer.render(scene, cameras[activeCamera]);

    renderer.setAnimationLoop( function () {
        renderer.render(scene, cameras[activeCamera]);
    }); 

    update();

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    createScene();
    createCamera();
    createLights();
    createHouse();
    createOvni();
    createTrees();
    createMoon();
    generateFieldTexture();
    createField();
    generateSkyTexture();
    createSkydoom();
    showTexture();

    document.body.appendChild( VRButton.createButton( renderer ) );

    renderer.xr.enabled = true;

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

    update();
    render();
    renderer.setAnimationLoop(animate); 

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

    switch (e.key) {
        case "1":
            textureMesh.material.map = fieldTexture;
            textureMesh.needsUpdate = true;
            activeCamera = 1;
            break;

        case "2":
            textureMesh.material.map = skyTexture;
            textureMesh.needsUpdate = true;
            activeCamera = 1;
            break; 

        case "3":
            activeCamera = 0;
            break;

        case "ArrowLeft":
            leftArrow = true;
            break;

        case "ArrowRight":
            rightArrow = true;
            break;

        case "ArrowUp":
            upArrow = true;
            break;
            
        case "ArrowDown":
            downArrow = true;
            break;
        case "D":
        case "d":
            lights[8].visible = !lights[8].visible;
            break;
        case "P":
        case "p":
            for(var i = 1; i < lights.length - 2; i++)
                lights[i].visible = !lights[i].visible;
            break;
        case "S":
        case "s":
            lights[7].visible = !lights[7].visible;
            break;
        case "Q":
        case "q":
            for (let i = 0; i < objects.length; i++){
                let c = objects[i].material.color;
                objects[i].material = new THREE.MeshLambertMaterial({ color: c });
            }
            moon.material = new THREE.MeshLambertMaterial({ color: 0xFAFE85, emissive: 0xF8FC91 });
            break;
        case "W":
        case "w":
            for (let i = 0; i < objects.length; i++){
                let c = objects[i].material.color;
                objects[i].material = new THREE.MeshPhongMaterial({ color: c });
            }
            moon.material = new THREE.MeshPhongMaterial({ color: 0xFAFE85, emissive: 0xF8FC91 });
            break;
        case "E":
        case "e":
            for (let i = 0; i < objects.length; i++){
                let c = objects[i].material.color;
                objects[i].material = new THREE.MeshToonMaterial({ color: c });
            }
            moon.material = new THREE.MeshToonMaterial({ color: 0xFAFE85, emissive: 0xF8FC91 });
            break;
        case "R":
        case "r":
            for (let i = 0; i < objects.length; i++){
                let c = objects[i].material.color;
                objects[i].material = new THREE.MeshBasicMaterial({ color: c });
            }
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch (e.key) {
        case "ArrowLeft":
            leftArrow = false;
            break;
        case "ArrowRight":
            rightArrow = false;
            break;
        case "ArrowUp":
            upArrow = false;
            break;
        case "ArrowDown":
            downArrow = false;
            break;
    }

    update();

}