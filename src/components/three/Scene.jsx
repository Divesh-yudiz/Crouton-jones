import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, KeyboardControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { City } from './models/City'
import Light from './utils/Light'
import environment from '../../assets/images/goegap_road_2k.hdr';
import { Physics } from '@react-three/rapier'
import Player from './models/Player'
export default function Scene() {

    const cameraRef = useRef()
    return <>
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                { name: 'jump', keys: ['Space'] },
            ]}
        >
            <Canvas
                gl={{
                    antialias: true,
                    alpha: false,
                }}
                camera={{
                    fov: 25,
                    near: 0.1,
                    far: 10000,
                    position: [0, 500, 1200],
                }}
                ref={cameraRef}
            >
                <OrbitControls />
                <Light />
                <Physics gravity={[0, -9.81, 0]} debug>
                    <City />
                    <Player cameraRef={cameraRef} />
                </Physics>
                <Environment
                    files={environment}
                    background
                />
            </Canvas>
        </KeyboardControls>
    </>
}