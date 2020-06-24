import React, { Component, useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { getAll, getYearMonths } from './Api';

const Filter = ({ onFilterChange }) => {

    const [activeSelection, setActiveSelection] = useState({
        county: '',
        agency: '',
        partner: '',
        period: `${new Date().getFullYear()},${new Date().getMonth() + 1}`
    });

    const [periods, setPeriods] = useState([]);
    const [counties, setCounties] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        loadPeriods();
        loadCounties();
        loadAgencies();
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

    const loadAgencies = async () => {
        let params = null;

        if (activeSelection) {
            params = { ...activeSelection };
        }

        const data = await getAll('common/agencies', params);
        const options = data.map((c) => {
            return { value: c.agency, display: c.agency };
        });
        const selectionOptions = [{ value: '', display: '(Select Agency)' }].concat(
            options
        );
        setAgencies(selectionOptions);
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

    return (
        <Form>
            <div className="row">
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <select className="form-control" id="county" name="county" value={activeSelection.county}
                                onChange={onSelectionChange}>
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
                        <label htmlFor="agency">Agency</label>
                        <select className="form-control" id="agency" name="agency" value={activeSelection.agency}
                                onChange={onSelectionChange}>
                            {agencies.map((a,index) => (
                                <option key={index} value={a.value}>
                                    {a.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="serviceDeliveryPartner">
                            Service Delivery Partner
                        </label>
                        <select className="form-control" id="partner" name="partner" value={activeSelection.partner}
                                onChange={onSelectionChange}>
                            {partners.map((f,index) => (
                                <option key={index} value={f.value}>
                                    {f.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="uploadMonthYear">Period</label>
                        <select className="form-control" id="period" name="period" value={activeSelection.period}
                                onChange={onSelectionChange}>
                            {periods.map((f, index) => (
                                <option key={index} value={f.value}>
                                    {f.display}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </Form>
    );

};

export default Filter;
