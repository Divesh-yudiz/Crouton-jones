import React, { useRef, useEffect } from 'react'
import { Physics, RigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'

function Player() {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const bodyRef = useRef()
    const MOVEMENT_SPEED = 50
    const { camera } = useThree()

    const { cameraOffsetY, cameraOffsetZ, cameraTargetZ } = useControls('Camera', {
        cameraOffsetY: {
            value: 150,
            min: 0,
            max: 300,
            step: 1,
        },
        cameraOffsetZ: {
            value: 150,
            min: 0,
            max: 300,
            step: 1,
        },
        cameraTargetZ: {
            value: 0,
            min: -200,
            max: 200,
            step: 1,
        }
    })

    useEffect(() => {
        const initialPosition = new THREE.Vector3(120, 560, 500)
        const initialTarget = new THREE.Vector3(120, 60, 0)

        camera.position.copy(initialPosition)
        camera.lookAt(initialTarget)
    }, [camera])

    useFrame((state, delta) => {
        const { forward, backward, left, right, jump } = getKeys()

        console.log("keys", cameraOffsetY)

        if (!bodyRef.current) return

        const velocity = { x: 0, y: 0, z: 0 }

        if (forward) velocity.z = -MOVEMENT_SPEED
        if (backward) velocity.z = MOVEMENT_SPEED
        if (left) velocity.x = -MOVEMENT_SPEED
        if (right) velocity.x = MOVEMENT_SPEED

        bodyRef.current.setLinvel({
            x: velocity.x,
            y: bodyRef.current.linvel().y,
            z: velocity.z
        })


        // console.log("bodyRef.current", bodyRef.current)
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyRef.current.translation())
        cameraPosition.y += 90;
        cameraPosition.x += 120;
        cameraPosition.z += 100;

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyRef.current.translation())
        cameraTarget.x += 120;
        cameraTarget.y += 70;

        state.camera.position.lerp(cameraPosition, 0.01)
        state.camera.lookAt(cameraTarget)
    })

    return (
        <RigidBody
            ref={bodyRef}
            type="dynamic"
            colliders="hull"
            lockRotations={true}
        >
            <mesh position={[120, 60, 0]}>
                <capsuleGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    )
}

export default Player







// // console.log("bodyRef.current", bodyRef.current)
// const cameraPosition = new THREE.Vector3()
// cameraPosition.copy(bodyRef.current.translation())
// cameraPosition.y += 90;
// cameraPosition.x += 120;
// cameraPosition.z += 100;

// const cameraTarget = new THREE.Vector3()
// cameraTarget.copy(bodyRef.current.translation())
// cameraTarget.x += 120;
// cameraTarget.y += 70;

// state.camera.position.copy(cameraPosition)
// state.camera.lookAt(cameraTarget)