import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import * as tickets from '../../selectors/ServiceDesk/partnerLevel';
import MuiDataTable from 'mui-datatables';
import React from 'react';

const HisDeploymentsLinelist = () =>{
    const hisLinelist = useSelector(tickets.getPartnerLevel);


    const columns = [
        { name: 'mfl_code', label: 'MFL CODE' },
        { name: 'facility_name', label: 'Facility Name' },
        { name: 'keph_level', label: 'KEPH Level' },
        { name: 'county', label: 'County' },
        { name: 'sub_county', label: 'Sub County' },
        { name: 'owner', label: 'Owner' },
        { name: 'sdp', label: 'SDP' },
        { name: 'agency', label: 'Agency' },
        { name: 'emr', label: 'EMR' },
        { name: 'emr_status', label: 'EMR Status' },
    ];

    return (
        <>
            <Row>
                <Col>
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            {`HIS DEPLOYMENT LINELIST`}
                            {/*{loading === true ? (*/}
                            {/*    <Spinner className="pull-right" />*/}
                            {/*) : (*/}
                            {/*    <CsvDownloader*/}
                            {/*        filename="his deployment linelist"*/}
                            {/*        separator=","*/}
                            {/*        datas={partnerLevel}*/}
                            {/*        className="pull-right"*/}
                            {/*    >*/}
                            {/*        <i className="bordered download icon inverted black"></i>*/}
                            {/*    </CsvDownloader>*/}
                            {/*)}*/}
                        </CardHeader>
                        <CardBody className="trends-body">
                            <MuiDataTable
                                data={hisLinelist}
                                columns={columns}
                                options={{
                                    responsive: 'simple',
                                    selectableRows: 'none',
                                    file: ''
                                }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}


export default HisDeploymentsLinelist
