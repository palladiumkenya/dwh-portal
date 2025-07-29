import React from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Col, Row } from 'reactstrap';
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

const CD4Testing = Loadable({
    loader: () => import('./CD4Testing'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const AHDScreening = Loadable({
    loader: () => import('./AHDScreening'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const TBScreeningAndManagement = Loadable({
    loader: () => import('./TBScreeningAndManagement'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const CryptococcalMeningitis = Loadable({
    loader: () => import('./CryptococcalMeningitis'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const AHDNutritionAssessment = Loadable({
    loader: () => import('./AHDNutritionAssessment'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const AHDOutcomes = Loadable({
    loader: () => import('./AHDOutcomes'),
    loading: Loading,
    delay: LOADING_DELAY,
});

const ArtVerification = () => {
    const branding = {
        title: 'AHD',
        description: 'OVERVIEW',
        overview: 'AHD',
    };
    const { active_tab } = useParams();
    const ctTab = active_tab;
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'ahd') {
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

            <AHDScreening />
            <SectionFooter overview={branding.overview} />
            <CD4Testing />
            <SectionFooter overview={branding.overview} />
            <TBScreeningAndManagement />
            <SectionFooter overview={branding.overview} />
            <CryptococcalMeningitis />
            <SectionFooter overview={branding.overview} />
            <AHDNutritionAssessment />
            <SectionFooter overview={branding.overview} />
            <AHDOutcomes />
            <SectionFooter overview={branding.overview} />
        </div>
    );
};

export default ArtVerification;
