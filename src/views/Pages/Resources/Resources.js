import React from 'react';
import { Card, Button, Menu, Icon, Image } from 'semantic-ui-react';
import logo from '../../../assets/img/brand/dwh2.png';
import spot from '../../../assets/img/brand/spot.png';
import metabase from '../../../assets/img/brand/metabase.png';
import superset from '../../../assets/img/brand/superset.png';
import kenyahmis from '../../../assets/img/brand/KeHMIS.png';
import flexmonster from '../../../assets/img/brand/flexmonster.png';

const Resources = ()=>{

let applications = [
    {
        app: 'DWH Portal',
        link: 'https://dwh.nascop.org/#/',
        description:
            'This is the Portal for the Intergrated National Data Warehouse.',
        logo: logo,
    },
    {
        app: 'SPOT',
        link: 'https://spot.kenyahmis.org/#/',
        description:
            'SPOT (Single point of truth) is the DWAPI upload verification site for DWH.',
        logo: spot,
    },
    {
        app: 'HIS Sites Portal',
        link: 'https://prod.kenyahmis.org:3001/',
        description:
            'HIS List management portal is a platform where partners can manage information about their supported HIS sites.',
        logo: kenyahmis,
    },
    {
        app: 'Metabase',
        login: true,
        link: 'https://dwh.nascop.org/metabase/',
        description:
            'Metabase is a powerful business intelligence tool that allows you to create visualizations and dashboards for exploring your data.',
        logo: metabase,
    },
    {
        app: 'Apache Superset',
        login: true,
        link: 'https://dwhanalytics.kenyahmis.org/superset/welcome/',
        description:
            'Apache Superset is a modern data exploration and visualization platform. It enables you to create interactive charts, dashboards, and more.',
        logo: superset,
    },
    {
        app: 'Flex monster',
        login: true,
        link: 'https://dwh.nascop.org:7010/QueryResultsDemo/',
        description:
            'Flexmonster is a web-based pivot table component for interactive data analysis. It lets you slice and dice your data to gain insights plus write your own queries against the datasets.',
        logo: flexmonster,
    },
    {
        app: 'KenyaHMIS Website',
        link: 'https://kenyahmis.org/',
        description: 'This is the Official website for KenyaHMIS.',
        logo: kenyahmis,
    },
    {
        app: 'DWH Knowledge base',
        link: 'https://kenyahmis.org/documentation/summary-national-data-warehouse/',
        description: 'All you need to know about The DWH & KeHMIS project.',
        logo: kenyahmis,
    },
    {
        app: 'DWH Test Portal',
        link: 'https://dwhtest.kenyahmis.org/#/',
        description:
            'This is the test instance portal for the Intergrated National Data Warehouse.',
        logo: logo,
    },
    {
        app: 'SPOT Test',
        link: 'https://spotstaging.kenyahmis.org/',
        description:
            'Test instance for SPOT (Single point of truth) which is the DWAPI upload verification site for DWH.',
        logo: spot,
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
                                <Image
									floated="right"
									size="tiny"
									src={app.logo}
								/>
                                <Card.Header>
                                    {app.app}{' '}
                                    {app.login ? <Icon name={'lock'} /> : ''}
                                </Card.Header>
                                {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
                                <Card.Description>
                                    {app?.description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {/* <iframe
                                    title={`Preview-${app.app}`}
                                    src={app.link}
                                    width="100%"
                                    height="150"
                                    frameBorder="0"
                                    allowFullScreen
                                /> */}
                                <div className="ui two buttons">
                                    <Button
                                        animated
                                        basic
                                        color="green"
                                        href={app.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button.Content hidden>
                                            <Icon name="globe" />
                                        </Button.Content>
                                        <Button.Content visible>
                                            Open
                                        </Button.Content>
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
