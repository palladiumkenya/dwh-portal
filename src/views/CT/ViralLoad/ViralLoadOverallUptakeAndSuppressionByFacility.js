import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import DataTable from 'react-data-table-component';
import * as viralLoadOverallUptakeSuppressionByFacilitySelectors from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionByFacility';

const ViralLoadOverallUptakeAndSuppressionByFacility = () => {
    const [viralLoadOverallUptakeSuppressionByFacility, setViralLoadOverallUptakeAndSuppressionByFacility] = useState({});
    const viralLoadOverallUptakeSuppressionByFacilityData = useSelector(viralLoadOverallUptakeSuppressionByFacilitySelectors.getViralLoadOverallUptakeSuppressionByFacility);

    const loadViralLoadOverallUptakeAndSuppressionByFacility = useCallback(async () => {
        setViralLoadOverallUptakeAndSuppressionByFacility({
            columns: viralLoadOverallUptakeSuppressionByFacilityData.columns,
            data: viralLoadOverallUptakeSuppressionByFacilityData.data
        });
    }, [viralLoadOverallUptakeSuppressionByFacilityData]);

    useEffect(() => {
        loadViralLoadOverallUptakeAndSuppressionByFacility();
    }, [loadViralLoadOverallUptakeAndSuppressionByFacility]);

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
                                columns={viralLoadOverallUptakeSuppressionByFacility.columns}
                                data={viralLoadOverallUptakeSuppressionByFacility.data}
                                pagination={true} defaultSortField="facility" responsive={true}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadOverallUptakeAndSuppressionByFacility;
