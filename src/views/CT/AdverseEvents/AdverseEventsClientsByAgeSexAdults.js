import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as adverseEventsClientsByAgeSexSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';

const AdverseEventsClientsByAgeSexAdults = () => {
    const [adults15PlusAdverseEventsDesegregation, setAdults15PlusAdverseEventsDesegregation] = useState({});
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsByAgeSexAdults);

    const loadAdults15PlusAdverseEventsDesegregation =  useCallback(async () => {
        setAdults15PlusAdverseEventsDesegregation({
            title: { text: '' },
            xAxis: [{ categories: adverseEventsClientsAdults.ageGroups.map(y => y + ' YRS')}],
            yAxis: [
                { title: { text: 'Number of Patients' }, stackLabels: { enabled: true, style: { fontWeight: 'bold', color: "#808080" }}}
            ],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true }}},
            series: [
                { data: adverseEventsClientsAdults.adverseEventsMale, name: 'Male', type: 'column', color: "#14084D" },
                { data: adverseEventsClientsAdults.adverseEventsFemale, name: 'Female', type: 'column', color: "#EA4C8B" },
            ]
        });
    }, [adverseEventsClientsAdults]);

    useEffect(() => {
        loadAdults15PlusAdverseEventsDesegregation();
    }, [loadAdults15PlusAdverseEventsDesegregation]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                ADULTS 15+ ON ART AND DEVELOPED ADVERSE EVENTS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={adults15PlusAdverseEventsDesegregation} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AdverseEventsClientsByAgeSexAdults;
