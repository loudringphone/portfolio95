import React, {useState, useEffect, useRef} from 'react';
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
import RecycleBinWindow from './components/recyclebin/RecycleBinWindow';
import WarningWindow from './components/warning/WarningWindow';
import BinWarningWindow from './components/warning/BinWarningWindow';
import BlueScreen from './components/bluescreen/BlueScreen';
import win95energystar from './assets/images/win95-energystar.gif';
import win95energystarMobile from './assets/images/win95-energystar-mobile.gif';
import win95startup from './assets/images/win95-startup.jpg';
import win95startupMobile from './assets/images/win95-startup-mobile.jpeg';
import win95shutdown from './assets/images/win95-shutdown.png';
import win95shutdownMobile from './assets/images/win95-shutdown-mobile.png';
import safeTurnOff from './assets/images/safe-turn-off.jpeg';
import { Mailnews20, Shell32167, MediaCd, Shell3232, Shell3233 } from '@react95/icons'
import RecycleBinContent from './components/recyclebin/RecycleBinContent';

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
  const [isTouchDevice, setIsTouchDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
  const [projectUrl, setProjectUrl] = useState(null)
  const [tasksVisibility, setTasksVisibility] = useState({resume: 'visible', portfolio: 'visible', browser: 'visible', music: 'visible'})
  const [welcomeActive, setWelcomeActive] = useState(true)
  const [dockMenuActive, setDockMenuActive] = useState(false)
  const [windowIndice, setWindowIndice] = useState({resume: 5, portfolio: 5, browser: 5, music: 5, "recycle bin": 5})
  const [standbyTasks, setStandbyTasks] = useState(new Set());
  const [displayTasks, setDisplayTasks] = useState(new Set())
  const [activeTask, setActiveTask] = useState(null)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [selectedBinIcon, setSelectedBinIcon] = useState(null)
  const [displayBSOD, setDisplayBSOD] =useState('none')
  const [warnings, setWarnings] = useState(0)
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  const [signOff, setSignOff] = useState(true)
  const [shutDown, setShutDOwn] = useState(false)
  const [turnOff, setTurnOff] = useState(false)
  const [energyStar, setEnergyStar] = useState(true)
  const [binLastPos, setBinLastPos] = useState(null)
  const [icons, setIcons] = useState({
    'resume': {
      Icon: Mailnews20,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      position: { x: 0, y: 0 },
    },
    'portfolio': {
      Icon: Shell32167,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      binRef: useRef(null),
      position: { x: 0, y: 125 },
      visibility: 'visible',
    },
    'music': {
      Icon: MediaCd,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      binRef: useRef(null),
      position: { x: 0, y: 250 },
      visibility: 'visible',
    },
    'recycle bin': {
      Icon: Shell3232,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      position: { x: 0, y: 375 },
    },
  })

  const settingBinLastPos = (obj) => {
    setBinLastPos(obj)
  }
  const [cursorPosition, setCursorPosition] = useState({clientX: null, clientY: null})

  const settingCursorPosition = (obj) =>{ 
    setCursorPosition(obj)
  }


  const binWindowRef = useRef(null)
  const unrecyclingIcon = () => {
    const recycledTasks = Object.values(icons).reduce((count, task) => {
      if (task.visibility === 'hidden') {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
    if (recycledTasks <= 1) {
      setIcons(prevTasks => ({
        ...prevTasks,
        "recycle bin": {
          ...prevTasks["recycle bin"],
          Icon: Shell3232
        }
      }));
    } 
  }

  const recyclingIcon = (task) => {
    displayingTask(false, task)
    setIcons(prevTasks => ({
      ...prevTasks,
      [task]: {
        ...prevTasks[task],
        visibility: 'hidden'
      },
      "recycle bin": {
        ...prevTasks["recycle bin"],
        Icon: Shell3233
      }
    }));
  }
  const positioningIcon = (task, x, y) => {
    setIcons(prevTasks => ({
      ...prevTasks,
      [task]: {
        ...prevTasks[task],
        position: { x: x, y: y }
      },
    }));
  }
  const teleportingIcon = (event) => {
    const rect = binWindowRef.current?.getBoundingClientRect();
    const cursorX = event.clientX || event.changedTouches[0].clientX;
    const cursorY = event.clientY || event.changedTouches[0].clientY;
    if (
      cursorX < rect?.x || cursorX > rect?.x + rect?.width ||
      cursorY < rect?.y || cursorY > rect?.y + rect?.height
    ) {
      const task = Object.keys(icons).find(taskKey => icons[taskKey].binRef?.current?.contains(event.target));

      if (task) {
        const rect = icons[task].iconRef.current.getBoundingClientRect();
        
        const offsetX = cursorX - rect.width;
        const offsetY = cursorY - rect.height;
        positioningIcon(task, offsetX, offsetY)
          setIcons(prevTasks => ({
            ...prevTasks,
            [task]: {
              ...prevTasks[task],
              visibility: 'visible'
            }
          }));
      }
    }
    else if (
      cursorX >= rect?.x && cursorX <= rect?.x + rect?.width &&
      cursorY >= rect?.y && cursorY <= rect?.y + rect?.height
    ) {
      const task = Object.keys(icons).find(taskKey => icons[taskKey].desktopRef?.current?.contains(event.target));

      if (task == 'portfolio' || task == 'music') {
        displayingTask(false, task)
        setIcons(prevTasks => ({
          ...prevTasks,
          [task]: {
            ...prevTasks[task],
            visibility: 'hidden'
          }
        }));
      }
      else if (task == 'resume') {
        activatingTask('warning')
        indexingWindows('warning')
        displayingTask(true, 'warning')
        issuingWarning()
      }
      else if (task == 'recycle bin' && binLastPos) {
        positioningIcon(task, binLastPos.x - 28.29, binLastPos.y - 23.99)
      }
    }
  }

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)
  }, [window.innerWidth])
  
  
  const signingIn = (boolean) => {
    setSigned(boolean)
    setTimeout(() => {
      setSignOff(!boolean)
    }, 500);
  }

  const selectingIcon = (str) => {
    setSelectedIcon(str)
  }

  const selectingBinIcon = (str) => {
    setSelectedBinIcon(str)
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

  const handleDown = (event) => {
    activiatingDockMenu(false)
    activatingWelcome(false)
    activatingTask(null)
    const desktopRefs = Object.values(icons).map(task => task.desktopRef);
    if (desktopRefs.some(ref => ref.current?.contains(event.target))) {
      return;
    }
    selectingIcon(null)
  }

  const turningoff = (boolean) => {
    setSignOff(boolean)
    setTimeout(() => {
      setShutDOwn(boolean)
    }, 500);
  }

  const issuingWarning = () => {
    const updatedWarnings = warnings + 1
    setWarnings(updatedWarnings)
    if (updatedWarnings >= 3) {
      displayingBSOD(true)
    }
  }

  const displayingBSOD = (boolean) => {
    if (boolean) {
      setDisplayBSOD('flex')
    } else {
      setDisplayBSOD('none')
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setEnergyStar(false)
      setTimeout(() => {
        setLoading(false)
      }, 1200);
    }, 2250);
  }, []); 
  useEffect(() => {
    if (activeTask) {
      activiatingDockMenu(false)
    }
    if (activeTask == 'bin warning') {
      displayingTask(true, 'bin warning')
      indexingWindows('bin warning')
    }
  }, [activeTask]); 

  useEffect(() => {
    const tasksToManage = ["portfolio", "resume", "browser", "music", "recycle bin"];
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
      }, 2500);
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
  if (shutDown && signOff) {
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
  if (!signed && signOff) {
    return (
      <Helmet style={{height: "100vh", width: "100vw"}}>
      <ThemeProvider theme={original}>
      <GlobalStyles />
      <div className="desktop" style={{height: "100vh", width: "100vw"}} onTouchStart={handleDown} onMouseDown={handleDown}>
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
       
          <div className="desktop" style={{height: "100vh", width: "100vw"}} onMouseDown={handleDown} onTouchStart={handleDown} onMouseUp={teleportingIcon} onTouchEnd={teleportingIcon}>
            < Taskbar activiatingDockMenu={activiatingDockMenu} dockMenuActive={dockMenuActive} displayingTask={displayingTask} displayTasks={displayTasks} indexingWindows={indexingWindows} signingIn={signingIn} activatingWelcome={activatingWelcome} standbyTasks={standbyTasks} windowIndice={windowIndice} turningoff={turningoff} minimisingTasks={minimisingTasks} tasksVisibility={tasksVisibility} activatingTask={activatingTask} activeTask={activeTask} icons={icons} />

            <DesktopIcons displayingTask={displayingTask} indexingWindows={indexingWindows} windowIndice={windowIndice} minimisingTasks={minimisingTasks} tasksVisibility={tasksVisibility} activatingTask={activatingTask} issuingWarning={issuingWarning} warnings={warnings} activiatingDockMenu={activiatingDockMenu} selectingIcon={selectingIcon} selectedIcon={selectedIcon} icons={icons} recyclingIcon={recyclingIcon} activeTask={activeTask} positioningIcon={positioningIcon} settingBinLastPos={settingBinLastPos} />


        <ResumeWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} />
        <PortfolioWindow displayingTask={displayingTask} settingProjectUrl={settingProjectUrl} displayTasks={displayTasks} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} activatingTask={activatingTask} activeTask={activeTask} />
        <BrowserWindow settingProjectUrl={settingProjectUrl} projectUrl={projectUrl} displayingTask={displayingTask} displayTasks={displayTasks} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} activatingTask={activatingTask} activeTask={activeTask} />
        <MusicWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} signed={signed} signOff={signOff} />
        <RecycleBinWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} indexingWindows={indexingWindows} windowIndice={windowIndice} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} icons={icons} selectingBinIcon={selectingBinIcon} selectedBinIcon={selectedBinIcon} unrecyclingIcon={unrecyclingIcon} binWindowRef={binWindowRef} settingCursorPosition={settingCursorPosition} isTouchDevice={isTouchDevice} />
        <BinWarningWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} activiatingDockMenu={activiatingDockMenu} indexingWindows={indexingWindows} windowIndice={windowIndice} />
        <WarningWindow displayingTask={displayingTask} displayTasks={displayTasks} activatingTask={activatingTask} activeTask={activeTask} tasksVisibility={tasksVisibility} minimisingTasks={minimisingTasks} warnings={warnings} activiatingDockMenu={activiatingDockMenu} indexingWindows={indexingWindows} windowIndice={windowIndice} />
        { warnings >= 3 ?
          <BlueScreen displayBSOD={displayBSOD} displayingBSOD={displayingBSOD} activatingTask={activatingTask} />
          :
          <></>
        }

      </div>

        {
          isTouchDevice ?

          <RecycleBinContent binWindowRef={binWindowRef} cursorPosition={cursorPosition} windowIndice={windowIndice} displayTasks={displayTasks} tasksVisibility={tasksVisibility} 
          activatingTask={activatingTask} indexingWindows={indexingWindows} icons={icons} selectingBinIcon={selectingBinIcon} selectedBinIcon={selectedBinIcon} activeTask={activeTask} unrecyclingIcon={unrecyclingIcon} teleportingIcon={teleportingIcon}isTouchDevice={isTouchDevice} />
          :
          <></>
        }
       
       
        
      </ThemeProvider>
      
      </Helmet>

    
  
  )
  };

export default App;