import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import DataTable from 'react-data-table-component';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const TreatmentOutcomesByFacility = () => {
    const filters = useSelector(state => state.filters);
    const [treatmentOutcomesByFacility, setTreatmentOutcomesByFacility] = useState({});

    const loadTreatmentOutcomesByFacility = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):'',
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/treatmentOutcomesByFacility', params);
        let outcomes = [];
        for(let i = 0; i < result.length; i++) {
            if (!outcomes[result[i].facility]) {
                outcomes[result[i].facility] = {
                    county: result[i].county,
                    subCounty: result[i].subCounty,
                    facility: result[i].facility,
                    partner: result[i].partner,
                };
            }
            if (result[i].artOutcome === "Active") {
                outcomes[result[i].facility].active = parseInt(result[i].totalOutcomes, 10);
            } else if (result[i].artOutcome === "Dead") {
                outcomes[result[i].facility].dead = parseInt(result[i].totalOutcomes, 10);
            } else if (result[i].artOutcome === "LTFU") {
                outcomes[result[i].facility].ltfu = parseInt(result[i].totalOutcomes, 10);
            } else if (result[i].artOutcome === "Stopped") {
                outcomes[result[i].facility].stopped = parseInt(result[i].totalOutcomes, 10);
            } else if (result[i].artOutcome === "TransferOut") {
                outcomes[result[i].facility].to = parseInt(result[i].totalOutcomes, 10);
            }
        }
        const data = Object.values(outcomes);
        setTreatmentOutcomesByFacility({
            columns: [
                { name: 'Facility', selector: 'facility', sortable: true},
                { name: 'Partner', selector: 'partner', sortable: true},
                { name: 'County', selector: 'county', sortable: true},
                { name: 'Sub County', selector: 'subCounty', sortable: true},
                { name: 'Active', selector: 'active', sortable: true, right: true},
                { name: 'Dead', selector: 'dead', sortable: true, right: true},
                { name: 'LTFU', selector: 'ltfu', sortable: true, right: true},
                { name: 'Stopped', selector: 'stopped', sortable: true, right: true },
                // { name: 'Transfer Out', selector: 'to', sortable: true, right: true },
            ],
            data: data
        });
    }, [filters]);

    useEffect(() => {
        loadTreatmentOutcomesByFacility();
    }, [loadTreatmentOutcomesByFacility]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TREATMENT OUTCOMES
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable
                                columns={treatmentOutcomesByFacility.columns}
                                data={treatmentOutcomesByFacility.data}
                                pagination={true} defaultSortField="facility" responsive={true}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TreatmentOutcomesByFacility;
