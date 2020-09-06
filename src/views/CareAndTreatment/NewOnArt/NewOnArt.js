import React from 'react';
import HtsUptakeFilter from './../../Shared/HtsUptakeFilter';
import NewOnArtHeader from './NewOnArtHeader';
import NewOnArtFooter from './NewOnArtFooter';
import NewOnArtByMonth from './NewOnArtByMonth';
import NewOnArtByAgeSex from './NewOnArtByAgeSex';
import MedianTimeToArtStart from './MedianTimeToArtStart';
import TimeFromDiagnosisToStart from './TimeFromDiagnosisToStart';
import FacilitiesNewOnArtList from './FacilitiesNewOnArtList';

const NewOnArt = ({ period }) => {
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <NewOnArtHeader></NewOnArtHeader>
            <HtsUptakeFilter>&nbsp;</HtsUptakeFilter>
            <p></p><NewOnArtByMonth/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><NewOnArtByAgeSex/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStart/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TimeFromDiagnosisToStart/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><FacilitiesNewOnArtList/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default NewOnArt;
