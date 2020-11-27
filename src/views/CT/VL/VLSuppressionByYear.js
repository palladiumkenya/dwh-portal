import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLSuppressionByYear = () => {
    const filters = useSelector(state => state.filters);
    const [vlSuppressionByYear, setVLSuppressionByYear] = useState({});

    const loadVLSuppressionByYear = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const retentionCategories = ['3 MONTHS', '6 MONTHS', '12 MONTHS', '24 MONTHS'];
        const yearCategories = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
        const result = await getAll('care-treatment/vlSuppressionByYear', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < retentionCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < yearCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let yearIndex = yearCategories.indexOf(result[i].year);
            if(yearIndex === -1) { // unsupported
                continue;
            }
            data[0][yearIndex] = data[0][yearIndex] + parseInt(result[i].retention3Months);
            data[1][yearIndex] = data[1][yearIndex] + parseInt(result[i].retention6Months);
            data[2][yearIndex] = data[2][yearIndex] + parseInt(result[i].retention12Months);
            data[3][yearIndex] = data[3][yearIndex] + parseInt(result[i].retention24Months);
        }
        setVLSuppressionByYear({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: yearCategories,
                crosshair: true
            }],
            yAxis: [{
                min: 0,
                title: { text: 'Percentage of Patients' },
            }],
            tooltip: { shared: true },
            legend: {
                floating: true,
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: '3 MONTHS', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '6 MONTHS', data: data[1], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '12 MONTHS', data: data[2], type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '24 MONTHS', data: data[3], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLSuppressionByYear();
    }, [loadVLSuppressionByYear]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByYear} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByYear;
