import React, { useEffect, useRef, useState } from 'react';
import * as axios from 'axios';

const { tableau} = window;

function RenderViz(props) {
    const ref = useRef(null);
    const [vizzStatus, setVizzStatus] = useState(" loading...");

    const loadDashboard = () => {
        const options = {
            onFirstInteractive: function() {
                console.log(`loaded ${props.vizzView.name}`)
                setVizzStatus("")
            }
        };

        const result = axios.get('https://auth.kenyahmis.org/tikiti/api/ticket')
            .then(resp => {
                const url = `https://data.kenyahmis.org/trusted/${resp.data}/t/${props.vizzView.site}/views/${props.vizzView.workbook}/${props.vizzView.view}`;
                new tableau.Viz(ref.current, url, options);
            }).catch(err => {
                console.error(err);
            });

    }

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <div>
            <h4>{props.vizzView.name} <span className="smallfont">{vizzStatus}</span></h4>
            <div ref={ref}></div>
        </div>
    );
}

export default RenderViz;
