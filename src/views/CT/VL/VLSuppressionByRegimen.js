import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLSuppressionByRegimen = () => {
    const filters = useSelector(state => state.filters);
    const [vlSuppressionByRegimen, setVLSuppressionByRegimen] = useState({});

    const loadVLSuppressionByRegimen = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const suppressionCategories = ['SUPPRESSED', 'LLV', 'HVL'];
        const regimenCategories = ['TLD', 'TLE', 'OTHERS'];
        const result = await getAll('care-treatment/vlSuppressionByRegimen', params);
        let data = [];
        // seed all values sp that missing values default to 0
        for(let i = 0; i < suppressionCategories.length; i++) {
            data[i] = [];
            for(let j = 0; j < regimenCategories.length; j++) {
                data[i][j] = 0;
            }
        }
        for(let i = 0; i < result.length; i++) {
            let suppressionIndex = suppressionCategories.indexOf(result[i].suppression);
            let regimenIndex = regimenCategories.indexOf(result[i].regimen);
            if(suppressionIndex === -1 || regimenIndex === -1) { // unsupported
                continue;
            }
            data[suppressionIndex][regimenIndex] = data[suppressionIndex][regimenIndex] + parseInt(result[i].vlDone);
        }
        setVLSuppressionByRegimen({
            chart: { type: 'column' },
            title: { useHTML: true, text: '&nbsp;' },
            subtitle: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{
                categories: regimenCategories,
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
                { name: 'VS', data: data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: data[1], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'HVL', data: data[2], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLSuppressionByRegimen();
    }, [loadVLSuppressionByRegimen]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL OUTCOMES AMONG CURRENT ON ART PATIENTS BY ART REGIMEN/OPTIMIZATION
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlSuppressionByRegimen} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLSuppressionByRegimen;
