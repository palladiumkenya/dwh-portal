import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as adverseEventsActionsByDrugsNewSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsActionsByDrugsNew';

const AdverseEventsActionsByDrugs = ({ tab }) => {
    const [actionsByDrugs, setActionsByDrugs] = useState({});
    const methodCalled = tab === 'adult' ? adverseEventsActionsByDrugsNewSelectors.getAdverseEventsActionsByDrugsNew
        : adverseEventsActionsByDrugsNewSelectors.getAdverseEventsActionsByDrugsNewCalHIV;
    const adverseEventsActionsByDrugs = useSelector(methodCalled);

    const loadActionsByDrugs = useCallback(async () => {
        const series = [];
        for(let i = 0; i < adverseEventsActionsByDrugs.actions.length; i++) {
            series.push(
                { data: adverseEventsActionsByDrugs.data[i], name: adverseEventsActionsByDrugs.actions[i], type: 'column'}
            );
        }
        setActionsByDrugs({
            title: { text: '' },
            xAxis: [{ categories: adverseEventsActionsByDrugs.drugs, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }, stackLabels: { enabled: true, style: { fontWeight: 'bold', color: "#808080" }}}],
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            tooltip: { shared: true, headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
            plotOptions: { column: { stacking: 'normal'}},
            series: series
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

