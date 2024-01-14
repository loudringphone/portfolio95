import React from 'react';

import git from '../assets/images/git.png'

const GitIcon = ({ style }) => {
  if (style) {
    return <img src={git} style={style} />;
  }
  return <img src={git} style={{ width: '60px', height: '60px', padding: '4px' }} />;
};

export default GitIcon;