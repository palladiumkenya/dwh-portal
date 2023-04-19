import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import * as missedViralLoadSelectors from '../../../selectors/PMTCTRRI/MissedViralLoad';

const MissingVLList = () => {
    const missedVL = useSelector(
        missedViralLoadSelectors.getMissedViralLoadList
    );
    const loading = useSelector((state) => state.missedViralLoad.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            PREGNANT & BREASTFEEDING WOMEN DUE FOR VL
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="PREGNANT & BREASTFEEDING WOMEN DUE FOR VL"
                                    separator=","
                                    datas={missedVL}
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
                                        selector: 'FacilityName',
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
                                        selector: 'AgencyName',
                                        sortable: true,
                                    },
                                    {
                                        name: 'PARTNER',
                                        selector: 'PartnerName',
                                        sortable: true,
                                    },
                                    {
                                        name: '# ELIGIBLE FOR VL',
                                        selector: 'EligibleVL',
                                        sortable: true,
                                    },
                                    {
                                        name: '# DONE',
                                        selector: 'VLDone',
                                        sortable: true,
                                    },
                                    {
                                        name: '# NOT DONE',
                                        selector: 'MissingVL',
                                        sortable: true,
                                    },
                                ]}
                                data={missedVL}
                                noHeader
                                dense
                                defaultSortField="EligibleVL"
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

export default MissingVLList;
