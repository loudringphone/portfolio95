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

const WelcomeWindow = ({setWelcomeActive, welcomeActive, signingIn}) => {
  const startupAudio = new Audio(win95startup);
  const [initialPosition, setInitialPosition] = useState(window.innerWidth <= 600 ? {x: window.innerWidth*0.025, y: 20} : { x: (window.innerWidth - 650)/2, y: 80 })
  const [helperDisplay, setHelperDisplay] = useState('none')
  const [username, setUsername] = useState('Admin')
  const [password, setPassword] = useState('admin')
  const [signinError, setSigninError] = useState(false)

  const onStart = () => {
    setHelperDisplay('none')
    setWelcomeActive(true)
  };
  const onStop = () => {};
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    setWelcomeActive(true)
  };
  const handleMouseDown = () => {
    setWelcomeActive(true)
  }
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
      startupAudio.play();
    } else {
      event?.stopPropagation();
      setWelcomeActive(false)
      setSigninError(true)
      setTimeout(() => {
        setWelcomeActive(true)
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
          <Window className='welcome-window' onClick={handleClickInsideWindow} onMouseDown={handleMouseDown}>
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