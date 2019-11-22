import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Main from './containers/Main';
import Counter from './containers/Counter';
import UserStatus from './containers/UserStatus';
import WiseDomain from './containers/WiseDomain';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/home' component={Main} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/user' component={UserStatus} />
                    <Route path='/wisedomain' component={WiseDomain} />
                    <Redirect to='/home' />
                </Switch>
            </Router>
        );
    }
}

export default App;