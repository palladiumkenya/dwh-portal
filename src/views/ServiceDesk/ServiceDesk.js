import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Loadable from 'react-loadable';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';


import { changeSdTab, changeCurrentPage } from '../../actions/Shared/uiActions';
import {
    enableFromDateFilter,
    disableFromDateFilter,
    enableToDateFilter,
    disableToDateFilter,
    enableGenderFilter,
    disableGenderFilter,
    enableDatimAgeGroupFilter,
    disableDatimAgeGroupFilter,
    enableLatestPregnancyFilter,
    disableLatestPregnancyFilter,
    enablePopulationTypeFilter,
    disablePopulationTypeFilter,
    enableAgencyFilter,
    enableDatimAgePopulationFilter,
    disableDatimAgePopulationFilter,
    disableAgencyFilter,

} from '../../actions/Shared/filterActions';

import { SD_TABS, PAGES, LOADING_DELAY } from '../../constants';
import Loading from '../Shared/Loading';

import { useHistory, useParams } from 'react-router-dom';
import Service_Desk from './ServiceDesk/ServiceDesk';

import { loadServiceDeskOpenByCounty } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskOpenByCountyActions';
import { loadServiceDeskOpenByPartner } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskOpenByPartnerActions';
import { loadServiceDeskOpenByProduct } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskOpenByProductActions';
import { loadServiceDeskOpenByMonth } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskOpenByMonthActions';
import { loadServiceDeskStatusByMonth } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskStatusByMonthActions';
import { loadServiceDeskStatusByProduct } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskStatusByProductActions';
import { loadServiceDeskOverview } from './../../actions/Operational&HIS/ServiceDesk/serviceDeskOverviewActions';
import { loadServiceDeskPartnerLevel } from '../../actions/Operational&HIS/ServiceDesk/serviceDeskPartnerLevelActions';

const ServiceDesk = () => {
    const dispatch = useDispatch();

    const noCache = useSelector((state) => state.filters.noCache);
    const counties = useSelector((state) => state.filters.counties);
    const subCounties = useSelector((state) => state.filters.subCounties);
    const facilities = useSelector((state) => state.filters.facilities);
    const partners = useSelector((state) => state.filters.partners);
    const agencies = useSelector((state) => state.filters.agencies);
    const projects = useSelector((state) => state.filters.projects);
    const genders = useSelector((state) => state.filters.genders);
    const datimAgeGroups = useSelector((state) => state.filters.datimAgeGroups);
    const datimAgePopulation = useSelector(
        (state) => state.filters.datimAgePopulation
    );
    const latestPregnancies = useSelector(
        (state) => state.filters.latestPregnancies
    );
    const populationTypes = useSelector(
        (state) => state.filters.populationTypes
    );
    const fromDate = useSelector((state) => state.filters.fromDate);
    const toDate = useSelector((state) => state.filters.toDate);

    const DEFAULT_ACTIVE_TAB = 'serviceDesk';
    const { active_tab } = useParams();
    const history = useHistory();
    console.log(DEFAULT_ACTIVE_TAB);

    const renderTabNavItems = () => {
        return Object.keys(SD_TABS).map((value) => {
            return (
                <NavItem key={value}>
                    <NavLink
                        active={active_tab === value}
                        onClick={() => {
                            dispatch(changeSdTab(active_tab));
                            toggle(value);
                        }}
                    >
                        <div style={{ fontSize: '.78em' }}>
                            {SD_TABS[value]}
                        </div>
                    </NavLink>
                </NavItem>
            );
        });
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.sd));
        dispatch(enableFromDateFilter());
        return () => {
            dispatch(enableFromDateFilter());
            dispatch(disableGenderFilter());
            dispatch(disableAgencyFilter());
            dispatch(disableDatimAgeGroupFilter());
        };
    }, [dispatch]);

    useEffect(() => {}, [dispatch, active_tab]);

    useEffect(() => {
        dispatch(loadServiceDeskOpenByCounty());
        dispatch(loadServiceDeskOpenByPartner());
        dispatch(loadServiceDeskOpenByProduct());
        dispatch(loadServiceDeskOpenByMonth());
        dispatch(loadServiceDeskStatusByMonth());
        dispatch(loadServiceDeskStatusByProduct());
        dispatch(loadServiceDeskOverview());
        dispatch(loadServiceDeskPartnerLevel());
        switch (active_tab) {
            case 'serviceDesk':
                break;
            case 'sdp':
                break;
            default:
                break;
        }
    }, [
        dispatch,
        counties,
        subCounties,
        facilities,
        partners,
        agencies,
        projects,
        fromDate,
        toDate,
        genders,
        datimAgeGroups,
        datimAgePopulation,
        latestPregnancies,
        populationTypes,
        active_tab,
        noCache,
    ]);

    useEffect(() => {
        if (!active_tab) {
            history.push(`/service-desk/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

    if (!active_tab) {
        history.push(`/service-desk/${DEFAULT_ACTIVE_TAB}`);
    }

    const toggle = (tab) => {
        if (active_tab !== tab) {
            history.push(`/service-desk/${tab}`);
        }
    };
    
    // return (
    //     <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    //     <iframe
    //         title="Report Section"
    //         width="1240"
    //         height="741.25"
    //         src="https://app.powerbi.com/view?r=eyJrIjoiZDM0OGU1NmItZjgzNC00MDVlLThhYzctMTJkNGY0OWE3ZGY1IiwidCI6IjFmZmI3MTkzLTMyNjItNGYzNS04ZjczLWE1NWFmMTAxNDAxNyJ9"
    //         frameborder="0"
    //         allowFullScreen="true"
    //     ></iframe>
    //     </div>
    // );
    return (
        <div>
            <Nav tabs>{renderTabNavItems()}</Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId="serviceDesk">
                    {active_tab === 'serviceDesk' ? <Service_Desk /> : null}
                </TabPane>
                {/* <TabPane tabId="sdp">
                    {active_tab === 'sdp' ? <SDP /> : null}
                </TabPane> */}
            </TabContent>
            <p></p>
            <p></p>
        </div>
    );
};

export default ServiceDesk;
