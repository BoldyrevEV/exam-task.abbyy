import * as React from 'react';
import TimerComponent from './TimerComponent'

interface TimerContainerState {
    date: Date;
}

interface TimerOptions {
    hour: string,
    minute: string,
    second: string
}

export default class TimerContainer extends React.Component {
    private timerID: number  = 0;

    state: TimerContainerState = {
        date: new Date(0,0,0,0,0,0)
    };

    componentDidMount() {
        this.timerID = window.setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    /**
     * Увеливает время, записанное в state, на одну секунду.
     */
    tick = () => {
        const date: Date = this.state.date;
        date.setSeconds(date.getSeconds() + 1)

        this.setState({date});
    };

    render() {
        const options: TimerOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        return <TimerComponent timer={this.state.date.toLocaleString("ru", options)}/>;
    }
}
