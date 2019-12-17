import * as React from 'react';
import {connect} from 'react-redux'
import {getUserName} from '../../../store/store'
import EnterComponent from './EnterComponent'
import * as styles from "./Enter.css";

interface EnterContainerProps {
    getUserName: (userName: string) => void;
    history: BrowserHistory;
}

interface BrowserHistory {
    push(url: string): void;
}

interface EnterContainerState {
    inputValue: string;
    correctValue: boolean;
}

class EnterContainer extends React.Component<EnterContainerProps, EnterContainerState> {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            correctValue: true
        }
    }

    /**
     * Обновляет state, записывает имя в store и переадресует пользователя на новую страницу при нажатии кнопки Войти.
     * @param event
     */
    public handleClick = (event: any): void => {
        if (this.state.inputValue === '') {
            event.preventDefault();

            this.setState({
                correctValue: false
            })
        } else {
            this.setState({
                inputValue: '',
                correctValue: true
            })

            this.props.getUserName(this.state.inputValue);

            setTimeout((): void => {
                this.props.history.push("/game/")
            }, 1000)
        }
    }

    /**
     * Предотварщает отправку формы.
     * @param event
     */
    public handleFormSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
    }

    /**
     * Записывает в state текс вводимый пользователем.
     * @param event
     */
    public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const elem: HTMLInputElement = event.target;
        const inputValue: string = elem.value

        this.setState({
            inputValue
        })
    }

    render() {
        const inputStyle: string = `${styles.input} ${this.state.correctValue ? '' : styles.notCorrect}`;

        return <EnterComponent
            handleOnClick={this.handleClick}
            handleOnSubmit={this.handleFormSubmit}
            handleOnChange={this.handleInputChange}
            inputStyle={inputStyle}
        />;
    }
}

function mapDispatchToProps(dispatch: (action: object) => object) {
    return {
        getUserName: object => dispatch(getUserName(object))
    };
}

export default connect(null, mapDispatchToProps)(EnterContainer);
