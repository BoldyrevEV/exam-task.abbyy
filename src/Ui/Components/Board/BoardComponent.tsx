import * as React from 'react';
import * as styles from './Board.css';

interface BoardComponentProps {
    table: JSX.Element[],
    strokeColor: string,
}

const BoardComponent = (props: BoardComponentProps) => {
    return (
        <div>
            <p className={styles.mainText}>Checkers</p>
            <table className={styles.table}>
                <tbody>
                {props.table}
                </tbody>
            </table>
            <div className={styles.inf}>
                <p className={styles.infText}>Player move: </p>
                <p className={props.strokeColor !== 'white' ? styles.infColorGray : styles.infColorBlack}> </p>
            </div>
        </div>
    )
};

export default BoardComponent;
