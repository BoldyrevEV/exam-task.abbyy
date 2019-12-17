import * as React from 'react';
import * as styles from './Enter.css';

interface EnterComponentProps {
    handleOnSubmit: (event: React.FormEvent) => void;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnClick: (event: React.MouseEvent) => void;
    inputStyle: string;
}

const EnterComponent = (props: EnterComponentProps): React.ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.form} onSubmit={props.handleOnSubmit}>
                <p className={styles.mainText}>Sign in game</p>
                <p className={styles.formText}>Enter your name</p>
                <input type='text'
                       onChange={props.handleOnChange}
                       className={props.inputStyle}/>
                <button onClick={props.handleOnClick} className={styles.formButton}>Enter</button>
            </div>
        </div>
    )
};

export default EnterComponent;
