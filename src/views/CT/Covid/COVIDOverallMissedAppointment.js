import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidOverallMissedAppointmentSelectors
    from '../../../selectors/CT/Covid/covidOverallMissedAppointment';
import * as covidEverHadInfectionSelectors
    from '../../../selectors/CT/Covid/covidEverHadInfection';
import { formatNumber, roundNumber } from '../../../utils/utils';
import DataCard from '../../Shared/DataCard';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDOverallMissedAppointment = () => {
    const [covidOverallMissedAppointment, setOverallMissedAppointment] = useState({});

    const overallMissedAppointment = useSelector(covidOverallMissedAppointmentSelectors.getOverallMissedAppointments).overallMissedAppointment;
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;

    let percentMissedAppointment = overallMissedAppointment && Number(overallMissedAppointment) > 0 ? ((Number(overallMissedAppointment)/Number(everHadInfection))*100) : 0;
    percentMissedAppointment = Math.round((percentMissedAppointment + Number.EPSILON) * 100) / 100;

    let title = `<div class="row" >
        <div class="col-12" style="font-size:18px; text-align:center;">${roundNumber(percentMissedAppointment)}%</div>`;
    const data = [{
        y: percentMissedAppointment,
        color: '#d32b3a'
    }, {
        y: 100 - percentMissedAppointment,
        color: '#f0f0f0'
    }];
    const loadOverallMissedAppointment = useCallback(async () => {
        setOverallMissedAppointment({
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: 280,
            },
            title: {
                text: title,
                useHTML: true,
                align: 'center',
                verticalAlign: 'middle',
                y: 0
            },
            plotOptions: {
                pie: {
                    dataLabels: false,
                    innerSize: 210,
                    size: 250,
                    point: {
                        events: {
                            mouseOver() {
                                this.originalColor = this.color;
                                let colors = ["#f53447", "#bbbbbb"];
                                this.update({ color: colors[this.index] });
                            },
                            mouseOut(){
                                this.update({ color: this.originalColor });
                            }
                        }
                    }
                }
            },
            series: [{
                data: data
            }],
            credits: {
                enabled: false
            },
            tooltip: { enabled: false },
            exporting: {
                enabled: false
            }
        });
    }, [everHadInfection]);

    useEffect(() => {
        loadOverallMissedAppointment();
    }, [loadOverallMissedAppointment]);
    /*const options = {
        chart: {
            type: "solidgauge",
            height: "70%"
        },
        legend: {
            enabled: true
        },
        title: {
            text: ``
        },

        tooltip: {
            enabled: false,
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "88%",
                    backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0
                }
            ]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    borderColor: '#ffffff',
                    style: {
                        fontSize: '40px'
                    },
                    x: 0,
                    y: -35
                },
                linecap: "round",
                stickyTracking: false,
                rounded: false,
                showInLegend: true
            }
        },

        series: [
            {
                name: "OVERALL",
                type: "solidgauge",
                data: [
                    {
                        color: "#69B34C",
                        radius: "100%",
                        innerRadius: "88%",
                        y: percentMissedAppointment
                    }
                ]
            }
        ]
    };*/

    return (
        <HighchartsReact highcharts={Highcharts} options={covidOverallMissedAppointment}/>
    );
};

export default COVIDOverallMissedAppointment;

