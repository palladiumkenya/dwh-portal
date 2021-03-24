import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import NewOnArtOverview from './NewOnArtOverview';
import NewOnArtBySex from './NewOnArtBySex';
import NewOnArtByAgeSex from './NewOnArtByAgeSex';
import NewOnArtTrends from './NewOnArtTrends';
import MedianTimeToArtStartByYear from './MedianTimeToArtStartByYear';
import MedianTimeToArtStartByCounty from './MedianTimeToArtStartByCounty';
import MedianTimeToArtStartByPartner from './MedianTimeToArtStartByPartner';
import TimeFromDiagnosisToArtStart from './TimeFromDiagnosisToArtStart';
import NewOnArtHtsPositive from './NewOnArtHtsPositive';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const NewOnArt = () => {
    const branding = { title: "NEWLY STARTED ON ART", description: "OVERVIEW", overview: "Newly Started on ART Information" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txNew') {
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
            <NewOnArtOverview />
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            Newly started on ART =&gt; Number of patients who were started on ART within the previous month
                        </li>
                    </ul>
                </CardBody>
            </Card>
            <Row>
                <Col>
                    <NewOnArtBySex />
                </Col>
                <Col>
                    <NewOnArtByAgeSex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <NewOnArtTrends />
            <SectionFooter overview={branding.overview}/>
            <MedianTimeToArtStartByYear />
            <SectionFooter overview={branding.overview}/>
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>
                            MEDIAN TIME TO ART START BY COUNTY / PARTNER =&gt; This indicator is computed and displayed for those who started ART in the last 12 months.
                        </li>
                    </ul>
                </CardBody>
            </Card>
            <MedianTimeToArtStartByCounty />
            <SectionFooter overview={branding.overview}/>
            <MedianTimeToArtStartByPartner />
            <SectionFooter overview={branding.overview}/>
            <TimeFromDiagnosisToArtStart />
            <SectionFooter overview={branding.overview}/>
            <NewOnArtHtsPositive />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default NewOnArt;
