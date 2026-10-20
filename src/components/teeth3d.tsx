import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { createElement as h, Fragment, useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- shared tooth geometry ---------- */
function makeToothGeometry(cusps: number, cuspDepth = 0.07, rootless = false) {
  const prof: THREE.Vector2[] = [
    [0.001, -1.25], [0.06, -1.2], [0.12, -0.9], [0.19, -0.5], [0.25, -0.15], [0.28, 0],
    [0.33, 0.18], [0.37, 0.36], [0.37, 0.5], [0.33, 0.62], [0.24, 0.7], [0.12, 0.74], [0.001, 0.75],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const g = new THREE.LatheGeometry(prof, 48);
  const p = g.getAttribute("position") as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const a = Math.atan2(v.z, v.x);
    if (v.y > 0.45 && cusps > 0) v.y += cuspDepth * Math.cos(cusps * a) * ((v.y - 0.45) / 0.3);
    if (v.y < -0.1 && cusps >= 2) v.x *= 1 + 0.35 * Math.abs(Math.cos(a)); // splayed roots
    if (rootless && v.y < -0.2) v.y = -0.2;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

const enamel = { color: "#f7f1e3", roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.15, sheen: 0.4 };

// Built with createElement (not JSX) so the dev-only source-tagging plugin
// doesn't add a "data-tsd-source" prop, which three.js objects reject.
function Lights() {
  return h(Fragment, null,
    h("ambientLight", { intensity: 0.6 }),
    h("directionalLight", { position: [3, 5, 4], intensity: 1.6 }),
    h(Environment, { resolution: 64 },
      h(Lightformer, { intensity: 2, position: [0, 5, 2], scale: [10, 10, 1] }),
      h(Lightformer, { intensity: 1.2, color: "#f2d79b", position: [-5, 1, -1], rotation: [0, Math.PI / 2, 0], scale: [20, 2, 1] }),
      h(Lightformer, { intensity: 1, color: "#bfe3d6", position: [5, 0, 1], rotation: [0, -Math.PI / 2, 0], scale: [20, 2, 1] }),
    ),
  );
}

/* ---------- full 32-tooth jaw ---------- */
import { toothInfo, type ToothType } from "@/lib/teeth";
void toothInfo;
const order: ToothType[] = ["incisors", "incisors", "canines", "premolars", "premolars", "molars", "molars", "wisdom"];
const widths = [0.4, 0.34, 0.4, 0.38, 0.38, 0.54, 0.52, 0.48];
const shape: Record<ToothType, { s: [number, number, number]; cusps: number }> = {
  incisors: { s: [1.05, 1, 0.55], cusps: 0 },
  canines: { s: [0.85, 1.15, 0.85], cusps: 1 },
  premolars: { s: [0.95, 0.95, 1], cusps: 2 },
  molars: { s: [1.35, 0.85, 1.3], cusps: 4 },
  wisdom: { s: [1.2, 0.8, 1.15], cusps: 4 },
};

function Jaw({ active, setActive }: { active: ToothType | null; setActive: (t: ToothType | null) => void }) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3([[-2.1, 0, -1.7], [-1.95, 0, -0.2], [-1.35, 0, 1.0], [0, 0, 1.65], [1.35, 0, 1.0], [1.95, 0, -0.2], [2.1, 0, -1.7]].map(([x, y, z]) => new THREE.Vector3(x, y, z))),
    [],
  );
  const geos = useMemo(() => ({ 0: makeToothGeometry(0, 0, true), 1: makeToothGeometry(1, 0.12, true), 2: makeToothGeometry(2, 0.07, true), 4: makeToothGeometry(4, 0.07, true) }) as Record<number, THREE.BufferGeometry>, []);
  const gum = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.21, 16, false), [curve]);

  const teeth = useMemo(() => {
    const half = curve.getLength() / 2;
    const total = widths.reduce((a, b) => a + b, 0);
    const f = (half * 0.96) / total;
    const list: { type: ToothType; pos: THREE.Vector3; rotY: number; upper: boolean; key: string }[] = [];
    for (const upper of [true, false])
      for (const side of [1, -1]) {
        let cum = 0;
        order.forEach((type, i) => {
          const mid = (cum + widths[i]! / 2) * f;
          cum += widths[i]!;
          const u = 0.5 + (side * mid) / (half * 2);
          const pt = curve.getPointAt(u);
          const tan = curve.getTangentAt(u);
          list.push({ type, pos: pt, rotY: Math.atan2(tan.x, tan.z) + Math.PI / 2, upper, key: `${upper}${side}${i}` });
        });
      }
    return list;
  }, [curve]);

  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current && !active) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.25;
  });

  return h("group", { ref: group, position: [0, 0, -0.1] },
    ...[1.02, -1.02].map((y) =>
      h("mesh", { key: y, geometry: gum, position: [0, y, 0], scale: [1, 1.55, 1] },
        h("meshPhysicalMaterial", { color: "#d9848a", roughness: 0.45, clearcoat: 0.6 }))),
    ...teeth.map((t) => {
      const sh = shape[t.type];
      const on = active === t.type;
      return h("mesh", {
        key: t.key,
        geometry: geos[sh.cusps]!,
        position: [t.pos.x, t.upper ? 0.72 : -0.72, t.pos.z],
        rotation: [t.upper ? Math.PI : 0, t.rotY, 0],
        scale: sh.s.map((v) => v * 0.66 * (on ? 1.08 : 1)),
        onPointerOver: (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setActive(t.type); },
        onPointerOut: () => setActive(null),
      }, h("meshPhysicalMaterial", { ...enamel, color: on ? "#e6c27a" : enamel.color, emissive: on ? "#5a4210" : "#000000", emissiveIntensity: on ? 0.35 : 0 }));
    }),
  );
}

export function JawExplorer({ active, setActive, onMove }: { active: ToothType | null; setActive: (t: ToothType | null) => void; onMove: (x: number, y: number) => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 6.2], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      onPointerMove={(e) => onMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      style={{ cursor: active ? "pointer" : "grab", touchAction: "pan-y" }}
    >
      {h(Lights)}
      {h(Jaw, { active, setActive })}
      {h(OrbitControls, { enableZoom: false, enablePan: false, minPolarAngle: 0.6, maxPolarAngle: 2.2 })}
    </Canvas>
  );
}

