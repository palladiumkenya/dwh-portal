import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import { getHTSPOSByFacilityPartnerKHIS } from '../../../../selectors/Operational&HIS/Comparison/htsPosByFacilityPartnerKHIS';

const ComparisonHTSPosByFacility = () => {
    const currOnArt = useSelector(getHTSPOSByFacilityPartnerKHIS).data;
    const loading = useSelector((state) => state.htsPosByFacilityKHIS.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            COMPARISON OF HTS TESTED HIV POSITIVE BASED ON SEX
                            {loading === true ? (
                                <Spinner className="pull-right" />
                            ) : (
                                <CsvDownloader
                                    filename="COMPARISON_OF_TX_CURR_BASED_ON_GENDER"
                                    separator=","
                                    datas={currOnArt}
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
                                        selector: 'Agency',
                                        sortable: true,
                                    },
                                    {
                                        name: 'PARTNER',
                                        selector: 'CTPartner',
                                        sortable: true,
                                    },
                                    {
                                        name: 'KHIS TOTAL',
                                        selector: 'Positive_Total',
                                        sortable: true,
                                    },
                                    {
                                        name: 'DWH TOTAL',
                                        selector: 'positive',
                                        sortable: true,
                                    },
                                    {
                                        name: 'CONCORDANCE (%)',
                                        selector: 'concordance',
                                        sortable: true,
                                    },
                                    // { name: 'MALE NDWH', selector: 'DWHmale', sortable: true },
                                    // { name: 'FEMALE NDWH', selector: 'DWHFemale', sortable: true },
                                    // { name: 'MALE KHIS', selector: 'KHISMale', sortable: true },
                                    // { name: 'FEMALE KHIS', selector: 'KHISFemale', sortable: true },
                                ]}
                                data={currOnArt}
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

export default ComparisonHTSPosByFacility;
