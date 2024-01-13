
import React from 'react';
import styled from 'styled-components';
import ProjectTree from './ProjectTree';

const Wrapper = styled.div`
background: ${({ theme }) => theme.material};
.tree-button-area {
  display: flex;
  width: fit-content;
  padding: 0;
  padding-bottom: 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.custom-tree-view details li[aria-selected="true"] span:nth-child(2){
  background-color: #060084;
  color: #FFFFFF;
}
`;

const ActiveProjectTree = ({ setProjectSelected, displayTasks, selected, setSelected, expanded, setExpanded }) => {

  return (
    <Wrapper>
      <ProjectTree setProjectSelected={setProjectSelected} displayTasks={displayTasks} selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} />
    </Wrapper>
  );
}
export default ActiveProjectTree
