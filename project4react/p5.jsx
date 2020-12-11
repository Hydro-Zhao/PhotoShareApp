import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";

import Header from './components/hearder/Header';
import Example from './components/example/Example';
import States from './components/states/States';


ReactDOM.render(
    <HashRouter>
        <Header />
        <Link to="/example">Example</Link>
        <Link to="/states">States</Link>
        <Route path="/example" component={Example} />
        <Route path="/states" component={States} />
    </HashRouter>,
    document.getElementById('reactapp'),
);
