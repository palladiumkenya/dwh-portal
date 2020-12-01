import React, { useEffect, useState } from 'react';
import vizzData from '../../Shared/tableauDashboards.json';
import RenderViz from '../../Shared/RenderViz';
import { Card, CardBody, CardHeader } from 'reactstrap';

function AdultsOptimization() {
    const [views, setViews] = useState([]);
    useEffect(() => {
        setViews(vizzData);
    }, []);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ADULT OPTIMIZATION
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            {views.length > 0 &&
                            views.filter(x => x.section === 'Adult Optimization')
                                .map((view, index) => (
                                    <div key={index}>
                                        <RenderViz vizzView={view}/>
                                    </div>
                                ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default AdultsOptimization;
