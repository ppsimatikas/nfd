import {Stack, Text, Title} from "@mantine/core";
import {HomeMap} from "../components/maps/home_map";
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
        <Stack>
            <Title c="white" mt={10}>Welcome to Demeter AI</Title>
            <Text c="white" size="lg" mt={10}>{messages[messageIndex]}</Text>
            <HomeMap index={messageIndex}/>
        </Stack>
    );
}

export default Home;
