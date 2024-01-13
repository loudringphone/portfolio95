import { Brush ,Explorer100, FilePen, Tree, Progman19, Awfxcg321303, Shell3218, Mshearts1 } from "@react95/icons";

export const portfolio = [
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
