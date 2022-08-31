import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import EnterRoom from '../components/EnterRoom/EnterRoom';
import RoomPage from '../pages/RoomPage/RoomPage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/enter-room" component={EnterRoom} />
                <Route path="/room/:roomID" component={RoomPage} />
            </Switch>
        </Router>
    );
}