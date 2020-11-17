import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Form } from 'reactstrap';
import { getAll, getMonths, getYears } from './Api';
import { Dropdown } from 'semantic-ui-react'

const UniversalFilter = ({ globalFilters, onGlobalFiltersChange }) => {

    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);

    const loadYears = useCallback(() => {
        const data = getYears(new Date().getFullYear() - 10).map((f, index) => {
            return { key: index, value: f.value, text: f.display};
        })
        setYears(data);
    }, []);

    const loadMonths = useCallback(() => {
        const data = getMonths();
        let options = [];
        Object.keys(data).map(function(key, index) {
            options.push({
                value: key, display: data[key], text: data[key]
            });
            return null;
        });
        const selectionOptions = [{ value: '', display: '(Select Month)', text: '(Select Month)' }].concat(
            options
        );
        setMonths(selectionOptions);
    }, []);

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

    const onYearChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, year: value
        });
    };

    const onMonthChange = async (e, {value}) => {
        onGlobalFiltersChange({
            ...globalFilters, month: value
        });
    };

    useEffect(() => {
        loadYears();
        loadMonths();
        loadCounties();
        loadSubCounties();
        loadFacilities();
        loadPartners();
    }, [loadYears, loadMonths, loadCounties, loadSubCounties, loadFacilities, loadPartners]);

    return (
        <Row>
            <Col>
                <div className="form-group">
                    <label htmlFor="county">County</label>
                    <Dropdown id="county"  name="county" placeholder="Select County" fluid multiple selection options={counties} value={globalFilters.county} onChange={onCountyChange} />
                </div>
            </Col>
            <Col>
                <div className="form-group">
                    <label htmlFor="county">Sub-County</label>
                    <Dropdown id="subCounty" name="subCounty" placeholder="Select Sub-County" fluid multiple selection options={subCounties} value={globalFilters.subCounty} onChange={onSubCountyChange} />
                </div>
            </Col>
            <Col>
                <div className="form-group">
                    <label htmlFor="county">Facility</label>
                    <Dropdown id="facility" name="facility" placeholder="Select Facility" fluid multiple selection options={facilities} value={globalFilters.facility} onChange={onFacilityChange} />
                </div>
            </Col>
            <Col>
                <div className="form-group">
                    <label htmlFor="partner">Partner</label>
                    <Dropdown id="partner" name="partner" placeholder="Select Partner" fluid multiple selection options={partners} value={globalFilters.partner} onChange={onPartnerChange} />
                </div>
            </Col>
            <Col>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <Dropdown id="year" name="year" placeholder="Select Year" fluid selection options={years} value={globalFilters.year} onChange={onYearChange} />
                </div>
            </Col>
            <Col>
                <div className="form-group">
                    <label htmlFor="month">Month</label>
                    <Dropdown id="month" name="month" placeholder="Select Month" fluid selection options={months} value={globalFilters.month} onChange={onMonthChange} />
                </div>
            </Col>
        </Row>
    );
};

export default UniversalFilter;
