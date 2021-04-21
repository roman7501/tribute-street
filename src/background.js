import * as THREE from "three";
import * as dat from "dat.gui";

import vertex from "./shaders/background/vertex.glsl";
import fragment from "./shaders/background/fragment.glsl";

export default class Background {
  constructor(scene) {
    this.scene = scene;

    this.gui = new dat.GUI();
    this.gui.hide();
    this.debugObject = {};

    this.init();
  }

  init() {
    this.addBackground();
  }

  addBackground() {
    this.debugObject.color1 = 0x271a4d;
    this.debugObject.color2 = 0xff0096;

    this.gui
      .addColor(this.debugObject, "color1")
      .onChange(() => (this.background.material.uniforms.color1.value = new THREE.Color(this.debugObject.color1)));
    this.gui
      .addColor(this.debugObject, "color2")
      .onChange(() => (this.background.material.uniforms.color2.value = new THREE.Color(this.debugObject.color2)));
    this.background = new THREE.Mesh(
      new THREE.PlaneGeometry(12.5, 145, 32),
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          color1: { value: new THREE.Color(this.debugObject.color1) },
          color2: { value: new THREE.Color(this.debugObject.color2) },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      })
    );
    this.gui.add(this.background.rotation, "x", 0, 3, 0.0001).name("backgroundRotationX");
    this.gui.add(this.background.position, "z", -150, 10, 0.001).name("backgroundPositionZ");
    this.gui.add(this.background.scale, "x", 0, 20, 0.001).name("backgroundScaleX");
    this.gui.add(this.background.scale, "y", 0, 20, 0.001).name("backgroundScaleY");

    this.background.position.z = -52.071;
    this.background.rotation.x = 0;

    this.background.scale.x = 17.01;
    this.background.scale.y = 1.3;
    this.scene.add(this.background);
  }

  render(elapsedTime) {
    this.background.material.uniforms.uTime.value = elapsedTime;
  }
}
