import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import * as covidSymptomaticInfectionsSelectors from '../../../selectors/CT/Covid/covidSymptomaticInfections';
import { formatNumber, roundNumber } from '../../../utils/utils';
import * as covidEverHadInfectionSelectors from '../../../selectors/CT/Covid/covidEverHadInfection';
import DataCard from '../../Shared/DataCard';
import moment from 'moment';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HCSoldGauge from 'highcharts/modules/solid-gauge';
import * as ChartModuleMore from 'highcharts/highcharts-more.js';

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);

const COVIDPLHIVWhoHadSymptomaticInfection = () => {
    const [covidPlhivWhoHadSymptomaticInfection, setCovidPlhivWhoHadSymptomaticInfection] = useState({});

    const symptomaticInfections = useSelector(covidSymptomaticInfectionsSelectors.getSymptomaticInfections).symptomaticInfections;
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;
    let percent = Number(symptomaticInfections) > 0 ? ((Number(symptomaticInfections) / Number(everHadInfection)) * 100) : 0;
    percent = Math.round((percent + Number.EPSILON) * 100) / 100;

    const label = 'PLHIV WHO HAVE HAD SYMPTOMATIC COVID-19 INFECTION';


    let title = `<div class="row" style="">
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align:center;">${formatNumber(symptomaticInfections)}</div>
        <div class="col-12" style="font-size:18px; text-align:center;">AS AT ${moment().startOf('month').subtract(1, 'month').format('MMM YYYY')}</div>
    </div>`;

    const options = {
        chart: {
            type: 'solidgauge',
        },
        exporting: {
            enabled: false
        },
        title: {
            useHTML: true,
            text: `
          <div class="primary-card-body-subtitle-red" style="font-size:15px;">
                ${percent ? percent : 0}%
          </div>
        `,
            align: 'center',
            verticalAlign: 'middle',
            y: -40,
            x: 0
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: 290,
                    innerRadius: 270,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0
                }
            ]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    borderColor: '#ffffff',
                    x: 0,
                    y: -35
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: false,
            }
        },
        series: [
            {
                name: 'PLHIV WHO HAVE HAD SYMPTOMATIC COVID-19 INFECTION',
                type: 'solidgauge',
                data: [
                    {
                        color: 'green',
                        radius: '100%',
                        innerRadius: '93%',
                        y: percent ? percent : 0
                    }
                ],
                dataLabels: {
                    useHTML: true,
                    format: title
                }
            }
        ],
        credits: { enabled: false },
        tooltip: { enabled: false }
    };
    // const loadCovidPlhivWhoHadSymptomaticInfection = useCallback(async () => {
    //     setCovidPlhivWhoHadSymptomaticInfection(options);
    // }, [symptomaticInfections]);
    //
    // useEffect(() => {
    //     loadCovidPlhivWhoHadSymptomaticInfection();
    // }, [loadCovidPlhivWhoHadSymptomaticInfection]);


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
            <p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>{label}</p>
        </div>
    );
};

export default COVIDPLHIVWhoHadSymptomaticInfection;
