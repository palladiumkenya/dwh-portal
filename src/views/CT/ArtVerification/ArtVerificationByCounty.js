import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as verifySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';
import * as currentOnArtByCountySelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtVerifiedByCounty';
import { roundNumber } from '../../../utils/utils';


const ArtVerificationByCounty = () => {
    const [currentOnArtByCountyChart, setCurrentOnArtByCountyChart] = useState({});
    const currentOnArtByCountyData = useSelector(
        currentOnArtByCountySelectors.getCurrentOnArtByCounty
    );

    const loadCurrentOnArtByCountyChart = useCallback(async () => {
        setCurrentOnArtByCountyChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: currentOnArtByCountyData.counties,
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: '' } }],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                formatter: function () {
                    return (
                        `<span style="font-size:10px">${this.x}</span><table>`+ 
                        `<tr><td style="padding:0">${this.points[0].series.name}: </td>` +
                        `<td style="padding:0"><b>${this.points[0].y}</b> </td></tr>`+ 
                        `<tr><td style="padding:0">${this.points[1].series.name}: </td>` +
                        `<td style="padding:0"><b>${this.points[1].y}</b> </td></tr></table>`+
                        roundNumber(currentOnArtByCountyData.verifiedPerc[
                            this.points[0].point.index
                        ])

                         + '% Verified'
                    );
                        },
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
//                     tooltip: {
//                         footerFormat: ' ({point.percentage:.0f}%)',
//                     },
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        crop: false,
                        overflow: 'none',
                    },
                },
            },
            series: [
                {
                    name: 'TX CURR',
                    data: currentOnArtByCountyData.currentOnArt,
                    color: '#01058A',
                    type: 'column',
                },
                {
                    name: 'VERIFIED CLIENTS',
                    data: currentOnArtByCountyData.CurrentOnArtVerified,
                    color: '#1AB394',
                    type: 'column',
//                    dataLabels: {
//                        enabled: true,
//                        crop: false,
//                         formatter: function () {
//                             return (
//                                 roundNumber(
//                                     currentOnArtByCountyData.verifiedPerc[
//                                         this.point.index
//                                     ]
//                                 ) + '%'
//                             );
//                         },
//                    },
                },
            ],
        });
    }, [currentOnArtByCountyData]);

    useEffect(() => {
        loadCurrentOnArtByCountyChart();
    }, [loadCurrentOnArtByCountyChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART VERIFICATION BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={currentOnArtByCountyChart}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationByCounty;
