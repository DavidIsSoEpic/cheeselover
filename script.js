let scene, camera, renderer, model1, model2, backgroundPlane;
let mouseX = 0, mouseY = 0;

function init() {
    const loadingScreen = document.getElementById('loading-screen');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const textureLoader = new THREE.TextureLoader();
    setBackground('media/silly.png', textureLoader);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x9090ff, 0.5);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffa500, 0.3);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const loader = new THREE.GLTFLoader();
    Promise.all([
        new Promise((resolve, reject) => {
            loader.load('models/scene.gltf', gltf => resolve(gltf), undefined, reject);
        }),
        new Promise((resolve, reject) => {
            loader.load('models/scene.gltf', gltf => resolve(gltf), undefined, reject);
        })
    ]).then(([firstEyeball, secondEyeball]) => {
        model1 = firstEyeball.scene;
        model2 = secondEyeball.scene;
        setupModels();
        loadingScreen.style.display = 'none';
    }).catch(error => console.error('An error happened', error));

    camera.position.z = 50;

    document.addEventListener('mousemove', onMouseMove, false);
    animate();
    setupBackgroundPicker();
}

function setBackground(image, textureLoader) {
    textureLoader.load(image, texture => {
        const aspectRatio = texture.image.width / texture.image.height;
        const planeGeometry = new THREE.PlaneGeometry(100 * aspectRatio, 100);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        if (backgroundPlane) scene.remove(backgroundPlane);
        backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        backgroundPlane.position.z = 10;
        scene.add(backgroundPlane);
    });
}

function setupModels() {
    const box = new THREE.Box3().setFromObject(model1);
    const center = box.getCenter(new THREE.Vector3());
    model1.position.sub(center);
    model1.scale.set(0.35, 0.35, 0.35);
    model1.position.set(-25, 10, 0);
    scene.add(model1);

    const box2 = new THREE.Box3().setFromObject(model2);
    const center2 = box2.getCenter(new THREE.Vector3());
    model2.position.sub(center2);
    model2.scale.set(0.4, 0.4, 0.4);
    model2.position.set(7, 10, 0);
    scene.add(model2);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    camera.position.z = cameraZ * 1.5;
    camera.lookAt(scene.position);
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -((event.clientY / window.innerHeight) * 2 - 1);
}

function animate() {
    requestAnimationFrame(animate);
    if (model1 && model2) {
        const rotationX = -mouseY * Math.PI / 4;
        const rotationY = mouseX * Math.PI / 4;
        model1.rotation.x = rotationX;
        model1.rotation.y = rotationY;
        model2.rotation.x = rotationX;
        model2.rotation.y = rotationY;
    }
    renderer.render(scene, camera);
}

function setupBackgroundPicker() {
    const textureLoader = new THREE.TextureLoader();
    const backgroundOptions = document.querySelectorAll('.background-option');

    backgroundOptions.forEach(option => {
        option.addEventListener('click', () => {
            const image = option.dataset.image; 
            if (image) {
                console.log(`Changing background to: ${image}`);
                setBackground(image, textureLoader);
            } else {
                console.error("Background image path is missing.");
            }
        });
    });
}

function setBackground(imagePath, textureLoader) {
    textureLoader.load(imagePath, (texture) => {
        const aspectRatio = texture.image.width / texture.image.height;
        
        let scaleFactor = 1.0;  
        
        if (imagePath.includes("back2.png")) { 
            scaleFactor = 3.7;  
        }

        const planeGeometry = new THREE.PlaneGeometry(100 * aspectRatio * scaleFactor, 100 * scaleFactor);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        if (backgroundPlane) {
            scene.remove(backgroundPlane);
        }

        backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);

        if (imagePath.includes("back2.png")) {
            backgroundPlane.position.set(-6.1, -69.5, 8); 
        } else {
            backgroundPlane.position.set(0, 0, 10); 
        }

        scene.add(backgroundPlane);
    });
}


setupBackgroundPicker();


setupBackgroundPicker();



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
