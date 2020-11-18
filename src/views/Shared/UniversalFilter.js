import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { getAll } from './Api';
import { Dropdown } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';

const UniversalFilter = ({ globalFilters, onGlobalFiltersChange }) => {

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
    }, [globalFilters]);

    const loadSubCounties = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const data = await getAll('care-treatment/subCounties', params);
        const options = data.map((c) => {
            return { value: c.subcounty, key: c.subcounty, text: c.subcounty };
        });
        const selectionOptions = [].concat(
            options
        );
        setSubCounties(selectionOptions);
    }, [globalFilters]);

    const loadFacilities = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const data = await getAll('care-treatment/facilities', params);
        const options = data.map((c) => {
            return { value: c.facilityName, key: c.facilityName, text: c.facilityName };
        });
        const selectionOptions = [].concat(
            options
        );
        setFacilities(selectionOptions);
    }, [globalFilters]);

    const loadPartners = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const data = await getAll('care-treatment/partners', params);
        const options = data.map((c) => {
            return { value: c.partner, key: c.partner, text: c.partner };
        });
        const selectionOptions = [].concat(
            options
        );
        setPartners(selectionOptions);
    }, [globalFilters]);

    const loadAgencies = useCallback(async () => {
        let params = null;
        if (globalFilters) {
            params = { ...globalFilters };
        }
        const data = await getAll('common/agencies', params);
        const options = data.map((c) => {
            return { value: c.agency, key: c.agency, text: c.agency };
        });
        const selectionOptions = [].concat(
            options
        );
        setAgencies(selectionOptions);
    }, [globalFilters]);

    const onCountyChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, county: value
        });
    };

    const onSubCountyChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, subCounty: value
        });
    };

    const onFacilityChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, facility: value
        });
    };

    const onPartnerChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, partner: value
        });
    };

    const onAgencyChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, agency: value
        });
    };

    const onFromDateChange = async (e, {value}) => {
        let filters = { ...globalFilters };
        if (value) {
            let fromDate = moment(value, 'MMM YYYY');
            filters.fromDate = value;
            filters.year = fromDate.format('YYYY');
            filters.month = fromDate.format('MM');
        } else {
            filters.fromDate = '';
            filters.year = moment().format('YYYY');
            filters.month = moment().format('M');
        }
        onGlobalFiltersChange(filters);
    };

    const onToDateChange = async (e, {value}) => {
        let filters = { ...globalFilters };
        if (value) {
            filters.toDate = value;
        } else {
            filters.toDate = '';
        }
        onGlobalFiltersChange(filters);
    }

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
                globalFilters.countyFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <Dropdown id="county"  name="county" placeholder="Select County" fluid multiple selection options={counties} value={globalFilters.county} onChange={onCountyChange} />
                    </div>
                </Col> : null
            }
            {
                globalFilters.subCountyFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="county">Sub-County</label>
                        <Dropdown id="subCounty" name="subCounty" placeholder="Select Sub-County" fluid multiple selection options={subCounties} value={globalFilters.subCounty} onChange={onSubCountyChange} />
                    </div>
                </Col> : null
            }
            {
                globalFilters.facilityFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="county">Facility</label>
                        <Dropdown id="facility" name="facility" placeholder="Select Facility" fluid multiple selection options={facilities} value={globalFilters.facility} onChange={onFacilityChange} />
                    </div>
                </Col> : null
            }
            {
                globalFilters.partnerFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="partner">Partner</label>
                        <Dropdown id="partner" name="partner" placeholder="Select Partner" fluid multiple selection options={partners} value={globalFilters.partner} onChange={onPartnerChange} />
                    </div>
                </Col> : null
            }
            {
                globalFilters.agencyFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="agency">Agency</label>
                        <Dropdown id="agency" name="agency" placeholder="Select Agency" fluid multiple selection options={agencies} value={globalFilters.agency} onChange={onAgencyChange} />
                    </div>
                </Col> : null
            }
            {
                globalFilters.fromDateFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="fromDate">{globalFilters.toDateFilterEnabled ? 'From':'Period'}</label>
                        <DateInput
                            name="fromDate"
                            dateFormat="MMM YYYY"
                            closable={true}
                            clearable={true}
                            // maxDate={moment()}
                            placeholder={globalFilters.toDateFilterEnabled ? 'From':'Period'}
                            fluid
                            value={globalFilters.fromDate}
                            iconPosition="left"
                            onChange={onFromDateChange}
                        />
                    </div>
                </Col> : null
            }
            {
                globalFilters.toDateFilterEnabled ?
                <Col>
                    <div className="form-group">
                        <label htmlFor="toDate">To</label>
                        <DateInput
                            name="toDate"
                            dateFormat="MMM YYYY"
                            closable={true}
                            clearable={true}
                            // minDate={globalFilters.fromDate}
                            // maxDate={moment()}
                            placeholder="To"
                            fluid
                            value={globalFilters.toDate}
                            iconPosition="left"
                            onChange={onToDateChange}
                        />
                    </div>
                </Col> : null
            }
        </Row>
    );
};

export default UniversalFilter;
