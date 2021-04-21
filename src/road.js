import * as THREE from "three";
import * as dat from "dat.gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Road {
  constructor(scene) {
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.scene = scene;

    this.gui = new dat.GUI();
    this.gui.hide();

    this.init();
    this.addTextures();
  }

  init() {
    // this.addTextures();
    // this.addRoad();
    this.addModelRoad();
  }

  addTextures() {
    this.roadHeightTexture = this.textureLoader.load("/textures/road/height.png");
    this.roadNormalTexture = this.textureLoader.load("/textures/road/normal.jpg");
    this.roadAmbientOcclusionTexture = this.textureLoader.load("/textures/road/ambientOcclusion.jpg");
    this.roadRoughnessTexture = this.textureLoader.load("/textures/road/roughness.jpg");
    this.roadColorTexture = this.textureLoader.load("/textures/road/color.jpg");

    this.repeatingTextureZ = 8;
    this.repeatingTextureX = 3;

    this.roadColorTexture.repeat.y = this.repeatingTextureZ;
    this.roadAmbientOcclusionTexture.repeat.y = this.repeatingTextureZ;
    this.roadNormalTexture.repeat.y = this.repeatingTextureZ;
    this.roadRoughnessTexture.repeat.y = this.repeatingTextureZ;

    this.roadColorTexture.repeat.x = this.repeatingTextureX;
    this.roadAmbientOcclusionTexture.repeat.x = this.repeatingTextureX;
    this.roadNormalTexture.repeat.x = this.repeatingTextureX;
    this.roadRoughnessTexture.repeat.x = this.repeatingTextureX;

    this.roadColorTexture.wrapS = THREE.RepeatWrapping;
    this.roadAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    this.roadNormalTexture.wrapS = THREE.RepeatWrapping;
    this.roadRoughnessTexture.wrapS = THREE.RepeatWrapping;

    this.roadColorTexture.wrapT = THREE.RepeatWrapping;
    this.roadAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    this.roadNormalTexture.wrapT = THREE.RepeatWrapping;
    this.roadRoughnessTexture.wrapT = THREE.RepeatWrapping;
  }

  addRoad() {
    this.road = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 55, 32),
      new THREE.MeshStandardMaterial({
        // color: 0xff0000,
        side: THREE.DoubleSide,
        map: this.roadColorTexture,
        aoMap: this.roadAmbientOcclusionTexture,
        displacementMap: this.roadHeightTexture,
        normalMap: this.roadNormalTexture,
        roughnessMap: this.roadRoughnessTexture,
      })
    );

    this.gui.add(this.road.rotation, "x", 0, 3, 0.0001).name("roadRotationX");
    this.gui.add(this.road.position, "z", -50, 10, 0.001).name("roadPositionZ");

    this.road.position.z = -23.682;
    this.road.rotation.x = 1.59;

    this.scene.add(this.road);
  }

  addModelRoad() {
    this.bakedTexture = this.textureLoader.load("/textures/baked3.jpg");
    this.bakedTexture.flipY = false;
    this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture });

    this.gltfLoader.load("/models/street-with-car.glb", (gltf) => {
      gltf.scene.traverse((child) => {
        child.material = this.bakedMaterial;
      });
      gltf.scene.rotation.y = 4.7132;

      gltf.scene.position.z = -3.5431;

      this.gui.add(gltf.scene.rotation, "y", 4, 5, 0.0001).name("roadRotationX");

      this.gui.add(gltf.scene.position, "x", -5, 3, 0.0001).name("roadpositionX");
      this.gui.add(gltf.scene.position, "y", -5, 3, 0.0001).name("roadpositionX");
      this.gui.add(gltf.scene.position, "z", -5, 3, 0.0001).name("roadpositionX");
      this.scene.add(gltf.scene);
    });
  }
}
