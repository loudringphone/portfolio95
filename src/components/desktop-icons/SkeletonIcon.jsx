import React from 'react'

const SkeletonIcon = ({ icon, task, startPos, isDragging, maxIconIndex, skeletonIsActive }) => {
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  
  return (
    <div className='icon' style={{
      top: startPos.y, left: startPos.x,
      zIndex: maxIconIndex,
      display: isDragging === task ? 'flex' : 'none',
    }}>
      <div className='icon-placeholder'>
        <div className="filter"></div>
        {icon}
      </div>
      <div className='text-placeholder'>
      { skeletonIsActive ?
        <>
          <div className="filter-blue"></div>
          <p style={{color: '#fefefe'}}>
            {taskName}
          </p>
        </>
      :
        <>
          <div className="filter-gray"></div>
          <p style={{color: 'black'}}>
            {taskName}
          </p>
        </>
      }
      </div>
      
    </div>
  )
}

export default SkeletonIcon