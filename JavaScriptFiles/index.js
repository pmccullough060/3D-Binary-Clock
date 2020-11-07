"use strict"

var scene, camera, renderer;

initScene();
function initScene(){ //creating the three.js scene, camera, renderer and appending to document body..
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.position.x = 20;
    var centre = new THREE.Vector3();
    camera.lookAt(centre);
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    document.body.appendChild(renderer.domElement);
}

initLighting(); //setting the lighting for the scene
function initLighting(){
    var color = new THREE.Color(0.2, 0.2, 0.2);
    var ambient = new THREE.AmbientLight(color.getHex());
    scene.add(ambient);

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.x = 10;
    light.position.y = 10;
    light.position.z = 5;
    scene.add(light);
}

var control = new rotationControls(scene, camera, renderer, document);
control.Add(); //adding a simple rotation control to the scene

window.addEventListener('resize', ()=> {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function render(){
    requestAnimationFrame( render );
    renderer.render(scene, camera);
}

var hoursFirst, hoursSecond, minutesFirst, minutesSecond, secondsFirst, secondsSecond, ArrayContainer;

buildClock();
function buildClock(){ //creates the requisite arrays to describe the various orb things... then adds them to the scene
    hoursFirst = [createSphere(0, -7.5, 0), createSphere(0, -7.5, 3)];
    hoursSecond = [createSphere(0, -4.5, 0), createSphere(0, -4.5, 3), createSphere(0, -4.5, 6), createSphere(0, -4.5, 9)];
    minutesFirst = [createSphere(0, -1.5, 0), createSphere(0, -1.5, 3), createSphere(0, -1.5, 6)];
    minutesSecond = [createSphere(0, 1.5, 0), createSphere(0, 1.5, 3), createSphere(0, 1.5, 6), createSphere(0, 1.5, 9)];
    secondsFirst = [createSphere(0, 4.5, 0), createSphere(0, 4.5, 3), createSphere(0, 4.5, 6)];
    secondsSecond = [createSphere(0, 7.5, 0), createSphere(0, 7.5, 3), createSphere(0, 7.5, 6), createSphere(0, 7.5, 9)];

    var ArrayContainer = [hoursFirst, hoursSecond, minutesFirst, minutesSecond, secondsFirst, secondsSecond];

    scene.add(hoursFirst[0], hoursFirst[1]);
    scene.add(hoursSecond[0], hoursSecond[1], hoursSecond[2], hoursSecond[3]);
    scene.add(minutesFirst[0], minutesFirst[1], minutesFirst[2]);
    scene.add(minutesSecond[0], minutesSecond[1], minutesSecond[2], minutesSecond[3]);
    scene.add(secondsFirst[0], secondsFirst[1], secondsFirst[2]);
    scene.add(secondsSecond[0], secondsSecond[1], secondsSecond[2],secondsSecond[3]);
}

function createSphere(X, Y, Z){ //method is called and returns an instance of the sphere object to the caller - which then stores it in an array
    const geometry = new THREE.SphereGeometry(1, 30, 30);
    const material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    const sphereInstance = new THREE.Mesh(geometry, material);
    sphereInstance.translateX(X);
    sphereInstance.translateY(Y);
    sphereInstance.translateZ(Z);
    return sphereInstance;
}

function ChangeColour(sphere){ //Changes the colour of the ball thingies depending if they're "On" or "Off"
    sphere.material.color.setHex(0xffffff);
}

Clock();
function Clock(){ //the logic of representing time in binary x :)
    var d = new Date();
    var hour = d.getHours();

    for(var i = 0; i < 2; i++){

        var hourInt = IntAtIndex(hour, i);
        var hourBin = IntToBin(hourInt);

        for(var j = hourBin.length; j > 0; j--){
            var currentChar = hourBin.charAt(j);
            console.log(j);
        }
    }

    var firstHourValue = IntAtIndex(hour, 1);
    var BinaryString = IntToBin(firstHourValue);
}

function IntAtIndex(integerValue, index){
    var charAtIndex = integerValue.toString().charAt(index); //gets the first value 1 of 10 etc..
    return parseInt(charAtIndex);
}

function IntToBin(int){
    return (int >>> 0).toString(2);
}



var axisHelper = new THREE.AxesHelper(5);
scene.add(axisHelper);

renderer.render(scene, camera);