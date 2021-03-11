import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as adverseEventsClientsByAgeSexSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';

const AdverseEventsClientsByAgeSexChildren = () => {
    const [under15AdverseEventsDesegregation, setUnder15AdverseEventsDesegregation] = useState({});
    const adverseEventsClientsChildren = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsByAgeSexChildren);

    const loadUnder15AdverseEventsDesegregation =  useCallback(async () => {
        setUnder15AdverseEventsDesegregation({
            title: { text: '' },
            xAxis: [{ categories: adverseEventsClientsChildren.ageGroups.map(y => y + ' YRS'), crosshair: true }],
            yAxis: [
                { title: { text: 'Number of Patients' }, stackLabels: { enabled: true, style: { fontWeight: 'bold', color: "#808080" }}}
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                shared: true,
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: { column: { stacking: 'normal'}},
            series: [
                { data: adverseEventsClientsChildren.adverseEventsMale, name: 'Male', type: 'column', color: "#14084D" },
                { data: adverseEventsClientsChildren.adverseEventsFemale, name: 'Female', type: 'column', color: "#EA4C8B" },
            ]
        });
    }, [adverseEventsClientsChildren]);

    useEffect(() => {
        loadUnder15AdverseEventsDesegregation();
    }, [loadUnder15AdverseEventsDesegregation]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                CHILDREN &#60;15 ON ART AND DEVELOPED ADVERSE EVENTS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={under15AdverseEventsDesegregation} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AdverseEventsClientsByAgeSexChildren;
