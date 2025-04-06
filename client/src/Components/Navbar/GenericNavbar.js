import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class GenericNavbar extends Component{
    render() 
    {
        return(
            <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Crime Records Management </Link></b>
                <ul className = "right">
                    <li><Link to="/police">Home</Link></li>
                    <li><Link to="/">Log out</Link></li>
                </ul>
            </div>
        </nav>
        )
    }
}

export default GenericNavbar;