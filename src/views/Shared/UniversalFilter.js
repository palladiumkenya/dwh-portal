import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getAll } from './Api';
import { Dropdown } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import * as actions from "../../actions/filterActions";

const UniversalFilter = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const ui = useSelector(state => state.ui);
    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);
    const [agencies, setAgencies] = useState([]);

    const loadCounties = useCallback(async () => {
        const data = await getAll('care-treatment/counties');
        const options = data.map((c) => {
            return { value: c.county, key: c.county, text: c.county };
        });
        const selectionOptions = [].concat(
            options
        );
        setCounties(selectionOptions);
    }, []);

    const loadSubCounties = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies
        };
        const data = await getAll('care-treatment/subCounties', params);
        const options = data.map((c) => {
            return { value: c.subcounty, key: c.subcounty, text: c.subcounty };
        });
        const selectionOptions = [].concat(
            options
        );
        setSubCounties(selectionOptions);
    }, [filters]);

    const loadFacilities = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies
        };
        const data = await getAll('care-treatment/facilities', params);
        const options = data.map((c) => {
            return { value: c.facilityName, key: c.facilityName, text: c.facilityName };
        });
        const selectionOptions = [].concat(
            options
        );
        setFacilities(selectionOptions);
    }, [filters]);

    const loadPartners = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies
        };
        const data = await getAll('care-treatment/partners', params);
        const options = data.map((c) => {
            return { value: c.partner, key: c.partner, text: c.partner };
        });
        const selectionOptions = [].concat(
            options
        );
        setPartners(selectionOptions);
    }, [filters]);

    const loadAgencies = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies
        };
        const data = await getAll('common/agencies', params);
        const options = data.map((c) => {
            return { value: c.agency, key: c.agency, text: c.agency };
        });
        const selectionOptions = [].concat(
            options
        );
        setAgencies(selectionOptions);
    }, [filters]);

    useEffect(() => {
        loadCounties();
        loadSubCounties();
        loadFacilities();
        loadPartners();
        loadAgencies();
    }, [loadCounties, loadSubCounties, loadFacilities, loadPartners, loadAgencies]);

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
