import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import SimpleStorageContract from "../contracts/SimpleStorage.json";  // Fixed import
import getWeb3 from "../utils/getWeb3";

class CaseList extends Component {
    state = {
        details: [],
        web3: null,
        contract: null,
        loading: true,
        error: null
    }

    componentDidMount = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = SimpleStorageContract.networks[networkId];  // Updated reference
                
                if (!deployedNetwork) {
                    throw new Error('Contract not deployed to detected network');
                }

                const instance = new web3.eth.Contract(
                    SimpleStorageContract.abi,  // Updated reference
                    deployedNetwork.address
                );

                this.setState({ web3, contract: instance });
                
                // Get crime count first
                const crimeCount = await instance.methods.getCrimeCount().call();
                const crimes = [];

                // Fetch each crime detail
                for (let i = 0; i < crimeCount; i++) {
                    const crime = await instance.methods.getCrimeBlock(i).call();
                    crimes.push({
                        id: crime[0],
                        offenseCode: crime[1],
                        description: crime[2],
                        timestamp: crime[3]
                    });
                }

                this.setState({ details: crimes, loading: false });
            } else {
                throw new Error('Please install MetaMask!');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to load Web3, accounts, or contract.");
        }
    };

    render() {
        if (this.state.loading) {
            return <div className="center">Loading...</div>;
        }

        if (this.state.error) {
            return <div className="center red-text">{this.state.error}</div>;
        }

        const crimeList = this.state.details.map(crime => (
            <div className="card blue-grey lighten-5" key={crime.id}>
                <div className="row">
                    <div className="col s3">
                        <p>{crime.id}</p>
                    </div>
                    <div className="col s3">
                        <p>{crime.offenseCode}</p>
                    </div>
                    <div className="col s3">
                        <p>{crime.description}</p>
                    </div>
                    <div className="col s3">
                        <p>{crime.timestamp}</p>
                    </div>
                </div>
                <div className="card-action">
                    <Link to={'/viewcase/' + crime.id}>View Case</Link>
                </div>
            </div>
        ));

        return (
            <div className="crime-list">
                {crimeList.length > 0 ? crimeList : <p className="center">No cases found</p>}
            </div>
        );
    }
}

export default CaseList;