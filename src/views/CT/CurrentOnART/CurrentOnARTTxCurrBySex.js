import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const CurrentOnARTTxCurrBySex = () => {
    const filters = useSelector(state => state.filters);
    const [currentOnARTTxCurrByAgeSex, setCurrentOnARTTxCurrBySex] = useState({});

    const loadCurrentOnARTTxCurrBySex = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/txCurrBySex', params);
        let txCurrMale = 0;
        let txCurrFemale = 0;

        for(let i = 0; i < result.length; i++) {
            if (result[i].Gender === 'Male') {
                txCurrMale = txCurrMale + parseInt(result[i].txCurr);
            }
            if (result[i].Gender === 'Female') {
                txCurrFemale = txCurrFemale + parseInt(result[i].txCurr);
            }
            if (result[i].Gender === 'M') {
                txCurrMale = txCurrMale + parseInt(result[i].txCurr);
            }
            if (result[i].Gender === 'F') {
                txCurrFemale = txCurrFemale + parseInt(result[i].txCurr);
            }
        }

        setCurrentOnARTTxCurrBySex({
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
                    { name: 'Female', y: txCurrFemale, color: "#2F4050" },
                    { name: 'Male', y: txCurrMale, sliced: true, selected: true, color: "#1AB394" },
                ]
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadCurrentOnARTTxCurrBySex();
    }, [loadCurrentOnARTTxCurrBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CURRENT ON ART BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={currentOnARTTxCurrByAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CurrentOnARTTxCurrBySex;
