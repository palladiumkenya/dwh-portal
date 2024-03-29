import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getHtsProvidersByCounty } from '../../selectors/HRH/practitionersCountByCountyQualification';

const DistributionHTSCI = () => {
    const htsProvidersByCounty = useSelector(getHtsProvidersByCounty);
    const data = [];
    for(let i = 0; i < htsProvidersByCounty.count.length; i++) {
        data.push([
            htsProvidersByCounty.cases[i],
            htsProvidersByCounty.count[i],
        ])
    }
    const distributionOfHTSProvidersAndCaseidentification = {
        title: { text: 'Distribution of HTS providers and case identification' },
        subtitle: { text: 'Source: NASCOP HRIS' },
        xAxis: { title: { text: 'No of HTS providers' }, startOnTick: true, endOnTick: true, showLastLabel: true, min:0 },
        yAxis: { title: { text: 'No of cases identified' }},
        legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
        plotOptions: {
            scatter: {
                marker: { radius: 5, states: { hover: { enabled: true, lineColor: 'rgb(100,100,100)' }}},
                states: { hover: { marker: { enabled: false }}},
                tooltip: { headerFormat: '<b>{series.name}</b><br>', pointFormat: '{point.x} Cases, {point.y} HTS Providers' }
            }
        },
        series: [
            { name: 'Cases & HTS Providers Distribution', color: 'rgba(223, 83, 83, .5)', data: data, type: 'scatter' }
        ]
    };
    return (
        <Card>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={distributionOfHTSProvidersAndCaseidentification} />
            </CardBody>
        </Card>
    );
};

export default DistributionHTSCI;
