import React, { useEffect } from 'react';
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
import { loadCurrentOnArtOverview } from '../../../actions/CT/CurrentOnArt/currentOnArtOverviewActions';
import { loadCurrentOnArtByAgeSex } from '../../../actions/CT/CurrentOnArt/currentOnArtByAgeSexActions';
import { loadCurrentOnArtByCounty } from '../../../actions/CT/CurrentOnArt/currentOnArtByCountyActions';
import { loadCurrentOnArtByPartner } from '../../../actions/CT/CurrentOnArt/currentOnArtByPartnerActions';
import { loadCurrentOnArtDistributionByCounty } from '../../../actions/CT/CurrentOnArt/currentOnArtDistributionByCountyActions';
import { loadCurrentOnArtDistributionByPartner } from '../../../actions/CT/CurrentOnArt/currentOnArtDistributionByPartnerActions';

const CurrentOnART = () => {
    const branding = { title: "CURRENT ON ART", description: "OVERVIEW", overview: "Current on ART" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
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
    useEffect(() => {
        dispatch(loadCurrentOnArtOverview());
        dispatch(loadCurrentOnArtByAgeSex());
        dispatch(loadCurrentOnArtByCounty());
        dispatch(loadCurrentOnArtByPartner());
        dispatch(loadCurrentOnArtDistributionByCounty());
        dispatch(loadCurrentOnArtDistributionByPartner());
    }, [
        dispatch,
        counties,
        subCounties,
        facilities,
        partners,
        agencies,
        projects,
        ctTab
    ]);
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <CurrentOnArtOverview />
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
