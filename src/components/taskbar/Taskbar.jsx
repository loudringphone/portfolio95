import React from "react";
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator } from "react95";
import Task from "./Task";
import win95logo from '../../assets/images/win95-logo.png'
import { Mailnews20, Shell325, Computer4, Password1010 } from '@react95/icons'
import win95shutdown from '../../assets/sounds/win95shutdown.mp3'
import './taskbar.css'

export const Taskbar = ({activatingDockMenu, dockMenuActive, openingPortfolio, openingResume, indexingWindows, signingIn, activatingWelcome, standbyTasks, portfolioActive, resumeActive, browserActive, windowIndice, turningoff, tasksVisibility, minimisingTasks, activatingTask, activeTask}) => {

  const handleClick = (event) => {
    event.stopPropagation();
    activatingDockMenu(!dockMenuActive)
  }
  const handlePortfolio = (event) => {
    event.stopPropagation();
    openingPortfolio('block')
    const newTasksVisibility = new Object(tasksVisibility)
    newTasksVisibility.portfolio = 'visible'
    minimisingTasks(newTasksVisibility)
    activatingTask('portfolio');
    if (windowIndice.resume > windowIndice.browser) {
      indexingWindows({portfolio: 7, resume: 6, browser: 5})
    } else {
      indexingWindows({portfolio: 7, resume: 5, browser: 6})
    }
  }
  const handleResume = (event) => {
    event.stopPropagation();
    const newTasksVisibility = new Object(tasksVisibility)
    newTasksVisibility.resume = 'visible'
    minimisingTasks(newTasksVisibility)
    activatingTask('resume');
    openingResume('block')
    if (windowIndice.portfolio > windowIndice.browser) {
      indexingWindows({resume: 7, portfolio: 6, browser: 5})
    } else {
      indexingWindows({resume: 7, portfolio: 5, browser: 6})
    }
  }
  const handleLogOff = () => {
    activatingWelcome(true)
    signingIn(false)
  }
  const handleShutDown = () => {
    turningoff(true)
    const audio = new Audio(win95shutdown);
    audio.play();
  }
 
  return (
    <AppBar style={{ top: "unset", bottom: 0, zIndex: 98 }}>
    <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "flex" }}>
        <Button
          className="start-button"
          onClick={handleClick}
          active={dockMenuActive}
          style={{ fontWeight: "bold" }}
        >
            <img
            src={win95logo}
            alt="Start"
            style={{ height: "22px", marginRight: 2, marginLeft: -2, transform: "rotate(-20deg)"}}
            />
            Start
        </Button>
        {
          [...standbyTasks].map((task, i) => (
            <Task
              key={i}
              task={task}
              minimisingTasks={minimisingTasks}
              tasksVisibility={tasksVisibility}
              activeTask={activeTask}
              activatingTask={activatingTask}
              indexingWindows={indexingWindows}
              windowIndice={windowIndice}
              />
          ))
        }
        {dockMenuActive && (
            <MenuList
                style={{
                position: "absolute",
                left: "0px",
                width: "200px",
                bottom: "100%",
                zIndex: 6
                }}
                onClick={handleClick}
            >
              <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={handleResume}>
            <Mailnews20 style={{height:'30px', width:'30px'}}/>
                <p><span className='underscore'>R</span>esume</p>
            </MenuListItem>
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={handlePortfolio}>
            <Shell325 style={{height:'30px', width:'30px'}}/>
                <p><span className='underscore'>P</span>ortfolio</p>
            </MenuListItem>
            <Separator/>
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={handleLogOff} >
                <Password1010 style={{transform: 'rotate(-90deg)', height:'30px', width:'30px'}}/>
                <p><span className='underscore'>L</span>og Off User</p>
            </MenuListItem>
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={handleShutDown}>
                <Computer4 style={{height:'30px', width:'30px'}}/>
                <p><span className='underscore'>S</span>hut Down</p>
            </MenuListItem>
            </MenuList>
        )}
        </div>
    </Toolbar>
    </AppBar>
  );
};