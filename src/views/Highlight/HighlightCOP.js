import React from 'react';
import axios from 'axios';
import { embedDashboard } from "@superset-ui/embedded-sdk";


const supersetUrl = 'https://dwhanalytics.kenyahmis.org'
const supersetApiUrl = supersetUrl + '/api/v1/security'
const dashboardId = "7aa9c6c5-2904-4d6f-87e3-9a36a0b51e6e"

async function getToken() {

    //calling login to get access token
    const login_body = {
        "password": "admin",
        "provider": "db",
        "refresh": true,
        "username": "admin"
    };

    const login_headers = {
        "headers": {
            "Content-Type": "application/json"
        }
    }

    // console.log(supersetApiUrl + '/login')
    const { data } = await axios.post(supersetApiUrl + '/login', login_body, login_headers)
    const access_token = data['access_token']
    // console.log(access_token)


    // Calling guest token
    const guest_token_body = {
        "resources": [
            {
                "type": "dashboard",
                "id": dashboardId,
            }
        ],
        "rls": [],
        "user": {
            "username": "report-viewer",
            "first_name": "report-viewer",
            "last_name": "report-viewer",
        }
    };

    const guest_token_headers = {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + access_token
        }
    }


    // console.log(supersetApiUrl + '/guest_token/')
    // console.log(guest_token_body)
    // console.log(guest_token_headers)
    await axios.post(supersetApiUrl + '/guest_token/', guest_token_body, guest_token_headers).then(dt=>{
        // console.log(dt.data['token'])
        embedDashboard({
            id: dashboardId,  // given by the Superset embedding UI
            supersetDomain: supersetUrl,
            mountPoint: document.getElementById("superset-container"), // html element in which iframe render
            fetchGuestToken: () => dt.data['token'],
            dashboardUiConfig: {
                hideTitle: false,
                hideChartControls: true,
                hideTab: true,
                filters: {
                    expanded: true,
                },
            }
        });
    })

    var iframe = document.querySelector("iframe")
    if (iframe) {
        iframe.style.width = '100%'; // Set the width as needed
        iframe.style.minHeight = '100vw'; // Set the height as needed
    }

}

const HighlightCOP = () => {
    getToken()

    return (
        <>
            <div id="superset-container"></div>
        </>
    )
}

export default HighlightCOP
