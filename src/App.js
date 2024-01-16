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
import RecycleWarningWindow from './components/warning/RecycleWarningWindow';
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
import win95recycle from './assets/sounds/win95recycle.wav'
import win95error from './assets/sounds/win95error.mp3'
import GitIcon from './components/GitIcon';

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
  const tasks = ["portfolio", "resume", "browser", "music", "recycle bin"];
  const initializeTasksState = (state) => {
    const initialState = {};
    tasks.forEach(task => {
      initialState[task] = state;
    });
    return initialState;
  };
  const [tasksVisibility, setTasksVisibility] = useState(initializeTasksState('visible'));
  const [taskIndices, setTaskIndices] = useState(initializeTasksState(5));
  const recycleAudio = new Audio(win95recycle);
  const errorAudio = new Audio(win95error);
  const [projectUrl, setProjectUrl] = useState(null)
  
  const [welcomeActive, setWelcomeActive] = useState(true)
  const [dockMenuActive, setDockMenuActive] = useState(false)
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
  const [iconDragPoint, setIconDragPoint] = useState({x: 0, y: 0})
  const [icons, setIcons] = useState({
    'resume': {
      Icon: Mailnews20,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      position: { x: 125, y: 25 },
    },
    'git': {
      Icon: GitIcon,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      binRef: useRef(null),
      position: { x: 125, y: 150 },
      visibility: 'visible',
    },
    'music': {
      Icon: MediaCd,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      binRef: useRef(null),
      position: { x: 25, y: 150 },
      visibility: 'visible',
    },
    'portfolio': {
      Icon: Shell32167,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      binRef: useRef(null),
      position: { x: 25, y: 25 },
      visibility: 'visible',
    },
    'recycle bin': {
      Icon: Shell3232,
      desktopRef: useRef(null),
      iconRef: useRef(null),
      position: { x: 25, y: 275 },
    },
  })
  const [iconsInBin, setIconsInBin] = useState(new Set())

  useEffect(() => {
    if (!isTouchDevice) {
      setIcons(prevIcons => {
        return {
          ...prevIcons,
          'resume': {
            ...prevIcons['resume'],
            position: { x: 125, y: 25 },
          },
          'git': {
            ...prevIcons['git'],
            position: { x: 125, y: 150 },
          },
          'portfolio': {
            ...prevIcons['portfolio'],
            position: { x: 25, y: 25 },
          },
          'music': {
            ...prevIcons['music'],
            position: { x: 25, y: 150 },
          },
          'recycle bin': {
            ...prevIcons['recycle bin'],
            position: { x: 25, y: 275 },
          },
        };
      });
    }
  }, [isTouchDevice])

  const [cursorPosition, setCursorPosition] = useState({clientX: null, clientY: null})

  const settingIconsInBin = (boolean, task) => {
    setIconsInBin((prevState) => {
      if (boolean) {
        prevState.add(task);
      } else {
        prevState.delete(task);
      }
      return prevState;
    });
  }


  const binWindowRef = useRef(null)
  const unrecyclingIcon = () => {
    if (activeTask == 'recycle bin') {
      setTimeout(() => {
        setActiveTask(null)
      }, 0);
    }
    if (iconsInBin.size <= 1) {
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
    if (displayTasks.has('recycle bin')) {
      setTimeout(() => {
        setActiveTask('recycle bin')
        setSelectedBinIcon(task)
      }, 0);
    }
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
    recycleAudio.play();
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
    const binRect = binWindowRef.current?.getBoundingClientRect();
    const cursorX = event.clientX || event.changedTouches[0].clientX;
    const cursorY = event.clientY || event.changedTouches[0].clientY;
    if (
      cursorX < binRect.x || cursorX > binRect?.x + binRect?.width ||
      cursorY < binRect?.y || cursorY > binRect?.y + binRect?.height
    ) {
      const task = Object.keys(icons).find(taskKey => icons[taskKey].binRef?.current?.contains(event.target));

      if (task) {
        const offsetX = cursorX - iconDragPoint.x;
        const offsetY = cursorY - iconDragPoint.y;
        positioningIcon(task, offsetX, offsetY)
        setTimeout(() => {
          setIcons(prevTasks => ({
            ...prevTasks,
            [task]: {
              ...prevTasks[task],
              visibility: 'visible'
            }
          }));
        }, 0);
        setSelectedIcon(task)
      }
    }
    else if (
      cursorX >= binRect?.x && cursorX <= binRect?.x + binRect?.width &&
      cursorY >= binRect?.y && cursorY <= binRect?.y + binRect?.height
    ) {
      const task = Object.keys(icons).find(taskKey => icons[taskKey].desktopRef?.current?.contains(event.target));

      if (task == 'portfolio' || task == 'music' || task =='git') {
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
        setSelectedBinIcon(task)
        recycleAudio.play();
        setActiveTask('recycle bin')
      }
      else if (task == 'resume') {
        setActiveTask('warning')
        indexingTasks('warning')
        displayingTask(true, 'warning')
        issuingWarning()
      }
      else if (task == 'recycle bin' && binLastPos) {
        positioningIcon(task, binLastPos.x, binLastPos.y)
        setActiveTask('recycle warning')
        displayingTask(true, 'recycle warning');
        errorAudio.play();
        indexingTasks('recycle warning')
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
  
  const indexingTasks = (key) => {
    const newtaskIndices = new Object(taskIndices)
    delete newtaskIndices[key];
    const sortedKeys = Object.keys(taskIndices).sort((a, b) => taskIndices[a] - taskIndices[b]);
    let i = 0
    sortedKeys.forEach((k) => {
      newtaskIndices[k] = 5 + i;
      i++
    });
    newtaskIndices[key] = 5 + i
    setTaskIndices(newtaskIndices)
  }

  const displayingTask = (boolean, task) => {
    const newDisplayTasks = new Set(displayTasks)
    if (boolean) {
      newDisplayTasks.add(task)
    } else {
      newDisplayTasks.delete(task)
    }
    setDisplayTasks(newDisplayTasks)
  }

  const activiatingDockMenu = (boolean) => {
    setDockMenuActive(boolean)
    if (boolean) {
      setActiveTask(null)
    }
  }

  const handleDown = (event) => {
    activiatingDockMenu(false)
    setWelcomeActive(false)
    setActiveTask(null)
    const desktopRefs = Object.values(icons).map(task => task.desktopRef);
    if (desktopRefs.some(ref => ref.current?.contains(event.target))) {
      return;
    }
    setSelectedIcon(null)
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
    }, 2000);
  }, []);

  const desktopRef = useRef(null)
  const [portfolioHeight, setPortfolioHeight] = useState(null)
  useEffect(() => {
    if (!desktopRef.current) return;
    if (activeTask == 'bin warning') {
      displayingTask(true, 'bin warning');
      indexingTasks('bin warning');
    } else if (activeTask) {
      activiatingDockMenu(false)
    }
  }, [activeTask]); 

  useEffect(() => {
    if (!desktopRef.current) return;
    if (portfolioHeight > 700) {
      desktopRef.current.style.minHeight = '850px';
    } else {
      desktopRef.current.style.minHeight = '100vh';
    }
  },[portfolioHeight])

  useEffect(() => {
    const newStandybyTasks = new Set(standbyTasks);
    tasks.forEach(task => {
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

  const [documentPosition, setDocumentPosition] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
    setDocumentPosition(document.documentElement.scrollTop);
  };
  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    if (documentPosition === 0 && touchEndY > touchStartY) {
      event.preventDefault();
    }
  }
  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
    };
  }, [touchStartY, documentPosition]);

  if (turnOff) {
    return (
      <Helmet>
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
      </Helmet>
    )
  }
  if (shutDown && signOff) {
    return (
      <Helmet>
        <div className='shut-down-background'>
          {
            window.innerWidth <= 800 ?
            <img className='shut-down-mobile' src={win95shutdownMobile} alt="shut down"/>
            :
            <img className='shut-down' src={win95shutdown} alt="shut down"/>

          }
        </div>
      </Helmet>
    )
  }
  if (energyStar) {
    return (
      <Helmet>
        <div className='start-up-background'>
          {
            window.innerWidth <= 800 ?
            <img className='start-up' src={win95energystarMobile} alt="start up"/>
            :
            <img className='start-up' src={win95energystar} alt="start up"/>

          }
        </div>
      </Helmet>
    )
  }
  if (loading) {
    return (
      <Helmet>
        <div className='start-up-background'>
          {
            window.innerWidth <= 800 ?
            <img className='start-up-mobile' src={win95startupMobile} alt="start up"/>
            :
            <img className='start-up' src={win95startup} alt="start up"/>

          }
        </div>
      </Helmet>
    )
  } 
  if (!signed && signOff) {
    return (
      <Helmet style={{height: "100vh", width: "100vw"}}>
        <ThemeProvider theme={original}>
          <GlobalStyles />
          <div className="desktop" style={{height: "100vh", width: "100vw"}} onTouchStart={handleDown} onMouseDown={handleDown}>
            <WelcomeWindow setWelcomeActive={setWelcomeActive} welcomeActive={welcomeActive} signingIn={signingIn} />
          </div>
        </ThemeProvider>
      </Helmet>
    )
  }

  return (
    <Helmet>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <div className="desktop" ref={desktopRef} onMouseDown={handleDown} onTouchStart={handleDown} onMouseUp={teleportingIcon} onTouchEnd={teleportingIcon} onTouchStartCapture={handleTouchStart}>
          <DesktopIcons displayingTask={displayingTask} indexingTasks={indexingTasks} taskIndices={taskIndices} setTasksVisibility={setTasksVisibility} tasksVisibility={tasksVisibility} setActiveTask={setActiveTask} issuingWarning={issuingWarning} warnings={warnings} activiatingDockMenu={activiatingDockMenu} setSelectedIcon={setSelectedIcon} selectedIcon={selectedIcon} icons={icons} recyclingIcon={recyclingIcon} activeTask={activeTask} positioningIcon={positioningIcon} setBinLastPos={setBinLastPos} isTouchDevice={isTouchDevice}/>
          <ResumeWindow displayingTask={displayingTask} displayTasks={displayTasks} setActiveTask={setActiveTask} activeTask={activeTask} indexingTasks={indexingTasks} taskIndices={taskIndices} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} isTouchDevice={isTouchDevice}/>
          <PortfolioWindow displayingTask={displayingTask} setProjectUrl={setProjectUrl} displayTasks={displayTasks} indexingTasks={indexingTasks} taskIndices={taskIndices} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} activeTask={activeTask} setPortfolioHeight={setPortfolioHeight} setTouchStartY={setTouchStartY} setDocumentPosition={setDocumentPosition}/>
          <BrowserWindow setProjectUrl={setProjectUrl} projectUrl={projectUrl} displayingTask={displayingTask} displayTasks={displayTasks} indexingTasks={indexingTasks} taskIndices={taskIndices} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} activeTask={activeTask} />
          <MusicWindow displayingTask={displayingTask} displayTasks={displayTasks} setActiveTask={setActiveTask} activeTask={activeTask} indexingTasks={indexingTasks} taskIndices={taskIndices} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} signed={signed} signOff={signOff} isTouchDevice={isTouchDevice}/>
          <RecycleBinWindow displayingTask={displayingTask} displayTasks={displayTasks} setActiveTask={setActiveTask} activeTask={activeTask} indexingTasks={indexingTasks} taskIndices={taskIndices} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} icons={icons} setSelectedBinIcon={setSelectedBinIcon} selectedBinIcon={selectedBinIcon} unrecyclingIcon={unrecyclingIcon} binWindowRef={binWindowRef} setCursorPosition={setCursorPosition} isTouchDevice={isTouchDevice} setIconDragPoint={setIconDragPoint} settingIconsInBin={settingIconsInBin}/>
          <BinWarningWindow displayingTask={displayingTask} displayTasks={displayTasks} setActiveTask={setActiveTask} activeTask={activeTask} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} activiatingDockMenu={activiatingDockMenu} indexingTasks={indexingTasks} taskIndices={taskIndices}/>
          <RecycleWarningWindow displayingTask={displayingTask} displayTasks={displayTasks} setActiveTask={setActiveTask} activeTask={activeTask} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} activiatingDockMenu={activiatingDockMenu} indexingTasks={indexingTasks} taskIndices={taskIndices} selectedIcon={selectedIcon}/>
          <WarningWindow displayingTask={displayingTask} displayTasks={displayTasks} setActiveTask={setActiveTask} activeTask={activeTask} tasksVisibility={tasksVisibility} setTasksVisibility={setTasksVisibility} warnings={warnings} activiatingDockMenu={activiatingDockMenu} indexingTasks={indexingTasks} taskIndices={taskIndices} errorAudio={errorAudio} />
        </div>
        { warnings >= 3 ?
          <BlueScreen displayBSOD={displayBSOD} displayingBSOD={displayingBSOD} setActiveTask={setActiveTask} />
          :
          <></>
        }

        {
          isTouchDevice ?
          <RecycleBinContent binWindowRef={binWindowRef} cursorPosition={cursorPosition} taskIndices={taskIndices} displayTasks={displayTasks} tasksVisibility={tasksVisibility} 
          setActiveTask={setActiveTask} indexingTasks={indexingTasks} icons={icons} setSelectedBinIcon={setSelectedBinIcon} selectedBinIcon={selectedBinIcon} activeTask={activeTask} unrecyclingIcon={unrecyclingIcon} teleportingIcon={teleportingIcon} isTouchDevice={isTouchDevice} setIconDragPoint={setIconDragPoint} settingIconsInBin={settingIconsInBin}/>
          :
          <></>
        }
       
       < Taskbar activiatingDockMenu={activiatingDockMenu} dockMenuActive={dockMenuActive} displayingTask={displayingTask} displayTasks={displayTasks} indexingTasks={indexingTasks} signingIn={signingIn} setWelcomeActive={setWelcomeActive} standbyTasks={standbyTasks} taskIndices={taskIndices} turningoff={turningoff} setTasksVisibility={setTasksVisibility} tasksVisibility={tasksVisibility} setActiveTask={setActiveTask} activeTask={activeTask} icons={icons} iconsInBin={iconsInBin} />
      </ThemeProvider>
    </Helmet>
  )
  };

export default App;