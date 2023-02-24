import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';

const TestMessage = () => {
    const [show, setShow] = useState(true);

    let currentLocation = window.location.href.split('#')[0];

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    if (!show) {
        return null;
    }

    return (
        <>
            {currentLocation !== 'https://dwh.nascop.org/' &&
            currentLocation !== 'https://prod.kenyahmis.org/' ? (
                <Message warning>
                    <Message.Header>This is the test site</Message.Header>
                    <p>
                        Numbers may vary from those in{' '}
                        <a href={'https://dwh.nascop.org'}>
                            https://dwh.nascop.org
                        </a>
                    </p>
                </Message>
            ) : null}
        </>
    );
};

export default TestMessage;
