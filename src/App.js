import React, {useState, useEffect} from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import './App.css';
import DesktopIcons from './components/desktop-icons/DesktopIcons';
import { Helmet } from './helmet/Helmet';
import { Taskbar } from './components/taskbar/Taskbar';
import PortfolioWindow from './components/portfolio/PortfolioWindow';
import ResumeWindow from './components/resume/ResumeWindow';
import BrowserWindow from './components/browser/BrowserWindow';
import WelcomeWindow from './components/welcome/WelcomeWindow';
import win95energystar from './assets/images/win95-energystar.gif';
import win95energystarMobile from './assets/images/win95-energystar-mobile.gif';

import win95startup from './assets/images/win95-startup.jpg';
import win95startupMobile from './assets/images/win95-startup-mobile.jpeg';
import win95shutdown from './assets/images/win95-shutdown.png';
import win95shutdownMobile from './assets/images/win95-shutdown-mobile.png';
import safeTurnOff from './assets/images/safe-turn-off.jpeg';


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
  const [tasksVisibility, setTasksVisibility] = useState({resume: 'visible', portfolio: 'visible', browser: 'visible'})
  const [welcomeActive, setWelcomeActive] = useState(true)
  const [dockMenuActive, setDockMenuActive] = useState(false)
  const [portfolioDisplay, setPortfolioDisplay] = useState('none')
  const [portfolioActive, setPortfolioActive] = useState(true)
  const [resumeDisplay, setResumeDisplay] = useState('none')
  const [resumeActive, setResumeActive] = useState(true)
  const [browserDisplay, setBrowserDisplay] = useState('none')
  const [browserActive, setBrowserActive] = useState(true)
  const [windowIndice, setWindowIndice] = useState({resume: 5, portfolio: 5, browser: 5})
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  const [bounds, setBounds] = useState(false);
  const [activeTasks, setActiveTasks] = useState(new Set());
  const [shutDown, setShutDOwn] = useState(false)
  const [turnOff, setTurnOff] = useState(false)
  const [energyStar, setEnergyStar] = useState(true)
  

  const signingIn = (boolean) => {
    setSigned(boolean)
  }

  const settingProjectUrl = (url) => {
    setProjectUrl(url)
  }
  
  const indexingWindows = (obj) => {
    setWindowIndice(obj)
  }

  const activatingWelcome = (boolean) => {
    setWelcomeActive(boolean)
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
  const minimisingTasks = (obj) => {
    setTasksVisibility(obj)
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
    activatingWelcome(false)
  }
  const turningoff = (boolean) => {
    setShutDOwn(boolean)
  }
  useEffect(() => {
    setTimeout(() => {
      setEnergyStar(false)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }, 5000);
    
    if (window.innerWidth <= 1000) {
      setBounds(false)
    } else {
      setBounds("body")
    }
  }, []); 

  useEffect(() => {
    const newActiveTasks = new Set(activeTasks);
    if (portfolioDisplay !== 'none' && !newActiveTasks.has("portfolio")) {
      newActiveTasks.add("portfolio");
    }
    if (resumeDisplay !== 'none' && !newActiveTasks.has("resume")) {
      newActiveTasks.add("resume");
    }
    if (browserDisplay !== 'none' && !newActiveTasks.has("browser")) {
      newActiveTasks.add("browser");
    }
    if (portfolioDisplay == 'none' && newActiveTasks.has("portfolio")) {
      newActiveTasks.delete("portfolio");
    }
    if (resumeDisplay == 'none' && newActiveTasks.has("resume")) {
      newActiveTasks.delete("resume");
    }
    if (browserDisplay == 'none' && newActiveTasks.has("browser")) {
      newActiveTasks.delete("browser");
    }
    setActiveTasks(newActiveTasks);
  }, [portfolioDisplay, resumeDisplay, browserDisplay]); 

  useEffect(() => {
    if (shutDown) {
      setTimeout(() => {
        setTurnOff(true)
      }, 2000);
    }
  },[shutDown])

  if (turnOff) {
    return (
      
      <div className='shut-down-background'>
      <ThemeProvider theme={original}>

      <GlobalStyles />
        {
          window.innerWidth <= 600 ? 
          <img className='shut-down' src={window.innerWidth <= 800 ? safeTurnOff : safeTurnOff} alt="start up"/>
          // <p className='shut-down-text'>It's now safe to turn off your computer.</p>
          :
          <img className='shut-down' src={window.innerWidth <= 800 ? safeTurnOff : safeTurnOff} alt="start up"/>
        }
        
          
      </ThemeProvider>

      </div>
    )
  }
  if (shutDown) {
    return (
      <div className='shut-down-background'>
        {
          window.innerWidth <= 800 ?
          <img className='shut-down-mobile' src={win95shutdownMobile} alt="shut down"/>
          :
          <img className='shut-down' src={win95shutdown} alt="shut down"/>

        }
      </div>
    )
  }
  if (energyStar) {
    return (
      <div className='start-up-background'>
        {
          window.innerWidth <= 800 ?
          <img className='start-up' src={win95energystarMobile} alt="start up"/>
          :
          <img className='start-up' src={win95energystar} alt="start up"/>

        }
          
      </div>
    )
  }
  if (loading) {
    return (
      <div className='start-up-background'>
        {
          window.innerWidth <= 800 ?
          <img className='start-up-mobile' src={win95startupMobile} alt="start up"/>
          :
          <img className='start-up' src={win95startup} alt="start up"/>

        }
          
      </div>
    )
  } 
  if (!signed) {
    return (
      <Helmet style={{height: "100vh", width: "100vw"}}>
      <ThemeProvider theme={original}>
      <GlobalStyles />
      <div className="desktop" style={{height: "100vh", width: "100vw"}} onClick={handleClick}>
        <WelcomeWindow activatingWelcome={activatingWelcome} welcomeActive={welcomeActive} signingIn={signingIn} bounds={bounds} />
      </div>
      </ThemeProvider>
      </Helmet>
    )
  }

  return (
  
 
    
      <Helmet style={{height: "100vh", width: "100vw"}}>

      <GlobalStyles />
      <ThemeProvider theme={original}>
       
          <div className="desktop" style={{height: "100vh", width: "100vw"}} onClick={handleClick}>
          <DesktopIcons openingPortfolio={openingPortfolio} activatingPortfolio={activatingPortfolio} openingResume={openingResume} activatingResume={activatingResume} indexingWindows={indexingWindows} windowIndice={windowIndice} minimisingTasks={minimisingTasks} tasksVisibility={tasksVisibility} />
        <ResumeWindow openingResume={openingResume} resumeDisplay={resumeDisplay} activatingResume={activatingResume} resumeActive={resumeActive} indexingWindows={indexingWindows} windowIndice={windowIndice} bounds={bounds} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} />
        <PortfolioWindow openingBrowser={openingBrowser} settingProjectUrl={settingProjectUrl} openingPortfolio={openingPortfolio} portfolioDisplay={portfolioDisplay} activatingPortfolio={activatingPortfolio} portfolioActive={portfolioActive} activatingBrowser={activatingBrowser} indexingWindows={indexingWindows} windowIndice={windowIndice} bounds={bounds} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} />
        <BrowserWindow settingProjectUrl={settingProjectUrl} projectUrl={projectUrl} openingBrowser={openingBrowser} browserDisplay={browserDisplay} activatingBrowser={activatingBrowser} browserActive={browserActive} indexingWindows={indexingWindows} windowIndice={windowIndice} bounds={bounds} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} />
      < Taskbar activatingDockMenu={activiatingDockMenu} dockMenuActive={dockMenuActive} openingPortfolio={openingPortfolio} portfolioDisplay={portfolioDisplay} activatingPortfolio={activatingPortfolio} openingResume={openingResume} resumeDisplay={resumeDisplay} activatingResume={activatingResume} indexingWindows={indexingWindows} signingIn={signingIn} activatingWelcome={activatingWelcome} activeTasks={activeTasks} portfolioActive={portfolioActive} resumeActive={resumeActive} browserActive={browserActive} activatingBrowser={activatingBrowser} windowIndice={windowIndice} turningoff={turningoff} minimisingTasks={minimisingTasks} tasksVisibility={tasksVisibility} />
      </div>


       
        
      </ThemeProvider>
      </Helmet>

    
  
  )
  };

export default App;