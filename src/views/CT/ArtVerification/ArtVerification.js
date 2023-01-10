import React from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {
    enableStickyFilter,
    disableStickyFilter,
} from '../../../actions/Shared/uiActions';
import { LOADING_DELAY } from '../../../constants';
import Loading from './../../Shared/Loading';
import SectionFooter from './../../Shared/SectionFooter';
import SectionHeader from './../../Shared/SectionHeader';
import UniversalFilter from './../../Shared/UniversalFilter';
import { useParams } from 'react-router-dom';

import ArtVerificationOverview from './ArtVerificationOverview';
import ArtVerificationSurveySubmission from './ArtVerificationSurveySubmission';
import ArtVerificationStatus from './ArtVerificationStatus';
import ArtVerificationByCounty from './ArtVerificationByCounty';
import ArtVerificationByPartner from './ArtVerificationByPartner';


// const CurrentOnArtVerifiedByCounty = Loadable({
//     loader: () => import('./CurrentOnArtVerifiedByCounty'),
//     loading: Loading,
//     delay: LOADING_DELAY,
// });
// const CurrentOnArtVerifiedByPartner = Loadable({
//     loader: () => import('./CurrentOnArtVerifiedByPartner'),
//     loading: Loading,
//     delay: LOADING_DELAY,
// });
// const CurrentOnArtByFacility = Loadable({
//     loader: () => import('./CurrentOnArtByFacility'),
//     loading: Loading,
//     delay: LOADING_DELAY,
// });

const ArtVerification = () => {
    const branding = {
        title: 'ART VERIFICATION',
        description: 'OVERVIEW',
        overview: 'ART Verification',
    };
    const { active_tab } = useParams();
    const ctTab = active_tab;
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'currentOnArt') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <SectionHeader
                title={branding.title}
                description={`Year ${moment().format('YYYY')}`}
            />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>

            <ArtVerificationOverview />
            <SectionFooter overview={branding.overview} />
            <Row>
                <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <ArtVerificationStatus />
                </Col>
                <Col
                    className={
                        'col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  col-xl-6'
                    }
                >
                    <ArtVerificationSurveySubmission />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview} />
            <ArtVerificationByCounty />
            {/* <CurrentOnArtVerifiedByCounty /> */}
            <SectionFooter overview={branding.overview} />
            <ArtVerificationByPartner />
            <SectionFooter overview={branding.overview} />
            {/* <CurrentOnArtByFacility /> */}
            <SectionFooter overview={branding.overview} />
        </div>
    );
};

export default ArtVerification;
