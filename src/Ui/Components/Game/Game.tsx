import * as React from 'react';
import * as styles from './Game.css';
import ShowUserName from '../../Containers/UserName/UserNameContainer'
import Timer from '../Timer/Timer'
import Chat from '../Chat/Chat'
import Board from '../Board/Board'

const Game = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ShowUserName />
                <Timer />
            </div>
            <div className={styles.content}>
                <Board />
                <Chat />
            </div>
        </div>
    )
};

export default Game;
