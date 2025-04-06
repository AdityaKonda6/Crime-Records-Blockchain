import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        username: '',
        password: '',
        redirect: false,
        redirectTo: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // Using === instead of == for proper comparison
        if(this.state.username === "police" && this.state.password === "police"){
            this.setState({ redirect: true, redirectTo: "/police" });
        } else if(this.state.username === "forensic" && this.state.password === "forensic"){
            this.setState({ redirect: true, redirectTo: "/forensichome" });
        } else {
            alert("Invalid credentials");
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirectTo} />
        }
        
        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h3>Crime Records Management</h3>
                        <p>Secure Blockchain-based System</p>
                    </div>
                    <form onSubmit={this.handleSubmit} className="login-form">
                        <div className="input-field">
                            <i className="material-icons prefix">person</i>
                            <input type="text" id="username" onChange={this.handleChange} required />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">lock</i>
                            <input type="password" id="password" onChange={this.handleChange} required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field center">
                            <button className="btn waves-effect waves-light blue darken-2">
                                Login <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;