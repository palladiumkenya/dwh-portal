import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as missedInfantProphylaxisSelectors from '../../../selectors/PMTCTRRI/MissedInfantProphylaxis';

const MissingInfantProfList = () => {
    const missedInfantProf = useSelector(
        missedInfantProphylaxisSelectors.getMissedInfantProphylaxisList
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
                            MISSING INFANT PROPHYLAXIS
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="MISSING INFANT PROPHYLAXIS"
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
                                        name: '# MISSING INFANT PROPHYLAXIS',
                                        selector: 'notGiven',
                                        sortable: true,
                                    },
                                ]}
                                data={missedInfantProf}
                                noHeader
                                dense
                                defaultSortField="notGiven"
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

export default MissingInfantProfList;
