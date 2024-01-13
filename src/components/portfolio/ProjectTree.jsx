
import React, { useState, useEffect, useRef } from 'react';
import { GroupBox, TreeView } from 'react95';
import { portfolio } from './portfolio';
import { debounce } from '../../functions/debounce';

const ProjectTree = ({ setProjectSelected, displayTasks, selected, setSelected, expanded, setExpanded }) => {
  const treeRef = useRef(null)

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
  const handleTouchMove = debounce((event) => {
    const touchEndY = event.touches[0].clientY;
    if (documentPosition === 0 && touchEndY > touchStartY) {
      event.preventDefault();
    }
  }, 100);
  useEffect(() => {
    const tree = treeRef.current
    if (tree) {
      tree.addEventListener('touchmove', handleTouchMove, { passive: false });
      return () => {
        tree.removeEventListener('touchmove', handleTouchMove)
      };
    }
  }, [touchStartY, documentPosition]);

  return (
    <div style={{ width: '250px' }} ref={treeRef} onTouchStartCapture={handleTouchStart}>
      <GroupBox label='Portfolio'>
        <TreeView
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
