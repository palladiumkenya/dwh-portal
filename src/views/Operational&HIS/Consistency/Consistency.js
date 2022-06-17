import React, { useEffect } from 'react';

const Consistency = () => {
    useEffect(() => {
        console.log('Consistency');
    }, []);

    return (
        <>
            {'Consistency'}
        </>
    );
}


export default Consistency;
