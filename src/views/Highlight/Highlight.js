import { useState, useEffect } from 'react';
import { DWH_API_URL } from '../../constants';
import axios from 'axios';

const Highlight = () => {
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        axios.get(`${DWH_API_URL}self-service/monthly-highlight`)
            .then(res => {
                const url = res.data?.url;
                setIframeUrl(url);
            })
            .catch(error => {
                console.error('Error fetching iframe URL:', error);
            });
    }, []);
    console.log(iframeUrl)

    return (
        <iframe
            src={iframeUrl}
            frameBorder={0}
            width={'100%'}
            height={800}
            allowTransparency
        />
    );
}

export default Highlight;
