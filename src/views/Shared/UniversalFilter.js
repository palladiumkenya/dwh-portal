import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import * as actions from "../../actions/Shared/filterActions";
import * as rrSelectors from '../../selectors/Shared/rrSitesSelector';
import * as htsSelectors from '../../selectors/Shared/htsSitesSelector';
import * as ctSelectors from '../../selectors/Shared/ctSitesSelector';
import { PAGES } from "../../constants";

const UniversalFilter = () => {
    const dispatch = useDispatch();

    const rrSites = useSelector(state => state.rrSites);
    const htsSites = useSelector(state => state.htsSites);
    const ctSites = useSelector(state => state.ctSites);

    const filters = useSelector(state => state.filters);
    const ui = useSelector(state => state.ui);

    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [projects, setProjects] = useState([]);

    const rrSubCounties = useSelector(rrSelectors.getSubCounties);
    const rrFacilities = useSelector(rrSelectors.getFacilities);
    const rrPartners = useSelector(rrSelectors.getPartners);
    const rrAgencies = useSelector(rrSelectors.getAgencies);
    const rrProjects = useSelector(rrSelectors.getProjects);

    const htsSubCounties = useSelector(htsSelectors.getSubCounties);
    const htsFacilities = useSelector(htsSelectors.getFacilities);
    const htsPartners = useSelector(htsSelectors.getPartners);
    const htsAgencies = useSelector(htsSelectors.getAgencies);
    const htsProjects = useSelector(htsSelectors.getProjects);

    const ctSubCounties = useSelector(ctSelectors.getSubCounties);
    const ctFacilities = useSelector(ctSelectors.getFacilities);
    const ctPartners = useSelector(ctSelectors.getPartners);
    const ctAgencies = useSelector(ctSelectors.getAgencies);
    const ctProjects = useSelector(ctSelectors.getProjects);

    const loadSites = useCallback(async () => {
        switch(ui.currentPage) {
            case PAGES.home:
                setCounties(ctSites.counties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(ctSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(ctFacilities.map(f => ({ value: f, key: f, text: f })));
                setPartners(ctPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(ctAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(ctProjects.map(p => ({ value: p, key: p, text: p })));
                break;
            case PAGES.rr:
                setCounties(rrSites.counties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(rrSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(rrFacilities.map(f => ({ value: f, key: f, text: f })));
                setPartners(rrPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(rrAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(rrProjects.map(p => ({ value: p, key: p, text: p })));
                break;
            case PAGES.hts:
                setCounties(htsSites.counties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(htsSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(htsFacilities.map(f => ({ value: f, key: f, text: f })));
                setPartners(htsPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(htsAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(htsProjects.map(p => ({ value: p, key: p, text: p })));
                break;
            case PAGES.ct:
                setCounties(ctSites.counties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(ctSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(ctFacilities.map(s => ({ value: s, key: s, text: s })));
                setPartners(ctPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(ctAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(ctProjects.map(p => ({ value: p, key: p, text: p })));
                break;
            default:
                setCounties(rrSites.counties.map(c => ({ value: c, key: c, text: c })));
                setSubCounties(rrSubCounties.map(s => ({ value: s, key: s, text: s })));
                setFacilities(rrFacilities.map(f => ({ value: f, key: f, text: f })));
                setPartners(rrPartners.map(p => ({ value: p, key: p, text: p })));
                setAgencies(rrAgencies.map(a => ({ value: a, key: a, text: a })));
                setProjects(rrProjects.map(p => ({ value: p, key: p, text: p })));
        }
    }, [
        ui,

        rrSites.counties,
        rrSubCounties,
        rrFacilities,
        rrPartners,
        rrAgencies,
        rrProjects,

        htsSites.counties,
        htsSubCounties,
        htsFacilities,
        htsPartners,
        htsAgencies,
        htsProjects,

        ctSites.counties,
        ctSubCounties,
        ctFacilities,
        ctPartners,
        ctAgencies,
        ctProjects,
    ]);

    useEffect(() => {
        loadSites();
    }, [loadSites]);

    return (
        <Row>
            {
                ui.countyFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <Dropdown
                            id="county"
                            name="county"
                            placeholder="Select County"
                            fluid
                            multiple
                            selection
                            search
                            options={counties}
                            value={filters.counties}
                            onChange={(e, data) => {
                                dispatch(actions.filterByCounty(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.subCountyFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="county">Sub-County</label>
                        <Dropdown
                            id="subCounty"
                            name="subCounty"
                            placeholder="Select Sub-County"
                            fluid
                            multiple
                            selection
                            search
                            options={subCounties}
                            value={filters.subCounties}
                            onChange={(e, data) => {
                                dispatch(actions.filterBySubCounty(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.facilityFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="county">Facility</label>
                        <Dropdown
                            id="facility"
                            name="facility"
                            placeholder="Select Facility"
                            fluid
                            multiple
                            selection
                            search
                            options={facilities}
                            value={filters.facilities}
                            onChange={(e, data) => {
                                dispatch(actions.filterByFacility(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.partnerFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="partner">Partner</label>
                        <Dropdown
                            id="partner"
                            name="partner"
                            placeholder="Select Partner"
                            fluid
                            multiple
                            selection
                            search
                            options={partners}
                            value={filters.partners}
                            onChange={(e, data) => {
                                dispatch(actions.filterByPartner(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.agencyFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="agency">Agency</label>
                        <Dropdown
                            id="agency"
                            name="agency"
                            placeholder="Select Agency"
                            fluid
                            multiple
                            selection
                            search
                            options={agencies}
                            value={filters.agencies}
                            onChange={(e, data) => {
                                dispatch(actions.filterByAgency(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.projectFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="project">Project</label>
                        <Dropdown
                            id="project"
                            name="project"
                            placeholder="Select Project"
                            fluid
                            multiple
                            selection
                            search
                            options={projects}
                            value={filters.projects}
                            onChange={(e, data) => {
                                dispatch(actions.filterByProject(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.fromDateFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="fromDate">{ui.toDateFilterEnabled ? 'From':'Period'}</label>
                        <DateInput
                            name="fromDate"
                            dateFormat="MMM YYYY"
                            closable={true}
                            clearable={true}
                            // maxDate={moment()}
                            placeholder={ui.toDateFilterEnabled ? 'From':'Period'}
                            fluid
                            value={filters.fromDate}
                            iconPosition="left"
                            onChange={(e, data) => {
                                dispatch(actions.filterByFromDate(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
            {
                ui.toDateFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="toDate">To</label>
                        <DateInput
                            name="toDate"
                            dateFormat="MMM YYYY"
                            closable={true}
                            clearable={true}
                            // minDate={filters.fromDate}
                            // maxDate={moment()}
                            placeholder="To"
                            fluid
                            value={filters.toDate}
                            iconPosition="left"
                            onChange={(e, data) => {
                                dispatch(actions.filterByToDate(data.value));
                            }}
                        />
                    </div>
                </Col> : null
            }
        </Row>
    );
};

export default UniversalFilter;
