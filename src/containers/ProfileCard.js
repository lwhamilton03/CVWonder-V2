import React from 'react';
import PropTypes from 'prop-types';
import NavBarFeatures from '.\containers\NavBarFeatures';

const ProfileCard = (props) => (
    <div className="profile-card">
        <div className="profile-card card">
            <img className="card-img-top" src={props.movie.imageUrl} alt="" />
            <div className="card-body">
                <h4 className="card-title">{props.movie.title}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{props.movie.subtitle}</h6>
                <p className="text-justify" style={{fontSize: '14px'}}>{props.movie.description}</p>
            </div>
            <div className="card-footer">
                
            </div>
        </div>
    </div>
);

ProfileCard.defaultProps = {
    profile: {}
};

ProfileCard.propTypes = {
    profile: PropTypes.object
};

export default ProfileCard;