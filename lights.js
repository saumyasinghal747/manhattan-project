import { RectAreaLightHelper } from 'https://unpkg.com/three@latest/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'https://unpkg.com/three@latest/examples/jsm/lights/RectAreaLightUniformsLib.js';

const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.5); // very very dim white light to help with editing
scene.add(ambientLight);

const light1 = new THREE.PointLight( 0xffeedd, 0.5, 30 );
light1.position.set( meters(8), meters(31), meters(12) );
const light2 = new THREE.PointLight( 0xffeedd, 0.5, 30 );
light2.position.set( -meters(8), meters(31), meters(8) );
const light3 = new THREE.PointLight( 
    0xff0000, // 0xffeedd,
     0.5, 30 );
light3.position.set( -meters(8), meters(31), -meters(8) );
const light4 = new THREE.PointLight( 0xffeedd, 0.5, 30 );
light4.position.set( meters(8), meters(31), -meters(8) );
scene.add( light1, light2, light3, light4 );

const rectLight = new THREE.RectAreaLight( 0xffffff, 1.5,  meters(14), meters(10) );
rectLight.position.set( meters(8.1), meters(8), -meters(14));
rectLight.lookAt( meters(8.1), meters(8), meters(0) );
scene.add( rectLight )

const rectLightHelper = new RectAreaLightHelper( rectLight );
rectLight.add( rectLightHelper );