import React, { Component } from 'react';
import ProfileService from '../../services/ProfileService';

export default class Profile extends Component {

    constructor() {
        super();

        this.state = {
            person: []
        };
    }

    componentDidMount() {
        this.setState(() => ({ person: ProfileService.getProfile() }));
    }

    render() {
        return (
            <div className="container-fluid" style={{marginLeft: '-15px'}}>
                <div className="d-flex flex-row">                    
                    <div className="col-sm-12">
                        <Profile profile={this.state.person} />
                    </div>
                </div>
            </div>
        );
    }
}