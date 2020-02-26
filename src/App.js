import React from 'react';
import TodoApp from './TodoApp.js';
import Header from './Header.js';
import './App.css';
import { 
    BrowserRouter, 
    Route, 
    Switch,
 } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Header></Header>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ TodoApp }/>
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
