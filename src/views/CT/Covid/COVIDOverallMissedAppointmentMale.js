import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as covidOverallMissedAppointmentSelectors from '../../../selectors/CT/Covid/covidOverallMissedAppointment';
import * as covidEverHadInfectionSelectors from '../../../selectors/CT/Covid/covidEverHadInfection';
import { roundNumber } from '../../../utils/utils';

const COVIDOverallMissedAppointmentMale = () => {
    const [covidMaleMissedAppointment, setMaleMissedAppointment] = useState({});

    const overallMissedAppointment = useSelector(covidOverallMissedAppointmentSelectors.getOverallMissedAppointments).overallMissedAppointment;
    const everHadInfection = useSelector(covidEverHadInfectionSelectors.getEverHadInfection).everHadInfection;

    let percentMissedAppointment = overallMissedAppointment && Number(overallMissedAppointment) > 0 ? ((Number(overallMissedAppointment)/Number(everHadInfection))*100) : 0;
    percentMissedAppointment = Math.round((percentMissedAppointment + Number.EPSILON) * 100) / 100;

    let title = `<div class="row" >
        <div class="col-12" style="font-size:40px; font-weight: bold; text-align: center">${roundNumber(percentMissedAppointment)}%</div>
        <div  class="col-12" style="font-size:14px; text-align: center">MALES</div>
        </div>`;
    const data = [{
        y: percentMissedAppointment,
        color: '#14084D'
    }, {
        y: 100 - percentMissedAppointment,
        color: '#f0f0f0'
    }];
    const loadMaleMissedAppointment = useCallback(async () => {
        setMaleMissedAppointment({
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
                                let colors = ["#14084D", "#bbbbbb"];
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
        loadMaleMissedAppointment();
    }, [loadMaleMissedAppointment]);

    return (
        <HighchartsReact highcharts={Highcharts} options={covidMaleMissedAppointment}/>
    );
};

export default COVIDOverallMissedAppointmentMale;

