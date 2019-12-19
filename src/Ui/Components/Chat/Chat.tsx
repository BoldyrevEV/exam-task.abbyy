import * as React from 'react';
import * as styles from './Chat.css';

interface ChatContainerState {
    messages: string[];
    text: string;
}

export default class Chat extends React.Component {
    private listRef = React.createRef<HTMLDivElement>();
    state: ChatContainerState = {
        messages: [],
        text: ''
    };

    getSnapshotBeforeUpdate(prevProps: null, prevState: object): number | null {
        let list: HTMLDivElement | null = this.listRef ? this.listRef.current : null;

        if (this.listRef && list!.scrollHeight >= 390) {
            return list.scrollHeight - list.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps: null, prevState: null, snapshot: number | null) {
        if (snapshot !== null) {
            const list: HTMLDivElement | null = this.listRef ? this.listRef.current : null;
            list!.scrollTop = list!.scrollHeight - snapshot;
        }
    }

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
            return <p className={styles.boardText} key={index}>{message}</p>;
        });

        return (
            <div>
                <p className={styles.mainText}>Game chat</p>
                <div className={styles.chatBoard} ref={this.listRef}>
                    {elMessages}
                </div>
                <div className={styles.chatInputControl}>
                    <input
                        type="text"
                        className={styles.chatInput}
                        onChange={this.handleChange}
                        value={this.state.text}
                        placeholder="Enter your message"
                    />
                    <button className={styles.chatButton} onClick={this.handleSubmit}>Send</button>
                </div>
            </div>
        );
    }
}
