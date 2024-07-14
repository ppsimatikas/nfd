import {Group, Image, Stack, Text, Title} from "@mantine/core";
import {HomeMap} from "../components/maps/home_map";
import {LaunchDAppButton} from '../components/launchDappButton/launchDappButton';
import React, {useEffect, useState} from "react";

const messages = [
    "Agriculture is a $4.6 trillion dollar industry",
    "50% of Habitable land is used for Agriculture",
    "309 million people are facing acute levels of food insecurity"
]

function Home() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex: number) => (prevIndex + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Stack>
            <Stack align="center" mt={10}>
                <Stack gap={2}>
                    <Group gap={5}>
                        <Title c="white">Welcome to </Title>
                        <Image src="logo.png" alt="Logo" width={40} height={40} ml={5}/>
                        <Title c="white">emeter AI</Title>
                    </Group>
                    <Text c="dimmed">The first Web3 Agriculture Big Data & AI Platform</Text>
                </Stack>
                <Text c="white" mt={7}>{messages[messageIndex]}</Text>
            </Stack>
            <HomeMap index={messageIndex}/>
            <LaunchDAppButton/>
        </Stack>
    );
}

export default Home;