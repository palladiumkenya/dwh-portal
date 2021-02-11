import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const VLUptakeByPartner = () => {
    const filters = useSelector(state => state.filters);
    const [vlUptakeByPartner, setVLUptakeByPartner] = useState({});

    const loadVLUptakeByPartner = useCallback(async () => {
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
        const result = await getAll('care-treatment/vlUptakeByPartner', params);

        let partners = [];
        let vlUptakeByPartner = [];

        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].partner);
            vlUptakeByPartner.push({
                y: Number(((parseInt(result[i].vlDone)/parseInt(result[i].txCurr))*100).toFixed(0)),
                absoluteY: result[i].vlDone.toLocaleString('en'),
            });
        }

        setVLUptakeByPartner({
            title: { text: '' },
            xAxis: [{ categories: partners, title: { text: 'Service Delivery Partner' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y} %' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: vlUptakeByPartner, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})'} },
            ]
        });
    }, [filters]);

    useEffect(() => {
        loadVLUptakeByPartner();
    }, [loadVLUptakeByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlUptakeByPartner} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VLUptakeByPartner;
