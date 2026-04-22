import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import type { Mesh } from 'three'
import { MathUtils, IcosahedronGeometry } from 'three'

function Iceberg() {
  const mesh = useRef<Mesh>(null)
  const wire = useRef<Mesh>(null)
  const { viewport } = useThree()

  const geometry = useMemo(() => new IcosahedronGeometry(1.4, 1), [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const scrollTilt = Math.min(window.scrollY / window.innerHeight, 1)
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.12
      mesh.current.rotation.x = Math.sin(t * 0.18) * 0.12 + scrollTilt * 0.6
      mesh.current.position.y = MathUtils.lerp(
        mesh.current.position.y,
        -scrollTilt * 0.8,
        0.05,
      )
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.08
      wire.current.rotation.x = Math.cos(t * 0.22) * 0.18 - scrollTilt * 0.4
    }
  })

  const scale = Math.min(viewport.width, viewport.height) * 0.45

  return (
    <group>
      <mesh ref={mesh} geometry={geometry} scale={scale}>
        <meshStandardMaterial
          color="#383e4e"
          metalness={0.2}
          roughness={0.55}
          flatShading
        />
      </mesh>
      <mesh ref={wire} geometry={geometry} scale={scale * 1.02}>
        <meshBasicMaterial color="#b6bac5" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

export function IcebergScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#b6bac5" />
      <directionalLight position={[-4, -2, -2]} intensity={0.5} color="#e6a15c" />
      <Iceberg />
    </Canvas>
  )
}
