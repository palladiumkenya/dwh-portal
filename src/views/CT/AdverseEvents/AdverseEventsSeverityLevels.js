import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as adverseEventsReportedWithSeverityLevelsSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsReportedWithSeverityLevels';

const AdverseEventsSeverityLevels = () => {
    const [severityLevels, setSeverityLevels] = useState({});
    const adverseEventsReportedWithSeverityLevels = useSelector(adverseEventsReportedWithSeverityLevelsSelectors.getAdverseEventsReportedWithSeverityLevels);

    const loadSeverityLevels = useCallback(async () => {        
        setSeverityLevels({
            title: { text: '' },
            xAxis: [{ categories: adverseEventsReportedWithSeverityLevels.categories, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }, stackLabels: { enabled: true, style: { fontWeight: 'bold', color: "#808080" }}}],
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            tooltip: { shared: true, headerFormat: '<b>{point.x}</b><br/>', pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}' },
            plotOptions: { column: { stacking: 'normal'}},
            series: [
                { data: adverseEventsReportedWithSeverityLevels.data[3], name: 'UNDOCUMENTED', type: 'column', color: "#2F4050" },
                { data: adverseEventsReportedWithSeverityLevels.data[2], name: 'SEVERE', type: 'column', color: "#E15759" },
                { data: adverseEventsReportedWithSeverityLevels.data[1], name: 'MODERATE', type: 'column', color: "#F7ED00" },
                { data: adverseEventsReportedWithSeverityLevels.data[0], name: 'MILD', type: 'column', color: "#1AB394" },
            ]
        });
    }, [adverseEventsReportedWithSeverityLevels]);

    useEffect(() => {
        loadSeverityLevels();
    }, [loadSeverityLevels]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        REPORTED ADVERSE EVENTS WITH SEVERITY LEVELS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={severityLevels} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AdverseEventsSeverityLevels;
