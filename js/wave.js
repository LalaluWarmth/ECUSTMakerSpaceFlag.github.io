(function () {
    let SEPARATION = 128, AMOUNT_X = 128, AMOUNT_Y = 128;
    let particles, particle, count = 0;
    let windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2;
    let container;
    let camera, scene, renderer;

    init();
    animate();

    function init() {
        container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "0px";
        container.style.left = "0px";
        container.style.zIndex = "-1";
        container.style.opacity = "0.5";
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 320;
        camera.position.z = 0;
        scene = new THREE.Scene();
        camera.lookAt(scene.position.x, window.innerHeight / 3, scene.position.z);
        particles = [];
        const geometry = new THREE.SphereGeometry(0.75, 8, 8);
        const material = new THREE.MeshBasicMaterial({color: 0xCCCCCC});
        let i = 0;
        for (let ix = 0; ix < AMOUNT_X; ix++) {
            for (let iy = 0; iy < AMOUNT_Y; iy++) {
                particle = particles[i++] = new THREE.Mesh(geometry, material);
                particle.position.x = ix * SEPARATION - ((AMOUNT_X * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNT_Y * SEPARATION) / 2);
                scene.add(particle);
            }
        }
        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        let i = 0;
        for (let ix = 0; ix < AMOUNT_X; ix++) {
            for (let iy = 0; iy < AMOUNT_Y; iy++) {
                particle = particles[i++];
                particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                particle.scale.x = particle.scale.y = particle.scale.z = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
            }
        }
        renderer.render(scene, camera);
        count += 0.05;
    }
})();