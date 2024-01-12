import React from 'react'
import './bluescreen.css'

const BlueScreen = ({displayBSOD, displayingBSOD, setActiveTask, resettingWarnings}) => {
  const handleClick = () => {
    displayingBSOD(false)
    setActiveTask('warning')
  }
  return (
    <div className='blue-screen' onClick={handleClick} style={{display: displayBSOD}}>
        <p className='header'>Windows</p>
        <div className="instructions">
            <p>A fatal exception 0E has occured at 0028:C0011E36 in 
              UXD(01) + 00010E36. Your computer will be terminated.</p>
            <p>*&nbsp;&nbsp;&nbsp;&nbsp;Please Hire Winston for the job, or </p>
            <p>*&nbsp;&nbsp;&nbsp;&nbsp;At least give Winston an interview. </p>
            <p>You will lose all saved informaiton in all applications.</p>
        </div>
        <p className="continue">Press any key to continue _</p>
    </div>
  )
}

export default BlueScreen