import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import { getMissingDiagnosisDateByFacility } from '../../../../selectors/CT/NewOnArt/missingDiagnosisDateByFacility';

const ComparisonTXCurrByGender = () => {
    const missingDiagnosisDateByFacility = useSelector(getMissingDiagnosisDateByFacility);
    const loading = useSelector(state => state.missingDiagnosisDateByFacility.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            COMPARISON OF TX_CURR BASED ON GENDER
                            {
                                loading === true ?
                                <Spinner className="pull-right"/> :
                                <CsvDownloader
                                    filename="ndwh_patients_missing_hiv_diagnosis_date_by_facility"
                                    separator=","
                                    datas={missingDiagnosisDateByFacility}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            }
                        </CardHeader>
                        <CardBody className="trends-body">
                            <DataTable
                                columns={[
                                    { name: 'Facility', selector: 'facility', sortable: true },
                                    { name: 'County', selector: 'county', sortable: true },
                                    { name: 'Sub-County', selector: 'subCounty', sortable: true },
                                    { name: 'AGENCY', selector: 'agency', sortable: true },
                                    { name: 'Partner', selector: 'partner', sortable: true },
                                    { name: '# Patients', selector: 'patients', sortable: true },
                                ]}
                                data={missingDiagnosisDateByFacility}
                                noHeader
                                dense
                                defaultSortField="facility"
                                defaultSortAsc={true}
                                pagination
                                responsive
                                highlightOnHover
                                progressPending={loading}
                                progressComponent={<Spinner/>}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ComparisonTXCurrByGender;
