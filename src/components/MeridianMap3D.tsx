import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Compass, Eye, RotateCcw, Sparkles, X, ChevronRight, Layers, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { zenAudio } from '../utils/audioZen';

interface PressurePointData {
  id: string;
  name: { tr: string; jp: string; en: string };
  kanji: string;
  romaji: string;
  kataNum: number;
  position: [number, number, number]; // [x, y, z] in 3D world space
  spineSegment: string;
  anatomicalDesc: { tr: string; jp: string; en: string };
  benefits: { tr: string[]; jp: string[]; en: string[] };
  freq: number;
}

const PRESSURE_POINTS: PressurePointData[] = [
  {
    id: 'sacroiliac-point',
    name: { tr: 'Sakroiliyak Düzeltme Noktası', jp: '仙骨・仙腸関節矯正ツボ', en: 'Sacroiliac Alignment Point' },
    kanji: '仙骨',
    romaji: 'Senkotsu Tsubo',
    kataNum: 42,
    position: [0, -0.4, 0.22],
    spineSegment: 'Sacrum / S1-S3',
    anatomicalDesc: {
      tr: 'Leğen kemiği ile sakrum arasındaki ana biyomekanik temas bölgesi.',
      jp: '腸骨（骨盤）と仙骨の間の主要なバイオメカニクス接合部。',
      en: 'Primary biomechanical contact zone between pelvic ilium and sacrum.'
    },
    benefits: {
      tr: [
        'Bacak boyu eşitsizliğini 4-6 seansta 5-12mm oranında düzeltir.',
        'Vücudun kütle merkezini simetrik eksene getirir.',
        'Siyatik sinir baskısını serbest bırakır.'
      ],
      jp: [
        '4〜6回の施術で脚長差（5〜12mmの左右不均衡）を根本正中化。',
        '身体の重心（重心軸）を正しい対称軸へ復元。',
        '仙骨神経叢での坐骨神経圧迫を解放。'
      ],
      en: [
        'Corrects leg length discrepancy by 5-12mm over 4-6 sessions.',
        'Restores human center of gravity to the true symmetrical axis.',
        'Relieves sciatic nerve entrapment at the sacral plexus.'
      ]
    },
    freq: 432
  },
  {
    id: 'lumbar-psoas-point',
    name: { tr: 'L4-L5 Lumbal Dekompresyon Noktası', jp: 'L4-L5 腰椎椎間板減圧ツボ', en: 'L4-L5 Lumbar Decompression Point' },
    kanji: '腰椎',
    romaji: 'Yochui Tsubo',
    kataNum: 14,
    position: [0, 0.1, 0.28],
    spineSegment: 'L4 - L5 - Psoas',
    anatomicalDesc: {
      tr: 'Bel çukuru ve psoas kasının omurgaya tutunduğu kritik dekompresyon noktası.',
      jp: '大腰筋と第4・第5腰椎が交差する椎間板減圧の要衝。',
      en: 'Critical decompression zone where psoas major meets the L4-L5 vertebrae.'
    },
    benefits: {
      tr: [
        'Disk içi basıncı düşürerek fıtık batmalarını hafifletir.',
        'Derin bel spazmlarını ve omurga sertliğini giderir.',
        'Oturma kaynaklı bel yorgunluğunu anında nötrler.'
      ],
      jp: [
        '椎間板内圧を軽減し、ヘルニアによる神経刺激を緩和。',
        '深部腰筋スパズムと脊柱の拘縮を解きほぐす。',
        '長時間のデスクワークによる腰部疲労を即座にリセット。'
      ],
      en: [
        'Reduces intradiscal pressure to alleviate herniated disc pain.',
        'Dissolves deep lower back spasms and stiffness.',
        'Instantly neutralizes sitting-induced lumbar fatigue.'
      ]
    },
    freq: 528
  },
  {
    id: 'piriformis-point',
    name: { tr: 'Derin Piriformis Gevşetme Noktası', jp: '梨状筋深部弛緩肘圧ツbo', en: 'Deep Piriformis Release Point' },
    kanji: '臀部',
    romaji: 'Denbu Hijiatsu',
    kataNum: 35,
    position: [0.32, -0.5, 0.12],
    spineSegment: 'Gluteus / Piriformis',
    anatomicalDesc: {
      tr: 'Kalça derinindeki piriformis kası ve siyatik sinir geçiş kanalı.',
      jp: '臀部深層の梨状筋と坐骨神経貫通領域。',
      en: 'Deep gluteal piriformis muscle and sciatic nerve passage canal.'
    },
    benefits: {
      tr: [
        'Yalancı siyatik (Piriformis sendromu) ağrılarını %90 azaltır.',
        'Kalça eklem hareket açıklığını artırır.',
        'Pelvis rotasyonel eğikliğini dengeler.'
      ],
      jp: [
        '梨状筋症候群（偽性坐骨神経痛）の痛みを90%緩和。',
        '股関節の可動域 (ROM) を飛躍的に拡大。',
        '骨盤の回旋ねじれ不均衡を補正。'
      ],
      en: [
        'Reduces pseudo-sciatica (Piriformis Syndrome) discomfort by 90%.',
        'Expands hip joint range of motion.',
        'Balances pelvic rotational asymmetry.'
      ]
    },
    freq: 396
  },
  {
    id: 'cervical-c1-point',
    name: { tr: 'C1-C2 Atlas Vagus Noktası', jp: 'C1-C2 環椎・迷走神経ツボ', en: 'C1-C2 Atlas Vagus Point' },
    kanji: '頸骨',
    romaji: 'Keikotsu Tsubo',
    kataNum: 3,
    position: [0, 1.45, 0.15],
    spineSegment: 'C1 - C2 Cervical',
    anatomicalDesc: {
      tr: 'Kafa tabanı ve omurilik girişindeki birinci servikal omur teması.',
      jp: '頭蓋底と脊髄入口部に位置する第1頸椎（環椎）調整点。',
      en: 'First cervical vertebra interface at the base of the skull.'
    },
    benefits: {
      tr: [
        'Vagus sinirini uyararak otonom sinir sistemini sakinleştirir.',
        'Gerilim tipi baş ağrılarını ve boyun kulunçlarını açar.',
        'Serebral kan akışını ve zihinsel berraklığı destekler.'
      ],
      jp: [
        '迷走神経を刺激し、交感神経過緊張を沈静化（自律神経調和）。',
        '緊張性頭痛や頸部凝りを即効解除。',
        '脳血流と精神的清涼感を向上。'
      ],
      en: [
        'Stimulates vagus nerve to calm sympathetic fight-or-flight.',
        'Eliminates chronic tension headaches & neck tightness.',
        'Enhances cerebral blood flow and mental clarity.'
      ]
    },
    freq: 639
  },
  {
    id: 'trapezius-shoulder-point',
    name: { tr: 'Trapez & Omuz Dengeleme Noktası', jp: '肩井・僧帽筋・肩関節バランスツボ', en: 'Trapezius & Shoulder Balance Point' },
    kanji: '肩井',
    romaji: 'Jianjing Tsubo',
    kataNum: 9,
    position: [-0.45, 1.15, 0.1],
    spineSegment: 'T1 - T3 Paraspinal',
    anatomicalDesc: {
      tr: 'Omuz başı ve üst trapez kasının boyun ile birleştiği nokta.',
      jp: '肩峰と僧帽筋上部が首と接続する肩井ツボ。',
      en: 'Junction of the upper trapezius muscle and shoulder girdle.'
    },
    benefits: {
      tr: [
        'Sol/sağ omuz yüksekliği farkını eşitler.',
        'Masa başı duruş bozukluğunu (Kamburluk/Kipoz) düzeltir.',
        'Sırt kaslarındaki kronik laktik asit birikimini dağıtır.'
      ],
      jp: [
        '左右の肩の高さ（歪み）を水平均等に補正。',
        '猫背（胸椎後弯症）姿勢をリセット。',
        '背筋群の乳酸蓄積と慢性的凝りを緩和。'
      ],
      en: [
        'Equalizes left/right shoulder height discrepancy.',
        'Corrects forward-head postural kyphosis.',
        'Disperses chronic paraspinal lactic acid buildup.'
      ]
    },
    freq: 528
  }
];

export const MeridianMap3D: React.FC = () => {
  const { language } = useLanguage();
  const canvasMountRef = useRef<HTMLDivElement | null>(null);

  const [selectedPoint, setSelectedPoint] = useState<PressurePointData | null>(PRESSURE_POINTS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointMeshesRef = useRef<{ mesh: THREE.Mesh; data: PressurePointData }[]>([]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // Detect software WebGL as required by Three.js skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene & Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Clear background
    renderer.setClearColor(0x000000, 0);

    // Empty container & append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting & PMREM Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const keyLight = new THREE.DirectionalLight(0xFFF2DF, 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xE2D3C1, 0x1A1816, 1.2);
    scene.add(hemiLight);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.8;
    controls.maxDistance = 6;
    controls.minDistance = 2;
    controls.target.set(0, 0.2, 0);
    controlsRef.current = controls;

    // 4. Procedural 3D Composite Human Anatomy Model (THREE.Group)
    const anatomyGroup = new THREE.Group();

    // Materials
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x2A2622,
      roughness: 0.3,
      metalness: 0.1,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85,
      wireframe: isWireframe,
      clearcoat: 0.5
    });

    const spineMat = new THREE.MeshStandardMaterial({
      color: 0xC49B66,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: isWireframe
    });

    const goldJointMat = new THREE.MeshStandardMaterial({
      color: 0x8B261E,
      roughness: 0.3,
      metalness: 0.5
    });

    // Head
    const headGeo = new THREE.SphereGeometry(0.24, 24, 24);
    headGeo.scale(1, 1.25, 1.1);
    const headMesh = new THREE.Mesh(headGeo, bodyMat);
    headMesh.position.set(0, 1.8, 0);
    anatomyGroup.add(headMesh);

    // Cervical & Torso Core
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.28, 1.1, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    torsoMesh.position.set(0, 0.7, 0);
    anatomyGroup.add(torsoMesh);

    // Pelvis & Sacrum Block
    const pelvisGeo = new THREE.CylinderGeometry(0.32, 0.26, 0.45, 16);
    pelvisGeo.scale(1.2, 1, 0.9);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, spineMat);
    pelvisMesh.position.set(0, -0.2, 0);
    anatomyGroup.add(pelvisMesh);

    // Vertebral Column (C1 to Sacrum)
    const vertebraeCount = 20;
    for (let i = 0; i < vertebraeCount; i++) {
      const vGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.04, 12);
      const vMesh = new THREE.Mesh(vGeo, spineMat);
      const yPos = 1.45 - (i * 0.09);
      vMesh.position.set(0, yPos, 0.12);
      anatomyGroup.add(vMesh);
    }

    // Shoulders & Arms
    const leftArmGeo = new THREE.CylinderGeometry(0.08, 0.06, 1.0, 12);
    const leftArm = new THREE.Mesh(leftArmGeo, bodyMat);
    leftArm.position.set(-0.52, 0.65, 0);
    leftArm.rotation.z = 0.15;
    anatomyGroup.add(leftArm);

    const rightArm = new THREE.Mesh(leftArmGeo, bodyMat);
    rightArm.position.set(0.52, 0.65, 0);
    rightArm.rotation.z = -0.15;
    anatomyGroup.add(rightArm);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.12, 0.08, 1.2, 16);
    const leftLeg = new THREE.Mesh(legGeo, bodyMat);
    leftLeg.position.set(-0.2, -0.95, 0);
    anatomyGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, bodyMat);
    rightLeg.position.set(0.2, -0.95, 0);
    anatomyGroup.add(rightLeg);

    scene.add(anatomyGroup);

    // 5. Overlay Yumeiho Meridian Pressure Points (Floating 3D Orbs)
    pointMeshesRef.current = [];

    PRESSURE_POINTS.forEach(pt => {
      // Point Outer Ring / Glowing Orb
      const orbGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xF59E0B, // Amber gold
        emissive: 0xB45309,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9
      });

      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      orbMesh.position.set(...pt.position);

      // Pulse ring child
      const ringGeo = new THREE.RingGeometry(0.08, 0.11, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xFBBF24,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      orbMesh.add(ringMesh);

      scene.add(orbMesh);
      pointMeshesRef.current.push({ mesh: orbMesh, data: pt });
    });

    // Ground Contact Shadow Disc
    const groundGeo = new THREE.PlaneGeometry(3, 3);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x121110,
      transparent: true,
      opacity: 0.4
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -1.6;
    scene.add(groundMesh);

    // Raycaster for interactive click/hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        pointMeshesRef.current.map(p => p.mesh)
      );

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = pointMeshesRef.current.find(p => p.mesh === hitMesh);
        if (matched) {
          setSelectedPoint(matched.data);
          zenAudio.playZenBowl(matched.data.freq, 2.0);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Animate pressure point pulsing scale
      pointMeshesRef.current.forEach((item, idx) => {
        const scale = 1 + Math.sin(time * 3 + idx) * 0.15;
        item.mesh.scale.set(scale, scale, scale);
      });

      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [isWireframe]);

  // Sync autoRotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  return (
    <section className="py-24 bg-stone-950 text-stone-100 border-t border-stone-800 transition-colors duration-300 relative overflow-hidden select-none">
      {/* Background Ambient Kanji */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <span className="font-serif text-[26rem] text-amber-200">ツボ</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-900/40 text-amber-300 border border-amber-800/40 text-xs tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? '3D İnteraktif Tsubo & Meridyen Haritası' : '3D Interactive Meridian & Tsubo Map'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-50 tracking-tight">
            {language === 'tr' ? 'Yumeiho Bası Noktaları & Terapötik Etkileri' : 'Yumeiho Pressure Points & Clinical Benefits'}
          </h2>
          <p className="mt-3 text-stone-400 text-sm">
            {language === 'tr'
              ? '3D insan anatomisi üzerinde Yumeiho basınç noktalarını keşfetmek için noktalara tıklayın veya aşağıdaki listeden inceleyin.'
              : 'Click on 3D pressure points or select from the list to explore Yumeiho meridian stimulation and therapeutic outcomes.'}
          </p>
        </div>

        {/* 3D Scene Viewport & Side Detail Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D Canvas Viewport (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 rounded-3xl border border-stone-800 p-4 relative shadow-2xl min-h-[500px] flex flex-col justify-between overflow-hidden">
            
            {/* Top Badge Overlay */}
            <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono text-stone-300">
                {language === 'tr' ? '3D WebGL Biyomekanik Modeli' : '3D WebGL Biomechanical Model'}
              </span>
            </div>

            {/* Canvas Mount */}
            <div ref={canvasMountRef} className="w-full h-[450px] cursor-grab active:cursor-grabbing" />

            {/* Collapsible Bottom Control Dock (Following Three.js Skill Directives) */}
            <div className="mt-2 p-3 rounded-2xl bg-stone-950/95 backdrop-blur-md border border-stone-800/90 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
                    isAutoRotate
                      ? 'border-amber-600 bg-amber-950/60 text-amber-300'
                      : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isAutoRotate
                    ? (language === 'tr' ? 'Döndürme: Açık' : 'Rotate: ON')
                    : (language === 'tr' ? 'Döndürme: Kapalı' : 'Rotate: OFF')}
                </button>

                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
                    isWireframe
                      ? 'border-amber-600 bg-amber-950/60 text-amber-300'
                      : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isWireframe
                    ? (language === 'tr' ? 'İskelet / Tel Kafes' : 'Wireframe Mode')
                    : (language === 'tr' ? 'Anatomik Görünüm' : 'Anatomical View')}
                </button>
              </div>

              <span className="text-[11px] font-mono text-stone-500 hidden sm:inline">
                {language === 'tr' ? 'Sürükle: Döndür | Tekerlek: Yakınlaştır' : 'Drag: Rotate | Scroll: Zoom'}
              </span>
            </div>
          </div>

          {/* Point Selection List & Active Detail Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Selector Pills */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                {language === 'tr' ? 'Yumeiho Tsubo / Nokta Seçin:' : 'Select Yumeiho Tsubo Point:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESSURE_POINTS.map(pt => {
                  const isSel = selectedPoint?.id === pt.id;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => {
                        setSelectedPoint(pt);
                        zenAudio.playZenBowl(pt.freq, 2.0);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSel
                          ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-950/40'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-semibold block text-stone-200">{pt.name[language]}</span>
                        <span className="text-[10px] font-mono text-amber-400/80">{pt.spineSegment}</span>
                      </div>
                      <span className="font-serif text-amber-300 font-bold text-sm">{pt.kanji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Point Detail Showcase */}
            {selectedPoint && (
              <motion.div
                key={selectedPoint.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-600/40 shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-amber-900/60 text-amber-300 border border-amber-700/50">
                    Kata #{selectedPoint.kataNum} • {selectedPoint.spineSegment}
                  </span>
                  <span className="font-serif text-2xl font-bold text-amber-300">{selectedPoint.kanji}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-amber-100">
                  {selectedPoint.name[language]}
                </h3>
                <p className="text-xs font-serif text-amber-400/90 italic mb-3">
                  {selectedPoint.romaji}
                </p>

                <p className="text-xs text-stone-300 leading-relaxed mb-4 bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                  {selectedPoint.anatomicalDesc[language]}
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 block">
                    {language === 'tr' ? 'Terapötik Klinik Faydaları:' : 'Clinical Therapeutic Outcomes:'}
                  </span>
                  <ul className="space-y-1.5">
                    {selectedPoint.benefits[language].map((benefit, idx) => (
                      <li key={idx} className="text-xs text-stone-300 flex items-start space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
