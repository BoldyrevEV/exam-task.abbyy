import * as React from 'react';
import * as styles from './Chat.css';

interface ChatComponentProps {
    messages: React.ReactElement[];
    handleSubmit: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

const ChatComponent = (props: ChatComponentProps) => {
    return (
        <div className={styles.chatContainer}>
            <p className={styles.mainText}>My Chat</p>
            <div className={styles.chatBoard}>
                <ul className={styles.chatBoardList}>
                    {props.messages}
                </ul>
            </div>
            <div className={styles.chatInputControl}>
                <input
                    type="text"
                    className={styles.chatInput}
                    onChange={props.handleChange}
                    value={props.text}
                    placeholder="Enter your message"
                />
                <button className={styles.chatButton} onClick={props.handleSubmit}>Send</button>
            </div>
        </div>
    )
};

export default ChatComponent;
