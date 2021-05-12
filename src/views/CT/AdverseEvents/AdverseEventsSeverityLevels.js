import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { formatNumber } from './../../../utils/utils';
import { useSelector } from 'react-redux';
import * as adverseEventsReportedWithSeverityLevelsSelectors from '../../../selectors/CT/AdverseEvents/adverseEventsReportedWithSeverityLevels';

const AdverseEventsSeverityLevels = ({ tab }) => {
    const [severityLevels, setSeverityLevels] = useState({});
    const methodCalled = tab === 'adult' ? adverseEventsReportedWithSeverityLevelsSelectors.getAdverseEventsReportedWithSeverityLevels
        : adverseEventsReportedWithSeverityLevelsSelectors.getAdverseEventsReportedWithSeverityLevelsCalHIV;
    const adverseEventsReportedWithSeverityLevels = useSelector(methodCalled);
    const n = _.sum(adverseEventsReportedWithSeverityLevels.data[0]) +
        _.sum(adverseEventsReportedWithSeverityLevels.data[1]) +
        _.sum(adverseEventsReportedWithSeverityLevels.data[2]) +
        _.sum(adverseEventsReportedWithSeverityLevels.data[3]);

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
