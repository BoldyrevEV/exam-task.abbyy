import * as React from 'react';
import * as styles from './Chat.css';
import ChatComponent from './ChatComponent'

interface ChatContainerState {
    messages: string[];
    text: string;
}

export default class ChatContainer extends React.Component {
    state: ChatContainerState = {
        messages: [],
        text: ''
    };

    /**
     * Добавляет новое сообщение в существующий массив сообщений.
     * @param message
     */
    private onSendMessage = (message: string): void => {
        const messages: string[] = this.state.messages;
        messages.push(message);

        this.setState({messages});
    };

    /**
     * Записывает в state вводимый пользователем текст сообщения.
     * @param event
     */
    public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const elem: HTMLInputElement = event.target;

        this.setState({text: elem.value});
    };

    /**
     * Обновляет state в соответствии с введенным текстом сообщения.
     */
    public handleSubmit = (): void => {
        if(this.state.text === '') {
            return;
        }

        this.onSendMessage(this.state.text);
        this.setState({text: ''});
    };

    render() {
        const elMessages: React.ReactElement[] = this.state.messages.map((message: string, index: number) => {
            return <li className={styles.boardText} key={index}>{message}</li>;
        });

        return <ChatComponent
            messages={elMessages}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            text={this.state.text}
        />;
    }
}
