import React from 'react';
import TodoApp from './TodoApp.js';
import TodoAppLogin from './TodoAppLogin';
import Header from './Header.js';
import './App.css';
import { 
    BrowserRouter, 
    Route,
    Redirect,
 } from 'react-router-dom';

const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {
  render () {
    return(
    <div className="App">
        <Header></Header>
        <BrowserRouter>
            <Route path="/" render={() =>
            isLoggedIn()
                ? <TodoApp />
                : <Redirect to='/login' />  
          }/>
            <Route path='/login' component={TodoAppLogin} />       
        </BrowserRouter>
    </div>
    );
  }
}
