import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";

const ServiceDeliveryPartnerHeader = ({ period }) => {
    const getYear = () => {
        if (period) {
            return period.split(',')[0];
        }
        return 2020;
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="pageHeading_reporting">
                    <CardBody>
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="reporting-rates-card-title">
                                            REPORTING RATES
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <div className="reporting-rates-card-separator"></div>
                                    </div>
                                    <div className="col-5">
                                        <div className="reporting-rates-card-overview">
                                            BY PARTNER
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="reporting-rates-card-year">Year { getYear() }</div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ServiceDeliveryPartnerHeader;
