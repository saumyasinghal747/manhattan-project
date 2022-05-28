import { GLTFLoader } from 'https://unpkg.com/three@latest/examples/jsm/loaders/GLTFLoader.js';
  const loader = new GLTFLoader();

  loader.load( 'models/untitled.gltf', function ( gltf ) {
    gltf.scene.position.x = -4.5
    gltf.scene.position.y = 0
    gltf.scene.position.z = -4.5
    scene.add( gltf.scene );

  }, undefined, function ( error ) {

    console.error( error );

  } );