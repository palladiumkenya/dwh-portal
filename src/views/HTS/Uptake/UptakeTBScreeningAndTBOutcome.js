import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeTBScreeningAndTBOutcome = () => {
    const filters = useSelector(state => state.filters);
    const [screenedTB, setScreenedTB] = useState({});
    const [TBScreeningOutcome, setTBScreeningOutcome] = useState({});

    const loadScreenedTB = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : ''
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/tbScreened', params);
        let NotScreenedTB = null;
        let ScreenedTB = null;
        if(result.length > 0) {
            const notScreenedForTBArray = result.filter(obj => obj.TBSCreening_grp === "Not Screened for TB");
            const screenedForTBArray = result.filter(obj => obj.TBSCreening_grp === "Screened for TB");
            NotScreenedTB = parseInt(notScreenedForTBArray[0].Tested, 10);
            ScreenedTB = parseInt(screenedForTBArray[0].Tested, 10);
        }
        setScreenedTB({
            title: { text: '' },
            plotOptions: { pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y:,.0f})'
                }
            }},
            series: [{ type: 'pie', colorByPoint: true, name: 'Screening for TB', data: [
                { name: 'Not Screened For TB', y: NotScreenedTB, color: "#1AB394", sliced: true, selected: true },
                { name: 'Screened For TB',  y: ScreenedTB, color: "#2F4050" },
            ]}]
        });
    }, [filters]);

    const loadTBScreeningOutcome = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY") : ''
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('hts/tbScreeningOutcomes', params);
        const tbScreeningOutcomes = [];
        let tested = [];
        let positivity = [];
        for (let i = 0; i < result.length; i++) {
            tbScreeningOutcomes.push(result[i].tbScreeningOutcomes);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setTBScreeningOutcome({
            title: { text: '', },
            xAxis: [{ categories: tbScreeningOutcomes, title: { text: 'Outcomes' }, crosshair: true }],
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
        loadScreenedTB();
        loadTBScreeningOutcome();
    }, [loadScreenedTB, loadTBScreeningOutcome]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SCREENED FOR TB
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={screenedTB} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                    Positivity by TB screening outcome
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={TBScreeningOutcome} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeTBScreeningAndTBOutcome;
