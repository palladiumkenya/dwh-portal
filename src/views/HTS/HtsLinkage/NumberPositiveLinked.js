import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const NumberTestedAndPositivity = ({ globalFilters }) => {
    const [numberPositiveLinked, setNumberPositiveLinked] = useState({});

    const loadNumberPositiveLinked = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        const result = await getAll('hts/linkageNumberPositive', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };

        let months = [];
        let positive = [];
        let linked = [];
        let linkage = [];

        for(let i = 0; i < result.length; i++) {
            months.push(monthNames[result[i].month] + ' ' + result[i].year.toString());
            positive.push(parseInt(result[i].positive, 10));
            linked.push(parseInt(result[i].linked, 10));
            linkage.push(Number(parseFloat(result[i].linkage).toFixed(1)));
        }

        months = months.slice(Math.max(months.length - 12, 0));
        positive = positive.slice(Math.max(positive.length - 12, 0));
        linked = linked.slice(Math.max(linked.length - 12, 0));
        linkage = linkage.slice(Math.max(linkage.length - 12, 0));

        setNumberPositiveLinked({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: months, crosshair: true, title: { text: 'Months' } }],
            yAxis: [
                {
                    title: { text: 'Number Positive', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                },
                {
                    title: { text: 'Linkage (%)', style: { color: Highcharts.getOptions().colors[0] } },
                    labels: { format: '{value} %', style: { color: Highcharts.getOptions().colors[0] } },
                    min: 0,
                    max: 100,
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [
                { name: 'Number Positive', data: positive, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ' } },
                { name: 'Linkage', data: linkage, type: 'spline', color: "#E06F07", tooltip: { valueSuffix: '%' }, yAxis: 1 }
            ]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadNumberPositiveLinked();
    }, [loadNumberPositiveLinked]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        NUMBER OF POSITIVE PATIENTS WHO ARE LINKED
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={numberPositiveLinked} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NumberTestedAndPositivity;
