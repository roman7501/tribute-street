import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Road from "./road";
import Buildings from "./buildings";
import Palmtree from "./palmtree";
import Background from "./background";
import Car from "./car";

export default class Sketch {
  constructor() {
    this.gui = new dat.GUI();
    this.gui.hide();

    this.debugObject = {};

    this.gltfLoader = new GLTFLoader();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.textureLoader = new THREE.TextureLoader();

    this.canvas = document.querySelector("canvas.webgl");
    this.scene = new THREE.Scene();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.set(0, 0.1, 1);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.debugObject.clearColor = 0xff0000;
    this.renderer.setClearColor(this.debugObject.clearColor);
    this.gui
      .addColor(this.debugObject, "clearColor")
      .onChange(() => this.renderer.setClearColor(this.debugObject.clearColor));

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.clock = new THREE.Clock();
    this.elapsedTIme = 0;
    this.init();
  }

  init() {
    this.resize();
    this.addLight();
    this.addObjects();
    this.render();
  }
  resize() {
    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  addLight() {
    this.light = new THREE.AmbientLight({ color: 0x404040 });
    this.scene.add(this.light);
  }

  addObjects() {
    this.background = new Background(this.scene);
    this.road = new Road(this.scene);
    this.palmtree = new Palmtree(this.scene);
    this.car = new Car(this.scene);
    // this.buildings = new Buildings(this.scene);
  }

  render() {
    this.elapsedTime = this.clock.getElapsedTime();

    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));

    // Update Materials
    this.background.render(this.elapsedTime);
  }
}
