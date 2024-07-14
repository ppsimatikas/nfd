import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Center} from '@mantine/core'; // Adjust this import according to your button component

export function LaunchDAppButton() {
    const navigate = useNavigate();

    const handleLaunchDApp = () => {
        navigate('/explore'); // Adjust the route as per your application setup
    };

    return (
        <Center>
            <Button onClick={handleLaunchDApp} radius="lg" size="lg" style={{
                position: 'fixed',
                bottom: 40,
                left: 'auto',
                right: 'auto',
            }}>
                Explore Demeter
            </Button>
        </Center>
    );
}