import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface OpeningExperienceProps {
  onEnter: () => void;
}

export default function OpeningExperience({ onEnter }: OpeningExperienceProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const [phase, setPhase] = useState<number>(0); // 0: initial dark, 1: revealed text, 2: ready to enter

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const cameraPos = useRef({ x: 0, y: 8, z: 22 });
  const cameraTarget = useRef({ x: 0, y: 2, z: 0 });
  const isEntering = useRef(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1200);
    const timer2 = setTimeout(() => setPhase(2), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggleMute();
    setIsAudioActive(newState);
  };

  const handleEnterSchool = () => {
    if (transitioning) return;
    setTransitioning(true);
    isEntering.current = true;
    soundManager.playChime();

    // Cinematic zoom through the entrance archway
    const startTime = performance.now();
    const duration = 1600; // ms

    const startX = cameraPos.current.x;
    const startY = cameraPos.current.y;
    const startZ = cameraPos.current.z;

    const animateZoom = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in cubic
      const ease = progress * progress * progress;

      if (cameraRef.current) {
        cameraPos.current.x = startX + (0 - startX) * ease;
        cameraPos.current.y = startY + (1.2 - startY) * ease;
        cameraPos.current.z = startZ + (-4 - startZ) * ease;
        cameraRef.current.position.set(cameraPos.current.x, cameraPos.current.y, cameraPos.current.z);
        cameraRef.current.lookAt(0, 1.2, -10);
      }

      if (progress < 1) {
        requestAnimationFrame(animateZoom);
      } else {
        setTimeout(onEnter, 200);
      }
    };

    requestAnimationFrame(animateZoom);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0A0F0D');
    scene.fog = new THREE.FogExp2('#0A0F0D', 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(cameraPos.current.x, cameraPos.current.y, cameraPos.current.z);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight('#FFEED6', 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#FFF3E0', 1.6);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Soft warm interior glow lights
    const interiorGlow = new THREE.PointLight('#FFB366', 2.5, 14);
    interiorGlow.position.set(0, 2.5, -1);
    scene.add(interiorGlow);

    // --- ENVIRONMENT & ARCHITECTURE ---
    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#1C2A24',
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Courtyard stone walkway
    const pathGeo = new THREE.PlaneGeometry(4.5, 24);
    const pathMat = new THREE.MeshStandardMaterial({
      color: '#344039',
      roughness: 0.7
    });
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.02, 6);
    path.receiveShadow = true;
    scene.add(path);

    // Main School Building (Scandinavian timber & glass)
    const buildingMat = new THREE.MeshStandardMaterial({
      color: '#D8C2A7',
      roughness: 0.65,
      metalness: 0.1
    });
    const timberTrimMat = new THREE.MeshStandardMaterial({
      color: '#8B5A2B',
      roughness: 0.5
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#88C0D0',
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1
    });

    // Main central wing
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(10, 4.5, 6), buildingMat);
    mainBody.position.set(0, 2.25, -2);
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    scene.add(mainBody);

    // Pitched timber roof
    const roofGeo = new THREE.ConeGeometry(8, 2.5, 4);
    const roof = new THREE.Mesh(roofGeo, timberTrimMat);
    roof.position.set(0, 5.75, -2);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    scene.add(roof);

    // Glass entrance atrium
    const glassAtrium = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.8, 3), glassMat);
    glassAtrium.position.set(0, 1.9, 1.2);
    glassAtrium.castShadow = true;
    scene.add(glassAtrium);

    // Timber Entrance Portal Arch
    const archPillarGeo = new THREE.BoxGeometry(0.5, 3.8, 0.5);
    const archLintelGeo = new THREE.BoxGeometry(5.2, 0.6, 0.7);

    const pillarL = new THREE.Mesh(archPillarGeo, timberTrimMat);
    pillarL.position.set(-2.2, 1.9, 2.8);
    pillarL.castShadow = true;
    scene.add(pillarL);

    const pillarR = new THREE.Mesh(archPillarGeo, timberTrimMat);
    pillarR.position.set(2.2, 1.9, 2.8);
    pillarR.castShadow = true;
    scene.add(pillarR);

    const archLintel = new THREE.Mesh(archLintelGeo, timberTrimMat);
    archLintel.position.set(0, 3.9, 2.8);
    archLintel.castShadow = true;
    scene.add(archLintel);

    // Left Wing (Art Atelier)
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(6, 3.5, 5), buildingMat);
    leftWing.position.set(-7.5, 1.75, -1);
    leftWing.castShadow = true;
    scene.add(leftWing);

    // Right Wing (Kindergarten & Library)
    const rightWing = new THREE.Mesh(new THREE.BoxGeometry(6, 3.5, 5), buildingMat);
    rightWing.position.set(7.5, 1.75, -1);
    rightWing.castShadow = true;
    scene.add(rightWing);

    // Miniature School Bus parked on the side
    const busGroup = new THREE.Group();
    const busBodyMat = new THREE.MeshStandardMaterial({ color: '#E8A838', roughness: 0.4 });
    const busBody = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 4.2), busBodyMat);
    busBody.position.set(0, 0.8, 0);
    busBody.castShadow = true;
    busGroup.add(busBody);

    const busRoof = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.2, 4), new THREE.MeshStandardMaterial({ color: '#FFFFFF' }));
    busRoof.position.set(0, 1.5, 0);
    busGroup.add(busRoof);

    const wheelMat = new THREE.MeshStandardMaterial({ color: '#1A1A1A', roughness: 0.8 });
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 16);
    [-0.9, 0.9].forEach(x => {
      [-1.2, 1.2].forEach(z => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.3, z);
        wheel.castShadow = true;
        busGroup.add(wheel);
      });
    });

    busGroup.position.set(9.5, 0, 7);
    busGroup.rotation.y = -Math.PI / 6;
    scene.add(busGroup);

    // Stylized Architectural Trees
    const trunkMat = new THREE.MeshStandardMaterial({ color: '#5C4033', roughness: 0.9 });
    const leavesMat1 = new THREE.MeshStandardMaterial({ color: '#4E7055', roughness: 0.8 });
    const leavesMat2 = new THREE.MeshStandardMaterial({ color: '#6A8E6F', roughness: 0.8 });

    const createTree = (x: number, z: number, scale = 1, isAlt = false) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.25 * scale, 2.5 * scale, 8), trunkMat);
      trunk.position.y = (1.25 * scale);
      trunk.castShadow = true;
      tree.add(trunk);

      const crown = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.4 * scale, 1),
        isAlt ? leavesMat2 : leavesMat1
      );
      crown.position.y = 2.8 * scale;
      crown.castShadow = true;
      tree.add(crown);

      tree.position.set(x, 0, z);
      return tree;
    };

    // Plant trees along garden and perimeter
    const treePositions: [number, number, number, boolean][] = [
      [-4.5, 5, 0.9, false],
      [-5.8, 8, 1.1, true],
      [-3.8, 12, 0.8, false],
      [4.5, 4.5, 1.0, true],
      [5.2, 9, 1.2, false],
      [3.8, 13, 0.85, true],
      [-11, -3, 1.3, false],
      [-12, 2, 1.1, true],
      [11, -2, 1.25, false],
      [12, 3, 0.9, true],
    ];

    treePositions.forEach(([x, z, s, alt]) => {
      scene.add(createTree(x, z, s, alt));
    });

    // Floating glowing dust/firefly particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = Math.random() * 8 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: '#FCE7C8',
      size: 0.15,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- ANIMATION LOOP ---
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow cinematic camera float towards entrance
      if (!isEntering.current) {
        cameraPos.current.z = Math.max(15, 22 - elapsed * 0.45);
        cameraPos.current.x = Math.sin(elapsed * 0.15) * 1.5;
        cameraPos.current.y = 7.5 - Math.min(elapsed * 0.15, 2.5);

        camera.position.set(cameraPos.current.x, cameraPos.current.y, cameraPos.current.z);
        camera.lookAt(cameraTarget.current.x, cameraTarget.current.y, cameraTarget.current.z);
      }

      // Gentle particle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(elapsed + i) * 0.003;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0A0F0D] select-none">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Vignette & Scrim */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A0F0D]/40 to-[#0A0F0D]/90 pointer-events-none" />

      {/* Top Bar for Ambient Audio Toggle & Quick Skip */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider backdrop-blur-md border border-white/10 transition-all cursor-pointer"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-4 h-4 text-[#F7DC6F]" />
              <span>ATMOSPHERE: ACTIVE</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-neutral-400" />
              <span>ENABLE SOUND ATMOSPHERE</span>
            </>
          )}
        </button>

        <button
          onClick={onEnter}
          className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase transition-colors px-3 py-1 cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      {/* Main Cinematic Title & Interaction */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 text-center">
        {/* Step 1: Brand title revelation */}
        <div
          className={`transition-all duration-1000 transform ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#E27D60] text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            An Early Years & Elementary Sanctuary (Ages 3–12)
          </div>

          <h1 className="font-serif text-5xl md:text-8xl tracking-tight text-white font-light drop-shadow-2xl">
            WONDERNEST
          </h1>

          <p className="font-serif italic text-lg md:text-2xl text-white/80 max-w-xl mx-auto mt-3 tracking-wide drop-shadow-md">
            “Where Little Minds Grow Big Dreams.”
          </p>
        </div>

        {/* Step 2: "ENTER THE SCHOOL" Interactive Gate */}
        <div
          className={`mt-10 pointer-events-auto transition-all duration-1000 transform ${
            phase >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <button
            onClick={handleEnterSchool}
            disabled={transitioning}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E27D60] hover:bg-[#d96e51] text-white font-sans text-sm md:text-base font-semibold tracking-wide shadow-2xl transition-all duration-300 ease-out cursor-pointer hover:shadow-[0_0_30px_rgba(226,125,96,0.5)] ${
              transitioning ? 'opacity-80 scale-95' : 'hover:scale-105'
            }`}
          >
            <span>{transitioning ? 'ENTERING CAMPUS...' : 'ENTER THE SCHOOL'}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>

          <p className="text-[11px] font-mono tracking-wider text-neutral-400 mt-4 uppercase">
            Click to cross the timber threshold
          </p>
        </div>
      </div>

      {/* Subtle Bottom Architectural Note */}
      <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-[11px] font-mono text-neutral-500 tracking-wider z-20 pointer-events-none">
        <span>CAMPUS: 4.2 ACRE FOREST SANCTUARY</span>
        <span>REGGIO-EMILIA & INQUIRY GROUNDED</span>
      </div>
    </div>
  );
}
