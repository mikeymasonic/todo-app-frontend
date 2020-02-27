import React, { Component } from 'react'
import request from 'superagent';

export default class TodoAppLogin extends Component {
    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    handleSignIn = async () => {
        const signIn = await request.post(`https://todo-app-backend-demo.herokuapp.com/api/auth/signin`, {
            email: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        })
        // alert('you are now logged in');
        localStorage.setItem('user', JSON.stringify(signIn.body));
        this.props.history.push('/');
    }

    handleSignUp = async () => {
        const signUp = await request.post(`https://todo-app-backend-demo.herokuapp.com/api/auth/signup`, {
            email: this.state.usernameSignUp,
            password: this.state.passwordSignUp,
        })
        // alert('you are now signed up, please login below');
        localStorage.setItem('user', JSON.stringify(signUp.body));
        this.props.history.push('/');
    }

    render() {
        return (
            <div className = "signInSignUp">
                <input className = "signUpEmail" input type ="email" value={ this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value})} />
                <input input type="password" value={ this.state.passwordSignUp} onChange={(e) => this.setState({ passwordSignUp: e.target.value})} />

                <button className = "button" onClick={ this.handleSignUp }>Sign up</button>  
                <br/>
                <input className = "signUpEmail" input type ="email" value={ this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value})} />
                <input input type="password" value={ this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value})} />

                <button className = "button" onClick={this.handleSignIn}>Sign in</button>     
   
                </div>
        )
    }
}
