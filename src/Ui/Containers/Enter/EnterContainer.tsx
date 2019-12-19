import * as React from 'react';
import {connect} from 'react-redux'
import {getUserName} from '../../../store/store'
import EnterComponent from '../../Components/Enter/EnterComponent'

interface EnterContainerProps {
    getUserName: (userName: string) => void;
    history: BrowserHistory;
}

interface BrowserHistory {
    push(url: string): void;
}

const EnterContainer = (props: EnterContainerProps) => {
    return <EnterComponent getUserName={props.getUserName} history={props.history} />;
};

function mapDispatchToProps(dispatch: (action: object) => object) {
    return {
        getUserName: object => dispatch(getUserName(object))
    };
}

export default connect(null, mapDispatchToProps)(EnterContainer);
