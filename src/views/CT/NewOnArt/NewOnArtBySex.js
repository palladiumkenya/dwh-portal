import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const NewOnArtBySex = () => {
    const filters = useSelector(state => state.filters);
    const [newOnArtBySex, setNewOnArtBySex] = useState({});

    const loadNewOnArtBySex = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/txNewBySex', params);
        let txNewMale = 0;
        let txNewFemale = 0;

        for(let i = 0; i < result.length; i++) {
            if (result[i].Gender === 'Male') {
                txNewMale = parseInt(result[i].txNew);
            }
            if (result[i].Gender === 'Female') {
                txNewFemale = parseInt(result[i].txNew);
            }
        }

        setNewOnArtBySex({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: { text: '' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            accessibility: { point: { valueSuffix: '%' } },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name:"New on ART",
                colorByPoint: true,
                data: [
                    { name: 'Female', y: txNewFemale, color: "#2F4050" },
                    { name: 'Male', y: txNewMale, sliced: true, selected: true, color: "#1AB394" },
                ]
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadNewOnArtBySex();
    }, [loadNewOnArtBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        NEW ON ART DISTRIBUTION BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={newOnArtBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtBySex;
