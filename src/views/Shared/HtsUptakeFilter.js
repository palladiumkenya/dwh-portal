import React, { useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { getAll, getYearMonths } from './Api';

const HtsUptakeFilter = ({ onFilterChange }) => {
    const [activeSelection, setActiveSelection] = useState({
        county: '',
        subCounty: '',
        facility: '',
        partner: '',
        period: `${new Date().getFullYear()},${new Date().getMonth() + 1}`
    });

    const [periods, setPeriods] = useState([]);
    const [counties, setCounties] = useState([]);
    const [subCounties, setSubCounties] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        loadPeriods();
        loadCounties();
        loadSubCounties(null);
        loadFacilities();
        loadPartners();

    }, [activeSelection]);

    const loadPeriods = () => {
        const data = getYearMonths(new Date().getFullYear() - 1);
        setPeriods(data);
    };

    const loadCounties = async () => {
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('common/counties', params);
        const options = data.map((c) => {
            return { value: c.county, display: c.county };
        });
        const selectionOptions = [{ value: '', display: '(Select County)' }].concat(
            options
        );
        setCounties(selectionOptions);
    };

    const loadSubCounties = async (county) => {
        if(county == null) {
            let params = null;

            if (activeSelection) {
                params = { ...activeSelection };
            }

            county = params.county;
        }
        const data = await getAll('common/subCounties?county=' + county);
        const options = data.map((c) => {
            return { value: c.subCounty, display: c.subCounty };
        });
        const selectionOptions = [{ value: '', display: '(Select Sub-County)' }].concat(
            options
        );
        setSubCounties(selectionOptions);
    };

    const loadFacilities = async () => {
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('common/facilities', params);
        const options = data.map((c) => {
            return { value: c.name, display: c.name };
        });
        const selectionOptions = [{ value: '', display: '(Select your Facility)' }].concat(
            options
        );
        setFacilities(selectionOptions);
    };

    const loadPartners = async (selectedCounty, selectedAgency) => {
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('common/partners', params);
        const options = data.map((c) => {
            return { value: c.partner, display: c.partner };
        });
        const selectionOptions = [{ value: '', display: '(Select your Partner)' }].concat(
            options
        );
        setPartners(selectionOptions);
    };

    const onSelectionChange = async (event) => {
        const selection = {
            ...activeSelection, [event.target.name]: event.target.value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    const onCountyChange = async (event) => {
        const selection = {
            ...activeSelection, [event.target.name]: event.target.value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    const onSubCountyChange = async (event) => {
        const selection = {
            ...activeSelection, [event.target.name]: event.target.value
        };
        setActiveSelection(selection);
        onFilterChange(selection);
    };

    return (
        <Form>
            <div className="row">
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <select className="form-control" id="county" name="county" value={activeSelection.county} onChange={onCountyChange}>
                            {counties.map((county, index) => (
                                <option key={index} value={county.value}>
                                    {county.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="subCounty">Sub-County</label>
                        <select className="form-control" id="subCounty" name="subCounty" value={activeSelection.subCounty} onChange={onSubCountyChange}>
                            {subCounties.map((subCounty, index) => (
                                <option key={index} value={subCounty.value}>
                                    {subCounty.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="facilityName">Facility Name</label>
                        <select className="form-control" id="facilityName" name="facilityName" value={activeSelection.facility} onChange={onSelectionChange}>
                            {facilities.map((facility, index) => (
                                <option key={index} value={facility.value}>
                                    {facility.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="serviceDeliveryPartner">Service Delivery Partner</label>
                        <select className="form-control" id="serviceDeliveryPartner" name="serviceDeliveryPartner" value={activeSelection.partner}
                                onChange={onSelectionChange}>
                            {partners.map((f,index) => (
                                <option key={index} value={f.value}>
                                    {f.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="testingYear">Testing Year</label>
                        <select className="form-control" id="testingYear" name="testingYear">
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="testingMonth">Testing Month</label>
                        <select className="form-control" id="testingMonth" name="testingMonth">
                        </select>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default HtsUptakeFilter;
