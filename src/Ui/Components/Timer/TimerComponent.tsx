import * as React from 'react';
import * as styles from './Timer.css';

interface TimerComponentProps {
    timer: string;
}

const TimerComponent = (props: TimerComponentProps) => {
    return (
        <p className={styles.userNameContainer}>
            <span className={styles.mainText}>Timer: </span>
            {props.timer}
        </p>
    )
};

export default TimerComponent;
