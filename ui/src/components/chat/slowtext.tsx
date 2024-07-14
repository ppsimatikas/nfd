import React, {useEffect, useState} from 'react';
import Markdown from 'react-markdown'
import {Text} from "@mantine/core";

const SlowText = ({text, textLoaded, revealSpeed = 25}: any) => {
    const [visibleText, setVisibleText] = useState('');

    useEffect(() => {
        if (visibleText.length < text.length) {
            const timeoutId = setTimeout(() => {
                setVisibleText(text.slice(0, visibleText.length + 1));
            }, revealSpeed);
            return () => clearTimeout(timeoutId);
        }
        textLoaded();
    }, [visibleText, text, revealSpeed, textLoaded]);

    return (
        <Text>
            <Markdown>{visibleText}</Markdown>
        </Text>
    );
};

export default SlowText;
