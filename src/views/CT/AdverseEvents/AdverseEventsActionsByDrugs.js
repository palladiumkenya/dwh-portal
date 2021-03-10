import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as adverseEventsActionsByDrugsSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsActionsByDrugs';

const AdverseEventsActionsByDrugs = () => {
    const [actionsByDrugs, setActionsByDrugs] = useState({});
    const adverseEventsActionsByDrugs = useSelector(adverseEventsActionsByDrugsSelectors.getAdverseEventsActionsByDrugs);

    const loadActionsByDrugs = useCallback(async () => {
        setActionsByDrugs({
            title: { text: '' },
            xAxis: [{ categories: adverseEventsActionsByDrugs.categories }],
            yAxis: [{ title: { text: 'Number of Patients' }, stackLabels: { enabled: true, style: { fontWeight: 'bold', color: "#808080" }}}],
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            tooltip: { headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
            plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true }}},
            series: [
                { data: adverseEventsActionsByDrugs.undocumentedVals, name: 'UNDOCUMENTED', type: 'column', color: '#2F4050' },
                { data: adverseEventsActionsByDrugs.severeVals, name: 'SEVERE', type: 'column', color: "#E15759" },
                { data: adverseEventsActionsByDrugs.moderateVals, name: 'MODERATE', type: 'column', color: "#F7ED00" },
                { data: adverseEventsActionsByDrugs.mildVals, name: 'MILD', type: 'column', color: "#1AB394" },
            ]
        });
    }, [adverseEventsActionsByDrugs]);

    useEffect(() => {
        loadActionsByDrugs();
    }, [loadActionsByDrugs]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header">
                ADVERSE EVENTS ACTIONS BY DRUGS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={actionsByDrugs} />
                </div>
            </CardBody>
        </Card>
    );
};
export default AdverseEventsActionsByDrugs;

