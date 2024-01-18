import { memo, useCallback } from 'react';
import CloseFillIcon from 'remixicon-react/CloseFillIcon';

const Helper = ({ helperDisplay, setHelperDisplay }) => {
  const closeHelper = useCallback(() => {
    setHelperDisplay('none')
  }, [helperDisplay])

  return (
    <div className='helper' style={{ display: helperDisplay }}>
      <div className='closeBtn' onClick={closeHelper} onTouchEnd={closeHelper}><CloseFillIcon /></div>
      <p>User name: Admin</p>
      <p>Password: admin</p>
    </div>
  )
}

export default memo(Helper)