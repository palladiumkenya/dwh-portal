import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDOverallAdmission = Loadable({ loader: () => import('./COVIDOverallAdmission'), loading: Loading, delay: LOADING_DELAY });
const COVIDOverallAdmissionMale = Loadable({ loader: () => import('./COVIDOverallAdmissionMale'), loading: Loading, delay: LOADING_DELAY });
const COVIDOverallAdmissionFemale = Loadable({ loader: () => import('./COVIDOverallAdmissionFemale'), loading: Loading, delay: LOADING_DELAY });

const COVIDAdmissionOfCovid19Symptomatic = () => {

    return (
        <Card className="">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                ADMISSION OF COVID-19 SYMPTOMATIC PATIENTS AMONG PLHIV
            </CardHeader>
            <CardBody className="">
                <div className={"row"}>
                    <div className="col-4">
                        <COVIDOverallAdmission />
                    </div>

                    <div className="col-4">
                        <COVIDOverallAdmissionMale />
                    </div>

                    <div className="col-4">
                        <COVIDOverallAdmissionFemale />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdmissionOfCovid19Symptomatic;
