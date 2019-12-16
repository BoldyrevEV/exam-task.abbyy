import * as React from 'react';
import { Route } from 'react-router-dom'

import EnterContainer from './Ui/Pages/Login/EnterContainer'
import Game from '../src/Ui/Pages/Game/Game'
import Header from '../src/Ui/Components/Header/Header'
import Footer from '../src/Ui/Components/Footer/Footer'

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Route path="/" exact component={ EnterContainer }/>
                <Route path="/game" component={ Game }/>
                <Footer />
            </React.Fragment>
        );

    }
}
