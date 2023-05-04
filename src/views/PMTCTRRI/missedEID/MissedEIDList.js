import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as missedEIDMissingPCRSelectors from '../../../selectors/PMTCTRRI/MissedEIDTesting';

const MissedEIDList = () => {
    const missedInfantProf = useSelector(
        missedEIDMissingPCRSelectors.getMissedEIDTestingMissingPCR
    );
    const loading = useSelector(
        (state) => state.missedInfantProphylaxis.loading
    );
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            HEI WITH MISSNIG FIRST DNA PCR TEST AT 6 WEEKS OR
                            FIRST CONTACT
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="HEI WITH MISSNIG FIRST DNA PCR TEST AT 6 WEEKS OR FIRST CONTACT"
                                    separator=","
                                    datas={missedInfantProf}
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
                                        name: '# OF HEI MISSING PCR TEST',
                                        selector: 'MissingPCRTests',
                                        sortable: true,
                                    },
                                ]}
                                data={missedInfantProf}
                                noHeader
                                dense
                                defaultSortField="MissingPCRTests"
                                defaultSortAsc={false}
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

export default MissedEIDList;
