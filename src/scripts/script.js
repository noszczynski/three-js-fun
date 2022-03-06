import T from "./three.js";

const getDimensions = (x, y, z) => ({ x, y, z });

const createCube = (geometry = [1, 1, 1], material, position, rotation) => {
    const cubeGeometry = new T.BoxGeometry(...geometry);
    const cubeMaterial = new T.MeshPhongMaterial();
    const cube = new T.Mesh(cubeGeometry, cubeMaterial);

    cube.rotation.x = rotation.x;
    cube.rotation.y = rotation.y;

    cube.position.x = position.x;
    cube.position.y = position.y;

    return cube;
};

const createLight = (color, position, intensity) => {
    const light = new T.PointLight(color, intensity);

    light.position.x = position.x;
    light.position.y = position.y;
    light.position.z = position.z;

    return light;
};

const setupCamera = (camera) => {
    camera.position.z = 15;
};

const handleLoad = () => {
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(
        24,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new T.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const cubes = [
        createCube(
            [0.5, 0.5, 0.5],
            {
                color: new T.Color("#ffff00"),
                shininess: 80,
            },
            getDimensions(0, 0),
            getDimensions(10, -20)
        ),
        createCube(
            [0.5, 0.5, 0.5],
            {
                color: new T.Color("#ffffff"),
                shininess: 80,
            },
            getDimensions(1, -1),
            getDimensions(10, -20)
        ),
        createCube(
            [0.5, 0.5, 0.5],
            {
                color: new T.Color("#ff00ff"),
                shininess: 80,
            },
            getDimensions(-1, 1),
            getDimensions(10, -20)
        ),
    ];

    const lights = [
        createLight(new T.Color("#ffffff0f"), getDimensions(-10, 20, 20, 0.3)),
        createLight(new T.Color("#ffffff0f"), getDimensions(20, 10, 10, 0.2)),
        createLight(new T.Color("#ffffff0f"), getDimensions(10, 0, 50, 0.1)),
    ];

    setupCamera(camera);

    const cubeGroup = new T.Group();
    const lightGroup = new T.Group();

    cubes.forEach((cube) => {
        cubeGroup.add(cube);
    });

    lights.forEach((light) => {
        lightGroup.add(light);
    });

    scene.add(cubeGroup);
    scene.add(lightGroup);

    const animate = () => {
        requestAnimationFrame(animate);

        cubes.forEach((cube) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.02;
        });

        renderer.render(scene, camera);
    };

    animate(scene, camera);
};

window.addEventListener("load", handleLoad);
