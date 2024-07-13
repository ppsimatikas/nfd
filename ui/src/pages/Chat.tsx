import ChatInput from "../components/chat/chatinput";
import SlowText from "../components/chat/slowtext";
import LoadingDots from "../components/chat/loadingDots";
import {useState} from "react";
import Markdown from "react-markdown";
import {Avatar, Box, Center, Group, Image, Stack, Text, Title} from "@mantine/core";
import './Chat.scss';
import {UiTable} from "../components/table";

export function ChatPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [textLoaded, setTextLoaded] = useState(true);

    const postMessage = async (message: any) => {
        setMessages((prevMessages: any) => [...prevMessages, {message, ai: false}]);
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5001/demeter-a0451/europe-west1/on_request/ai', {
//          const response = await fetch('http://127.0.0.1:5000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message})
            });
            setLoading(false);
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            const resp = await response.json();
            setTextLoaded(false);
            setMessages((prevMessages: any) => [...prevMessages, {
                message: resp.message,
                columns: resp.columns,
                data: resp.data,
                ai: true
            }]);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setMessages((prevMessages: any) => [...prevMessages, {
                message: "An error occurred. Please try again later.",
                ai: true
            }]);
        }
    };

    const renderWelcome = () => (
        <Stack mt={20}>
            <Title>Ask Demeter anything</Title>
            <Center>
                <Image src='demeter.png' h={300} w={200}/>
            </Center>
            <Text>the first <b>AI-trained</b> Goddess with vast knowledge on Agriculture data.</Text>
        </Stack>
    );

    const renderMessages = () => {
        return (
            <div className="messages">
                {
                    loading &&
                    <Group>
                        <Avatar src="demeter.png"/>
                        <LoadingDots/>
                    </Group>
                }
                {
                    [...messages].reverse().map(renderMessage)
                }
            </div>
        );
    };

    const renderMessage = (m: any, i: number) => {
        const hasData = m.data && m.data.length > 0;

        return (
            <Group key={i} className="message-container">
                <Group>
                    <Avatar src={m.ai ? "demeter.png" : null}/>
                    {
                        i === 0 && m.ai ?
                            <SlowText text={m.message} textLoaded={() => setTextLoaded(true)}/> :
                            <Text><Markdown>{m.message}</Markdown></Text>
                    }
                </Group>
                {
                    hasData && (textLoaded || i !== 0) &&
                    <Group>
                        <Box w={40}/>
                        <UiTable
                            data={m.data}
                            // columns={columns}
                            // size="middle"
                            // bordered
                        />
                    </Group>
                }
            </Group>
        );
    };

    return (
        <div className='chat'>
            {!messages.length && renderWelcome()}
            {messages.length > 0 && renderMessages()}
            <ChatInput onAsk={postMessage} disabled={loading}/>
        </div>
    );
}
