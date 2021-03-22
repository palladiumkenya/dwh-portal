import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as adverseEventsClientsByAgeSexSelectors
    from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';
import * as adverseEventsProportionOfPLHIVWithAeRegimenWasStopped
    from '../../../selectors/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasStopped';

const AdverseEventsProportionOfPlHivWithAeRegimenStopped = () => {
    const [proportionOfPlHivWithAeRegimenStopped, setProportionOfPlHivWithAeRegimenStopped] = useState({});
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsAdults);
    const proportionOfPLHIVWithAeRegimenWasStopped = useSelector(adverseEventsProportionOfPLHIVWithAeRegimenWasStopped.getAdverseEventsProportionOfPLHIVWithAeRegimenWasStopped);

    const loadProportionOfPlHivWithAeRegimenStopped = useCallback(async () => {
        setProportionOfPlHivWithAeRegimenStopped({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['NUMBER WITH ADVERSE EVENTS(AEs)', 'NUMBER STOPPED'],
                crosshair: true
            },
            yAxis: {
                type: 'logarithmic',
                minorTickInterval: 0.1,
                title: {
                    text: 'NUMBER OF PATIENTS WITH AEs'
                }
            },
            plotOptions: { column: { dataLabels: { enabled: true, formatter: function () { return '' + this.point.y; } } }},
            legend: {
                enabled: false
            },
            series: [{
                data: [
                    {
                        name: 'Number with adverse events (AEs)',
                        y: adverseEventsClientsAdults.adverseEvents,
                        color: '#28B294'
                    },
                    {
                        name: 'Number Stopped',
                        y: proportionOfPLHIVWithAeRegimenWasStopped,
                        color: '#14084D'
                    }
                ]
            }]
        });
    }, [adverseEventsClientsAdults, proportionOfPLHIVWithAeRegimenWasStopped]);

    useEffect(() => {
        loadProportionOfPlHivWithAeRegimenStopped();
    }, [loadProportionOfPlHivWithAeRegimenStopped]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV WITH ADVERSE EVENTS(AEs) WHOSE REGIMEN WAS STOPPED
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivWithAeRegimenStopped} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsProportionOfPlHivWithAeRegimenStopped;
