import * as React from 'react';
import {connect} from 'react-redux'
import {getUserName} from '../../../store/store'
import EnterComponent from './EnterComponent'

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

    handleClick = (event: any): void => {
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

            setTimeout(() => {
                this.props.history.push("/game/")
            }, 1000)
        }
    }

    handleFormSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const elem: HTMLInputElement = event.target;
        const inputValue: string = elem.value

        this.setState({
            inputValue
        })
    }

    render() {
        return (
            <EnterComponent
                handleOnClick={this.handleClick}
                handleOnSubmit={this.handleFormSubmit}
                handleOnChange={this.handleInputChange}
                correctValue={this.state.correctValue}
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserName: object => dispatch(getUserName(object))
    };
}

export default connect(null, mapDispatchToProps)(EnterContainer);
