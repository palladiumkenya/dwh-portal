import React from 'react';
import { Card, CardBody } from 'reactstrap';

const TBHIVHeader = ({ period }) => {
    const getYear = () => {
        if (period) {
            return period.split(',')[0];
        }
        return 2020;
    };
    return (
        <Card className="pageHeading_reporting">
            <CardBody>
                <div className="row">
                    <div className="col-5">
                        <div className="row">
                            <div className="col-6">
                                <div className="reporting-rates-card-title">
                                    TB/HIV - UPTAKE AND OUTCOMES
                                </div>
                            </div>
                            <div className="col-1">
                                <div className="reporting-rates-card-separator"></div>
                            </div>
                            <div className="col-5">
                                <div className="reporting-rates-card-overview"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="reporting-rates-card-year">Year {getYear()}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );

};

export default TBHIVHeader;
