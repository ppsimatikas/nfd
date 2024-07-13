import React from 'react';
import { Tree, TreeNodeData } from '@mantine/core';
import { data } from './data'; // Import your tree data

function LandingPage () {
  return (
    <>
      <div style={{ padding: '20px', minHeight: 'calc(100vh - 100px)' }}> {/* Adjust padding and height based on your layout */}
        {/* Render Trees here */}
        <Tree
          data={data}
          // Additional props as needed
        />
      </div>
    </>
  );
}

export default LandingPage;