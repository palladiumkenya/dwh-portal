import React from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {
    enableStickyFilter,
    disableStickyFilter,
} from '../../../actions/Shared/uiActions';
import { LOADING_DELAY } from '../../../constants';
import Loading from './../../Shared/Loading';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from './../../Shared/UniversalFilter';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const MedianTimeToArtStartByCounty = Loadable({
    loader: () => import('./MedianTimeToArtStartByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MedianTimeToArtStartByPartner = Loadable({
    loader: () => import('./MedianTimeToArtStartByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MedianTimeToArtStartByYear = Loadable({
    loader: () => import('./MedianTimeToArtStartByYear'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const NewOnArtByAgeSex = Loadable({
    loader: () => import('./NewOnArtByAgeSex'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const NewOnArtBySex = Loadable({
    loader: () => import('./NewOnArtBySex'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const NewOnArtHtsPositive = Loadable({
    loader: () => import('./NewOnArtHtsPositive'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const NewOnArtOverview = Loadable({
    loader: () => import('./NewOnArtOverview'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const NewOnArtTrends = Loadable({
    loader: () => import('./NewOnArtTrends'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const TimeFromDiagnosisToArtStart = Loadable({
    loader: () => import('./TimeFromDiagnosisToArtStart'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MissingDiagnosisDateByFacility = Loadable({
    loader: () => import('./MissingDiagnosisDateByFacility'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const AdultRegimenUptakeTrends = Loadable({
    loader: () => import('../ArtOptimization/AdultRegimenUptakeTrends'),
    loading: Loading,
    delay: LOADING_DELAY,
});

const NewOnArt = () => {
    const branding = {
        title: 'NEWLY STARTED ON ART',
        description: 'OVERVIEW',
        overview: 'Newly Started on ART Information',
    };
    const { active_tab } = useParams();
    const ctTab = active_tab;
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'newlyOnArt') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter />
            </VisibilitySensor>
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            Newly started on ART =&gt; Number of patients who
                            were started on ART within the month of{' '}
                            {moment()
                                .subtract(2, 'month')
                                .add(16, 'days')
                                .format('MMMM YYYY')}
                        </li>
                    </ul>
                </CardBody>
            </Card>
            <NewOnArtOverview />
            <Row>
                <Col>
                    <NewOnArtBySex />
                </Col>
                <Col>
                    <NewOnArtByAgeSex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview} />
            <NewOnArtTrends />
            <SectionFooter overview={branding.overview} />
            <MedianTimeToArtStartByYear />
            <SectionFooter overview={branding.overview} />
            <AdultRegimenUptakeTrends />
            <SectionFooter overview={branding.overview} />
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            MEDIAN TIME TO ART START BY COUNTY / PARTNER =&gt;
                            This indicator is computed and displayed for those
                            who started ART in the last 12 months.
                        </li>
                    </ul>
                </CardBody>
            </Card>
            <MedianTimeToArtStartByCounty />
            <SectionFooter overview={branding.overview} />
            <MedianTimeToArtStartByPartner />
            <SectionFooter overview={branding.overview} />
            <TimeFromDiagnosisToArtStart />
            <SectionFooter overview={branding.overview} />
            <NewOnArtHtsPositive />
            <SectionFooter overview={branding.overview} />
            <MissingDiagnosisDateByFacility />
            <SectionFooter overview={branding.overview} />
        </div>
    );
};

export default NewOnArt;
