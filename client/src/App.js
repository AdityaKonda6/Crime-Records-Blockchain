import './CSS/theme.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import your components
import Home from './Components/Home';
import PoliceHome from './Components/PoliceHome';
import NewFIR from './Components/NewFIR';
import ViewCase from './Components/ViewCase';
import ForensicsHome from './Components/ForensicHome';
import Forensics from './Components/CrimeDetails/Forensics';
import ForensicUpdate from './Components/ForensicUpdate';
import OtherReports from './Components/OtherReports';
import CrimeScenePhotos from './Components/CrimeScenePhotos';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/police" component={PoliceHome} />
            <Route path="/newfir" component={NewFIR} />
            <Route path="/viewcase/:caseId" component={ViewCase} />
            <Route path="/forensichome" component={ForensicsHome} />
            <Route path="/crimedata/forensics/:caseId" component={Forensics} />
            <Route path="/forensicUpdate/:caseId" component={ForensicUpdate} />
            <Route exact path="/other-reports/:caseId" component={OtherReports} />
            <Route exact path="/crime-scene-photos/:caseId" component={CrimeScenePhotos} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
