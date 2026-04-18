const container = document.getElementById("car-container");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.set(0, 1.5, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.2;

let timeout;

controls.addEventListener("start", () => {
    controls.autoRotate = false;
    clearTimeout(timeout);
});

controls.addEventListener("end", () => {
    timeout = setTimeout(() => {
        controls.autoRotate = true;
    }, 3000);
});

// LIGHTING
const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(5, 10, 7);
scene.add(keyLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(0, 10, 0);
scene.add(topLight);

const blueLight = new THREE.PointLight(0x0a84ff, 2, 15);
blueLight.position.set(2, 2, 2);
scene.add(blueLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// FLOOR
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x111111 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// LOAD MODEL
const loader = new THREE.GLTFLoader();

loader.load("models/car.glb", function (gltf) {
    const car = gltf.scene;

    const box = new THREE.Box3().setFromObject(car);
    const center = box.getCenter(new THREE.Vector3());
    car.position.sub(center);

    car.scale.set(1.5, 1.5, 1.5);

    scene.add(car);
});

// ANIMATE
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// RESIZE
window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
