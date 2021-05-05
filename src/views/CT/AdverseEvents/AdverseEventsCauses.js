import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { formatNumber } from './../../../utils/utils';
import { useSelector } from 'react-redux';
import * as adverseEventsActionsByDrugsSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsActionsByDrugs';

const AdverseEventsCauses = ({ tab }) => {
    const [reportedCausesOfAEs, setReportedCausesOfAEs] = useState({});
    const methodCalled = tab === 'adult' ? adverseEventsActionsByDrugsSelectors.getAdverseEventsCauses : adverseEventsActionsByDrugsSelectors.getAdverseEventsCausesCalHIV;
    const adverseEventsCauses = useSelector(methodCalled);
    const n = parseInt(adverseEventsCauses.arv) +
        parseInt(adverseEventsCauses.arvAndOthers) +
        parseInt(adverseEventsCauses.non_arv) +
        parseInt(adverseEventsCauses.unspecified);

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
                REPORTED CAUSES OF AEs (N={n ? formatNumber(n): 0})
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

