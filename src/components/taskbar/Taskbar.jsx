import React, { useState } from "react";
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator } from "react95";
import Task from "./Task";
import win95logo from '../../assets/images/win95-logo.png'
import { Mailnews20, Shell32167, MediaCd, Computer4, Password1010, Shell3232, Shell3233 } from '@react95/icons'
import win95shutdown from '../../assets/sounds/win95shutdown.mp3'
import './taskbar.css'
import GitIcon from "../GitIcon";
import { redirectGitHub } from "../../functions/customFunctions";

export const Taskbar = ({activiatingDockMenu, dockMenuActive, displayingTask, indexingWindows, signingIn, setWelcomeActive, standbyTasks, windowIndices, turningoff, tasksVisibility, setTasksVisibility, setActiveTask, activeTask, icons, iconsInBin}) => {
  const shutdownAudio = new Audio(win95shutdown)

  const handleClick = (event) => {
    event.stopPropagation();
    activiatingDockMenu(!dockMenuActive)
  }
  const handleTask = (event, task) => {
    event.stopPropagation();
    activiatingDockMenu(false)
    const newTasksVisibility = new Object(tasksVisibility)
    newTasksVisibility[task] = 'visible'
    setTasksVisibility(newTasksVisibility)
    setActiveTask(task);
    displayingTask(true, task)
    indexingWindows(task)
  }

  const handleLogOff = () => {
    setWelcomeActive(true)
    signingIn(false)
  }
  const handleShutDown = () => {
    turningoff(true)
    setTimeout(() => {
      shutdownAudio.play();
    }, 500);
  }
 
  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <AppBar style={{ top: "unset", bottom: 0, zIndex: 98, userSelect: 'none' }} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
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
                setTasksVisibility={setTasksVisibility}
                tasksVisibility={tasksVisibility}
                activeTask={activeTask}
                setActiveTask={setActiveTask}
                indexingWindows={indexingWindows}
                windowIndices={windowIndices}
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
              <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={(event) => handleTask(event, 'resume')}>
                <Mailnews20 style={{height:'30px', width:'30px'}}/>
                <p><span className='underscore'>R</span>esume</p>
              </MenuListItem>
              {
                icons['git']['visibility'] == 'visible' ?
                <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={redirectGitHub}>
                  <GitIcon menuList={true}/>
                    <p><span className='underscore'>G</span>it</p>
                </MenuListItem>
              :
                <></>
              }
              {
                icons['portfolio']['visibility'] == 'visible' ?
                <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={(event) => handleTask(event, 'portfolio')}>
                  <Shell32167 style={{height:'30px', width:'30px'}}/>
                    <p><span className='underscore'>P</span>ortfolio</p>
                </MenuListItem>

              :
                <></>
              }
              {
                icons['music']['visibility'] == 'visible' ?
                <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={(event) => handleTask(event, 'music')}>
                  <MediaCd style={{height:'30px', width:'30px'}}/>
                  <p><span className='underscore'>M</span>usic</p>
                </MenuListItem>

              :
                <></>
              }
              <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={(event) => handleTask(event, 'recycle bin')}>
                { iconsInBin.size == 0 ?
                  <Shell3232 style={{height:'30px', width:'30px'}}/>
                :
                  <Shell3233 style={{height:'30px', width:'30px'}}/>
                }
                <p><span className='underscore'>R</span>ecycle bin</p>
              </MenuListItem>
              <Separator/>
              <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={handleLogOff}>
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