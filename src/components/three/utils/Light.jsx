import React from 'react'

function Light() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={5} />
        </>
    )
}

export default Light