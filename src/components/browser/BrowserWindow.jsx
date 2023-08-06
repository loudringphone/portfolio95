import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView,
} from 'react95';
import styled from 'styled-components';
import './browserwindow.scss'
const Wrapper = styled.div`
  position: absolute;
  background: transparent;
  .close-icon {
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
  }
`;

const StyledScrollView = styled(ScrollView)`
  /* Customize the scrollbar here */
  scrollbar-width: thick;
  ::-webkit-scrollbar {
    width: 20px;
  }
 
  ::-webkit-scrollbar-thumb {
    box-sizing: border-box;
    display: inline-block;
    background: rgb(198, 198, 198);
    color: rgb(10, 10, 10);
    border-style: solid;
    border-width: 2px;
    border-color: rgb(223, 223, 223) rgb(10, 10, 10) rgb(10, 10, 10) rgb(223, 223, 223);
    box-shadow: rgb(254, 254, 254) 1px 1px 0px 1px inset, rgb(132, 133, 132) -1px -1px 0px 1px inset;
    outline-offset: -2px;
    
  }
  ::-webkit-scrollbar-track {
    background-image: linear-gradient(45deg, rgb(198, 198, 198) 25%, transparent 25%, transparent 75%, rgb(198, 198, 198) 75%), linear-gradient(45deg, rgb(198, 198, 198) 25%, transparent 25%, transparent 75%, rgb(198, 198, 198) 75%);
    background-color: rgb(254, 254, 254);
    background-size: 4px 4px;
    background-position: 0px 0px, 2px 2px;
}
`;

const BrowserWindow = ({settingProjectUrl, projectUrl, browserDisplay, openingBrowser, activatingBrowser, browserActive, indexingWindows, windowIndice, bounds}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const onStart = () => {
    activatingBrowser(true)
    activatingBrowser(true);
    if (windowIndice.portfolio > windowIndice.resume) {
      indexingWindows({browser: 3, portfolio: 2, resume: 1})
    } else {
      indexingWindows({browser: 3, portfolio: 1, resume: 2})
    }
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingBrowser(true);
    if (windowIndice.portfolio > windowIndice.resume) {
      indexingWindows({browser: 3, portfolio: 2, resume: 1})
    } else {
      indexingWindows({browser: 3, portfolio: 1, resume: 2})
    }
  };
  useEffect(() => {
    const iframe = document.getElementById('embeddedWebpage');
    const iframeDocument = iframe?.contentDocument || iframe?.contentWindow.document;
    const iframeBody = iframeDocument?.body;

    if (iframeBody) {
      iframeBody.style.overflow = 'hidden';
      iframe.style.height = iframeBody.scrollHeight + 'px';
    }
  }, []);

  const handleClose = () => {
    openingBrowser('none')
    settingProjectUrl(null)
  }
  return (
    <Draggable bounds={bounds} handle="strong" {...dragHandlers}>
    <Wrapper className="drag-browser" style={{zIndex: windowIndice.browser}}>
    <Window className='browser-window' style={{display: browserDisplay}} onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={browserActive} className='window-title'>
        <span>browser.exe</span>
        <Button onClick={handleClose} onTouchStart={handleClose}>
          <span className='close-icon' />
        </Button>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    
    <StyledScrollView style={{ width: "100%", height: "500px", overflowWrap: 'anywhere' }}>
      <iframe
        src={projectUrl}
        width="100%"
        height="600"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        scrolling="no"
      />
      
        </StyledScrollView>
     
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  )
}

export default BrowserWindow