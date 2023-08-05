import React, {useState, useEffect} from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import './App.css';
import DesktopIcons from './components/desktop-icons/DesktopIcons';
import { Helmet } from './helmet/Helmet';
import { DockBar } from './components/dockbar/DockBar';
import PortfolioWindow from './components/portfolio/PortfolioWindow';
import ResumeWindow from './components/resume/ResumeWindow';
import BrowserWindow from './components/browser/BrowserWindow';
import WelcomeWindow from './components/welcome/WelcomeWindow';
import win95startup from './assets/images/win95-startup.jpeg'
import win95sound from './assets/sounds/win95.mp3'

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
  const [projectUrl, setProjectUrl] = useState(null)
  const [dockMenuActive, setDockMenuActive] = useState(false)
  const [portfolioDisplay, setPortfolioDisplay] = useState('none')
  const [portfolioActive, setPortfolioActive] = useState(true)
  const [resumeDisplay, setResumeDisplay] = useState('none')
  const [resumeActive, setResumeActive] = useState(true)
  const [browserDisplay, setBrowserDisplay] = useState('none')
  const [browserActive, setBrowserActive] = useState(true)
  const [windowIndice, setWindowIndice] = useState({resume: 1, portfolio: 1, browser: 1})
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(true)

  const settingProjectUrl = (url) => {
    setProjectUrl(url)
  }
  
  const indexingWindows = (obj) => {
    setWindowIndice(obj)
  }

  const openingPortfolio = (display) => {
    setPortfolioDisplay(display)
  }
  const activatingPortfolio = (boolean) => {
    setPortfolioActive(boolean)
    if (boolean) {
      activiatingDockMenu(false)
      activatingResume(false)
      activatingBrowser(false)
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
      activatingBrowser(false)
    }
  }

  const openingBrowser = (display) => {
    setBrowserDisplay(display)
  }
  const activatingBrowser = (boolean) => {
    setBrowserActive(boolean)
    if (boolean) {
      activiatingDockMenu(false)
      activatingPortfolio(false)
      activatingResume(false)
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
    activatingResume(false)
    activatingBrowser(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      // const audio = new Audio(win95sound);
      // audio.play();
    }, 1500);
  }, []); 

  if (loading) {
    return (
      <div className='start-up-background'>
          <img className='start-up' src={win95startup} alt="start up"/>
      </div>
    )
  } 
  if (!signing) {
    return (
      
      <Helmet style={{height: "100vh", width: "100vw"}}>
      <ThemeProvider theme={original}>
      <GlobalStyles />
      <WelcomeWindow />
      </ThemeProvider>
      </Helmet>

    )
  }

  return (
  
 
    
      <Helmet style={{height: "100vh", width: "100vw"}}>

      <GlobalStyles />
      <ThemeProvider theme={original}>
       
          <div style={{height: "100vh", width: "100vw"}} onClick={handleClick}>
          <DesktopIcons openingPortfolio={openingPortfolio} activatingPortfolio={activatingPortfolio} openingResume={openingResume} activatingResume={activatingResume} indexingWindows={indexingWindows} />
        <ResumeWindow openingResume={openingResume} resumeDisplay={resumeDisplay} activatingResume={activatingResume} resumeActive={resumeActive} indexingWindows={indexingWindows} windowIndice={windowIndice} />
        <PortfolioWindow openingBrowser={openingBrowser} settingProjectUrl={settingProjectUrl} openingPortfolio={openingPortfolio} portfolioDisplay={portfolioDisplay} activatingPortfolio={activatingPortfolio} portfolioActive={portfolioActive} indexingWindows={indexingWindows} windowIndice={windowIndice} />
        <BrowserWindow settingProjectUrl={settingProjectUrl} projectUrl={projectUrl} openingBrowser={openingBrowser} browserDisplay={browserDisplay} activatingBrowser={activatingBrowser} browserActive={browserActive} indexingWindows={indexingWindows} windowIndice={windowIndice} />
      < DockBar activatingDockMenu={activiatingDockMenu} dockMenuActive={dockMenuActive} openingPortfolio={openingPortfolio} portfolioDisplay={portfolioDisplay} activatingPortfolio={activatingPortfolio} openingResume={openingResume} resumeDisplay={resumeDisplay} activatingResume={activatingResume} indexingWindows={indexingWindows} />
      </div>


       
        
      </ThemeProvider>
      </Helmet>

    
  
  )
  };

export default App;