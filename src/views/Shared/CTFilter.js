import React, { useEffect, useState, useCallback } from 'react';
import { Form } from 'reactstrap';
import { getAll, getMonths, getYears } from './Api';
import { Dropdown } from 'semantic-ui-react'

const CTFilter = ({ onFilterChange }) => {
    const [activeSelection, setActiveSelection] = useState({
        county: [],
        subCounty: [],
        facility: [],
        partner: [],
        year: `${new Date().getFullYear()}`,
        month: ''
    });

    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);

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
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('care-treatment/subCounties', params);
        const options = data.map((c) => {
            return { value: c.subcounty, key: c.subcounty, text: c.subcounty };
        });
        const selectionOptions = [].concat(
            options
        );
        setSubCounties(selectionOptions);
    }, [activeSelection]);

    const loadFacilities = useCallback(async () => {
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('care-treatment/facilities', params);
        const options = data.map((c) => {
            return { value: c.facilityName, key: c.facilityName, text: c.facilityName };
        });
        const selectionOptions = [].concat(
            options
        );
        setFacilities(selectionOptions);
    }, [activeSelection]);

    const loadPartners = useCallback(async () => {
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('care-treatment/partners', params);
        const options = data.map((c) => {
            return { value: c.partner, key: c.partner, text: c.partner };
        });
        const selectionOptions = [].concat(
            options
        );
        setPartners(selectionOptions);
    }, [activeSelection]);

    const onCountyChange = async (e, {value}) => {
        const selection = {
            ...activeSelection, county: value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    const onSubCountyChange = async (e, {value}) => {
        const selection = {
            ...activeSelection, subCounty: value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    const onFacilityChange = async (e, {value}) => {
        const selection = {
            ...activeSelection, facility: value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    const onPartnerChange = async (e, {value}) => {
        const selection = {
            ...activeSelection, partner: value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    useEffect(() => {
        loadCounties();
        loadSubCounties();
        loadFacilities();
        loadPartners();
    }, [loadCounties, loadSubCounties, loadFacilities, loadPartners]);

    return (
        <Form>
            <div className="row">
                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <Dropdown placeholder="Select County" fluid multiple selection options={counties} value={activeSelection.county} onChange={onCountyChange} />
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">Sub-County</label>
                        <Dropdown id="subCounty" name="subCounty" placeholder="Select Sub-County" fluid multiple selection options={subCounties} value={activeSelection.subCounty} onChange={onSubCountyChange} />
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">Facility</label>
                        <Dropdown id="facility" name="facility" placeholder="Select Facility" fluid multiple selection options={facilities} value={activeSelection.facility} onChange={onFacilityChange} />
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">Care and Treatment Partner</label>
                        <Dropdown id="partner" name="partner" placeholder="Select Care and Treatment Partner" fluid multiple selection options={partners} value={activeSelection.partner} onChange={onPartnerChange} />
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default CTFilter;
