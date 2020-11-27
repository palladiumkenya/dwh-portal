import React from 'react';
import { Card, CardBody } from 'reactstrap';

const SectionHeader = ({ title, description}) => {
    return (
        <>
            <br></br>
            <div className="strip"></div>
            <Card className="pageHeading_reporting">
                <CardBody>
                    <div className="row">
                        <div className="col-5">
                            <div className="row">
                                <div className="col-6">
                                    <div className="reporting-rates-card-title">
                                        {title}
                                    </div>
                                </div>
                                <div className="col-1">
                                    <div className="reporting-rates-card-separator"></div>
                                </div>
                                <div className="col-5">
                                    <div className="reporting-rates-card-overview">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default SectionHeader;
