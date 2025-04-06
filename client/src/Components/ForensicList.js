import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Removed unused ViewCase import
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

class ForensicList extends Component{
    state = {
        details : [],
        getDetailsOf: null
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            // We don't use accounts in this component, so we can remove this line
            // const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state
            this.setState({ web3, contract: instance });
            
            // Get all crime details
            const response = await this.state.contract.methods.getAllCrimes().call();
            this.setState({ details: response });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render(){
        const crimeList = this.state.details.map(crime => {
            return (
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
                        <Link to={'/forensicUpdate/' + crime.id}>Update Forensic Report</Link>
                    </div>
                </div>
            )
        });

        return (
            <div>
                {crimeList}
            </div>
        )
    }
}

export default ForensicList;