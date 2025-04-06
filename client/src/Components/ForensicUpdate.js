import React, { Component } from 'react';
import Web3 from 'web3';
import ForensicContract from '../contracts/ForensicContract.json';
import ipfs from '../ipfs';
import ViewForensic from './Navbar/ViewForensic';
import Buffer from 'buffer/';

class ForensicUpdate extends Component {
    state = {
        caseId: '',
        exhibit_name: '',
        desc: '',
        timestamp: new Date().toLocaleString(),
        buffer: null,
        ipfsHash: '',
        loading: false,
        web3: null,
        accounts: null,
        contract: null,
        imagePreview: null,
        images: []
    }

    async componentDidMount() {
        try {
            const caseId = this.props.match.params.caseId;
            this.setState({ caseId });

            // Modern Web3 initialization
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    // Request account access
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3.eth.getAccounts();
                    
                    const networkId = await web3.eth.net.getId();
                    const deployedNetwork = ForensicContract.networks[networkId];
                    
                    if (!deployedNetwork) {
                        throw new Error('Contract not deployed to detected network');
                    }

                    const instance = new web3.eth.Contract(
                        ForensicContract.abi,
                        deployedNetwork.address
                    );
                    
                    this.setState({ web3, accounts, contract: instance });
                } catch (error) {
                    throw new Error('User denied account access');
                }
            } else {
                throw new Error('Please install MetaMask!');
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Failed to load Web3, accounts, or contract.");
        }
    }

    captureFile = (event) => {
        event.preventDefault();
        const files = Array.from(event.target.files);
        
        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                return alert("Please select only image files!");
            }
            
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            
            reader.onloadend = () => {
                const buffer = Buffer.from(reader.result);
                this.setState(prevState => ({
                    images: [...prevState.images, { buffer, preview: URL.createObjectURL(file) }]
                }));
            };
        });
    }

    render() {
        if (!this.state.web3) {
            return (
                <div className="container center">
                    <div className="loading-spinner"></div>
                    <p>Loading Web3, accounts, and contract...</p>
                </div>
            );
        }
        
        return (
            <div>
                <ViewForensic crimeId={this.state.caseId} />
                <div className="container">
                    <h4 className="title-styled">Update Forensic Report for Case #{this.state.caseId}</h4>
                    <div className="card">
                        <div className="card-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-field">
                                    <i className="material-icons prefix">label</i>
                                    <input 
                                        type="text" 
                                        id="exhibit_name" 
                                        onChange={this.handleChange}
                                        value={this.state.exhibit_name}
                                    />
                                    <label htmlFor="exhibit_name">Exhibit Name</label>
                                </div>
                                
                                <div className="input-field">
                                    <i className="material-icons prefix">description</i>
                                    <textarea 
                                        id="desc" 
                                        className="materialize-textarea"
                                        onChange={this.handleChange}
                                        value={this.state.desc}
                                    ></textarea>
                                    <label htmlFor="desc">Description</label>
                                </div>

                                <div className="evidence-upload">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        multiple
                                        onChange={this.captureFile} 
                                        style={{ display: 'none' }}
                                        id="evidence-upload"
                                    />
                                    <label htmlFor="evidence-upload">
                                        <i className="material-icons large">add_photo_alternate</i>
                                        <p>Click to upload evidence photos</p>
                                    </label>
                                </div>

                                {this.state.images.length > 0 && (
                                    <div className="evidence-preview-grid">
                                        {this.state.images.map((image, index) => (
                                            <div key={index} className="evidence-preview">
                                                <img src={image.preview} alt={`Evidence ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="btn waves-effect waves-light"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading ? (
                                        <span>Processing... <div className="loading-spinner"></div></span>
                                    ) : (
                                        <span>Submit Report <i className="material-icons right">send</i></span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForensicUpdate;