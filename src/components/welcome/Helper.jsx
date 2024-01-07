import React from 'react';
import CloseFillIcon from 'remixicon-react/CloseFillIcon';

const Helper = ({ helperDisplay, setHelperDisplay }) => {
  const closeHelper = () => {
    setHelperDisplay('none')
  }

  return (
    <div className='helper' style={{ display: helperDisplay }}>
      <div className='closeBtn' onClick={closeHelper} onTouch={closeHelper}><CloseFillIcon /></div>
      <p>User name: Admin</p>
      <p>Password: admin</p>
    </div>
  )
}

export default Helper