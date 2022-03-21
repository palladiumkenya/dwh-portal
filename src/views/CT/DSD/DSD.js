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
import { useParams } from 'react-router-dom';

const AppointmentDurationByAge  = Loadable({ loader: () => import('./AppointmentDurationByAge'), loading: Loading, delay: LOADING_DELAY });
const AppointmentDurationBySex  = Loadable({ loader: () => import('./AppointmentDurationBySex'), loading: Loading, delay: LOADING_DELAY });
const AppointmentDurationByStability  = Loadable({ loader: () => import('./AppointmentDurationByStability'), loading: Loading, delay: LOADING_DELAY });
const AppointmentDurationStableByCounty  = Loadable({ loader: () => import('./AppointmentDurationStableByCounty'), loading: Loading, delay: LOADING_DELAY });
const AppointmentDurationStableByPartner  = Loadable({ loader: () => import('./AppointmentDurationStableByPartner'), loading: Loading, delay: LOADING_DELAY });
const DistributionMMDStable  = Loadable({ loader: () => import('./DistributionMMDStable'), loading: Loading, delay: LOADING_DELAY });
const DistributionStableAgeSex  = Loadable({ loader: () => import('./DistributionStableAgeSex'), loading: Loading, delay: LOADING_DELAY });
const DistributionStableByCounty  = Loadable({ loader: () => import('./DistributionStableByCounty'), loading: Loading, delay: LOADING_DELAY });
const DistributionStableByPartner  = Loadable({ loader: () => import('./DistributionStableByPartner'), loading: Loading, delay: LOADING_DELAY });
const DistributionUnstable  = Loadable({ loader: () => import('./DistributionUnstable'), loading: Loading, delay: LOADING_DELAY });
const DSDCascade  = Loadable({ loader: () => import('./DSDCascade'), loading: Loading, delay: LOADING_DELAY });
const DSDIndicatorDefinition  = Loadable({ loader: () => import('./DSDIndicatorDefinition'), loading: Loading, delay: LOADING_DELAY });
const DSDOverview  = Loadable({ loader: () => import('./DSDOverview'), loading: Loading, delay: LOADING_DELAY });

const DSD = () => {
    const branding = { title: "DIFFERENTIATED SERVICE DELIVERY", description: "OVERVIEW", overview: "Differenciated Service Delivery" };
    const { active_tab } = useParams();
    const ctTab = active_tab
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'dsd') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <DSDIndicatorDefinition />
            <SectionFooter overview={branding.overview}/>
            <DSDOverview />
            <Row className={"col-12"}>
                <Col className={"col-6"}>
                    <DSDCascade />
                </Col>
                <Col className={"col-6"}>
                    <DistributionMMDStable />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row className={"col-12"}>
                <Col className={"col-6"}>
                    <AppointmentDurationByStability />
                </Col>
                <Col className={"col-6"}>
                    <AppointmentDurationBySex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <AppointmentDurationStableByCounty />
            <SectionFooter overview={branding.overview}/>
            <AppointmentDurationStableByPartner />
            <SectionFooter overview={branding.overview}/>
            <AppointmentDurationByAge />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col>
                    <DistributionStableAgeSex />
                </Col>
                <Col>
                    <DistributionUnstable />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <DistributionStableByCounty />
            <SectionFooter overview={branding.overview}/>
            <DistributionStableByPartner />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default DSD;
