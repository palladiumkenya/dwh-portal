import React, { useEffect, useState } from 'react';
import { Form } from 'reactstrap';

const CTFilter = ({ onFilterChange }) => {
    const [activeSelection, setActiveSelection] = useState({
        county: '',
        subCounty: '',
        facility: '',
        partner: ''
    });

    return (
        <Form>
            <div className="row">
                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">County</label>
                        <select className="form-control" id="county" name="county" value={activeSelection.county}>
                        </select>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">Sub-County</label>
                        <select className="form-control" id="subCounty" name="subCounty" value={activeSelection.county}>
                        </select>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">Facility</label>
                        <select className="form-control" id="facility" name="facility" value={activeSelection.county}>
                        </select>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="county">Care and Treatment Partner</label>
                        <select className="form-control" id="partner" name="partner" value={activeSelection.county}>
                        </select>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default CTFilter;
