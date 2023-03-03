import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as prepSelector from '../../../selectors/HTS/Prep/ctPrepAgeSexSelector';


const PrEPContinuityByAgeSex = () => {
    const filters = useSelector(state => state.filters);
    let prepAgeSex = useSelector(prepSelector.getCTPrepAgeSex)
    const [prepContinuityByAgeSex, setPrepContinuityByAgeSex] = useState({});

    const loadPrepContinuityByAgeSex = useCallback(async () => {
        setPrepContinuityByAgeSex({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: prepAgeSex.agegrp,
                crosshair: true,
                title: {
                    text: 'AGE GROUP',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS',
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'MALE',
                    data: prepAgeSex.iniListM,
                    color: '#14084D',
                },
                {
                    name: 'FEMALE',
                    data: prepAgeSex.iniListF,
                    color: '#EA4C8B',
                },
            ],
        });
    }, [prepAgeSex]);

    useEffect(() => {
        loadPrepContinuityByAgeSex();
    }, [loadPrepContinuityByAgeSex]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                CONTINUITY IN PREP BY AGE AND SEX
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepContinuityByAgeSex}/>
            </CardBody>
        </Card>
    );
};

export default PrEPContinuityByAgeSex;
