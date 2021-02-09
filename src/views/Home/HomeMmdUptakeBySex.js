import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as currentOnArtByAgeSexSelectors from '../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as dsdStabilityStatusByAgeSexSelectors from '../../selectors/CT/Dsd/dsdStabilityStatusByAgeSex';
import { formatNumber, roundNumber } from '../../utils/utils';

const HomeMmdUptakeBySex = () => {
    const [mmdUptakeBySex, setHomeMmdUptakeBySex] = useState({});
    const currentOnArtBySex = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex);
    const mmdBySex = useSelector(dsdStabilityStatusByAgeSexSelectors.getMmdBySex);

    const loadHomeMmdUptakeBySex = useCallback(async () => {
        let data = [
            {
                y: Number(roundNumber((mmdBySex[0]/currentOnArtBySex.currentOnArtMale)*100)),
                absoluteY: formatNumber(mmdBySex[0]),
                color: "#14084D"
            },
            {
                y: Number(roundNumber((mmdBySex[1]/currentOnArtBySex.currentOnArtFemale)*100)),
                absoluteY: formatNumber(mmdBySex[1]),
                color: "#EA4C8B",
            }
        ];
        setHomeMmdUptakeBySex({
            title: { text: '' },
            xAxis: [{ categories: ['Male', 'Female'], crosshair: true }],
            yAxis: [
                { title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}
            ],
            legend: { enabled: false },
            series: [
                { name: 'MMD Uptake', data: data, type: 'column', tooltip: { valueSuffix: ' % ({point.absoluteY})' } },
            ]
        });
    }, [currentOnArtBySex, mmdBySex]);

    useEffect(() => {
        loadHomeMmdUptakeBySex();
    }, [loadHomeMmdUptakeBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Overall MMD Uptake among patients currently on ART by sex
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={mmdUptakeBySex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HomeMmdUptakeBySex;
