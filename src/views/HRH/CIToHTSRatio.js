import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getHtsProvidersByCounty } from '../../selectors/HRH/practitionersCountByCountyQualification';

const DistributionHTSCI = () => {
    const htsProvidersByCounty = useSelector(getHtsProvidersByCounty);
    const caseIdentificationToHTSProvidersRatioByCounty = {
        title: { text: 'Average tested by County' },
        subtitle: { text: 'Source: NASCOP HRIS' },
        xAxis: [{ categories: htsProvidersByCounty.counties, crosshair: true }],
        yAxis: [{ title: { text: 'CI to HTS Providers Ratio' }}],
        tooltip: { shared: true },
        legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, floating: true, borderWidth: 1 },
        series: [
            { name: 'CI to HTS Providers Ratio', type: 'spline', data: htsProvidersByCounty.caseToCountRatio, color: "#E06F07" }
        ]
    };
    return (
        <Card>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={caseIdentificationToHTSProvidersRatioByCounty} />
            </CardBody>
        </Card>
    );
};

export default DistributionHTSCI;
