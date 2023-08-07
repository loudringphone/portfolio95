
import React, { useState, useEffect } from 'react';
import { GroupBox, TreeView } from 'react95';
import { Brush ,Explorer100, FilePen, ReaderCd2, Awfxcg321303, Shell3218, Mshearts1 } from "@react95/icons";
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
    icon: <Explorer100 style={{height:'20px', width:'20px'}}/>,
    items: [
          { id: 'winstons-portfolio', label: "Winston's Portfolio", icon: <Brush style={{height:'20px', width:'20px'}}/> },
          { id: 'winstons-blog', label: "Winston's Blog", icon: <FilePen style={{height:'20px', width:'20px'}}/> },
          { id: 'video-store', label: 'Video Store', icon: <ReaderCd2 style={{height:'20px', width:'20px'}}/> },
          { id: 'spark-studio', label: 'Spark Studio', icon: <Awfxcg321303 style={{height:'20px', width:'20px'}}/> },
          { id: 'sancbook', label: 'Sancbook', icon: <Shell3218 style={{height:'20px', width:'20px'}}/> },
          { id: 'ultimate-tic-tac-toe', label: 'Ultimate Tic Tac Toe', icon: <Mshearts1 style={{height:'20px', width:'20px'}}/> },
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

  

  // const handleExpandClick = useCallback(() => {
  //   setExpanded(oldExpanded => (oldExpanded.length === 0 ? allIds : []));
  //   setSelected(null)
  //   selectingProject(null)
  // }, []);

  return (
    <Wrapper>
    <div style={{ width: '250px' }}>
      {/* <Panel className="tree-button-area">
        <Button onClick={handleExpandClick} fullWidth>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </Panel> */}

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
