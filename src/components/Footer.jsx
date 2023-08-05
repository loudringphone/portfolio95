import React, { useState } from "react";
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator } from "react95";
import logo from '../assets/images/logo.png'
import {Bomb} from '@react95/icons/icons.css';
import { Computer4 } from "@react95/icons";
import { Password1010 } from "@react95/icons";
import { Shell325 } from "@react95/icons";
export const Footer = () => {
  const [open, setOpen] = useState(false);


  return (
    <AppBar style={{ top: "unset", bottom: 0 }}>
    <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
        <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
        >
            <img
            src={logo}
            alt="Start"
            style={{ height: "20px", marginRight: 4 }}
            />
            Start
        </Button>
        {open && (
            <MenuList
                style={{
                position: "absolute",
                left: "0px",
                width: "150px",
                bottom: "100%",
                }}
                onClick={() => setOpen(false)}
            >
            <MenuListItem style={{justifyContent:'flex-start', gap:"10px"}}>
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