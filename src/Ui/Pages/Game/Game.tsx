import * as React from 'react';
import * as styles from './Game.css';
import ShowUserName from '../../Components/ShowUserName/ShowUserName'
import TimerContainer from '../../Components/Timer/TimerContainer'
import ChatContainer from '../../Components/Chat/ChatContainer'
import BoardContainer from '../../Components/Board/BoardContainer'

const Game = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ShowUserName />
                <TimerContainer />
            </div>
            <div className={styles.content}>
                <BoardContainer />
                <ChatContainer />
            </div>
        </div>
    )
};

export default Game;
