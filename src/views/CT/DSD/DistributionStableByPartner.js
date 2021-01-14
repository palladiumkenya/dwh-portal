import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { capitalize, getAll } from '../../Shared/Api';
import moment from "moment";

const DistributionStableByPartner = () => {
    const filters = useSelector(state => state.filters);
    const [distributionStableByPartner, setDistributionStableByPartner] = useState({});

    const loadTxCurrDistributionByPartner = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):'',
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const partners = [];
        const stable = [];

        const result = await getAll('care-treatment/dsdStabilityStatusByPartner', params);
        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].partner);
            stable.push(result[i].stable);
        }

        setDistributionStableByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: partners.map(p => capitalize(p)),
                crosshair: true,
                title: {
                    text: 'Service Delivery Partner'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of Patients'
                }
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [{
                name: 'Number of Patients',
                color: "#485969",
                data: stable
            }]
        });
    }, [filters]);

    useEffect(() => {
        loadTxCurrDistributionByPartner();
    }, [loadTxCurrDistributionByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DISTRIBUTION OF STABLE PATIENTS BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={distributionStableByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default DistributionStableByPartner;
