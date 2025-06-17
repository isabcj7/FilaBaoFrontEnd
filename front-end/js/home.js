// Imports
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(90, 30, 0);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Luzes
scene.add(new THREE.AmbientLight(0xffffff, 1));
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
controls.autoRotate = false;

// Estados
let isInteracting = false;
let shouldReturnToInitial = false;
let campfireModel = null;

let initialRotation = new THREE.Euler();
let initialCameraPos = camera.position.clone();
let initialTarget = controls.target.clone();
const returnSpeed = 2.0;

// Eventos
controls.addEventListener("start", () => {
  isInteracting = true;
  shouldReturnToInitial = false;
});

controls.addEventListener("end", () => {
  isInteracting = false;
  shouldReturnToInitial = true;
});

// Loader
const loader = new GLTFLoader();
loader.load(
  "../assets/imgs/scene.gltf",
  gltf => {
    campfireModel = gltf.scene;
    campfireModel.scale.set(1, 1, 1);
    initialRotation.copy(campfireModel.rotation);
    scene.add(campfireModel);
  },
  xhr => {
    console.log(((xhr.loaded / xhr.total) * 100).toFixed(2) + "% carregado");
  },
  err => {
    console.error("Erro ao carregar modelo:", err);
  }
);

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop
const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  if (shouldReturnToInitial) {
    // Suaviza rotação do modelo
    if (campfireModel) {
      ["x", "y", "z"].forEach(axis => {
        let current = campfireModel.rotation[axis];
        let target = initialRotation[axis];
        let diff = target - current;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        if (Math.abs(diff) < 0.001) {
          campfireModel.rotation[axis] = target;
        } else {
          campfireModel.rotation[axis] += diff * Math.min(returnSpeed * delta, 1);
        }
      });
    }

    
    camera.position.lerp(initialCameraPos, Math.min(delta * returnSpeed, 1));
    controls.target.lerp(initialTarget, Math.min(delta * returnSpeed, 1));

    const camDone = camera.position.distanceTo(initialCameraPos) < 0.05;
    const targetDone = controls.target.distanceTo(initialTarget) < 0.05;
    const rotDone = campfireModel && (
      Math.abs(campfireModel.rotation.x - initialRotation.x) < 0.001 &&
      Math.abs(campfireModel.rotation.y - initialRotation.y) < 0.001 &&
      Math.abs(campfireModel.rotation.z - initialRotation.z) < 0.001
    );

    if (camDone && targetDone && rotDone) {
      shouldReturnToInitial = false;
    }

  } else if (!isInteracting && campfireModel) {
    campfireModel.rotation.y -= 0.007;
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

