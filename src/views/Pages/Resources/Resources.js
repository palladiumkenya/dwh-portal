import React from 'react';
import { Card, Button, Menu } from 'semantic-ui-react';

const Resources = ()=>{

let applications = [
    {
        app: 'DWH Portal',
        link: 'https://dwh.nascop.org/#/',
        description:
            'This is the Portal for the Intergrated National Data Warehouse.',
    },
    {
        app: 'SPOT',
        link: 'https://spot.kenyahmis.org/#/',
        description:
            'SPOT (Single point of truth) is the DWAPI upload verification site for DWH.',
    },
    {
        app: 'HIS Portal',
        link: 'https://prod.kenyahmis.org:3001/',
        description:
            'HIS List management portal is a platform where partners can manage information about their supported HIS sites.',
    },
    {
        app: 'Metabase',
        link: 'https://dwh.nascop.org/metabase/',
        description:
            'Metabase is a powerful business intelligence tool that allows you to create visualizations and dashboards for exploring your data.',
    },
    {
        app: 'Apache Superset',
        link: 'https://dwhanalytics.kenyahmis.org/superset/welcome/',
        description:
            'Apache Superset is a modern data exploration and visualization platform. It enables you to create interactive charts, dashboards, and more.',
    },
    {
        app: 'Flex monster',
        link: 'https://dwh.nascop.org:7010/QueryResultsDemo/',
        description:
            'Flexmonster is a web-based pivot table component for interactive data analysis. It lets you slice and dice your data to gain insights plus write your own queries against the datasets.',
    },
    {
        app: 'KenyaHMIS Website',
        link: 'https://kenyahmis.org/',
        description: 'This is the Official website for KenyaHMIS.',
    },
    {
        app: 'DWH Test Portal',
        link: 'https://dwhtest.kenyahmis.org/#/',
        description:
            'This is the test instance portal for the Intergrated National Data Warehouse.',
    },
    {
        app: 'DWH Knowledge base',
        link: 'https://kenyahmis.org/documentation/summary-national-data-warehouse/',
        description: 'All you need to know about The DWH & KeHMIS project.',
    },
];
    return (
        <>
            <Menu fixed="top"></Menu>
            <div style={{ paddingTop: '50px' }}>
                <Card.Group centered>
                    {applications?.map((app, index) => (
                        <Card key={index}>
                            <Card.Content>
                                {/* <Image
									floated="right"
									size="mini"
									src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
								/> */}
                                <Card.Header>{app.app}</Card.Header>
                                {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
                                <Card.Description>
                                    {app?.description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button
                                        basic
                                        color="green"
                                        href={app.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </div>
        </>
    );
}

export default Resources;
