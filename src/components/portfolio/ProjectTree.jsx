
import React, { useEffect } from 'react';
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

  return (
    <div style={{ width: '250px' }}>
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
