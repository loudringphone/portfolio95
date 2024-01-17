import React from 'react'
import { Button } from 'react95';
import resume from '../../assets/pdfs/Resume.pdf'
import { handleButtonTouchEnd } from '../../functions/customFunctions';
import './buttons.css'
const DownloadButton = ({ setIsDraggable }) => {
    const disablingDraggable = (event) => {
      event.stopPropagation();
      setIsDraggable(false)
      setIsDraggable(true)
    }

    const downloadResume = () => {
      let a = document.createElement('a');
      a.href = resume;
      a.download = 'Resume - Winston Lau.pdf';
      a.click();
      window.open(resume, '_blank');
    }
    const handleTouchEnd = (event) => {
      handleButtonTouchEnd(event, () => downloadResume());
    }

  return (
    <Button style={{width: 'auto', padding: '0 10px', marginRight: '5px'}} onClick={downloadResume} onTouchEnd={handleTouchEnd} onMouseDown={disablingDraggable} onTouchStartCapture={disablingDraggable}>
      Download
    </Button>
  )
}

export default DownloadButton