import React, { Component } from 'react';
import ViewCaseNav from './Navbar/ViewCaseNav';

class OtherReports extends Component {
    render() {
        const caseId = this.props.match.params.caseId;
        
        return (
            <div>
                <ViewCaseNav crimeId={caseId} />
                <div className="container">
                    <h4 className="title-styled">Additional Case Reports</h4>
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Witness Statement</span>
                                    <p><strong>Date:</strong> 2023-12-01</p>
                                    <p><strong>Details:</strong> Statement from primary witness</p>
                                    <p><strong>Officer:</strong> John Smith</p>
                                </div>
                            </div>
                        </div>
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Investigation Update</span>
                                    <p><strong>Date:</strong> 2023-12-02</p>
                                    <p><strong>Details:</strong> Follow-up investigation report</p>
                                    <p><strong>Officer:</strong> Sarah Johnson</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherReports;