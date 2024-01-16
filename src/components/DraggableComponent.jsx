import React  from 'react'
import Draggable from 'react-draggable';

const DraggableComponent = ({ task, initialPosition, setActiveTask, indexingTasks, handleDrag, children }) => {
  const onStart = () => {
    setActiveTask(task);
    indexingTasks(task)
  };
  const onStop = () => {};
  const dragHandlers = { onStart, onStop };
  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  
  if (handleDrag) {
    return (
      <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation} onDrag={handleDrag}>
        {children}
      </Draggable>
    )
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
      {children}
    </Draggable>
  )
}

export default DraggableComponent