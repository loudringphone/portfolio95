import React, {useState, useEffect} from 'react';
import { Password1010 } from "@react95/icons";
import Draggable from 'react-draggable';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  TextInput,
} from 'react95';
import styled from 'styled-components';
import './welcomewindow.scss'
import win95sound from '../../assets/sounds/win95.mp3'

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
  const [username, setUsername] = useState('Admin')
  const [password, setPassword] = useState('admin')

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
  const handleSubmit = () => {
    if (username == 'Admin' && password == 'admin') {
      signingIn(true)
      const audio = new Audio(win95sound);
      audio.play();
    }
  }

  return (
    <div className='welcome'>
    <Draggable handle="strong" {...dragHandlers}>
    <Wrapper>
    <Window className='welcome-window' onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={welcomeActive} className='window-title'>
        <span>Welcome to Windows</span>
        <div className="buttons">
        <Button>
          <span className='help-icon'>?</span>
        </Button>
        <Button>
          <span className='close-icon' />
        </Button>
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    
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
      <div className="login-buttons">
        <Button type="submit" onClick={handleSubmit} onTouch={handleSubmit}>OK</Button>
        <Button>Cancel</Button>
      </div>
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  </div>
  )
}

export default WelcomeWindow