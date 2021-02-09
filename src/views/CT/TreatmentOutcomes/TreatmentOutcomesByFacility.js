import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import DataTable from 'react-data-table-component';
import * as treatmentOutcomesByFacilitySelectors from '../../../selectors/CT/TreatmentOutcomes/treatmentOutcomesByFacility';

const TreatmentOutcomesByFacility = () => {
    const [treatmentOutcomesByFacility, setTreatmentOutcomesByFacility] = useState({});
    const treatmentOutcomesByFacilityData = useSelector(treatmentOutcomesByFacilitySelectors.getTreatmentOutcomesByFacility);

    const loadTreatmentOutcomesByFacility = useCallback(async () => {
        setTreatmentOutcomesByFacility({
            columns: treatmentOutcomesByFacilityData.columns,
            data: treatmentOutcomesByFacilityData.data
        });
    }, [treatmentOutcomesByFacilityData]);

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
