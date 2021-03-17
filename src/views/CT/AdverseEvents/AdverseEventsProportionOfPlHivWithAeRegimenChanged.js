import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as adverseEventsClientsByAgeSexSelectors
    from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';
import * as adverseEventsProportionOfPLHIVWithAeRegimenChanged
    from '../../../selectors/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenChanged';

const AdverseEventsProportionOfPlHivWithAeRegimenChanged = () => {
    const [proportionOfPlHivWithAeRegimenChanged, setProportionOfPlHivWithAeRegimenChanged] = useState({});
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsAdults);
    const proportionOfPLHIVWithAeRegimenChanged = useSelector(adverseEventsProportionOfPLHIVWithAeRegimenChanged.getAdverseEventsProportionOfPLHIVWithAeRegimenChanged);

    const loadProportionOfPlHivWithAeRegimenChanged = useCallback(async () => {
        setProportionOfPlHivWithAeRegimenChanged({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['NUMBER WITH ADVERSE EVENTS(AEs)', 'NUMBER CHANGED'],
                crosshair: true
            },
            yAxis: {
                type: 'logarithmic',
                title: {
                    text: 'NUMBER OF PATIENTS WITH AEs'
                },
                labels: { format: '{value}' }
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
                        name: 'Number changed',
                        y: proportionOfPLHIVWithAeRegimenChanged,
                        color: '#14084D'
                    }
                ]
            }]
        });
    }, [adverseEventsClientsAdults, proportionOfPLHIVWithAeRegimenChanged]);

    useEffect(() => {
        loadProportionOfPlHivWithAeRegimenChanged();
    }, [loadProportionOfPlHivWithAeRegimenChanged]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV WITH ADVERSE EVENTS(AEs) WHOSE REGIMEN WAS CHANGED
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivWithAeRegimenChanged} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsProportionOfPlHivWithAeRegimenChanged;
