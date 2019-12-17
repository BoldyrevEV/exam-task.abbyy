import * as React from 'react';
import * as styles from './Board.css';

interface BoardComponentProps {

}

const BoardComponent = (props: BoardComponentProps) => {
    return (
        <div className={styles.chatContainer}>
            <p>Board</p>
        </div>
    )
};

export default BoardComponent;
