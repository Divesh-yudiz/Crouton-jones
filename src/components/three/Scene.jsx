import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { City } from './models/City'
import Light from './utils/Light'
import { Environment } from '@react-three/drei'

export default function Scene() {
    return <>
        <Canvas
            gl={{
                antialias: true,
                alpha: false,
            }}
            camera={{
                fov: 25,
                near: 0.1,
                far: 10000,
                position: [0, 500, 1200]
            }}
        >
            <Light />
            <City />
            <Environment
                files="src/assets/images/potsdamer_platz_1k.hdr"
                // preset="studio"
                background
            />
            <OrbitControls />
        </Canvas>
    </>
}
