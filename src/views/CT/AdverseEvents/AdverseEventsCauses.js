import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as adverseEventsActionsByDrugsSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsActionsByDrugs';

const AdverseEventsCauses = () => {
    const [reportedCausesOfAEs, setReportedCausesOfAEs] = useState({});
    const adverseEventsCauses = useSelector(adverseEventsActionsByDrugsSelectors.getAdverseEventsCauses);

    const loadReportedCausesOfAE = useCallback(async () => {
        setReportedCausesOfAEs({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y})'
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'Number of Patients',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'ARV',
                            y: adverseEventsCauses.arv,
                            color: "#1AB394"
                        },
                        {
                            name: 'ARV + OTHER DRUGS',
                            y: adverseEventsCauses.arvAndOthers,
                            color: "#F7ED00"
                        },
                        {
                            name: 'NON-ARVs',
                            y: adverseEventsCauses.non_arv,
                            color: "#E15759"
                        },
                        {
                            name: 'UNSPECIFIED CATEGORY',
                            y: adverseEventsCauses.unspecified,
                            color: "#2F4050"
                        }]
                }
            ]
        });
    }, [adverseEventsCauses]);

    useEffect(() => {
        loadReportedCausesOfAE();
    }, [loadReportedCausesOfAE]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                REPORTED CAUSES OF AEs
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={reportedCausesOfAEs} />
                </div>
            </CardBody>
        </Card>
    );
};
export default AdverseEventsCauses;

