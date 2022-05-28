
import { FirstPersonControls } from 'https://unpkg.com/three@latest/examples/jsm/controls/FirstPersonControls.js';
import { OrbitControls } from 'https://unpkg.com/three@latest/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from 'https://unpkg.com/three@latest/examples/jsm/libs/tween.module.min'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new FirstPersonControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(meters(40));
const axesHelper2 = new THREE.AxesHelper(meters(-40));
scene.add(axesHelper, axesHelper2);
const clock = new THREE.Clock(true)

controls.maxPolarAngle = (Math.PI * 0.6);
controls.maxDistance = meters(1)
controls.target = new THREE.Vector3(0, meters(5), 0)
const helper = new THREE.CameraHelper(camera);
scene.add(helper);





console.log('imported')

const wood = new THREE.TextureLoader().load("textures/wood.png");
const geometry = new THREE.PlaneGeometry(meters(32), meters(32));
const material = new THREE.MeshStandardMaterial({ map: wood, side: THREE.DoubleSide });
const ceiling = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide }));
ceiling.position.set(0, meters(30), 0)
ceiling.lookAt(0, 0, 0);
const floor = new THREE.Mesh(geometry, material);
floor.position.set(0, 0, 0)
floor.lookAt(0, 0.00000001, 0);
scene.add(ceiling, floor);

camera.position.x = meters(12);
camera.position.z = meters(15);
camera.position.y = meters(5)
let target = new THREE.Vector3( meters(8),  meters(5), meters(-15))

camera.lookAt(target)
controls.lookSpeed = 0.05
controls.movementSpeed = 10
controls.enabled = false

/** animation of camera */



function lookAtTween(x,y,z, dur = 3000, del) {
    const tween = new TWEEN.Tween(target)
        .to({
            x: meters(x),
            y: meters(z || 5),
            z: meters(y) 
        },dur || 3000)
        .easing(TWEEN.Easing.Linear.None)
    tween.onUpdate(() => {
        camera.lookAt(target)
    })
    tween.onComplete(()=>{
        camera.getWorldDirection(target)
    })
    return tween.delay(del || 4000)
}
function moveToTween(x,y, dur=3000, del) {
    const tween = new TWEEN.Tween(camera.position)
        .to({
            x: meters(x),
            y: meters(5),
            z: meters(y)
        },dur || 3000)
        .easing(TWEEN.Easing.Linear.None)
        tween.onComplete(()=>{
            camera.getWorldDirection(target)
        })
    return tween.delay(del)
}

lookAtTween(7, 12, 5, 4000).chain(moveToTween(12, 14, null, 4000).chain(lookAtTween(15, 12, 6.5, null, 500))).start()







function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(clock.getDelta())
    TWEEN.update();
}
animate();

// export values to be universally available
Object.assign(window, {
    scene, camera, THREE, renderer, controls, clock, lookAtTween, moveToTween, TWEEN
})