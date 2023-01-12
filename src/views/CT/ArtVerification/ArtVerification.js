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

const ArtVerificationOverview = Loadable({
    loader: () => import('./ArtVerificationOverview'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationSurveySubmissionByPartner = Loadable({
    loader: () => import('./ArtVerificationSurveySubmissionByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationReasonsUnverified = Loadable({
    loader: () => import('./ArtVerificationReasonsUnverified'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationSurveySubmissionByCounty = Loadable({
    loader: () => import('./ArtVerificationSurveySubmissionByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationByCounty = Loadable({
    loader: () => import('./ArtVerificationByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationStatus = Loadable({
    loader: () => import('./ArtVerificationStatus'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationByPartner = Loadable({
    loader: () => import('./ArtVerificationByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationPendingSurveysByPartner = Loadable({
    loader: () => import('./ArtVerificationPendingSurveysByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationPendingSurveysByCounty = Loadable({
    loader: () => import('./ArtVerificationPendingSurveysByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const ArtVerificationSurveySubmission = Loadable({
    loader: () => import('./ArtVerificationSurveySubmission'),
    loading: Loading,
    delay: LOADING_DELAY,
});

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
            <SectionFooter overview={branding.overview} />
            <ArtVerificationByPartner />
            <SectionFooter overview={branding.overview} />
            <ArtVerificationPendingSurveysByPartner />
            <SectionFooter overview={branding.overview} />
            <ArtVerificationPendingSurveysByCounty />
            <SectionFooter overview={branding.overview} />
            <ArtVerificationReasonsUnverified />
            <SectionFooter overview={branding.overview} />
            <ArtVerificationSurveySubmissionByCounty />
            <SectionFooter overview={branding.overview} />
            <ArtVerificationSurveySubmissionByPartner />
            <SectionFooter overview={branding.overview} />
        </div>
    );
};

export default ArtVerification;
