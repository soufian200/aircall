import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
function Loader({ size = 50 }) {
    return <div className="loader-container">
        <BiLoaderAlt size={size} className="loader" />
    </div>
}

export default Loader