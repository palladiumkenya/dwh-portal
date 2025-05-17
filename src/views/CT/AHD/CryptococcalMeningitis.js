import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as ahdSelectors from '../../../selectors/CT/AHD/ahdSelectors';

const CryptococcalMeningitis = () => {
    const [cryptococcalMeningitisChart, setCryptococcalMeningitisChart] = useState({});
    const cryptococcalMeningitisData = useSelector(ahdSelectors.getAHDIndicators);

    const loadCryptococcalMeningitis = useCallback(async () => {
        setCryptococcalMeningitisChart({
            title: { text: '' },
            xAxis: [{ categories: ['PATIENTS WITH AHD', 'DONE CrAg TEST', 'CrAg POSITIVE', 'DONE CSF CrAg', 'CSF CrAg POS', 'INITIATED CM TREATMENT', 'PATIENTS DUE FOR PRE-EMPTIVE CM THERAPY'], title: { text: 'CrAg' }, crosshair: true }],
            yAxis: [{ title: { text: '' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{point.y:,.0f}{point.text}' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'CrAg', data: [
                        { y: cryptococcalMeningitisData?.AHD },

                        {
                            y: cryptococcalMeningitisData?.DoneCrAgTest,
                            text: cryptococcalMeningitisData?.AHD
                                ? ` (${((cryptococcalMeningitisData.DoneCrAgTest / cryptococcalMeningitisData.AHD) * 100).toFixed(0)}%)`
                                : ''
                        },

                        {
                            y: cryptococcalMeningitisData?.CrAgPositive,
                            text: cryptococcalMeningitisData?.DoneCrAgTest
                                ? ` (${((cryptococcalMeningitisData.CrAgPositive / cryptococcalMeningitisData.DoneCrAgTest) * 100).toFixed(0)}%)`
                                : ''
                        },

                        {
                            y: cryptococcalMeningitisData?.CSFCrAg,
                            text: cryptococcalMeningitisData?.CrAgPositive
                                ? ` (${((cryptococcalMeningitisData.CSFCrAg / cryptococcalMeningitisData.CrAgPositive) * 100).toFixed(0)}%)`
                                : ''
                        },

                        {
                            y: cryptococcalMeningitisData?.CSFCrAgPositive,
                            text: cryptococcalMeningitisData?.CSFCrAg
                                ? ` (${((cryptococcalMeningitisData.CSFCrAgPositive / cryptococcalMeningitisData.CSFCrAg) * 100).toFixed(0)}%)`
                                : ''
                        },

                        {
                            y: cryptococcalMeningitisData?.InitiatedCMTreatment,
                            text: cryptococcalMeningitisData?.CSFCrAgPositive
                                ? ` (${((cryptococcalMeningitisData.InitiatedCMTreatment / cryptococcalMeningitisData.CSFCrAgPositive) * 100).toFixed(0)}%)`
                                : ''
                        },

                        {
                            y: cryptococcalMeningitisData?.PreemtiveCMTheraphy,
                            text: cryptococcalMeningitisData?.InitiatedCMTreatment
                                ? ` (${((cryptococcalMeningitisData.PreemtiveCMTheraphy / cryptococcalMeningitisData.InitiatedCMTreatment) * 100).toFixed(0)}%)`
                                : ''
                        }
                    ],
                type: 'column', color: "#142459" },
            ]
        });
    }, [cryptococcalMeningitisData]);

    useEffect(() => {
        loadCryptococcalMeningitis();
    }, [loadCryptococcalMeningitis]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                CRYPTOCOCCAL MENINGITIS SCREENING & MANAGEMENT
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={cryptococcalMeningitisChart} />
                </div>
            </CardBody>
        </Card>
    );
};

export default CryptococcalMeningitis;
