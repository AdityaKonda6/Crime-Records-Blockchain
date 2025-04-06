import React, { Component } from 'react';
import ViewCaseNav from './Navbar/ViewCaseNav';
import '../CSS/crimeScenePhotographs.css';

class CrimeScenePhotos extends Component {
    render() {
        const caseId = this.props.match.params.caseId;
        
        return (
            <div>
                <ViewCaseNav crimeId={caseId} />
                <div className="container">
                    <h4 className="title-styled">Crime Scene Photographs</h4>
                    <div className="row">
                        <div className="gallery">
                            <div className="card">
                                <div className="card-image">
                                    <img src="https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492108507/articles/2016/10/31/detective-exposed-corruption-then-was-fired-for-eating-candy-at-a-crime-scene/16106-weill-crime-scene-candy-tease_kfquri" alt="Crime Scene 1" />
                                    <span className="card-title">Evidence - 1 : Crime Scene</span>
                                </div>
                            </div>
                        </div>
                        <div className="gallery">
                            <div className="card">
                                <div className="card-image">
                                    <img src="https://res.cloudinary.com/duaooyuju/image/upload/v1743929811/download_ifdr3r.jpg" alt="Weapon" style={{width: '100%', height: 'auto'}} />
                                    <span className="card-title">Exhibit - 1 : Potential Murder Weapon</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CrimeScenePhotos;