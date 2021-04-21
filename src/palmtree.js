import * as dat from "dat.gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Palmtree {
  constructor(scene) {
    this.scene = scene;

    this.gui = new dat.GUI();
    this.gui.hide();

    this.gltfLoader = new GLTFLoader();

    this.init();
  }

  init() {
    this.addMultipleTrees();
  }

  addMultipleTrees() {
    this.count = 6;

    // Right side
    for (let i = 0; i < this.count; i++) {
      const offset = i * 10;
      const posX = 4.81;
      const posY = -1.5;
      const posZ = -50 + offset;
      this.addTree(posX, posY, posZ);
    }

    // Left side
    for (let i = 0; i < this.count; i++) {
      const offset = i * 10;
      const posX = -6;
      const posY = -1.5;
      const posZ = -50 + offset;
      this.addTree(posX, posY, posZ);
    }
  }

  addTree(posX, posY, posZ) {
    this.gltfLoader.load("/models/palmtree.glb", (gltf) => {
      gltf.scene.position.x = posX;
      gltf.scene.position.y = posY;
      gltf.scene.position.z = posZ;
      this.scene.add(gltf.scene);

      // this.gui.add(gltf.scene.position, "x", -5, 5, 0.001).name("palmtreePositionX");
      // this.gui.add(gltf.scene.position, "y", -5, 5, 0.001).name("palmtreePositionY");
      // this.gui.add(gltf.scene.position, "z", -15, 5, 0.001).name("palmtreePositionZ");
    });
  }
}
