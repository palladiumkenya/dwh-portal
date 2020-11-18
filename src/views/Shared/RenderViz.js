import React, { useEffect, useRef } from 'react';
import * as axios from 'axios';

const { tableau } = window;

function RenderViz(props) {
    const ref = useRef(null);
    useEffect(() => {
        async function loadDashboard() {
            const result = await axios(
                'https://auth.kenyahmis.org/tikiti/api/ticket'
            );
            const url = `https://data.kenyahmis.org/trusted/${result.data}/t/${props.vizd.site}/views/${props.vizd.workbook}/${props.vizd.view}`;
            new tableau.Viz(ref.current, url);
        }

        loadDashboard();
    }, []);
    return (
        <div>
            <h3>{props.vizd.name}</h3>
            <div ref={ref}></div>
        </div>
    );
}

export default RenderViz;
