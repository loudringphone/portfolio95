import React from 'react'
import { Mailnews20, Shell325 } from '@react95/icons'
import './desktopicons.css'
const DesktopIcons = ({openingPortfolio, activatingPortfolio, openingResume, activatingResume, indexingWindows}) => {
  const handlePortfolio = (event) => {
    event.stopPropagation();
    activatingPortfolio(true);
    openingPortfolio('block')
    indexingWindows({resume: 1, portfolio: 2})
  }
  const handleResume = (event) => {
    event.stopPropagation();
    activatingResume(true);
    openingResume('block')
    indexingWindows({resume: 2, portfolio: 1})
  }
  return (
    <div className="desktop-icons">
      <div className='icon'>
        <Mailnews20 style={{height:'60px', width:'60px'}} onClick={handleResume}/>
        <p onClick={handleResume}>My Resume</p>
      </div>
      <div className='icon'>
        <Shell325 style={{height:'60px', width:'60px'}} onClick={handlePortfolio}/>
        <p onClick={handlePortfolio}>Portfolio</p>
      </div>
    </div>
  )
}

export default DesktopIcons