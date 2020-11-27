import React from 'react';
import { Card, CardBody } from 'reactstrap';

const ARVOptimizationHeader = () => {
    return (
        <Card className="pageHeading_reporting">
            <CardBody>
                <div className="row">
                    <div className="col-5">
                        <div className="row">
                            <div className="col-6">
                                <div className="reporting-rates-card-title">
                                    ARV OPTIMIZATION
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
                        <div className="reporting-rates-card-year">Year 2020</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ARVOptimizationHeader;
