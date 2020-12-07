import React, { useEffect, useState } from 'react';
import vizzData from '../../Shared/tableauDashboards.json';
import RenderViz from '../../Shared/RenderViz';
import { Card, CardBody, CardHeader } from 'reactstrap';

function CALHIVOptimization() {
    const [views, setViews] = useState([]);
    useEffect(() => {
        setViews(vizzData);
    }, []);

    return (

        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CALHIV OPTIMIZATION
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            {views.filter(x => x.section === 'CALHIV Optimization').map((v, index) => (
                                <div key={index}>
                                    <RenderViz vizzView={v}/>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CALHIVOptimization;
