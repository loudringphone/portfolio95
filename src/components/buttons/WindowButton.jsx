import React, { useState, useEffect } from 'react'
import { Button } from 'react95';
import styled from 'styled-components';
import { handleButtonTouchEnd, downloadResume } from '../../functions/customFunctions';
import './buttons.css'

const Wrapper = styled.div`
  .close-icon {
    margin-top: 1.5px;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
  }
`;

const WindowButton = ({ purpose, task, setTasksVisibility, setActiveTask, setTaskSwitiching, setIsDraggable, displayingTask, handleMusicClose, setHelperDisplay }) => {
  const [handle, setHandle] = useState(null)
  useEffect(() => {
    setHandle( () => {
      switch (purpose) {
        case 'minimise':
          return (event) => {
            event.stopPropagation();
            setTaskSwitiching(true)
            setTasksVisibility((prevState) => {
              prevState[task] = 'collapse'
              return prevState
            })
            setActiveTask(null);
          }
        case 'close':
          return () => {
            if (handleMusicClose) {
              handleMusicClose()
            }
            displayingTask(false, task)
          }
        case 'download':
          return downloadResume
        case 'help':
          return () => {
            setHelperDisplay('block')
          }
      }
    })
  }, [])
  const handleTouchEnd = (event) => {
    handleButtonTouchEnd(event, handle)
  }
  const disablingDraggable = (event) => {
    event.stopPropagation();
    setActiveTask(task)
    setIsDraggable(false)
    setIsDraggable(true)
  }

  return (
    <Button className={`${purpose}-button`} onClick={handle} onTouchEnd={handleTouchEnd} onMouseDown={disablingDraggable} onTouchStartCapture={disablingDraggable}>
      {(() => {
        switch (purpose) {
          case 'minimise':
            return <span className='minimise-icon'>&nbsp;</span>;
          case 'close':
            return <Wrapper><span className='close-icon' /></Wrapper>;
          case 'download':
            return 'Download';
          case 'help':
            return <span className='help-icon'>?</span>;
          default:
            return null;
        }
      })()}
    </Button>
  );
}

export default WindowButton