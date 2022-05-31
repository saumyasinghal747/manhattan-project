
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
//scene.add(axesHelper, axesHelper2);
const clock = new THREE.Clock(true)

controls.maxPolarAngle = (Math.PI * 0.6);
controls.maxDistance = meters(1)
controls.target = new THREE.Vector3(0, meters(5), 0)
const helper = new THREE.CameraHelper(camera);
//scene.add(helper);

scene.background = new THREE.Color(0xa0a0a0);
scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
dirLight.position.set(- 3, 10, - 10);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 40;
scene.add(dirLight);
const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);


const wood = new THREE.TextureLoader().load("textures/wood.png");
const geometry = new THREE.PlaneGeometry(meters(32), meters(32));
const material = new THREE.MeshStandardMaterial({ map: wood, side: THREE.DoubleSide, roughness: 0.3 });
const ceiling = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xcacaca, side: THREE.DoubleSide }));
ceiling.position.set(0, meters(30), 0)
ceiling.lookAt(0, 0, 0);
const floor = new THREE.Mesh(geometry, material);
floor.position.set(0, 0, 0)
floor.lookAt(0, 0.00000001, 0);
scene.add(ceiling, floor);

const loader = new THREE.TextureLoader();
/** PANELS */

function createPanel(imgURL, x, y, z, w, h, dirx, dirz) {
    const img = loader.load(`textures/panels/${imgURL}`)
    var material = new THREE.MeshPhongMaterial({
        map: img,
        side: THREE.DoubleSide,
        shininess: 100,
        specular: new THREE.Color(0xfff999)
    });
    x = meters(x);
    y = meters(y);
    z = meters(z);
    var geometry = new THREE.PlaneGeometry(meters(w), meters(h));

    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);

    // set the position of the image mesh in the x,y,z dimensions
    mesh.position.set(x, y, z)
    mesh.lookAt(x+dirx, y, z+dirz)

    // add the image to the scene
    scene.add(mesh);

}

createPanel('timeline1.png', 14.74, 6.5, -4, 18, 7, -1, 0)
const theta = 3*Math.PI/4
createPanel('timeline2.png', 4.95, 6.5, 2.9, 8.55, 7, -Math.cos(theta), -Math.sin(theta))
createPanel('timeline3.png', 1.26, 6.5, -9.5, 7, 7, 1, 0)
createPanel('numbers.png', 14.74, 6.5, 11, 6, 7, -1, 0)
createPanel('espionage1.png', -0.26, 6.5, -10, 6, 7, -1, 0)
createPanel('espionage2.png', -4.25, 6.5, -14.74, 4.5, 7, 0, 1)
createPanel('espionage3.png', -10.75, 6.5, -14.74, 4.5, 7, 0, 1)
createPanel('espionage4.png', -14.74, 6.5, -10.74, 4.5, 7, 1, 0)
createPanel('espionage5.png', -14.74, 6.5, -4.25, 4.5, 7, 1,0)
/** FILMING */

camera.position.x = meters(12);
camera.position.z = meters(15);
camera.position.y = meters(5)
let target = new THREE.Vector3(meters(8), meters(5), meters(-15))

camera.lookAt(target)
controls.lookSpeed = 0.05
controls.movementSpeed = 10
controls.lookVertical = true
controls.enabled = false

/** animation of camera */



function lookAtTween(x, y, z, dur = 3000, del) {
    const tween = new TWEEN.Tween(target)
        .to({
            x: meters(x),
            y: meters(z || 5),
            z: meters(y)
        }, dur || 1000)
        .easing(TWEEN.Easing.Linear.None)
    tween.onUpdate(() => {
        camera.lookAt(target)
    })
    return tween.delay(del || 4000)
}
function moveToTween(x, y, z, dur = 3000, del) {
    const tween = new TWEEN.Tween(camera.position)
        .to({
            x: meters(x),
            y: meters(z),
            z: meters(y)
        }, dur || 1000)
        .easing(TWEEN.Easing.Linear.None)
    tween.onComplete(() => {
        camera.getWorldDirection(target)
    })
    return tween.delay(del || 4000)
}

function tweenChain(root, ...tweens) {
    if (tweens.length == 0) {
        root.onComplete(() => { controls.enabled = true })
        return root
    }
    root.onStop(() => { controls.enabled = true })
    return root.chain(tweenChain(...tweens))
}

const movie = tweenChain(
    ///** 
    moveToTween(12, 15, 5, 0, 0),
    lookAtTween(8, -15, 5, 0, 0),
    lookAtTween(7, 12, 5, null, 0),
    moveToTween(12, 14, 5),
    lookAtTween(15, 12, 6.5, null, 500),
    lookAtTween(8, -15, 5, null, 500),
    //**/
    moveToTween(9, -2, 5, null, 0),
    lookAtTween(0, -10, 5.5),
    lookAtTween(15, -15, 5, null, 0),
    lookAtTween(15, 0, 5, null, 0),
    lookAtTween(6, 1, 5.5),
    lookAtTween(0, -1, 5.5),
    moveToTween(-2, -2, 5),
    lookAtTween(-15, 0, 5.5),
    lookAtTween(-15, -15, 5.5),
    lookAtTween(0, -15, 5.5),
    lookAtTween(-15, -15, 5.5),
    moveToTween(-5, -5, 5)

)//.start()



//camera.position.set(meters(9), meters(18), 0)
//camera.lookAt(0, meters(15), 0)



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

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    console.log({ code, name });
    if (name === 'p') {
        //movie.stop();
        movie.start()
    }
    if (code === 'Escape') {
        //alert('hi')
        TWEEN.removeAll();
        controls.enabled = !controls.enabled
        //movie.stop();
    }
}, false);