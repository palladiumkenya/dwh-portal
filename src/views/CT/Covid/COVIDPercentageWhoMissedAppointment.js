import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDOverallMissedAppointment = Loadable({ loader: () => import('./COVIDOverallMissedAppointment'), loading: Loading, delay: LOADING_DELAY });
const COVIDOverallMissedAppointmentMale = Loadable({ loader: () => import('./COVIDOverallMissedAppointmentMale'), loading: Loading, delay: LOADING_DELAY });
const COVIDOverallMissedAppointmentFemale = Loadable({ loader: () => import('./COVIDOverallMissedAppointmentFemale'), loading: Loading, delay: LOADING_DELAY });

const COVIDPercentageWhoMissedAppointment = () => {
    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PERCENTAGE OF PLHIV WHO MISSED APPOINTMENT DUE TO COVID-19 INFECTION
            </CardHeader>
            <CardBody className="">
                <div className={"row"}>
                    <div className="col-4">
                        <COVIDOverallMissedAppointment />
                    </div>

                    <div className="col-4">
                        <COVIDOverallMissedAppointmentMale />
                    </div>

                    <div className="col-4">
                        <COVIDOverallMissedAppointmentFemale />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDPercentageWhoMissedAppointment;

