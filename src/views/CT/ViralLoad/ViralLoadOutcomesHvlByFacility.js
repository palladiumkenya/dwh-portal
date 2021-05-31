import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import CsvDownloader from 'react-csv-downloader';
import { getViralLoadOutcomesHvlByFacility } from '../../../selectors/CT/ViralLoad/viralLoadOutcomesHvlByFacility';

const ViralLoadOutcomesHvlByFacility = () => {
    const viralLoadOutcomesHvlByFacility = useSelector(getViralLoadOutcomesHvlByFacility);
    const loading = useSelector(state => state.viralLoadOutcomesHvlByFacility.loading);
    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            HVL BY FACILITY
                            {
                                loading === true ?
                                <Spinner className="pull-right"/> :
                                <CsvDownloader
                                    filename="ndwh_hvl_by_facility"
                                    separator=","
                                    datas={viralLoadOutcomesHvlByFacility}
                                    className="pull-right"
                                >
                                    <i className="bordered download icon inverted black"></i>
                                </CsvDownloader>
                            }
                        </CardHeader>
                        <CardBody className="trends-body">
                            <DataTable
                                columns={[
                                    { name: 'MFL Code', selector: 'mfl', sortable: true },
                                    { name: 'Facility', selector: 'facility', sortable: true },
                                    { name: 'County', selector: 'county', sortable: true },
                                    { name: 'Sub-County', selector: 'subCounty', sortable: true },
                                    { name: 'Partner', selector: 'partner', sortable: true },
                                    { name: 'Patients', selector: 'patients', sortable: true },
                                ]}
                                data={viralLoadOutcomesHvlByFacility}
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
            <Row>
                <Col sm={4}>
                    {
                        loading === true ?
                        <Spinner/> :
                        <CsvDownloader
                            filename="ndwh_hvl_by_facility"
                            separator=","
                            datas={viralLoadOutcomesHvlByFacility}
                            text="Download HVL by facility"
                            className="btn btn-danger"
                        />
                    }
                </Col>
            </Row>
        </>
    );
};

export default ViralLoadOutcomesHvlByFacility;
