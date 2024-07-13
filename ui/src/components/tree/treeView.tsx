import React from 'react';
import { Group, Tree, TreeNodeData } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import styles from './tree.module.css'; // Adjust your CSS module path as needed

type TreeViewProps = {
  data: TreeNodeData[];
};

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const renderNode = ({ node, expanded, hasChildren, elementProps }: any) => (
    <div className={styles.treeItem}>
      <Group gap={5} {...elementProps}>
        {hasChildren && (
          <IconChevronDown
            size={18}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
        <span>{node.label}</span>
      </Group>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <Tree
          data={data}
          levelOffset={20}
          renderNode={renderNode}
          classNames={{
            root: styles.treeRoot,
            // Adjust according to the expected keys in TreeStylesNames
            label: styles.treeLabel,
          } as any} // Use type assertion as 'any' if necessary
        />
      </div>
    </div>
  );
};

export default TreeView;