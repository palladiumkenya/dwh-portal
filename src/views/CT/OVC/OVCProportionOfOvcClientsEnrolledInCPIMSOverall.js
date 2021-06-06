import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as ovcProportionOfClientsInCpimsOverallSelector
    from '../../../selectors/CT/OVC/ovcProportionOfClientsInCpimsOverall';

const OVCProportionOfOvcClientsEnrolledInCPIMSOverall = () => {
    const [ovcProportionOfOvcClientsEnrolledInCpimsOverall, setOvcProportionOfOvcClientsEnrolledInCpimsOverall] = useState({});
    const ProportionOfClientsInCpimsOverall = useSelector(ovcProportionOfClientsInCpimsOverallSelector.getOvcProportionOfClientsInCpimsOverall);

    const loadOvcProportionOfOvcClientsEnrolledInCpims = useCallback(async () => {
        setOvcProportionOfOvcClientsEnrolledInCpimsOverall({
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
                    name: 'PROPORTION OF OVC CLIENTS ENROLLED IN CPIMS - OVERALL',
                    colorByPoint: true,
                    data: ProportionOfClientsInCpimsOverall
                }
            ]
        });
    }, [ProportionOfClientsInCpimsOverall]);

    useEffect(() => {
        loadOvcProportionOfOvcClientsEnrolledInCpims();
    }, [loadOvcProportionOfOvcClientsEnrolledInCpims]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF OVC CLIENTS ENROLLED IN CPIMS - OVERALL
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcProportionOfOvcClientsEnrolledInCpimsOverall} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCProportionOfOvcClientsEnrolledInCPIMSOverall;
