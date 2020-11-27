import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import DataTable from 'react-data-table-component';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLOverallUptakeAndSuppressionByFacility = () => {
    const filters = useSelector(state => state.filters);
    const [vlOverallUptakeAndSuppressionByFacility, setVLOverallUptakeAndSuppressionByFacility] = useState({});

    const loadVLOverallUptakeAndSuppressionByFacility = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/vlOverallUptakeAndSuppressionByFacility', params);
        const data = [];
        for(let i = 0; i < result.length; i++) {
            let d = {
                facility: result[i].facility,
                county: result[i].county,
                subCounty: result[i].subCounty,
                partner: result[i].partner,
                txCurr: parseInt(result[i].txCurr, 10),
                eligible: parseInt(result[i].eligible, 10),
                vlDone: parseInt(result[i].vlDone, 10),
                suppressed: parseInt(result[i].suppressed, 10),
                uptake: 0,
                suppression: 0
            };
            if (!d.txCurr) {
                d.txCurr = 0;
            }
            if (!d.eligible) {
                d.eligible = 0;
            }
            if (!d.vlDone) {
                d.vlDone = 0;
            }
            if (!d.suppressed) {
                d.suppressed = 0;
            }
            if (d.eligible > 0) {
                d.uptake = ((d.vlDone/d.eligible)*100).toFixed(0);
            }
            if (d.vlDone > 0) {
                d.suppression = ((d.suppressed/d.vlDone)*100).toFixed(0);
            }
            data.push(d);
        }

        setVLOverallUptakeAndSuppressionByFacility({
            columns: [
                { name: 'Facility', selector: 'facility', sortable: true},
                { name: 'Partner', selector: 'partner', sortable: true},
                { name: 'County', selector: 'county', sortable: true},
                { name: 'Sub County', selector: 'subCounty', sortable: true},
                { name: 'CURRENT ON ART', selector: 'txCurr', sortable: true, right: true},
                { name: 'VL IN LAST 12 MONTHS', selector: 'eligible', sortable: true, right: true},
                { name: 'FREQUENCY', selector: 'vlDone', sortable: true, right: true},
                // { name: 'Uptake (%)', selector: 'uptake', sortable: true, right: true },
                // { name: 'Suppressed', selector: 'suppressed', sortable: true, right: true},
                { name: 'PERCENTAGE (%)', selector: 'suppression', sortable: true, right: true },
            ],
            data: data
        });
    }, [filters]);

    useEffect(() => {
        loadVLOverallUptakeAndSuppressionByFacility();
    }, [loadVLOverallUptakeAndSuppressionByFacility]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VIRAL SUPPRESSION BY FACILITY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable
                                columns={vlOverallUptakeAndSuppressionByFacility.columns}
                                data={vlOverallUptakeAndSuppressionByFacility.data}
                                pagination="true"
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLOverallUptakeAndSuppressionByFacility;
