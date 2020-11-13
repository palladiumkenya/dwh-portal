import React, { useEffect, useState, useCallback } from 'react';
import { getAll } from '../Shared/Api';

const CTHomeFooter = ({ globalFilter }) => {
    const [viralLoadCascade, setViralLoadCascade] = useState({});

    const loadViralLoadCascade = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        let TX_CURR = 0;
        let Eligible4VL = 0;
        let Last12MonthVL = 0;
        let Last12MVLSup = 0;
        const result = await getAll('care-treatment/viralLoadCascade', params);
        TX_CURR = result.TX_CURR;
        Eligible4VL = result.Eligible4VL;
        Last12MonthVL = result.Last12MonthVL;
        Last12MVLSup = result.Last12MVLSup;

        setViralLoadCascade({
            txCurr: TX_CURR,
            eligible4VL: Eligible4VL,
            eligible4VLPercent: parseFloat(((Eligible4VL/TX_CURR)*100).toString()).toFixed(0),
            last12MonthVL: Last12MonthVL,
            last12MonthVLPercent: parseFloat(((Last12MonthVL/TX_CURR)*100).toString()).toFixed(0),
            last12MVLSup: Last12MVLSup,
            last12MVLSupPercent: parseFloat(((Last12MVLSup/TX_CURR)*100).toString()).toFixed(0)
        });
    }, [globalFilter]);

    useEffect(() => {
        loadViralLoadCascade();
    }, [loadViralLoadCascade]);
    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <span className="reporting-rates-overview-text">
                            {viralLoadCascade.eligible4VLPercent} % of the Active on ART clients were eligible for viral loads. To date the viral load uptake is at {viralLoadCascade.last12MonthVLPercent} % while the viral suppresion rate is {viralLoadCascade.last12MVLSupPercent}%
                        </span>
                    </div>
                    <div className="col-6">
                        <div className="reporting-rates-overview-copyright">
                            &copy; 2020 Palladium Group
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTHomeFooter;
