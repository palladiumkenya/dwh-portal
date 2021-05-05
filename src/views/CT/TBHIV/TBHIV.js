import React from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { LOADING_DELAY } from "../../../constants";
import Loading from './../../Shared/Loading';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from './../../Shared/UniversalFilter';

const HIVNegativeTB = Loadable({ loader: () => import('./HIVNegativeTB'), loading: Loading, delay: LOADING_DELAY });
const HIVTBCoinfected = Loadable({ loader: () => import('./HIVTBCoinfected'), loading: Loading, delay: LOADING_DELAY });
const IPTCompletionByAge = Loadable({ loader: () => import('./IPTCompletionByAge'), loading: Loading, delay: LOADING_DELAY });
const IPTUptake = Loadable({ loader: () => import('./IPTUptake'), loading: Loading, delay: LOADING_DELAY });
const TBActiveCaseFindingAdults = Loadable({ loader: () => import('./TBActiveCaseFindingAdults'), loading: Loading, delay: LOADING_DELAY });
const TBActiveCaseFindingChildren = Loadable({ loader: () => import('./TBActiveCaseFindingChildren'), loading: Loading, delay: LOADING_DELAY });
const TBStatTrends = Loadable({ loader: () => import('./TBStatTrends'), loading: Loading, delay: LOADING_DELAY });

const TBHIV = () => {
    const branding = { title: "TB/HIV - UPTAKE AND OUTCOMES", description: "OVERVIEW", overview: "TB/HIV - Uptake and Outcomes" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'tbHiv') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <h3 style={{color: '#ff0000', textAlign: 'center', padding: '1em'}}>Please note that the data on this page is dummy data</h3>
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <TBStatTrends />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col>
                    <TBActiveCaseFindingAdults />
                </Col>
                <Col>
                    <TBActiveCaseFindingChildren />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col>
                    <HIVNegativeTB />
                </Col>
                <Col>
                    <HIVTBCoinfected />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={4}>
                    <IPTUptake />
                </Col>
                <Col sm={8}>
                    <IPTCompletionByAge />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default TBHIV;
