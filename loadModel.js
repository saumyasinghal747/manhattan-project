import { GLTFLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';
  const loader = new GLTFLoader();

  loader.load( 'models/untitled.gltf', function ( gltf ) {
    gltf.scene.position.x = meters(-15)
    gltf.scene.position.y = 0
    gltf.scene.position.z = meters(-15)
    scene.add( gltf.scene );

  }, undefined, function ( error ) {

    console.error( error );

  } );

loader.load('models/fat_man_bomb/scene.gltf', function ( gltf ) {
    gltf.scene.position.x = meters(0)
    gltf.scene.position.y = meters(19)
    gltf.scene.position.z = meters(0)
    gltf.scene.scale.set(1,1,1)
    scene.add( gltf.scene );

  }, undefined, function ( error ) {

    console.error( error );

  })