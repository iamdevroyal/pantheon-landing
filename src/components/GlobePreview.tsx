import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CONTINENTS, type ContinentData } from '../data/continents';
import { sound } from '../utils/audio';

interface GlobePreviewProps {
  selectedContinent: ContinentData;
  onSelectContinent: (continent: ContinentData) => void;
  isPledged?: boolean;
}

export const GlobePreview: React.FC<GlobePreviewProps> = ({
  selectedContinent,
  onSelectContinent,
  isPledged = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);
  const ringGroupRef = useRef<THREE.Group | null>(null);
  const beaconMeshRef = useRef<THREE.Mesh | null>(null);
  const deitySpritesRef = useRef<Record<string, THREE.Sprite>>({});
  const selectedContinentIdRef = useRef<string>(selectedContinent.id);

  useEffect(() => {
    selectedContinentIdRef.current = selectedContinent.id;
  }, [selectedContinent]);

  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const isInterpolatingToContinentRef = useRef(false);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 450;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    
    // Auto-fit camera distance based on viewport width to prevent clipping on mobile
    const updateCameraDistance = (w: number) => {
      const zoomFactor = w < 480 ? 1.45 : w < 768 ? 1.25 : 1.0;
      camera.position.z = 2.85 * zoomFactor;
    };
    updateCameraDistance(width);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 4. Primary Navy Sphere
    const globeRadius = 1.0;
    const sphereGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x050D1C,
      emissive: 0x030712,
      shininess: 45,
      specular: 0x1E3A5F,
    });
    const globeMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globeGroup.add(globeMesh);

    // 5. Sacred Grid Lines
    const wireframeGeometry = new THREE.SphereGeometry(globeRadius + 0.003, 36, 18);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22365A,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globeGroup.add(wireframeMesh);

    // 6. Glowing Armillary Astrolabe Celestial Rings
    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = 23.5 * (Math.PI / 180); // Earth axial tilt
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;

    const armillaryGeo1 = new THREE.TorusGeometry(globeRadius * 1.35, 0.008, 16, 100);
    const armillaryMat1 = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.55,
    });
    const armillaryMesh1 = new THREE.Mesh(armillaryGeo1, armillaryMat1);
    ringGroup.add(armillaryMesh1);

    const armillaryGeo2 = new THREE.TorusGeometry(globeRadius * 1.45, 0.005, 16, 100);
    const armillaryMat2 = new THREE.MeshBasicMaterial({
      color: 0x80A4FF,
      transparent: true,
      opacity: 0.35,
    });
    const armillaryMesh2 = new THREE.Mesh(armillaryGeo2, armillaryMat2);
    armillaryMesh2.rotation.y = Math.PI / 4;
    ringGroup.add(armillaryMesh2);

    // 7. Glowing Atmospheric Halo
    const haloGeometry = new THREE.SphereGeometry(globeRadius * 1.18, 64, 64);
    const haloMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          gl_FragColor = vec4(1.0, 0.84, 0.0, 1.0) * intensity * 0.75 + vec4(0.2, 0.5, 1.0, 1.0) * intensity * 0.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(haloMesh);

    // 8. Dynamic Beacon of Divine Light
    const beaconGeometry = new THREE.CylinderGeometry(0.008, 0.04, 0.75, 16);
    const beaconMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const beaconMesh = new THREE.Mesh(beaconGeometry, beaconMaterial);
    beaconMesh.visible = false;
    globeGroup.add(beaconMesh);
    beaconMeshRef.current = beaconMesh;

    // 9. Directional & Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xffe27a, 2.4);
    goldKeyLight.position.set(4, 3, 5);
    scene.add(goldKeyLight);

    const blueBackLight = new THREE.DirectionalLight(0x4466cc, 1.5);
    blueBackLight.position.set(-5, -2, -4);
    scene.add(blueBackLight);

    // 10. Cosmic Particles
    const dustCount = 600;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 16;
      dustPositions[i + 1] = (Math.random() - 0.5) * 16;
      dustPositions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xFFD700,
      size: 0.03,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 11. Continental Pins & Floating Deity Medallions
    const pinsGroup = new THREE.Group();
    globeGroup.add(pinsGroup);
    pinsGroupRef.current = pinsGroup;

    const deitySprites: Record<string, THREE.Sprite> = {};
    const clickableObjects: THREE.Object3D[] = [];

    const latLngToVec3 = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    CONTINENTS.forEach((continent) => {
      const pos = latLngToVec3(continent.lat, continent.lng, globeRadius);

      // Continental ring
      const ringGeo = new THREE.RingGeometry(0.04, 0.065, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(continent.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      pinsGroup.add(ringMesh);

      // Pin sphere
      const pinGeo = new THREE.SphereGeometry(0.038, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(continent.color),
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { continent };
      pinsGroup.add(pinMesh);
      clickableObjects.push(pinMesh);

      // Point light
      const pinLight = new THREE.PointLight(continent.color, 1.2, 0.8);
      pinLight.position.copy(pos.clone().multiplyScalar(1.05));
      pinsGroup.add(pinLight);

      // Floating Deity Avatar Sprite
      const img = new Image();
      img.src = continent.godImage;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Outer radial aura
        const aura = ctx.createRadialGradient(128, 128, 85, 128, 128, 126);
        aura.addColorStop(0, 'rgba(255, 215, 0, 0.9)');
        aura.addColorStop(0.65, continent.color);
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(128, 128, 126, 0, Math.PI * 2);
        ctx.fill();

        // Circular clip for deity portrait
        ctx.save();
        ctx.beginPath();
        ctx.arc(128, 128, 100, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0, 256, 256);
        ctx.restore();

        // Sacred Gold Bezel
        ctx.beginPath();
        ctx.arc(128, 128, 100, 0, Math.PI * 2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#FFD700';
        ctx.stroke();

        // Inner Cultural Color Rim
        ctx.beginPath();
        ctx.arc(128, 128, 93, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = continent.color;
        ctx.stroke();

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const spriteMat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: false,
        });
        const sprite = new THREE.Sprite(spriteMat);
        // Float at the light pillar peak right above the continent pin
        sprite.position.copy(pos.clone().multiplyScalar(1.28));
        const initScale = continent.id === selectedContinent.id ? 0.44 : 0.28;
        sprite.scale.set(initScale, initScale, 1);
        sprite.userData = { continent };
        globeGroup.add(sprite);
        deitySprites[continent.id] = sprite;
        clickableObjects.push(sprite);
      };
    });

    deitySpritesRef.current = deitySprites;

    // 12. Drag & Orbit Listeners + Raycasting for Deity Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hasDragged = false;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      hasDragged = false;
      isInterpolatingToContinentRef.current = false;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDragged = true;
      }

      globeGroupRef.current.rotation.y += deltaX * 0.007;
      globeGroupRef.current.rotation.x += deltaY * 0.007;
      globeGroupRef.current.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroupRef.current.rotation.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = (e: MouseEvent) => {
      isDraggingRef.current = false;
      // If user merely clicked without dragging, raycast to select deity
      if (!hasDragged && containerRef.current && cameraRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraRef.current);
        const intersects = raycaster.intersectObjects(clickableObjects, true);
        if (intersects.length > 0) {
          const hit = intersects[0].object;
          if (hit.userData && hit.userData.continent) {
            sound.playChime(950);
            onSelectContinent(hit.userData.continent);
          }
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        isInterpolatingToContinentRef.current = false;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
      globeGroupRef.current.rotation.y += deltaX * 0.008;
      globeGroupRef.current.rotation.x += deltaY * 0.008;
      globeGroupRef.current.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroupRef.current.rotation.x));
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 13. Persistent Auto-Rotation & Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow counter-rotation of astrolabe ring
      ringGroup.rotation.z -= delta * 0.06;

      if (globeGroupRef.current) {
        if (isPledged) {
          // Accelerated celestial spin during pull
          globeGroupRef.current.rotation.y += 0.055;
        } else if (isDraggingRef.current) {
          // User is actively orbiting
        } else if (isInterpolatingToContinentRef.current) {
          // Smoothly lerping to clicked continent
          const targetY = targetRotationRef.current.y;
          const targetX = targetRotationRef.current.x;
          globeGroupRef.current.rotation.y += (targetY - globeGroupRef.current.rotation.y) * 0.045;
          globeGroupRef.current.rotation.x += (targetX - globeGroupRef.current.rotation.x) * 0.045;

          if (
            Math.abs(targetY - globeGroupRef.current.rotation.y) < 0.01 &&
            Math.abs(targetX - globeGroupRef.current.rotation.x) < 0.01
          ) {
            isInterpolatingToContinentRef.current = false;
          }
        } else {
          // Continuous, hypnotic, smooth auto-rotation
          globeGroupRef.current.rotation.y += 0.0025;
        }
      }

      // Pulse pin rings & light beacon
      if (pinsGroupRef.current) {
        const pulse = 1 + Math.sin(elapsedTime * 4.5) * 0.18;
        pinsGroupRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
            child.scale.set(pulse, pulse, pulse);
          }
        });
      }

      if (beaconMeshRef.current && beaconMeshRef.current.visible) {
        beaconMeshRef.current.scale.y = 1 + Math.sin(elapsedTime * 6) * 0.15;
      }

      // Dynamically pulse deity avatar medallions on globe
      const activeId = selectedContinentIdRef.current;
      if (deitySpritesRef.current) {
        Object.entries(deitySpritesRef.current).forEach(([id, sprite]) => {
          if (id === activeId) {
            const activeScale = 0.44 + Math.sin(elapsedTime * 4.5) * 0.05;
            sprite.scale.set(activeScale, activeScale, 1);
          } else {
            sprite.scale.set(0.28, 0.28, 1);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = w / h;
          updateCameraDistance(w);
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Update target rotation and divine beacon when continent changes
  useEffect(() => {
    if (!selectedContinent) return;
    const targetY = -((selectedContinent.lng + 90) * (Math.PI / 180));
    const targetX = (selectedContinent.lat * (Math.PI / 180)) * 0.7;
    targetRotationRef.current = { x: targetX, y: targetY };
    isInterpolatingToContinentRef.current = true;

    // Position vertical divine light beacon
    if (beaconMeshRef.current) {
      const phi = (90 - selectedContinent.lat) * (Math.PI / 180);
      const theta = (selectedContinent.lng + 180) * (Math.PI / 180);
      const r = 1.0;
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      const pos = new THREE.Vector3(x, y, z);

      beaconMeshRef.current.position.copy(pos.clone().multiplyScalar(1.35));
      beaconMeshRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      (beaconMeshRef.current.material as THREE.MeshBasicMaterial).color = new THREE.Color(selectedContinent.color);
      beaconMeshRef.current.visible = true;
    }
  }, [selectedContinent]);

  const handleContinentClick = (c: ContinentData) => {
    sound.playChime();
    onSelectContinent(c);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '340px',
        overflow: 'hidden',
      }}
    >
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        }}
      />

      {/* Floating Cultural Tag Banner */}
      <div
        className="globe-tag-banner"
        style={{
          position: 'absolute',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          textAlign: 'center',
          zIndex: 10,
          width: 'calc(100% - 32px)',
          maxWidth: '380px',
        }}
      >
        <div
          className="ornate-card globe-tag-card"
          style={{
            border: `1px solid ${selectedContinent.color}`,
            boxShadow: `0 0 25px ${selectedContinent.color}50`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
          }}
        >
          <img
            src={selectedContinent.godImage}
            alt={selectedContinent.featuredGod}
            className="globe-tag-img"
            style={{
              borderRadius: '50%',
              border: '2px solid #FFD700',
              boxShadow: `0 0 16px ${selectedContinent.color}`,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: '#FFF', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{selectedContinent.emoji}</span>
              <span>{selectedContinent.name.toUpperCase()} REALM</span>
            </div>
            <div style={{ fontSize: '11px', color: selectedContinent.color, letterSpacing: '0.6px', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedContinent.featuredGod}
            </div>
          </div>
        </div>
      </div>

      {/* Orbit Hint Pill */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '10px',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
          pointerEvents: 'none',
        }}
        className="nav-desktop"
      >
        <span>✧ DRAG TO ORBIT</span>
      </div>

      {/* Mobile-Friendly Continent Selector Carousel Bar */}
      <div
        className="globe-continents-carousel"
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
          width: 'calc(100% - 24px)',
          maxWidth: '640px',
          overflowX: 'auto',
          borderRadius: '30px',
          background: 'rgba(7, 7, 20, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7)',
          scrollbarWidth: 'none',
        }}
      >
        {CONTINENTS.map((c) => {
          const isSelected = c.id === selectedContinent.id;
          return (
            <button
              key={c.id}
              className={`globe-continent-pill ${isSelected ? 'selected' : ''}`}
              onClick={() => handleContinentClick(c)}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${c.color} 0%, rgba(10,10,26,0.95) 150%)` 
                  : 'transparent',
                color: isSelected ? '#FFFFFF' : '#B0AFD0',
                border: isSelected ? `1px solid ${c.color}` : '1px solid transparent',
                borderRadius: '20px',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? `0 0 16px ${c.color}70` : 'none',
                flexShrink: 0,
              }}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
