import React, { Component } from 'react';
import ViewCaseNav from './Navbar/ViewCaseNav.js'
import CrimeScenePhotographs from './CrimeScenePhotographs';
import Web3 from 'web3';
import SimpleStorageContract from "../contracts/SimpleStorage.json";

class ViewCase extends Component {
    state = {
        caseDetails: null,
        loading: true,
        error: null
    }

    componentDidMount = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            
            if (!deployedNetwork) {
                throw new Error('Contract not deployed to detected network');
            }

            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork.address
            );

            // Get total crime count
            const crimeCount = await instance.methods.getCrimeCount().call();
            const crimeId = this.props.match.params.caseId;
            let foundCrime = null;

            // Search for the crime with matching ID
            for (let i = 0; i < crimeCount; i++) {
                const crime = await instance.methods.getCrimeBlock(i).call();
                if (crime[0] === crimeId) {
                    foundCrime = crime;
                    break;
                }
            }

            if (!foundCrime) {
                throw new Error(`Case #${crimeId} not found`);
            }

            this.setState({
                caseDetails: {
                    id: foundCrime[0],
                    offenseCode: foundCrime[1],
                    description: foundCrime[2],
                    timestamp: foundCrime[3]
                },
                loading: false
            });
        } catch (error) {
            console.error("Error loading case details:", error);
            this.setState({ 
                error: error.message || "Failed to load case details. Please try again later.", 
                loading: false 
            });
        }
    }

    render() {
        const { loading, error, caseDetails } = this.state;

        if (loading) {
            return (
                <div className="container center-align" style={{marginTop: '50px'}}>
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="container">
                    <div className="card-panel red lighten-4 red-text text-darken-4">
                        <i className="material-icons left">error</i>
                        {error}
                    </div>
                </div>
            );
        }

        if (!caseDetails) {
            return (
                <div className="container">
                    <div className="card-panel yellow lighten-4 brown-text">
                        <i className="material-icons left">warning</i>
                        No case details found.
                    </div>
                </div>
            );
        }

        return (
            <div>
                <ViewCaseNav crimeId={this.props.match.params.caseId} />
                <div className="container">
                    <div className="card case-details-card">
                        <div className="card-content">
                            <span className="card-title">Case Details #{caseDetails.id}</span>
                            <div className="row">
                                <div className="col s12 m6">
                                    <p><strong>Offense Code:</strong> {caseDetails.offenseCode}</p>
                                    <p><strong>Timestamp:</strong> {caseDetails.timestamp}</p>
                                </div>
                                <div className="col s12">
                                    <p><strong>Description:</strong></p>
                                    <p className="description-text">{caseDetails.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <h5>Crime Scene Evidence</h5>
                        <CrimeScenePhotographs caseId={caseDetails.id} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewCase;