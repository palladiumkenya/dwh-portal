import React from 'react';
import { Card, CardBody } from 'reactstrap';
import CIToHTSRatio from './CIToHTSRatio';
import DistributionDensityHCW from './DistributionDensityHCW';
import DistributionDensityNCK from './DistributionDensityNCK';
import DistributionDensityMPDB from './DistributionDensityMPDB';
import DistributionDensityCOC from './DistributionDensityCOC';
import DistributionHTSCI from './DistributionHTSCI';

const HRH = () => {
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <div>
                <div className="row">
                    <Card className="pageHeading_reporting">
                        <CardBody>
                            <div className="row">
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="reporting-rates-card-title">
                                                HRH
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="row">
                    <div className="col-6">
                        <DistributionDensityHCW></DistributionDensityHCW>
                    </div>
                    <div className="col-6">
                        <DistributionDensityNCK></DistributionDensityNCK>
                    </div>
                    <div className="col-6">
                        <DistributionDensityMPDB></DistributionDensityMPDB>
                    </div>
                    <div className="col-6">
                        <DistributionDensityCOC></DistributionDensityCOC>
                    </div>
                    <div className="col-6">
                        <DistributionHTSCI></DistributionHTSCI>
                    </div>
                    <div className="col-6">
                        <CIToHTSRatio></CIToHTSRatio>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRH;
