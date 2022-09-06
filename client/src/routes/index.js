import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EnterRoomPage from '../pages/EnterRoomPage/EnterRoomPage';
import RoomPage from '../pages/RoomPage/RoomPage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={EnterRoomPage} />
                <Route path="/room/:roomID" component={RoomPage} />
            </Switch>
        </Router>
    );
}