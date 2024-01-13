
import React, { useState, useEffect, useContext } from 'react';
import { GroupBox, TreeView } from 'react95';
import { Brush ,Explorer100, FilePen, Tree, Progman19, Awfxcg321303, Shell3218, Mshearts1 } from "@react95/icons";
import styled, { ThemeContext } from 'styled-components';

const portfolio = [
  {
    id: 'projects',
    label: 'Projects',
    icon: <Explorer100 style={{height:'20px', width:'20px'}}/>,
    items: [
          { id: 'winstons-portfolio', label: "Winston's Portfolio", icon: <Brush style={{height:'20px', width:'20px'}}/> },
          { id: 'winstons-blog', label: "Winston's Blog", icon: <FilePen style={{height:'20px', width:'20px'}}/> },
          { id: 'minimax', label: 'Minimax', icon: <Tree style={{height:'20px', width:'20px'}}/> },
          { id: 'video-store', label: 'Video Store', icon: <Progman19 style={{height:'20px', width:'20px'}}/> },
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

const ProjectTree = ({ activeTask, setProjectSelected, displayTasks }) => {
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState([]);
  const theme = useContext(ThemeContext);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(() => theme.headerBackground);
  const [selectedFontColor, setSelectedFontColor] = useState('#FFFFFF');
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
    background-color: ${selectedBackgroundColor};
    color: ${selectedFontColor};
  }
  `;

  useEffect(() => {
    if (activeTask === 'portfolio') {
      setSelectedBackgroundColor(() => theme.headerBackground)
      setSelectedFontColor('#FFFFFF')
    } else {
      setSelectedBackgroundColor('#7f787f')
      setSelectedFontColor('#c6c6c6')

    }
  }, [activeTask])

  useEffect(() => {
    setProjectSelected(selected)
  }, [selected])

  useEffect(() => {
    if (!displayTasks.has('portfolio')) {
      setSelected(null)
      setExpanded([])
    }
  }, [displayTasks])

  const [touchStartY, setTouchStartY] = useState(null)
  const [documentPosition, setDocumentPosition] = useState(null)
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
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove)
    };
  }, [touchStartY, documentPosition]);
  
  return (
    <Wrapper>
    <div style={{ width: '250px' }} onTouchStartCapture={handleTouchStart} onTouchMove={handleTouchMove}>
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
