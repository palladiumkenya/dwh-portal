import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';

const AdverseEventsTable = ({ globalFilter }) => {
    const [adverseEvents, setAdverseEvents] = useState({});
    
    const loadAdverseEvents = useCallback(async () => {

    }, []);

    useEffect(() => {
        loadAdverseEvents();
    }, [loadAdverseEvents]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADVERSE EVENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable columns={adverseEvents.columns} data={adverseEvents.data}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AdverseEventsTable;
