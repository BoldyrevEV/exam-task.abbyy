import * as React from 'react';
import * as styles from './Board.css';

interface BoardComponentProps {
    table: any
}

const BoardComponent = (props: BoardComponentProps) => {
    console.log(props.table)

    return (
        <div className={styles.chatContainer}>
            Gate
            <table className={styles.table}>
                <tbody>
                {props.table}
                </tbody>
            </table>
        </div>
    )
};

export default BoardComponent;
