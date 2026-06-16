import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const colors = {
            red: 0xdb1a1a,
            black: 0x1a1a1a,
            white: 0xf2f2f2
        };

        const group = new THREE.Group();

        const mainGeo = new THREE.BoxGeometry(2, 3.5, 0.5);
        const mainMat = new THREE.MeshPhongMaterial({ 
            color: colors.black,
            shininess: 100,
            specular: colors.red
        });
        const monolith = new THREE.Mesh(mainGeo, mainMat);
        group.add(monolith);

        const detailGeo = new THREE.BoxGeometry(2.1, 0.1, 0.6);
        const detailMat = new THREE.MeshPhongMaterial({ color: colors.red });
        for(let i = -1.5; i <= 1.5; i += 0.5) {
            const bar = new THREE.Mesh(detailGeo, detailMat);
            bar.position.y = i;
            group.add(bar);
        }

        scene.add(group);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(colors.red, 2, 10);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);

        const whiteLight = new THREE.PointLight(0xffffff, 1, 10);
        whiteLight.position.set(-2, -2, 2);
        scene.add(whiteLight);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) - 0.5;
            mouseY = (event.clientY / window.innerHeight) - 0.5;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            
            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;
            
            group.rotation.y += (targetX - group.rotation.y) * 0.05;
            group.rotation.x += (targetY - group.rotation.x) * 0.05;
            
            group.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 w-full h-full bg-transparent z-10 pointer-events-auto"></div>;
};

export default ThreeJSCanvas;
