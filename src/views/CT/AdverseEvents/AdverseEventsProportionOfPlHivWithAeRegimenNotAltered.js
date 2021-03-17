import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as adverseEventsClientsByAgeSexSelectors
    from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';
import * as adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered
    from '../../../selectors/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered';

const AdverseEventsProportionOfPlHivWithAeRegimenNotAltered = () => {
    const [proportionOfPlHivWithAeRegimenNotAltered, setProportionOfPlHivWithAeRegimenNotAltered] = useState({});
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsAdults);
    const proportionOfPLHIVWithAeRegimenWasNotAltered = useSelector(adverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered.getAdverseEventsProportionOfPLHIVWithAeRegimenWasNotAltered);

    const loadProportionOfPlHivWithAeRegimenNotAltered = useCallback(async () => {
        setProportionOfPlHivWithAeRegimenNotAltered({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['NUMBER WITH ADVERSE EVENTS(AEs)', 'NUMBER NOT ALTERED'],
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
                        name: 'Number not altered',
                        y: proportionOfPLHIVWithAeRegimenWasNotAltered,
                        color: '#14084D'
                    }
                ]
            }]
        });
    }, [adverseEventsClientsAdults, proportionOfPLHIVWithAeRegimenWasNotAltered]);

    useEffect(() => {
        loadProportionOfPlHivWithAeRegimenNotAltered();
    }, [loadProportionOfPlHivWithAeRegimenNotAltered]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV WITH ADVERSE EVENTS(AEs) WHOSE REGIMEN WAS NOT ALTERED
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivWithAeRegimenNotAltered} />
                </div>
            </CardBody>
        </Card>
    );
};

export default AdverseEventsProportionOfPlHivWithAeRegimenNotAltered;
