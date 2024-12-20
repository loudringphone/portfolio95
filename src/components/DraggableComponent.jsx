import React  from 'react'
import Draggable from 'react-draggable';

const DraggableComponent = ({ task, isDraggable, initialPosition, setActiveTask, indexingTasks, handleDrag, children }) => {
  const onStart = () => {
    if (!isDraggable) {
      return false
    }
    setActiveTask(task);
    indexingTasks(task)
  };
  // const onStop = () => {};
  const dragHandlers = { onStart };
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