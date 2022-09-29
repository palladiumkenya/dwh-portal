import React from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { LOADING_DELAY } from "../../../constants";
import Loading from './../../Shared/Loading';
import SectionFooter from './../../Shared/SectionFooter';
import SectionHeader from './../../Shared/SectionHeader';
import UniversalFilter from './../../Shared/UniversalFilter';
import { useParams } from 'react-router-dom';

const CurrentOnArtByAgeSex  = Loadable({ loader: () => import('./CurrentOnArtByAgeSex'), loading: Loading, delay: LOADING_DELAY });
const CurrentOnArtVerifiedByAgeSex = Loadable({
    loader: () => import('./CurrentOnArtVerifiedByAgeSex'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const CurrentOnArtByCounty  = Loadable({ loader: () => import('./CurrentOnArtByCounty'), loading: Loading, delay: LOADING_DELAY });
const CurrentOnArtVerifiedByCounty = Loadable({
    loader: () => import('./CurrentOnArtVerifiedByCounty'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const CurrentOnArtByPartner  = Loadable({ loader: () => import('./CurrentOnArtByPartner'), loading: Loading, delay: LOADING_DELAY });
const CurrentOnArtVerifiedByPartner = Loadable({
    loader: () => import('./CurrentOnArtVerifiedByPartner'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const CurrentOnArtBySex  = Loadable({ loader: () => import('./CurrentOnArtBySex'), loading: Loading, delay: LOADING_DELAY });
const CurrentOnArtOverview  = Loadable({ loader: () => import('./CurrentOnArtOverview'), loading: Loading, delay: LOADING_DELAY });

const CurrentOnART = () => {
    const branding = { title: "CURRENT ON ART", description: "OVERVIEW", overview: "Current on ART" };
    const { active_tab } = useParams();
    const ctTab = active_tab
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === "currentOnArt") {
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
                            Current on ART =&gt; Number of adults and children
                            currently receiving ART including those who have
                            missed their appointment and 30 days have not passed
                            since the last missed appointment.
                        </li>
                        <em>Indicator notes:</em>
                        <li>
                            This indicator is computed and displayed for the
                            last completed month.
                        </li>
                        <li>
                            Patients who have a visit date but do not have a
                            next appointment date have 30 days added to their
                            visit date to impute the expected appointment date.
                        </li>
                        <li>
                            This indicator is influenced by reporting rate (if a
                            facility uploaded data to the data warehouse) and if
                            uploaded database contains <b>current</b> patient
                            visit and appointment data.
                        </li>
                    </ul>
                </CardBody>
            </Card>
            <CurrentOnArtOverview />
            <Row>
                <Col>
                    <CurrentOnArtBySex />
                </Col>
                <Col>
                    <CurrentOnArtByAgeSex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview} />
            <CurrentOnArtByCounty />
            <SectionFooter overview={branding.overview} />
            <CurrentOnArtByPartner />
            <SectionFooter overview={branding.overview} />
            <CurrentOnArtVerifiedByAgeSex />
            <SectionFooter overview={branding.overview} />
            <CurrentOnArtVerifiedByCounty />
            <SectionFooter overview={branding.overview} />
            <CurrentOnArtVerifiedByPartner />
            <SectionFooter overview={branding.overview} />
        </div>
    );
};

export default CurrentOnART;
