import * as React from 'react';
import * as styles from './Footer.css';

const Footer = (): React.ReactElement => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.mainText}>© 2019 ABBYY. Все права защищены.</p>
            </div>
        </footer>
    )
};

export default Footer;
