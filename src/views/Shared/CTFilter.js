import React, { useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { getAll } from './Api';
import { Dropdown } from 'semantic-ui-react'

const CTFilter = ({ onFilterChange }) => {
    const [activeSelection, setActiveSelection] = useState({
        county: [],
        subCounty: [],
        facility: [],
        partner: []
    });

    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        loadCounties();
        loadSubCounties();
        loadFacilities();
        loadPartners();
    }, [activeSelection]);

    const loadCounties = async () => {
        const data = await getAll('care-treatment/counties');
        const options = data.map((c) => {
            return { value: c.county, key: c.county, text: c.county };
        });
        const selectionOptions = [].concat(
            options
        );
        setCounties(selectionOptions);
    };

    const loadSubCounties = async () => {
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
    };

    const loadFacilities = async () => {
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
    };

    const loadPartners = async () => {
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
    };

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
