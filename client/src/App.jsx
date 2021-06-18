import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Chat from "./components/chat/chat.jsx"; 
import Join from "./components/join/join.jsx"; 

const App = () => (
    <Router>
        <Route exact path="/" component={Join} />    
        <Route path="/chat" component={Chat} />    
    </Router>
);

export default App;