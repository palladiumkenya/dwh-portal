import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as adverseEventsProportionOfPLHIVWithAeByTypeOfSuspectedCausativeDrugs
    from '../../../selectors/CT/AdverseEvents/adverseEventsProportionOfPLHIVWithAeByTypeOfSuspectedCausativeDrugs';
import * as adverseEventsClientsByAgeSexSelectors
    from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';

const AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs = ({ tab }) => {
    const [proportionOfPlHivByTypeOfSuspectedCausativeDrugs, setProportionOfPlHivByTypeOfSuspectedCausativeDrugs] = useState({});
    const adverseEventsProportionOfPLHIVByCausativeDrugs = useSelector(adverseEventsProportionOfPLHIVWithAeByTypeOfSuspectedCausativeDrugs.getProportionOfPLHIVWithAeByTypeOfSuspectedCausativeDrugs);
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsAdults);


    const loadProportionOfPlHivByTypeOfSuspectedCausativeDrugs = useCallback(async () => {
        setProportionOfPlHivByTypeOfSuspectedCausativeDrugs({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: adverseEventsProportionOfPLHIVByCausativeDrugs.map(obj => obj.adverseEventCause),
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENTAGE OF PATIENTS WITH ADVERSE EVENTS(AEs)'
                },
                labels: { format: '{value} %' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '%'; } } }},
            series: [{
                name: 'Drugs Causing AEs',
                data: adverseEventsProportionOfPLHIVByCausativeDrugs.map(obj => Math.round((obj.count_cat/adverseEventsClientsAdults.adverseEvents)*100)),
                color: '#142459',
                tooltip: { valueSuffix: ' % {point.absoluteY}' }
            }]
        });
    }, [adverseEventsProportionOfPLHIVByCausativeDrugs, adverseEventsClientsAdults]);

    useEffect(() => {
        loadProportionOfPlHivByTypeOfSuspectedCausativeDrugs();
    }, [loadProportionOfPlHivByTypeOfSuspectedCausativeDrugs]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV ON ART WITH ADVERSE EVENTS(AEs) BY TYPE OF SUSPECTED CAUSATIVE DRUG/s
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivByTypeOfSuspectedCausativeDrugs} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsProportionOfPlHivByTypeOfSuspectedCausativeDrugs;
