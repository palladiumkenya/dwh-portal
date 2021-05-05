import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = ({ error }) => {
    return (
        error ?  <p>An error occured while loading</p> : <Spinner color="danger" />
    );
};

export default Loading;
