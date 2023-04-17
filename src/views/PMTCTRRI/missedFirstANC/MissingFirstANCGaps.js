import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as missedFirstANCSelectors from '../../../selectors/PMTCTRRI/MissedFirstANC';

const MissingFirstANCGaps = () => {
    const missedFirstANC = useSelector(
        missedFirstANCSelectors.getMissedFirstANCGaps
    );
    const loading = useSelector((state) => state.missedFirstANCGaps.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            MISSED TESTING AT FIRST ANC GAPS
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="ndwh_patients_missing_hiv_diagnosis_date_by_facility"
                                    separator=","
                                    datas={missedFirstANC}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            )}
                        </CardHeader>
                        <CardBody className="trends-body">
                            <DataTable
                                columns={[
                                    {
                                        name: 'FACILITY',
                                        selector: 'Facility_Name',
                                        sortable: true,
                                    },
                                    {
                                        name: 'COUNTY',
                                        selector: 'County',
                                        sortable: true,
                                    },
                                    {
                                        name: 'SUB-COUNTY',
                                        selector: 'SubCounty',
                                        sortable: true,
                                    },
                                    {
                                        name: 'AGENCY',
                                        selector: 'Agency',
                                        sortable: true,
                                    },
                                    {
                                        name: 'PARTNER',
                                        selector: 'SDP',
                                        sortable: true,
                                    },
                                    {
                                        name: '# AT 1ST ANC',
                                        selector: 'FirstANC',
                                        sortable: true,
                                    },
                                    {
                                        name: '# TESTED HIV',
                                        selector: 'HIVTested',
                                        sortable: true,
                                    },
                                    {
                                        name: '# TESTED SYPHILIS',
                                        selector: 'NoOfMothersSyphillisTested',
                                        sortable: true,
                                    },
                                    {
                                        name: '# NOT TESTED HIV',
                                        selector: 'MissedHIVTesting',
                                        sortable: true,
                                    },
                                    {
                                        name: '# NOT TESTED SYPHILIS',
                                        selector: 'MissedSyphillistesting',
                                        sortable: true,
                                    },
                                ]}
                                data={missedFirstANC}
                                noHeader
                                dense
                                defaultSortField="facility"
                                defaultSortAsc={true}
                                pagination
                                responsive
                                highlightOnHover
                                progressPending={loading}
                                progressComponent={<Spinner />}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default MissingFirstANCGaps;
