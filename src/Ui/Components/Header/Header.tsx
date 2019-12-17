import * as React from 'react';
import * as styles from './Header.css';

const Header = (): React.ReactElement => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <p className={styles.mainText}>ABBYY</p>
            </div>
        </header>
    )
};

export default Header;
