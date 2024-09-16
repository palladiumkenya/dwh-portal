import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
import React from 'react';
import * as hisSelector from '../../selectors/RR/HisDeploymentsSelector';
import CsvDownloader from 'react-csv-downloader';
import DataTable from 'react-data-table-component';
import moment from 'moment';

const HisDeploymentsTxCurr = () =>{
    const hisTxcurr = useSelector(
        hisSelector.getFacilityTxCurr
    );


    return (
        <>

            <Card className="trends-card">
                <CardHeader className="trends-header">
                    HIS TXCURR BY KEPH LEVEL FOR EMR SITES LINELIST
                    {
                        hisTxcurr.loading === true ?
                            <Spinner className="pull-right"/> :
                            <CsvDownloader
                                filename={`ndwh_his_deployment_facility_linelist_${moment().format('YYYY_MM_DD')}`}
                                separator=","
                                datas={hisTxcurr.list}
                                className="pull-right"
                            >
                                <i className="bordered download icon inverted black"></i>
                            </CsvDownloader>
                    }
                </CardHeader>
                <CardBody className="trends-body">
                    <DataTable
                        columns={[
                            { selector: 'KEPH_Level', name: 'KEPH Level' },
                            { selector: 'TxCurr', name: 'TXCURR' },
                        ]}
                        data={hisTxcurr.list}
                        noHeader
                        dense
                        defaultSortAsc={true}
                        pagination
                        paginationPerPage={20}
                        responsive
                        highlightOnHover
                        progressPending={hisTxcurr.loading}
                        progressComponent={<Spinner/>}
                    />
                </CardBody>
            </Card>
        </>
    );
}


export default HisDeploymentsTxCurr
