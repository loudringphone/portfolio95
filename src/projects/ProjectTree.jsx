
import React, { useCallback, useState, useEffect } from 'react';
import { GroupBox, TreeLeaf, TreeView } from 'react95';
import styled from 'styled-components';
import { Button } from 'react95';
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
    background-color: ${({ theme }) => theme.headerBackground};
    color: #FFFFFF;
  }
`;

const Panel = styled.div`
  padding: 2rem;
`;

const portfolio = [
  {
    id: 'projects',
    label: 'Projects',
    icon: <>🛠️</>,
    items: [
     
          { id: 'winstons-blog', label: "Winston's Blog", icon: <>📝</> },
          { id: 'video-store', label: 'Video Store', icon: <>🛍️</> },
          { id: 'spark-studio', label: 'Spark Studio', icon: <>🎯</> },
          { id: 'sancbook', label: 'Sancbook', icon: <>👬</> },
          { id: 'ultimate-tic-tac-toe', label: 'Ultimate Tic Tac Toe', icon: <>♟️</> },
    ]
  }
];

const allIds = [];

function getIds(item) {
  allIds.push(item.id);
  item.items?.forEach(getIds);
}

portfolio.forEach(getIds);

const ProjectTree = ({selectingProject}) => {
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    selectingProject(selected)
  }, [selected])

  

  const handleExpandClick = useCallback(() => {
    setExpanded(oldExpanded => (oldExpanded.length === 0 ? allIds : []));
  }, []);

  return (
    <Wrapper>
    <div style={{ width: '250px' }}>
      <Panel className="tree-button-area">
        <Button onClick={handleExpandClick} fullWidth>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </Panel>

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
    </Wrapper>
  );
}
export default ProjectTree
