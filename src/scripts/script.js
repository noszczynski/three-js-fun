import T from "./three.js";

const getCameraProps = () => {
    return [25, window.innerWidth / window.innerHeight, 1, 1000];
};

const scene = new T.Scene();

const renderer = new T.WebGLRenderer();
renderer.setClearColor( 0xffffff, 1 );

const camera = new T.PerspectiveCamera(...getCameraProps());
camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 150;

const createDecoration = (x = 0, y = 0, z = 0, rotation = 0) => {
    const decoration = new T.Mesh(
        new T.SphereGeometry(1, 20, 20),
        new T.MeshPhongMaterial({
            color: new T.Color("#ff0000"),
            shininess: 80,
        })
    );

    decoration.position.x = x;
    decoration.position.y = y;
    decoration.position.z = z;

    decoration.rotation.x = rotation;

    return decoration;
};

const handleLoad = () => {
    document.body.appendChild(renderer.domElement);

    handleResize();

    const pivot = new T.Object3D();

    const lights = [
        new T.PointLight(0xffffff, 1, 100, 0),
        new T.PointLight(0xffffff, 1, 100, 0),
        new T.PointLight(0xffffff, 1, 100, 0),
    ];

    const decorationPivots = [
        new T.Object3D(),
        new T.Object3D(),
        new T.Object3D(),
        new T.Object3D(),
        new T.Object3D(),
        new T.Object3D(),
        new T.Object3D(),
    ];

    decorationPivots[0].rotation.y = 0;
    decorationPivots[1].rotation.y = 60;
    decorationPivots[2].rotation.y = 120;

    decorationPivots[3].rotation.y = 300;
    decorationPivots[4].rotation.y = 150;

    decorationPivots[5].rotation.y = 220;
    decorationPivots[6].rotation.y = 70;

    const decorations = [
        [
            createDecoration(0, 20, 3),
            createDecoration(0, 20, -3),
        ],
        [
            createDecoration(0, 12, 7),
            createDecoration(0, 12, -7),
            createDecoration(7, 12, 0),
            createDecoration(-7, 12, 0),
        ],
        [
            createDecoration(0, 4, 11.3),
            createDecoration(0, 4, -11.3),
            createDecoration(11.3, 4, 0),
            createDecoration(-11.3, 4, 0),
        ],
        [
            createDecoration(0, -4, 14.75),
            createDecoration(0, -4, -14.75),
            createDecoration(14.75, -4, 0),
            createDecoration(-14.75, -4, 0),
        ],
        [
            createDecoration(0, -4, 14.75),
            createDecoration(0, -4, -14.75),
            createDecoration(14.75, -4, 0),
            createDecoration(-14.75, -4, 0),
        ],
        [
            createDecoration(0, -11, 19),
            createDecoration(0, -11, -19),
            createDecoration(19, -11, 0),
            createDecoration(-19, -11, 0),
        ],
        [
            createDecoration(0, -11, 19),
            createDecoration(0, -11, -19),
            createDecoration(19, -11, 0),
            createDecoration(-19, -11, 0),
        ],
    ];

    decorationPivots[0].add(...decorations[0]);
    decorationPivots[1].add(...decorations[1]);
    decorationPivots[2].add(...decorations[2]);
    decorationPivots[3].add(...decorations[3]);
    decorationPivots[4].add(...decorations[4]);
    decorationPivots[5].add(...decorations[5]);
    decorationPivots[6].add(...decorations[6]);

    decorationPivots.forEach((decorationPivot) => {
        pivot.add(decorationPivot);
    });

    const star = [
        new T.Mesh(
            new T.TetrahedronGeometry(2, 0),
            new T.MeshLambertMaterial({
                color: new T.Color("#ffff00"),
            })
        ),
        new T.Mesh(
            new T.TetrahedronGeometry(2, 0),
            new T.MeshLambertMaterial({
                color: new T.Color("#ffff00"),
            })
        )
    ];

    star[0].position.y = 26;
    star[1].position.y = 26;

    star[1].rotation.z = 180;

    star.forEach((starElement) => {
        pivot.add(starElement);
    });

    const leg = new T.Mesh(
        new T.BoxGeometry(4, 8, 4),
        new T.MeshLambertMaterial({
            color: new T.Color("#5f2a00"),
        })
    );

    leg.position.y = -18;

    pivot.add(leg);

    const cones = [
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#004200"),
            })
        ),
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#003100"),
            })
        ),
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#004200"),
            })
        ),
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#003100"),
            })
        ),
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#004200"),
            })
        ),
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#003100"),
            })
        ),
        new T.Mesh(
            new T.ConeGeometry(5, 8, 10, 1),
            new T.MeshLambertMaterial({
                color: new T.Color("#004200"),
            })
        ),
    ];

    lights[0].position.set(-50, -20, 20);
    lights[1].position.set(50, 30, 50);

    lights.forEach((light) => {
        scene.add(light);
    });

    cones.forEach((cone, index) => {
        cone.position.y = index * 4;
        const segments = cones.length - index + 2;
        cone.geometry = new T.ConeGeometry(
            3 * (cones.length - index),
            (cones.length - index) * 4,
            segments % 2 === 0 ? segments : segments + 1,
            1
        );

        pivot.add(cone);
    });

    scene.add(pivot);

    pivot.rotation.y += 1.55;

    const render = () => {
        pivot.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    const animate = () => {
        render();
        requestAnimationFrame(animate);
    };

    animate();
};

// eslint-disable-next-line no-unused-vars
const handleResize = () => {
    if (!renderer) {
        return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
