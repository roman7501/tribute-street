import * as THREE from "three";
import * as dat from "dat.gui";

export default class Buildings {
  constructor(scene) {
    this.textureLoader = new THREE.TextureLoader();
    this.scene = scene;

    this.gui = new dat.GUI();

    this.init();
    this.addTextures();
  }

  init() {
    this.addTextures();
    this.addBuilding();
  }

  addTextures() {
    this.buildingHeightTexture = this.textureLoader.load("/textures/building/height.png");
    this.buildingNormalTexture = this.textureLoader.load("/textures/building/normal.jpg");
    this.buildingAmbientOcclusionTexture = this.textureLoader.load("/textures/building/ambientOcclusion.jpg");
    this.buildingRoughnessTexture = this.textureLoader.load("/textures/building/roughness.jpg");
    this.buildingMetalnessTexture = this.textureLoader.load("/textures/building/metalness.jpg");
    this.buildingColorTexture = this.textureLoader.load("/textures/building/color.jpg");

    this.repeatingTexture = 18;
    this.buildingColorTexture.repeat.y = this.repeatingTexture;
    this.buildingAmbientOcclusionTexture.repeat.y = this.repeatingTexture;
    this.buildingNormalTexture.repeat.y = this.repeatingTexture;
    this.buildingRoughnessTexture.repeat.y = this.repeatingTexture;

    this.buildingColorTexture.repeat.x = this.repeatingTexture;
    this.buildingAmbientOcclusionTexture.repeat.x = this.repeatingTexture;
    this.buildingNormalTexture.repeat.x = this.repeatingTexture;
    this.buildingRoughnessTexture.repeat.x = this.repeatingTexture;

    this.buildingColorTexture.wrapS = THREE.RepeatWrapping;
    this.buildingAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    this.buildingNormalTexture.wrapS = THREE.RepeatWrapping;
    this.buildingRoughnessTexture.wrapS = THREE.RepeatWrapping;

    this.buildingColorTexture.wrapT = THREE.RepeatWrapping;
    this.buildingAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    this.buildingNormalTexture.wrapT = THREE.RepeatWrapping;
    this.buildingRoughnessTexture.wrapT = THREE.RepeatWrapping;
  }

  addBuilding() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      map: this.buildingColorTexture,
      displacementMap: this.buildingHeightTexture,
      aoMap: this.buildingAmbientOcclusionTexture,
      displacementMap: this.buildingHeightTexture,
      normalMap: this.buildingNormalTexture,
      roughnessMap: this.buildingRoughnessTexture,
      metalnessMap: this.metalnessMap,
    });
    this.building = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.building);

    this.gui.add(this.building.position, "x", -5, 5, 0.001).name("buildingPositionX");
    this.gui.add(this.building.position, "y", -5, 5, 0.001).name("buildingPositionY");
    this.gui.add(this.building.position, "z", -15, 5, 0.001).name("buildingPositionZ");

    this.building.position.x = 4.155;
    this.building.position.y = 6;
    this.building.position.z = -14.03;

    this.gui.add(this.building.scale, "x", 0, 10, 0.001).name("buildingScaleX");
    this.gui.add(this.building.scale, "y", 0, 10, 0.001).name("buildingScaleY");
    this.gui.add(this.building.scale, "z", 0, 10, 0.001).name("buildingScaleZ");

    this.building.scale.x = 2.869;
    this.building.scale.y = 30.806;
    this.building.scale.z = 4.17;
  }
}
