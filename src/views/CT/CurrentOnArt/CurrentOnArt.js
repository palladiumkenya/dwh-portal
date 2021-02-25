import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import CurrentOnArtOverview from './CurrentOnArtOverview';
import CurrentOnArtByAgeSex from './CurrentOnArtByAgeSex';
import CurrentOnArtBySex from './CurrentOnArtBySex';
import CurrentOnArtDistributionByCounty from './CurrentOnArtDistributionByCounty';
import CurrentOnArtDistributionByPartner from './CurrentOnArtDistributionByPartner';
import CurrentOnArtByCounty from './CurrentOnArtByCounty';
import CurrentOnArtByPartner from './CurrentOnArtByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const CurrentOnART = () => {
    const branding = { title: "CURRENT ON ART", description: "OVERVIEW", overview: "Current on ART" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txCurr') {
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
            <Row>
                <Col>
                    <CurrentOnArtBySex />
                </Col>
                <Col>
                    <CurrentOnArtByAgeSex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <CurrentOnArtByCounty />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnArtByPartner />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnArtDistributionByCounty />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnArtDistributionByPartner />
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default CurrentOnART;
