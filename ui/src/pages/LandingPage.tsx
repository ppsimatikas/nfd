import React from 'react';
import TabsComponent from '../components/tabs/tabs';
import styles from './View.module.css';


const LandingPage: React.FC = () => {
  // Sample tree data (adjust as per your needs)
  const treeData = [
    {
      value: '1',
      label: 'Row 1',
      children: [
        { value: '1-1', label: 'Subrow 1.1' },
        { value: '1-2', label: 'Subrow 1.2' },
      ],
    },
    {
      value: '2',
      label: 'Row 2',
      children: [
        { value: '2-1', label: 'Subrow 2.1' },
        { value: '2-2', label: 'Subrow 2.2' },
      ],
    },
    {
      value: '3',
      label: 'Row 3',
      children: [
        { value: '3-1', label: 'Subrow 3.1' },
        { value: '3-2', label: 'Subrow 3.2' },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <TabsComponent treeData={treeData} />
      </div>
      <div className={styles.description}>
        <div className={styles.text}>
          <p>
            Demeter is the ancient Greek Olympian goddess of harvest and agriculture, presiding over crops,
            grains, food, and the earth's fertility.
          </p>
        </div>
        <div className={styles.image}>
          <img src="Demeter.png" alt="Demeter" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;