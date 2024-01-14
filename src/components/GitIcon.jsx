import React from 'react';

import git from '../assets/images/git.png'

const GitIcon = ({ menuList }) => {
  if (menuList) {
    return <img src={git} style={{ width: '30px', height: '30px' }} />;
  }
  return <img src={git} style={{ width: '56px', height: '56px', padding: '6px' }} />;
};

export default GitIcon;