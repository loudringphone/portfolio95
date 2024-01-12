import React  from 'react'
import Draggable from 'react-draggable';

const DraggableComponent = ({ task, initialPosition, setActiveTask, indexingWindows, children }) => {
  const onStart = () => {
    setActiveTask(task);
    indexingWindows(task)
  };
  const onStop = () => {};
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