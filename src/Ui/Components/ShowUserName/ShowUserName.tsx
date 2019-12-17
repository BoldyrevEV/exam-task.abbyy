import * as React from 'react';
import {connect} from 'react-redux'
import {State} from '../../../appTypes'
import * as styles from './ShowUserName.css';

interface ShowUserNameProps {
    userName: string;
}

class ShowUserName extends React.Component<ShowUserNameProps> {
    render() {
        return (
            <p className={styles.userNameContainer}>
                <span className={styles.mainText}>User name: </span>
                {this.props.userName}
            </p>
        );
    }
}

function mapStateToProps(state: State) {
    const userName: string = state.userName;

    return {
        userName,
    };
}

export default connect(mapStateToProps)(ShowUserName);
