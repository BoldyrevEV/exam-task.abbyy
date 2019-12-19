import * as React from 'react';
import * as styles from './Enter.css';

interface EnterComponentProps {
    getUserName: (userName: string) => void;
    history: BrowserHistory;
}

interface BrowserHistory {
    push(url: string): void;
}

interface EnterComponentState {
    inputValue: string;
    correctValue: boolean;
}

export default class EnterComponent extends React.Component<EnterComponentProps, EnterComponentState> {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            correctValue: true
        };
    }

    /**
     * Обновляет state, записывает имя в store и переадресует пользователя на новую страницу при нажатии кнопки Войти.
     * @param event
     */
    public handleClick = (event: any): void => {
        if (this.state.inputValue === '') {
            event.preventDefault();

            this.setState({correctValue: false});
        } else {
            this.setState({
                inputValue: '',
                correctValue: true
            });

            this.props.getUserName(this.state.inputValue);

            setTimeout((): void => this.props.history.push("/game/"), 1000);
        }
    };

    /**
     * Предотварщает отправку формы.
     * @param event
     */
    public handleFormSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
    };

    /**
     * Записывает в state текс вводимый пользователем.
     * @param event
     */
    public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const elem: HTMLInputElement = event.target;
        const inputValue: string = elem.value;

        this.setState({inputValue});
    };

    render() {
        const inputStyle: string = `${styles.input} ${this.state.correctValue ? '' : styles.notCorrect}`;

        return  (
            <div className={styles.container}>
                <div className={styles.form} onSubmit={this.handleFormSubmit}>
                    <p className={styles.mainText}>Sign in game</p>
                    <p className={styles.formText}>Enter your name</p>
                    <input type='text'
                           onChange={this.handleInputChange}
                           className={inputStyle}/>
                    <button onClick={this.handleClick} className={styles.formButton}>Enter</button>
                </div>
            </div>
        );
    }
}
