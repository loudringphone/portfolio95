import React, { useState, useEffect } from 'react'
import { Button } from 'react95';
import styled from 'styled-components';
import { handleButtonTouchEnd, downloadResume } from '../../functions/customFunctions';
import './buttons.css'

const Wrapper = styled.div`
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: 1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
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
            return <span className='close-icon'>×</span>;
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