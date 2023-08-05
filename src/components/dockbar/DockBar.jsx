import React, { useState } from "react";
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator } from "react95";
import logo from '../../assets/images/logo.png'
import { Computer4 } from "@react95/icons";
import { Password1010 } from "@react95/icons";
import { Shell325 } from "@react95/icons";
import './dockbar.css'

export const DockBar = ({activatingDockMenu, dockMenuActive, openingPortfolio, activatingPortfolio, indexingWindows}) => {

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
            src={logo}
            alt="Start"
            style={{ height: "20px", marginRight: 4 }}
            />
            Start
        </Button>
        {dockMenuActive && (
            <MenuList
                style={{
                position: "absolute",
                left: "0px",
                width: "150px",
                bottom: "100%",
                zIndex: 6
                }}
                onClick={handleClick}
            >
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}} onClick={handlePortfolio}>
            <Shell325 style={{height:'30px', width:'30px'}}/>
                <p style={{fontSize: 'small'}}>Portfolio</p>
            </MenuListItem>
            <Separator/>
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}}>
                <Password1010 style={{transform: 'rotate(-90deg)', height:'30px', width:'30px'}}/>
                <p style={{fontSize: 'small'}}>Log Off User...</p>
            </MenuListItem>
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}}>
                <Computer4 style={{height:'30px', width:'30px'}}/>
                <p style={{fontSize: 'small'}}>Shut Down...</p>
            </MenuListItem>
            </MenuList>
        )}
        </div>
    </Toolbar>
    </AppBar>
  );
};