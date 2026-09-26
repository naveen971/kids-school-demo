import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CAMPUS_ZONES, CampusZone } from '../data/schoolData';
import { Compass, Play, Sparkles, X, ChevronRight, RotateCcw, Eye } from 'lucide-react';

interface Campus3DViewerProps {
  onOpenZoneVideo: (zone: CampusZone) => void;
}

export default function Campus3DViewer({ onOpenZoneVideo }: Campus3DViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedZone, setSelectedZone] = useState<CampusZone | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<string>('overview');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const buildingMeshes = useRef<Map<string, THREE.Object3D>>(new Map());
  const animationFrameId = useRef<number | null>(null);

  // Camera animation state
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 14, 22));
  const targetCamLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const currentCamLook = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));

  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const orbitAngle = useRef({ theta: 0, phi: Math.PI / 4, radius: 26 });

  // Handle clicking a zone
  const selectZone = (zone: CampusZone) => {
    setSelectedZone(zone);
    setCameraMode(zone.id);
    targetCamPos.current.set(zone.cameraPosition[0], zone.cameraPosition[1], zone.cameraPosition[2]);
    targetCamLook.current.set(zone.position[0], zone.position[1], zone.position[2]);
  };

  const resetOverview = () => {
    setSelectedZone(null);
    setCameraMode('overview');
    targetCamPos.current.set(0, 15, 24);
    targetCamLook.current.set(0, 1, 0);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#FAF7F2');
    scene.fog = new THREE.FogExp2('#FAF7F2', 0.018);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );
    camera.position.copy(targetCamPos.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- ARCHITECTURAL LIGHTING ---
    const ambientLight = new THREE.AmbientLight('#FFF7EB', 1.1);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight('#FFF3DF', 1.8);
    sun.position.set(18, 28, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 70;
    sun.shadow.camera.left = -22;
    sun.shadow.camera.right = 22;
    sun.shadow.camera.top = 22;
    sun.shadow.camera.bottom = -22;
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    // Soft fill light
    const fillLight = new THREE.DirectionalLight('#D8E5F0', 0.6);
    fillLight.position.set(-18, 15, -14);
    scene.add(fillLight);

    // --- MATERIALS ---
    const timberMat = new THREE.MeshStandardMaterial({
      color: '#C8A882',
      roughness: 0.6,
      metalness: 0.05
    });
    const stonePlasterMat = new THREE.MeshStandardMaterial({
      color: '#EFE9DE',
      roughness: 0.85
    });
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: '#654321',
      roughness: 0.5
    });
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: '#D2691E',
      roughness: 0.7
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#A8D5E5',
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.5
    });
    const meadowMat = new THREE.MeshStandardMaterial({
      color: '#8CAE88',
      roughness: 0.95
    });
    const pathMat = new THREE.MeshStandardMaterial({
      color: '#DDD4C4',
      roughness: 0.85
    });
    const waterMat = new THREE.MeshStandardMaterial({
      color: '#6AA8A6',
      roughness: 0.2,
      metalness: 0.3
    });

    // --- GROUND & CONTOURS ---
    const mainCampusBase = new THREE.Mesh(
      new THREE.CylinderGeometry(28, 29, 1.2, 48),
      meadowMat
    );
    mainCampusBase.position.y = -0.6;
    mainCampusBase.receiveShadow = true;
    scene.add(mainCampusBase);

    // Architectural wooden plinth edge
    const plinthRing = new THREE.Mesh(
      new THREE.CylinderGeometry(29.1, 29.5, 0.4, 48),
      darkWoodMat
    );
    plinthRing.position.y = -0.6;
    scene.add(plinthRing);

    // Natural stone pathways linking the pavilions
    const pathsGroup = new THREE.Group();
    const centralPiazza = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 0.04, 32), pathMat);
    centralPiazza.position.set(0, 0.02, 0);
    centralPiazza.receiveShadow = true;
    pathsGroup.add(centralPiazza);

    // Connecting path ribbons
    const pathSegments: [number, number, number, number, number][] = [
      [-2, 0, 0, 5, -Math.PI / 4],
      [2, 0, 0, 6, Math.PI / 4],
      [0, -2, 0, 6, 0],
      [0, 2, 0, 6, 0],
      [-3, -1, 0, 7, -Math.PI / 3],
      [3, 2, 0, 6, Math.PI / 6]
    ];
    pathSegments.forEach(([x, z, , len, rot]) => {
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.03, len), pathMat);
      ribbon.position.set(x, 0.02, z);
      ribbon.rotation.y = rot;
      ribbon.receiveShadow = true;
      pathsGroup.add(ribbon);
    });
    scene.add(pathsGroup);

    // Sensory stream / eco-pond
    const pond = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.06, 24), waterMat);
    pond.position.set(6, 0.01, 1);
    pond.receiveShadow = true;
    scene.add(pond);

    // --- CAMPUS BUILDINGS / PAVILIONS ---
    // Helper to register interactive pavilion object
    const registerBuilding = (id: string, group: THREE.Object3D) => {
      group.userData = { zoneId: id };
      buildingMeshes.current.set(id, group);
      scene.add(group);
    };

    // 1. MAIN ATRIUM & WELCOME HALL (Center)
    const mainHallGroup = new THREE.Group();
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 5), stonePlasterMat);
    mainBody.position.set(0, 1.6, 0);
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    mainHallGroup.add(mainBody);

    const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.2, 4), terracottaMat);
    mainRoof.position.set(0, 4.3, 0);
    mainRoof.rotation.y = Math.PI / 4;
    mainRoof.castShadow = true;
    mainHallGroup.add(mainRoof);

    const atriumGlass = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.8, 1.5), glassMat);
    atriumGlass.position.set(0, 1.4, 2.3);
    atriumGlass.castShadow = true;
    mainHallGroup.add(atriumGlass);

    mainHallGroup.position.set(0, 0, -0.5);
    registerBuilding('entrance', mainHallGroup);

    // 2. THE ART ATELIER (Zone: art-studio, [-4, 0.8, -2])
    const artGroup = new THREE.Group();
    const artBody = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.0, 4.5), timberMat);
    artBody.position.set(0, 1.5, 0);
    artBody.castShadow = true;
    artBody.receiveShadow = true;
    artGroup.add(artBody);

    // Sawtooth north-light roof
    for (let i = -1; i <= 1; i++) {
      const sawtooth = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 4.8, 3), stonePlasterMat);
      sawtooth.rotation.z = Math.PI / 2;
      sawtooth.rotation.y = Math.PI / 2;
      sawtooth.position.set(i * 1.5, 3.3, 0);
      sawtooth.castShadow = true;
      artGroup.add(sawtooth);
    }

    const artGlass = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 3.8), glassMat);
    artGlass.position.set(-2.6, 1.5, 0);
    artGroup.add(artGlass);

    artGroup.position.set(-4, 0, -2);
    registerBuilding('art-studio', artGroup);

    // 3. WOODLAND PLAYGROUND (Zone: playground, [4.5, 0.5, -3])
    const playGroup = new THREE.Group();
    // Timber climbing logs & lookout tower
    const towerPosts = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.5, 2.4), timberMat);
    towerPosts.position.set(0, 1.75, 0);
    towerPosts.castShadow = true;
    playGroup.add(towerPosts);

    const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(2, 1.5, 4), darkWoodMat);
    towerRoof.position.set(0, 4.2, 0);
    towerRoof.rotation.y = Math.PI / 4;
    towerRoof.castShadow = true;
    playGroup.add(towerRoof);

    // Stepping stones and logs
    for (let i = 0; i < 6; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.4, 8), darkWoodMat);
      log.position.set(Math.sin(i) * 2.2, 0.2, Math.cos(i) * 2.2);
      log.castShadow = true;
      playGroup.add(log);
    }
    playGroup.position.set(4.5, 0, -3);
    registerBuilding('playground', playGroup);

    // 4. CEDAR TREE READING TOWER (Zone: library, [0, 1.4, -4.5])
    const libraryGroup = new THREE.Group();
    const towerCylinder = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.8, 4.8, 24), stonePlasterMat);
    towerCylinder.position.set(0, 2.4, 0);
    towerCylinder.castShadow = true;
    towerCylinder.receiveShadow = true;
    libraryGroup.add(towerCylinder);

    const towerConicalRoof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 2.2, 24), terracottaMat);
    towerConicalRoof.position.set(0, 5.8, 0);
    towerConicalRoof.castShadow = true;
    libraryGroup.add(towerConicalRoof);

    // Skylight ring
    const skylight = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.3, 16), glassMat);
    skylight.position.set(0, 6.9, 0);
    libraryGroup.add(skylight);

    libraryGroup.position.set(0, 0, -5.5);
    registerBuilding('library', libraryGroup);

    // 5. MUSIC & RHYTHM PAVILION (Zone: music-room, [-4.8, 0.7, 3])
    const musicGroup = new THREE.Group();
    const musicAcousticShell = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.8, 3.8), timberMat);
    musicAcousticShell.position.set(0, 1.4, 0);
    musicAcousticShell.castShadow = true;
    musicGroup.add(musicAcousticShell);

    const curvedRoof = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 5.0, 16, 1, false, 0, Math.PI), stonePlasterMat);
    curvedRoof.rotation.z = Math.PI / 2;
    curvedRoof.position.set(0, 2.8, 0);
    curvedRoof.castShadow = true;
    musicGroup.add(curvedRoof);

    musicGroup.position.set(-4.8, 0, 3);
    registerBuilding('music-room', musicGroup);

    // 6. EARLY YEARS KINDERGARTEN (Zone: kindergarten, [-1.5, 0.6, 2])
    const kgGroup = new THREE.Group();
    const kgBody = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.2, 4.2), timberMat);
    kgBody.position.set(0, 1.1, 0);
    kgBody.castShadow = true;
    kgGroup.add(kgBody);

    const kgRoof = new THREE.Mesh(new THREE.ConeGeometry(3.8, 1.6, 4), terracottaMat);
    kgRoof.position.set(0, 2.8, 0);
    kgRoof.rotation.y = Math.PI / 4;
    kgRoof.castShadow = true;
    kgGroup.add(kgRoof);

    kgGroup.position.set(-1.5, 0, 3.8);
    registerBuilding('kindergarten', kgGroup);

    // 7. LIVING GREENHOUSE & LAB (Zone: nature-lab, [3.5, 0.6, 2.8])
    const labGroup = new THREE.Group();
    const greenhouseGlass = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 3.2), glassMat);
    greenhouseGlass.position.set(0, 1.3, 0);
    greenhouseGlass.castShadow = true;
    labGroup.add(greenhouseGlass);

    const frameWood = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.2, 3.4), darkWoodMat);
    frameWood.position.set(0, 0.1, 0);
    labGroup.add(frameWood);

    // Raised garden plant beds
    for (let r = -1; r <= 1; r++) {
      const bed = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 2.4), darkWoodMat);
      bed.position.set(r * 1.2, 0.15, 0);
      bed.castShadow = true;
      labGroup.add(bed);
    }

    labGroup.position.set(3.5, 0, 2.8);
    registerBuilding('nature-lab', labGroup);

    // --- ARCHITECTURAL CANOPY TREES ---
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: '#5C4033', roughness: 0.9 });
    const leafMatA = new THREE.MeshStandardMaterial({ color: '#557A57', roughness: 0.8 });
    const leafMatB = new THREE.MeshStandardMaterial({ color: '#749876', roughness: 0.8 });

    const spawnModelTree = (x: number, z: number, s = 1) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12 * s, 0.18 * s, 1.8 * s, 8), treeTrunkMat);
      trunk.position.y = 0.9 * s;
      trunk.castShadow = true;
      tree.add(trunk);

      const crown = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.1 * s, 1),
        Math.random() > 0.5 ? leafMatA : leafMatB
      );
      crown.position.y = 2.1 * s;
      crown.castShadow = true;
      tree.add(crown);

      tree.position.set(x, 0, z);
      scene.add(tree);
    };

    // Scatter 20 trees around campus borders and courtyards
    const trees = [
      [-7, -5, 1.2], [-6, -7, 1.4], [-8, 1, 1.1], [-7.5, 5, 1.3],
      [-2, -7, 1.0], [2, -7.5, 1.3], [7, -6, 1.2], [8, -3, 1.1],
      [7.5, 4, 1.4], [6, 6, 1.2], [1, 7, 1.0], [-3, 7.5, 1.3],
      [2.5, -1.5, 0.8], [-2, 1, 0.9], [4, 0, 0.8]
    ];
    trees.forEach(([x, z, s]) => spawnModelTree(x, z, s));

    // --- RAYCASTING & INTERACTION ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedBuilding = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const objectsToTest: THREE.Object3D[] = [];
      buildingMeshes.current.forEach((obj) => {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) objectsToTest.push(child);
        });
      });

      const intersects = raycaster.intersectObjects(objectsToTest, false);
      if (intersects.length > 0) {
        let parent: THREE.Object3D | null = intersects[0].object;
        while (parent && !parent.userData?.zoneId) {
          parent = parent.parent;
        }
        return parent?.userData?.zoneId || null;
      }
      return null;
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        orbitAngle.current.theta -= deltaX * 0.005;
        orbitAngle.current.phi = Math.max(
          0.2,
          Math.min(Math.PI / 2.3, orbitAngle.current.phi + deltaY * 0.005)
        );

        targetCamPos.current.x =
          targetCamLook.current.x +
          orbitAngle.current.radius * Math.sin(orbitAngle.current.phi) * Math.sin(orbitAngle.current.theta);
        targetCamPos.current.y =
          targetCamLook.current.y +
          orbitAngle.current.radius * Math.cos(orbitAngle.current.phi);
        targetCamPos.current.z =
          targetCamLook.current.z +
          orbitAngle.current.radius * Math.sin(orbitAngle.current.phi) * Math.cos(orbitAngle.current.theta);

        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      } else {
        const hitId = getIntersectedBuilding(e);
        setHoveredZoneId(hitId);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: MouseEvent) => {
      isDragging.current = false;
      const hitId = getIntersectedBuilding(e);
      if (hitId) {
        const found = CAMPUS_ZONES.find((z) => z.id === hitId);
        if (found) selectZone(found);
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // --- ANIMATION RENDER LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera position and lookAt interpolation (lerp)
      camera.position.lerp(targetCamPos.current, 0.06);
      currentCamLook.current.lerp(targetCamLook.current, 0.06);
      camera.lookAt(currentCamLook.current);

      // Subtle gentle rotation of water and foliage if in overview
      pond.rotation.y += delta * 0.05;

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
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="campus-3d" className="relative py-24 bg-[#F5EFE7] border-y border-[#E8DFC0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E27D60] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Architectural Model</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1E2522] tracking-tight">
            Explore the WonderNest Campus
          </h2>
          <p className="text-sm md:text-base text-[#55605A] max-w-xl mt-2 font-sans">
            Designed as a child-scaled architectural sanctuary. Click any pavilion to fly in, inspect spaces, and watch documentary video moments.
          </p>
        </div>

        {/* Viewport Presets Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={resetOverview}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              cameraMode === 'overview'
                ? 'bg-[#1E2522] text-white shadow-xs'
                : 'bg-white text-[#1E2522] border border-[#DCD3C5] hover:bg-[#FAF8F5]'
            }`}
          >
            Full Campus Overview
          </button>

          {CAMPUS_ZONES.map((zone) => (
            <button
              key={zone.id}
              onClick={() => selectZone(zone)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                cameraMode === zone.id
                  ? 'bg-[#E27D60] text-white shadow-xs'
                  : 'bg-white text-[#1E2522] border border-[#DCD3C5] hover:bg-[#FAF8F5]'
              }`}
            >
              {zone.name.split(' ')[1] || zone.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D WebGL Architectural Model Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div
          data-cursor="EXPLORE"
          className="relative w-full h-[580px] md:h-[680px] rounded-3xl overflow-hidden shadow-xl border border-[#DFD6C7] bg-[#FAF7F2] select-none"
        >
          {/* Three.js Canvas */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive HUD Overlay: Compass & Hint */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#1E2522]/70 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E0D8CB] flex items-center gap-2 shadow-xs">
              <Eye className="w-3.5 h-3.5 text-[#E27D60]" />
              Drag to Orbit · Click Building to Fly In
            </span>

            {hoveredZoneId && !selectedZone && (
              <span className="text-xs font-mono uppercase tracking-wider text-white bg-[#1E2522]/90 backdrop-blur-md px-3 py-1 rounded-md shadow-md animate-fade-in">
                Hovering: {CAMPUS_ZONES.find((z) => z.id === hoveredZoneId)?.name || 'Central Hall'}
              </span>
            )}
          </div>

          {/* Reset Camera Button */}
          {selectedZone && (
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={resetOverview}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#1E2522] text-xs font-medium shadow-md border border-[#E0D8CB] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8C8275]" />
                <span>Return to Overview</span>
              </button>
            </div>
          )}

          {/* Sliding Pavilion Profile Drawer when a building is selected */}
          {selectedZone && (
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[460px] z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-[#E5DDD0] animate-slide-up">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E27D60] font-semibold">
                    {selectedZone.category}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1E2522] tracking-tight mt-0.5">
                    {selectedZone.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EAE3D9] text-[#1E2522] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Poetic Quote */}
              <p className="mt-3 text-xs italic font-serif text-[#4A5550] border-l-2 border-[#E27D60] pl-3">
                “{selectedZone.quote}”
              </p>

              {/* Architectural Description */}
              <p className="mt-3 text-xs text-[#55605A] font-sans leading-relaxed">
                {selectedZone.description}
              </p>

              {/* Architectural Insight */}
              <div className="mt-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DD] text-[11px] text-[#6A7570] font-mono">
                <span className="font-semibold text-[#1E2522]">Architecture: </span>
                {selectedZone.architecturalNote}
              </div>

              {/* Key Features */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedZone.features.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-mono text-[#4A5550] bg-[#F0EBE3] px-2 py-0.5 rounded-md"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Watch Experience Video CTA */}
              <div className="mt-5 pt-4 border-t border-[#EFE8DD] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8C8275]">
                  Lead: {selectedZone.teacherLead.split(',')[0]}
                </span>

                <button
                  onClick={() => onOpenZoneVideo(selectedZone)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E27D60] hover:bg-[#d46a4d] text-white text-xs font-semibold tracking-wide shadow-md transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>WATCH EXPERIENCE</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
