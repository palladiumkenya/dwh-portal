import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as adverseEventsClientsByAgeSexSelectors
    from '../../../selectors/CT/AdverseEvents/adverseEventsClientsByAgeSex';
import * as adverseEventsProportionOfPlHivAeRelatedToArtDrugs
    from '../../../selectors/CT/AdverseEvents/adverseEventsProportionOfPlHivAeRelatedToArtDrugs';

const AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt = () => {
    const [proportionOfPlHivWithAeRelatedToArt, setProportionOfPlHivWithAeRelatedToArt] = useState({});
    const adverseEventsProportionOfPLHIVAeRelatedToArtDrugs = useSelector(adverseEventsProportionOfPlHivAeRelatedToArtDrugs.getProportionOfPLHIVAeRelatedToArtDrugs);
    const adverseEventsClientsAdults = useSelector(adverseEventsClientsByAgeSexSelectors.getAdverseEventsClientsAdults);


    const loadProportionOfPlHivWithAeRelatedToArt = useCallback(async () => {
        setProportionOfPlHivWithAeRelatedToArt({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: adverseEventsProportionOfPLHIVAeRelatedToArtDrugs.map(obj => obj.adverseEventCause),
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
                name: 'ARV Causing Drug/s',
                data: adverseEventsProportionOfPLHIVAeRelatedToArtDrugs.map(obj => Math.round((obj.count_cat/adverseEventsClientsAdults.adverseEvents)*100)),
                color: '#142459',
                tooltip: { valueSuffix: ' % {point.absoluteY}' }
            }]
        });
    }, [adverseEventsProportionOfPLHIVAeRelatedToArtDrugs, adverseEventsClientsAdults]);

    useEffect(() => {
        loadProportionOfPlHivWithAeRelatedToArt();
    }, [loadProportionOfPlHivWithAeRelatedToArt]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF PLHIV WITH ADVERSE DRUG REACTIONS RELATED TO ART/ SUSPECTED TO BE ART
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfPlHivWithAeRelatedToArt} />
                </div>
            </CardBody>
        </Card>
    );
}

export default AdverseEventsProportionOfPlHivWithAeRelatedToArtOrSuspectedArt;
