import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeMonthsSinceLastTest = () => {
    const filters = useSelector(state => state.filters);
    const [monthsSinceLastTest, setMonthsSinceLastTest] = useState({});

    const loadMonthsSinceLastTest = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYY')
                : moment().subtract(2, 'month').add(10, 'days').format('YYYY'),
            month: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('MM')
                : moment().subtract(2, 'month').add(10, 'days').format('MM'),
            fromDate: filters.fromDate
                ? moment(filters.fromDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(10, 'days')
                      .format('YYYYMM'),
            toDate: filters.toDate
                ? moment(filters.toDate, 'MMM YYYY').format('YYYYMM')
                : moment()
                      .subtract(2, 'month')
                      .add(10, 'days')
                      .format('YYYYMM'),
        };
        // params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/monthsSinceLastTest', params);
        const monthsSinceLastTest = [];
        let tested = [];
        let positivity = [];
        for (let i = 0; i < result.length; i++) {
            monthsSinceLastTest.push(result[i].MonthLastTest);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setMonthsSinceLastTest({
            title: { text: '', },
            xAxis: [{ categories: monthsSinceLastTest, title: { text: 'Months' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Tested' } },
                { title: { text: 'HIV Positivity'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Tested', type: 'column', data: tested, yAxis: 0, color: "#1AB394" },
                { name: 'HIV Positivity', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", dashStyle: 'ShortDot', tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadMonthsSinceLastTest();
    }, [loadMonthsSinceLastTest]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                    MONTHS SINCE LAST TEST

                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={monthsSinceLastTest} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeMonthsSinceLastTest;
