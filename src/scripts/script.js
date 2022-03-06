import T from "./three.js";

const handleLoad = () => {
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    console.log(scene);
    console.log(camera);

    const renderer = new T.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
};

window.addEventListener("load", handleLoad);
