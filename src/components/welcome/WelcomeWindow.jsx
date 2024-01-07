import React, {useState} from 'react';
import Helper from './Helper';
import { Password1010 } from "@react95/icons";
import ConditionalAnimatedWrapper from '../ConditionalAnimatedWrapper';
import Draggable from 'react-draggable';
import CloseFillIcon from 'remixicon-react/CloseFillIcon';

import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  TextInput,
} from 'react95';
import styled from 'styled-components';
import './welcomewindow.scss'
import win95startup from '../../assets/sounds/win95startup.mp3'

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

const WelcomeWindow = ({activatingWelcome, welcomeActive, signingIn}) => {
  const [initialPosition, setInitialPosition] = useState(window.innerWidth <= 600 ? {x: window.innerWidth*0.025, y: 20} : { x: (window.innerWidth - 650)/2, y: 80 })
  const [helperDisplay, setHelperDisplay] = useState('none')
  const [username, setUsername] = useState('Admin')
  const [password, setPassword] = useState('admin')
  const [signinError, setSigninError] = useState(false)
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
    setHelperDisplay('none')
    activatingWelcome(true)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingWelcome(true)
  };
  const handleUsername = (event) => {
    const value = event.target.value
    setUsername(value)
  }
  const handlePassword = (event) => {
    const value = event.target.value
    setPassword(value)
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
  const handleSubmit = (event) => {
    setHelperDisplay('none')
    if (username == 'Admin' && password == 'admin') {
      signingIn(true)
      const audio = new Audio(win95startup);
      audio.play();
    } else {
      event?.stopPropagation();
      activatingWelcome(false)
      setSigninError(true)
      setTimeout(() => {
        activatingWelcome(true)
        setSigninError(false)
        setHelperDisplay('block')
      }, 750);
    }
  }
 
  const handleHelp = () => {
    setHelperDisplay('block')
  }

  const handleCancel = () => {
    setHelperDisplay('none')
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
      <Wrapper className="drag-welcome">
        <Helper helperDisplay={helperDisplay} setHelperDisplay={setHelperDisplay}/>
        <ConditionalAnimatedWrapper animate={signinError}>
          <Window className='welcome-window' onClick={handleClickInsideWindow}>
            <strong className="cursor"><WindowHeader  active={welcomeActive} className='window-title'>
              <span>Welcome to Windows</span>
              <div className="buttons">
              <Button onClick={handleHelp} onTouchEnd={handleHelp}>
                <span className='help-icon'>?</span>
              </Button>
              <Button disabled={true} active={false}>
                <CloseFillIcon />
              </Button>
              </div>
            </WindowHeader></strong>
            <WindowContent className='window-content'>
              <div style={{display: 'flex', gap: '1rem'}}>
            <Password1010 style={{height:'65px', width:'65px', padding: '5px'}}/>
            <div className="login-info">
              <p>Type a user name and password to log on to Windows.</p>
              <form className="user-info" onSubmit={handleSubmit}>
                <div className="username">
                  <label htmlFor=""><span className='underscore'>U</span>ser name:</label>
                  <TextInput name="username" value={username} onInput={handleUsername}/>
                </div>
                <div className="password">
                  <label htmlFor=""><span className='underscore'>P</span>assword:</label>
                  <TextInput name="password" type="password" value={password} onInput={handlePassword} onKeyDown={handlePassword}/>
                </div>
              </form>
            </div>
            </div>
            <div className="login-buttons">
              <Button type="submit" onClick={handleSubmit} onTouch={handleSubmit}>OK</Button>
              <Button onClick={handleCancel} onTouch={ handleCancel}>Cancel</Button>
            </div>
            </WindowContent>
          </Window>
        </ConditionalAnimatedWrapper>
      </Wrapper>
    </Draggable>
  )
}

export default WelcomeWindow