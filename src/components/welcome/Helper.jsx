import React, {useState} from 'react';

const Helper = ({ helperDisplay }) => {

  return (
    <div className='helper' style={{ display: helperDisplay }}>
      <p>User name: Admin</p>
      <p>Password: admin</p>
    </div>
  )
}

export default Helper