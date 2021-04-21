import * as dat from "dat.gui";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import vertex from "./shaders/headLight/vertex.glsl";
import fragment from "./shaders/headLight/fragment.glsl";

export default class Car {
  constructor(scene) {
    this.scene = scene;

    this.gui = new dat.GUI();
    this.gui.hide();

    this.gltfLoader = new GLTFLoader();

    this.car = new THREE.Group();
    this.init();
    this.scene.add(this.car);
  }

  init() {
    this.addCar();
    this.addHeadLights();
    this.moveCar();
  }

  addCar() {
    this.gltfLoader.load("/models/mustang.glb", (gltf) => {
      // gltf.scene.position.x = posX;
      // gltf.scene.position.y = posY;
      // gltf.scene.position.z = posZ;
      gltf.scene.scale.set(0.4, 0.4, 0.4);

      gltf.scene.position.x = -2.962;
      gltf.scene.position.y = -0.903;
      gltf.scene.position.z = -5.505;

      this.car.add(gltf.scene);
    });
  }

  addHeadLights() {
    this.headLightR = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1, 1, 1),
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
      })
    );

    this.headLightR.position.x = -2.572;
    this.headLightR.position.y = -0.513;
    this.headLightR.position.z = -4.252;

    this.headLightR.scale.set(0.171, 0.117, 1);

    this.gui.add(this.headLightR.position, "x", -5, 0, 0.001).name("headLightRPositionX");
    this.gui.add(this.headLightR.position, "y", -5, 0, 0.001).name("headLightRPositionY");
    this.gui.add(this.headLightR.position, "z", -5, 0, 0.001).name("headLightRPositionZ");
    this.gui.add(this.headLightR.scale, "x", 0, 1, 0.001).name("headLightRScaleX");
    this.gui.add(this.headLightR.scale, "y", 0, 1, 0.001).name("headLightRScaleY");

    this.car.add(this.headLightR);
  }

  moveCar() {
    this.car.position.x = 2.132;
    this.car.position.y = 0.832;
    this.car.position.z = 2.299;
    this.gui.add(this.car.position, "x", -5, 5, 0.001).name("carPositionX");
    this.gui.add(this.car.position, "y", -5, 5, 0.001).name("carPositionY");
    this.gui.add(this.car.position, "z", -15, 5, 0.001).name("carPositionZ");
  }
}
