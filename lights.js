import { RectAreaLightHelper } from 'https://unpkg.com/three@latest/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'https://unpkg.com/three@latest/examples/jsm/lights/RectAreaLightUniformsLib.js';

const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.8); // very very dim white light to help with editing
scene.add(ambientLight);

const intensity = 0.2

const light1 = new THREE.PointLight(0xffeedd, intensity, meters(30));
light1.position.set(meters(8), meters(31), meters(12));
const light2 = new THREE.PointLight(0xffeedd, intensity, meters(30));
light2.position.set(-meters(8), meters(31), meters(8));
const light3 = new THREE.PointLight(
    0xffeedd,
    intensity, meters(30));
light3.position.set(-meters(8), meters(31), -meters(8));
const light4 = new THREE.PointLight(0xffeedd, intensity, meters(30));
light4.position.set(meters(8), meters(31), -meters(8));
scene.add(light1, light2, light3, light4);

const screen = new THREE.RectAreaLight(0xffffff, 1, meters(14), meters(10));
screen.position.set(meters(8.1), meters(8), -meters(14.5));
screen.lookAt(meters(8.1), meters(8), meters(0));
scene.add(screen)

const rectLightHelper = new RectAreaLightHelper(screen);
screen.add(rectLightHelper);

function createSpotLight(x, y, z) {
    const rectLight = new THREE.RectAreaLight( 0xffffff, 10, meters(0.3), meters(4) );
    rectLight.position.set( meters(x), meters(y), meters(z) );
    rectLight.lookAt( meters(x), 0, meters(z) );
    scene.add( rectLight )

    const rectLightHelper = new RectAreaLightHelper( rectLight );
    rectLight.add( rectLightHelper );
    return rectLight
}

//const a = createSpotLight(14.7, 10.2, 11)