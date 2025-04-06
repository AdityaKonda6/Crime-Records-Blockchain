import React from 'react';
import { Link } from 'react-router-dom';

const ViewCaseNav = (props) => {
    const { crimeId } = props;
    return (
        <nav className="nav-wrapper grey darken-4 navbar">
            <div className="container">
                <b><Link to="/" className="brand-logo">Crime Records Management </Link></b>
                <ul className="right">
                    <li><Link to={`/viewcase/${crimeId}`}>FIR Details</Link></li>
                    <li><Link to={`/crimedata/forensics/${crimeId}`}>Forensic Reports</Link></li>
                    <li><Link to={`/other-reports/${crimeId}`}>Other Reports</Link></li>
                    <li><Link to={`/crime-scene-photos/${crimeId}`}>Crime Scene Photographs</Link></li>
                </ul>
            </div> 
        </nav>
    );
}

export default ViewCaseNav;