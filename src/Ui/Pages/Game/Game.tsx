import * as React from 'react';
import { connect } from 'react-redux'

class Game extends React.Component {
    render() {
        // console.log(this.props.state);

        return (
            <h2>
                Game
            </h2>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default connect(mapStateToProps)(Game);
