import React from 'react';

const MyHeader = ({ headText, leftChild, rightChild }) => {
  return (
    <header>
      <div className="head-left">{leftChild}</div>
      <h1 className="head-text">{headText}</h1>
      <div className="head-right">{rightChild}</div>
    </header>
  );
};

export default MyHeader;