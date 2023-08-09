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
import MusicWindow from './components/music/MusicWindow';
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
  const [tasksVisibility, setTasksVisibility] = useState({resume: 'visible', portfolio: 'visible', browser: 'visible', music: 'visible'})
  const [welcomeActive, setWelcomeActive] = useState(true)
  const [dockMenuActive, setDockMenuActive] = useState(false)
  const [windowIndice, setWindowIndice] = useState({resume: 5, portfolio: 5, browser: 5, music: 5})
  const [standbyTasks, setStandbyTasks] = useState(new Set());
  const [displayTasks, setDisplayTasks] = useState(new Set())
  const [activeTask, setActiveTask] = useState(null)
  

 
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  const [shutDown, setShutDOwn] = useState(false)
  const [turnOff, setTurnOff] = useState(false)
  const [energyStar, setEnergyStar] = useState(true)
  

  const signingIn = (boolean) => {
    setSigned(boolean)
  }

  const settingProjectUrl = (url) => {
    setProjectUrl(url)
  }
  
  const indexingWindows = (key) => {
    const newWindowIndice = new Object(windowIndice)
    delete newWindowIndice[key];
    const sortedKeys = Object.keys(windowIndice).sort((a, b) => windowIndice[a] - windowIndice[b]);
    let i = 0
    sortedKeys.forEach((k) => {
      newWindowIndice[k] = 5 + i;
      i++
    });
    newWindowIndice[key] = 5 + i
    setWindowIndice(newWindowIndice)
  }

  const activatingWelcome = (boolean) => {
    setWelcomeActive(boolean)
  }



  const activatingTask = (str) => {
    setActiveTask(str)
  }

 const displayingTask = (boolean, str) => {
  const newDisplayTasks = new Set(displayTasks)
  if (boolean) {
    newDisplayTasks.add(str)
  } else {
    newDisplayTasks.delete(str)
  }
  setDisplayTasks(newDisplayTasks)
 }

  const minimisingTasks = (obj) => {
    setTasksVisibility(obj)
  }
  

  const activiatingDockMenu = (boolean) => {
    setDockMenuActive(boolean)
    if (boolean) {
      activatingTask(null)
    }
  }
  const handleClick = () => {
    activiatingDockMenu(false)
    activatingWelcome(false)
    activatingTask(null)
  }
  const turningoff = (boolean) => {
    setShutDOwn(boolean)
  }
  useEffect(() => {
    setTimeout(() => {
      setEnergyStar(false)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }, 2500);
  }, []); 

  useEffect(() => {
    const tasksToManage = ["portfolio", "resume", "browser", "music"];

    const newStandybyTasks = new Set(standbyTasks);

    tasksToManage.forEach(task => {
      if (displayTasks.has(task) && !newStandybyTasks.has(task)) {
        newStandybyTasks.add(task);
      } else if (!displayTasks.has(task) && newStandybyTasks.has(task)) {
        newStandybyTasks.delete(task);
      }
    });

    setStandbyTasks(newStandybyTasks);
  }, [displayTasks]); 

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
        <WelcomeWindow activatingWelcome={activatingWelcome} welcomeActive={welcomeActive} signingIn={signingIn} />
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
          <DesktopIcons displayingTask={displayingTask} indexingWindows={indexingWindows} windowIndice={windowIndice} minimisingTasks={minimisingTasks} tasksVisibility={tasksVisibility} activatingTask={activatingTask} />
        <ResumeWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} />
        <PortfolioWindow displayingTask={displayingTask} settingProjectUrl={settingProjectUrl} displayTasks={displayTasks} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} activatingTask={activatingTask} activeTask={activeTask} />
        <BrowserWindow settingProjectUrl={settingProjectUrl} projectUrl={projectUrl} displayingTask={displayingTask} displayTasks={displayTasks} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} activatingTask={activatingTask} activeTask={activeTask} />
        <MusicWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} />
      < Taskbar activiatingDockMenu={activiatingDockMenu} dockMenuActive={dockMenuActive} displayingTask={displayingTask} displayTasks={displayTasks} indexingWindows={indexingWindows} signingIn={signingIn} activatingWelcome={activatingWelcome} standbyTasks={standbyTasks} windowIndice={windowIndice} turningoff={turningoff} minimisingTasks={minimisingTasks} tasksVisibility={tasksVisibility} activatingTask={activatingTask} activeTask={activeTask} />
      </div>


       
        
      </ThemeProvider>
      </Helmet>

    
  
  )
  };

export default App;