import React, {useState} from 'react';
import './chatinput.scss';

function ChatInput({onAsk, disabled}: any) {
    const [inputValue, setInputValue] = useState("");

    // Function to handle input changes
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    // Function to handle key press events
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (inputValue.trim()) {
            onAsk(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="chat-input-container">
            <div className="chat-input">
                <img src="demeter.png"/>
                <input
                    disabled={disabled}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Demeter..."
                    className="chat-input-field"
                />
                <button onClick={sendMessage}
                        className={"send-button " + (inputValue.trim() ? '' : 'send-button-gray')}>
                    <span>&#x27A4;</span>
                </button>
            </div>
        </div>
    );
}

export default ChatInput;
