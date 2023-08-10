import React from 'react'
import './bluescreen.css'

const BlueScreen = () => {
  return (
    <div className='blue-screen'>
        <p className='header'>Windows</p>
        <div className="instructions">
            <p>An error has occurred. To continue:</p>
            <p>Please Hire Winston for the role of software developer, or </p>
            <p>Please Hire Winston for any other roles, or </p>
            <p>Error: 0E : 016F : BFF9B3D4</p>
        </div>
        <p className="continue">Press any key to continue _</p>
    </div>
  )
}

export default BlueScreen