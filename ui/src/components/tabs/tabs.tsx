import React from 'react';
import { Tabs, TreeNodeData } from '@mantine/core';

import TreeView from '../tree/treeView'; // Adjust the path as per your project structure

type TabsComponentProps = {
  treeData: TreeNodeData[]; // Data for the tree table
};

const TabsComponent: React.FC<TabsComponentProps> = ({ treeData }) => {
  return (
    <Tabs defaultValue="tree">
      <Tabs.List>
        <Tabs.Tab value="tree">Domains</Tabs.Tab>
        <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab value="chat">AI agent</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="tree">
        <TreeView data={treeData} />
      </Tabs.Panel>
      <Tabs.Panel value="analytics">
        {/* Content for Analytics tab */}
      </Tabs.Panel>
      <Tabs.Panel value="chat">
        {/* Content for AI agent tab */}
      </Tabs.Panel>
    </Tabs>
  );
};

export default TabsComponent;