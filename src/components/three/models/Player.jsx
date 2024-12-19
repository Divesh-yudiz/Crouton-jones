import React, { useRef } from 'react'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboardControls } from '@react-three/drei'

function Player() {
    const body = useRef()
    const player = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { rapier, world } = useRapier()

    useFrame((state, delta) => {
        const { forward, backward, left, right, jump } = getKeys();

        // Get current velocity
        const rigidBody = world.getRigidBody(body.current)
        const velocity = rigidBody.linvel();

        console.log("player", player)

        // Target velocity based on input
        const targetVelocity = { x: 0, y: velocity.y, z: 0 }
        const speed = 5; // Adjust this value for movement speed

        if (forward) targetVelocity.z -= speed;
        if (backward) targetVelocity.z += speed;
        if (left) targetVelocity.x -= speed;
        if (right) targetVelocity.x += speed;
        if (jump) targetVelocity.y += speed;

        // Set the velocity
        rigidBody.setLinvel({ x: targetVelocity.x, y: targetVelocity.y, z: targetVelocity.z }, true);

        // Get the current position of the player
        const playerPosition = rigidBody.translation();

        // Update the mesh position to match the rigid body position
        if (player.current) {
            player.current.position.set(0, 0, 0); // Reset local position
            player.current.updateMatrixWorld();
        }

        // Calculate camera position relative to player
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(playerPosition);
        cameraPosition.y += 3; // Reduced height, now just above the player
        cameraPosition.z += 0; // Camera directly above, no z-offset

        // Calculate camera target (looking at the player)
        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(playerPosition);

        // Smooth camera movement
        const smoothness = 5;
        state.camera.position.lerp(cameraPosition, delta * smoothness);
        // console.log("player position", playerPosition)
        // console.log("cameraPosition", cameraPosition)

        // Make the camera look straight down at the player
        state.camera.lookAt(cameraTarget);
    })

    return (
        <RigidBody
            ref={body}
            type="dynamic"
            colliders="ball"
            restitution={0.2}
            friction={1}
            linearDamping={2.5}
            angularDamping={2.5}
            mass={1}
            // lockRotations={true}
            position={[800, 50, 0]}
        >
            <mesh ref={player}>
                <icosahedronGeometry />
                <meshStandardMaterial />
            </mesh>
        </RigidBody>
    )
}

export default Player




// Calculate camera position relative to player
// const cameraPosition = new THREE.Vector3()
// cameraPosition.copy(playerPosition)
// cameraPosition.z += 10
// cameraPosition.y += 5

// // Calculate camera target (looking slightly above the player)
// const cameraTarget = new THREE.Vector3()
// cameraTarget.copy(playerPosition)
// cameraTarget.y += 0.25

// // Update camera
// state.camera.position.copy(cameraPosition)
// state.camera.lookAt(cameraTarget)