import React, { Component } from 'react';
import knife from '../../Images/knife.jpg';
import '../../CSS/forensics.css';

class Forensics extends Component 
{
    state = {
        report: [
            {
                exhibitId: 101,
                name: "Knife",
                description: "A 3 and a quarter inch wooden hilt dagger.",
                imageURL: "/Images/knife.jpg"
            }
        ]
    }
    
    render() {
        // Using caseId from props
        const caseId = this.props.match.params.caseId;
        
        return(
            <div className="container signInCard center">
                <div className="card setCardWidth">
                    <div className="card-image">
                        <img src={knife} alt="Evidence" className="cardImageHeight"/>
                    </div>
                    <div className="signInContainer card-content">
                        <h4 className="grey-text card-title">Forensic Report</h4>
                        <p>Case ID: {caseId}</p>
                        <p>Exhibit ID: {this.state.report[0].exhibitId}</p>
                        <p>Name: {this.state.report[0].name}</p>
                        <p>Description: {this.state.report[0].description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forensics;