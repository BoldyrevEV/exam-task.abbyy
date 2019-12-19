import * as React from 'react';
import {connect} from 'react-redux'
import {State} from '../../../appTypes'
import UserNameComponent from '../../Components/UserName/UserNameComponent'

interface UserNameProps {
    userName: string;
}

class UserNameContainer extends React.Component<UserNameProps> {
    render() {
        return <UserNameComponent userName={this.props.userName}/>;
    }
}

function mapStateToProps(state: State) {
    const userName: string = state.userName;

    return {
        userName,
    };
}

export default connect(mapStateToProps)(UserNameContainer);
