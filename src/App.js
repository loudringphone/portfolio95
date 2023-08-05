import React, {useState} from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import './App.css';
import DesktopIcons from './desktop-icons/DesktopIcons';
import { DockBar } from './components/dockbar/DockBar';
import PortfolioWindow from './portfolio/PortfolioWindow';
import ResumeWindow from './resume/ResumeWindow';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

const App = () => {
  const [portfolioDisplay, setPortfolioDisplay] = useState('none')
  const [portfolioActive, setPortfolioActive] = useState(true)
  const [resumeDisplay, setResumeDisplay] = useState('none')
  const [resumeActive, setResumeActive] = useState(true)
  const [dockMenuActive, setDockMenuActive] = useState(false)
  const [windowIndice, setWindowIndice] = useState({resume: 1, portfolio: 1})

  const indexingWindows = (obj) => {
    setWindowIndice(obj)
    console.log(obj)
  }

  const openingPortfolio = (display) => {
    setPortfolioDisplay(display)
  }
  const activatingPortfolio = (boolean) => {
    setPortfolioActive(boolean)
    if (boolean) {
      activiatingDockMenu(false)
      activatingResume(false)
    }
  }

  const openingResume = (display) => {
    setResumeDisplay(display)
  }
  const activatingResume = (boolean) => {
    setResumeActive(boolean)
    if (boolean) {
      activiatingDockMenu(false)
      activatingPortfolio(false)
    }
  }



  const activiatingDockMenu = (boolean) => {
    setDockMenuActive(boolean)
    if (boolean) {
      activatingPortfolio(false)
      activatingResume(false)
    }
  }
  const handleClick = () => {
    activiatingDockMenu(false)
    activatingPortfolio(false)
  }

  return (
  
 
  <div style={{height: "100vh", width: "100vw"}} onClick={handleClick}>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <DesktopIcons openingPortfolio={openingPortfolio} activatingPortfolio={activatingPortfolio} openingResume={openingResume} activatingResume={activatingResume} indexingWindows={indexingWindows} />
      <ResumeWindow openingResume={openingResume} resumeDisplay={resumeDisplay} activatingResume={activatingResume} resumeActive={resumeActive} indexingWindows={indexingWindows} windowIndex={windowIndice.resume} />
      <PortfolioWindow openingPortfolio={openingPortfolio} portfolioDisplay={portfolioDisplay} activatingPortfolio={activatingPortfolio} portfolioActive={portfolioActive} indexingWindows={indexingWindows} windowIndex={windowIndice.portfolio} />
    < DockBar activatingDockMenu={activiatingDockMenu} dockMenuActive={dockMenuActive} openingPortfolio={openingPortfolio} portfolioDisplay={portfolioDisplay} activatingPortfolio={activatingPortfolio} indexingWindows={indexingWindows} />
    </ThemeProvider>
  </div>
  )
  };

export default App;