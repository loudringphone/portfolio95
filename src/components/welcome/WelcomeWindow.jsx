import React, {useState, useEffect} from 'react';
import { Password1010 } from "@react95/icons";

import Draggable from 'react-draggable';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView,
  TextInput,
} from 'react95';
import styled from 'styled-components';
import './welcomewindow.scss'
const Wrapper = styled.div`
  background: transparent;
  .close-icon {
    &:before,
    &:after {
      content: '';
      background: ${({ theme }) => theme.materialText};
    }
  }
`;

const WelcomeWindow = () => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: 0, y: 0
    }
  });

  const onStart = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
  };
  const handleClose = () => {
  }
  return (
    <div className='welcome'>
    <Draggable handle="strong" {...dragHandlers}>
    <Wrapper>
    <Window className='welcome-window' onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={true} className='window-title'>
        <span>Welcome to Windows</span>
        <div className="buttons">
        <Button onClick={handleClose}>
          <span className='help-icon'>?</span>
        </Button>
        <Button onClick={handleClose}>
          <span className='close-icon' />
        </Button>
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    
      <Password1010 style={{height:'60px', width:'60px', padding: '5px'}}/>
      <div className="login-info">
        <p>Type a user name and password to log on to Windows.</p>
        <div>
        <div className="username"><label htmlFor=""><span className='underscore'>U</span>ser name:</label></div>
        <div className="password"><label htmlFor=""><span className='underscore'>P</span>assword:</label></div>
        </div>
      </div>
     
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  </div>
  )
}

export default WelcomeWindow