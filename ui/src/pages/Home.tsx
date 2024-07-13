import {Stack, Text, Title} from "@mantine/core";
import {HomeMap} from "../components/maps/home_map";
import {LaunchDAppButton} from '../components/launchDappButton/launchDappButton';
import {useEffect, useState} from "react";

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
        <Stack style={{minHeight: '100vh'}} align="center" justify="flex-start">
            <Stack align="center" style={{marginTop: '10px'}}>
                <Title c="white">Welcome to Demeter AI</Title>
                <Text c="white" mt={10}>{messages[messageIndex]}</Text>
            </Stack>
            <HomeMap index={messageIndex}/>
            <LaunchDAppButton/>
        </Stack>
    );
}

export default Home;