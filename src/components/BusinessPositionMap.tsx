import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BusinessPositionMapProps } from '../types/business';
import { createAxisLabel, addNumericLabel, createGrid } from '../utils/threeHelpers';
import { addBusinessMarkers } from './BusinessMarkers';
import { addComparativeBusinessSurfaces } from './ComparativeBusinessSurfaces';

const BusinessPositionMap = ({ positions, comparativeBusinesses }: BusinessPositionMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerRef_current = containerRef.current
    if (!containerRef.current) return;

    // Scene setup with white background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFFFFF');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(25, 10, 0);
    camera.lookAt(new THREE.Vector3(10, 5, 0));

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(10, 5, 0);
    controls.update();

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add grid
    const grid = createGrid();
    scene.add(grid);

    // Add axes helper with gold/black colors
    const axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);

    // Add axis labels - swapped grossProfit and netProfit
    createAxisLabel('Sales', new THREE.Vector3(16, 0, 0), scene);
    createAxisLabel('Net Profit', new THREE.Vector3(0, 16, 0), scene);
    createAxisLabel('Gross Profit', new THREE.Vector3(0, 0, 16), scene);

    // Add numeric labels
    for (let i = 5; i <= 25; i += 5) {
      addNumericLabel(i * 100, new THREE.Vector3(i, -0.5, 0), scene);
      addNumericLabel(i * 100, new THREE.Vector3(0, i, -0.5), scene);
    }

    for (let i = -15; i <= 25; i += 5) {
      if (i !== 0) {
        addNumericLabel(i * 100, new THREE.Vector3(-0.5, 0, i), scene);
      }
    }

    // Add business markers and comparative surfaces
    addBusinessMarkers(positions, scene);
    addComparativeBusinessSurfaces(comparativeBusinesses, scene);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef_current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [positions, comparativeBusinesses]);

  return <div ref={containerRef} className="w-full h-[600px] rounded-lg shadow-lg" />;
};

export default BusinessPositionMap;
