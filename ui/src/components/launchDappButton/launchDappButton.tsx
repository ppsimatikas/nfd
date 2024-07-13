import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core'; // Adjust this import according to your button component

 export function LaunchDAppButton() {
  const navigate = useNavigate();

  const handleLaunchDApp = () => {
    navigate('/landing-page'); // Adjust the route as per your application setup
  };

  return (
    <div style={{ marginTop: 'auto', textAlign: 'center', marginBottom: '20px' }}>
      {/* Adjust styling or props as per your design */}
      <Button onClick={handleLaunchDApp} variant="filled">
        Launch DApp
      </Button>
    </div>
  );
}