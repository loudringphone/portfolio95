
import React, { useState, useEffect } from 'react';
import { GroupBox, TreeView } from 'react95';
import { portfolio } from './portfolio';

const ProjectTree = ({ setProjectSelected, displayTasks, selected, setSelected, expanded, setExpanded }) => {

  useEffect(() => {
    setProjectSelected(selected)
  }, [selected])

  useEffect(() => {
    if (!displayTasks.has('portfolio')) {
      setSelected(null)
      setExpanded([])
    }
  }, [displayTasks])

  const [documentPosition, setDocumentPosition] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
    setDocumentPosition(document.documentElement.scrollTop);
  };
  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    if (documentPosition === 0 && touchEndY > touchStartY) {
      event.preventDefault();
    }
  };
  useEffect(() => {
    // window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // return () => {
    //   window.removeEventListener('touchmove', handleTouchMove)
    // };
  }, [touchStartY, documentPosition]);

  return (
    <div style={{ width: '250px' }} onTouchStartCapture={handleTouchStart}>
      <GroupBox label='Portfolio' onTouchStartCapture={handleTouchStart}>
        <TreeView onTouchStartCapture={handleTouchStart}
          tree={portfolio}
          onNodeSelect={(_, id) => setSelected(id)}
          onNodeToggle={(_, ids) => setExpanded(ids)}
          expanded={expanded}
          selected={selected}
          className="custom-tree-view"
        />
      </GroupBox>
    </div>
  );
}
export default ProjectTree
