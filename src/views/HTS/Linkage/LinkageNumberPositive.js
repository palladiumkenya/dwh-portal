import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const LinkageNumberPositive = () => {
    const filters = useSelector(state => state.filters);
    const [numberPositiveLinked, setNumberPositiveLinked] = useState({});

    const loadNumberPositiveLinked = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        // params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/linkageNumberPositiveByType', params);
        const result2 = await getAll('hts/linkageNumberPositive', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let positive = [[], []];
        let linked = [];
        let linkage = [];
        for(let i = 0; i < result.length; i++) {
            if(result[i].TestedBefore === 'New') { 
                months.push(monthNames[result[i].month] + ' ' + result[i].year.toString());
                positive[0].push(parseInt(result[i].positive, 10));
            } else {
                positive[1].push(parseInt(result[i].positive, 10));
            }
        }
        for(let i = 0; i < result2.length; i++) {
            linked.push(parseInt(result2[i].linked, 10));
            linkage.push(Number(parseFloat(result2[i].linkage).toFixed(1)));
        }
        months = months.slice(Math.max(months.length - 12, 0));
        positive[0] = positive[0].slice(Math.max(positive[0].length - 12, 0));
        positive[1] = positive[1].slice(Math.max(positive[1].length - 12, 0));
        linked = linked.slice(Math.max(linked.length - 12, 0));
        linkage = linkage.slice(Math.max(linkage.length - 12, 0));
        setNumberPositiveLinked({
            title: { text: '', },
            xAxis: [{ categories: months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Positive' } },
                { title: { text: 'Linkage (%)'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal' } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'New', type: 'column', data: positive[0], color: "#1AB394" },
                { name: 'Retest', type: 'column', data: positive[1], color: "#485969" },
                { name: 'Linkage', type: 'spline', data: linkage, yAxis: 1, color: "#E06F07", tooltip: { valueSuffix: '%' } }
            ]
        });
    }, [filters]);

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

export default LinkageNumberPositive;
