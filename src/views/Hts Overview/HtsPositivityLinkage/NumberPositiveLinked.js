import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const NumberTestedAndPositivity = ({ globalFilter }) => {
    const [numberPositiveLinked, setNumberPositiveLinked] = useState({});

    useEffect(() => {
        loadNumberPositiveLinked();
    }, [globalFilter]);

    const loadNumberPositiveLinked = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/linkageNumberPositive', params);
        const monthNames = {
            1: "JANUARY", 2: "FEBRUARY", 3: "MARCH", 4: "APRIL", 5: "MAY", 6: "JUNE",
            7: "JULY", 8:"AUGUST", 9: "SEPTEMBER", 10: "OCTOBER", 11: "NOVEMBER", 12: "DECEMBER"
        };

        let months = [];
        let positive = [];
        let linked = [];
        let linkage = [];

        for(let i = 0; i < result.length; i++) {
            months.push(monthNames[result[i].month]);
            positive.push(parseInt(result[i].positive, 10));
            linked.push(parseInt(result[i].linked, 10));
            linkage.push(parseFloat(result[i].linkage));
        }

        setNumberPositiveLinked({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            xAxis: [{ categories: months, crosshair: true }],
            yAxis: [
                {
                    title: { text: 'POSITIVE', style: { color: "#252525" } },
                    labels: { format: '{value}', style: { color: "#252525" } },
                    min: 0,
                },
                {
                    title: { text: 'LINKAGE (%)', style: { color: "#252525" } },
                    labels: { format: '{value} %', style: { color: "#252525" } },
                    min: 0,
                    max: 100,
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            legend:{ enabled:false },
            series: [
                { name: 'POSITIVE', data: positive, type: 'column', color: "#2F4050", tooltip: { valueSuffix: ' ' } },
                { name: 'LINKAGE', data: linkage, type: 'spline', color: "#1AB394", tooltip: { valueSuffix: '%' }, dashStyle: 'ShortDot', yAxis: 1 }
            ]
        });
    };

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
