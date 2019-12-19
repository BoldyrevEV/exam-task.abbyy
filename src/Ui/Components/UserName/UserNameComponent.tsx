import * as React from 'react';
import * as styles from './UserName.css';

interface UserNameProps {
    userName: string;
}

const UserNameComponent = (props: UserNameProps) => {
    return (
        <p className={styles.userNameContainer}>
            <span className={styles.mainText}>User name: </span>
            {props.userName}
        </p>
    );
};

export default UserNameComponent;
