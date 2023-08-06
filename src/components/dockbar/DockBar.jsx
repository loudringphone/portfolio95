import React from "react";
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator } from "react95";
import win95logo from '../../assets/images/win95-logo.png'

import { Mailnews20, Shell325, Computer4, Password1010 } from '@react95/icons'
import './dockbar.css'

export const DockBar = ({activatingDockMenu, dockMenuActive, openingPortfolio, activatingPortfolio, openingResume, activatingResume, indexingWindows, signingIn, activatingWelcome}) => {

  const handleClick = (event) => {
    event.stopPropagation();
    activatingDockMenu(!dockMenuActive)

  }
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
  const handleLogOff = () => {
    activatingWelcome(true)
    signingIn(false)
  }

  return (
    <AppBar style={{ top: "unset", bottom: 0, zIndex: 5 }}>
    <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
        <Button
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
                <p><span className='underscore'>M</span>y Resume</p>
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
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}}>
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