import React, { useState } from 'react'
import Draggable from 'react-draggable';

const DraggableComponent = ({ task, initialPosition, setActiveTask, indexingWindows, children }) => {
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
    setActiveTask(task);
    indexingWindows(task)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };

  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  
  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
      {children}
    </Draggable>
  )
}

export default DraggableComponent