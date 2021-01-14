import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageByCounty = () => {
    const filters = useSelector(state => state.filters);
    const [uptakeByCounty, setLinkageByCounty] = useState({});

    const loadLinkageByCounty = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):""
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const counties = [];
        let positive = [];
        let linkage = [];
        const result = await getAll('hts/linkageByCounty', params);
        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].County);
            positive.push(parseInt(result[i].positive, 10));
            linkage.push(Number(parseFloat(result[i].linkage).toFixed(1)));
        }
        setLinkageByCounty({
            title: { text: '', },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'Counties' } }],
            yAxis: [
                { title: { text: 'Number Positive' } },
                { title: { text: 'Linkage (%)' }, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Positive', type: 'column', data: positive, yAxis: 0, color: "#1AB394" },
                { name: 'Linkage', type: 'spline', data: linkage, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: '%' } }
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadLinkageByCounty();
    }, [loadLinkageByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HTS LINKAGE BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByCounty} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LinkageByCounty;
