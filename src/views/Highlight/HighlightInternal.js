import { useEffect, useState } from 'react';
import axios from 'axios';
import { DWH_API_URL } from '../../constants';

const HighlightInternal = () => {
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

export default HighlightInternal
