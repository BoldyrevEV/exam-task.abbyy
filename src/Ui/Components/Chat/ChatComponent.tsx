import * as React from 'react';
import * as styles from './Chat.css';
import {LegacyRef} from "react";

interface ChatComponentProps {
    messages: React.ReactElement[];
    handleSubmit: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    text: string;
    listRef: LegacyRef<HTMLDivElement>
}

const ChatComponent = (props: ChatComponentProps) => {
    return (
        <div>
            <p className={styles.mainText}>Game chat</p>
            <div className={styles.chatBoard} ref={props.listRef}>
                {props.messages}
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
