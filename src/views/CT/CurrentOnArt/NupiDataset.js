import { set } from 'lodash';
import React, { useEffect, useState, useCallback } from 'react';
import ReactExport from 'react-export-excel';
import { getAll } from '../../Shared/Api';
import Loading from '../../Shared/Loading';
import { Button } from 'semantic-ui-react';
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dictionary = [
    {
        Indicator: 'DateQueried',
        Description: 'The date the query was executed',
    },
    {
        Indicator: 'MFLCode',
        Description: 'Master Facility List code',
    },
    {
        Indicator: 'Facility',
        Description: 'Name of the facility',
    },
    {
        Indicator: 'SDIP',
        Description: 'Service delivery partner supporting the facility',
    },
    {
        Indicator: 'Agency',
        Description: 'Supporting PEPFAR Agency',
    },
    {
        Indicator: 'EMR',
        Description: 'The EMR used to capture the patient record ',
    },
    {
        Indicator: 'FacilityType',
        Description: 'Classify if the facility is an EMR or a non-EMR site',
    },
    {
        Indicator: 'County',
        Description: 'County where the facility is situated',
    },
    {
        Indicator: 'Latest Upload Date',
        Description: 'The date a facility last uploaded data to DWH',
    },
    {
        Indicator: 'KHIS TXCurr Latest Reporting Month',
        Description:
            'The year and month (YYYYMM) when a facility last updated CurrentOnART_Total numbers in KHIS. Please note that this date should not be more than 6 months from the reporting date',
    },
    {
        Indicator: 'KHIS TXCurr',
        Description:
            'This represents the Current_onART_Total indicator reported for a given facility ',
    },
    {
        Indicator: '# MOH Central Registry Verified',
        Description:
            'Represents  the total number of  ART patients that have been verified in Central registry',
    },
    {
        Indicator: '% MOH Central Registry verified of KHIS TXCurr',
        Description:
            'Proportion of patients verified in MoH Central registry using KHIS TXCurr denominator',
    },
    {
        Indicator: '# MOH UPI for non-art clients',
        Description:
            'Represents  the total number of  non-ART patients that have been verified in Central registry',
    },
    {
        Indicator: 'KHIS TXCurr (EMR Sites)',
        Description:
            'The CurrentOnART_Total indicator as reported in KHIS in the latest reporting month',
    },
    {
        Indicator: '# MOH Central Registry Verified (EMR Sites)',
        Description:
            'The number of patients verified in Central Registry and whose CCC numbers and MFLCodes match in DWH',
    },
    {
        Indicator: '# DWH verified & Matched',
        Description: 'The number of Active patients verified and sent to DWH',
    },
    {
        Indicator: '% DWH verified of KHIS TXCurr',
        Description:
            'The proportion of the patients in DWH verified : Number DWH Verified/ DWH TXCurr',
    },
    {
        Indicator: '# Children DWH verified & Matched',
        Description:
            'The number of Active Children (<18 years) verified and sent to DWH',
    },
    {
        Indicator: '# Children TXCurr  DWH',
        Description: 'The number of Active children (<18 years ) in DWH',
    },
    {
        Indicator: '% Children DWH verified of Chidren TXCurr DWH',
        Description:
            'The proportion of the Children (<18 years )  in DWH verified : Children DWH Verified/ Children DWH TXCurr',
    },
    {
        Indicator: '# Adults DWH verified & Matched',
        Description:
            'The number of Active Adults (>=18 years) verified and sent to DWH',
    },
    {
        Indicator: '# Adults TXCurr DWH',
        Description: 'The number of Active Adults (>=18 years ) in DWH',
    },
    {
        Indicator: '% Adults DWH verified of Adults TXCurr DWH',
        Description:
            'The proportion of the Adults  (>=18 years)  in DWH verified : Adults DWH Verified/ Adults DWH TXCurr',
    },
    {
        Indicator: '#Unverified',
        Description:
            'The total number of ART Patients who have NOT yet been verified',
    },
    {
        Indicator: 'SurveysReceived',
        Description:
            'The total number of unverified patients who have been been taken through the survey ',
    },
    {
        Indicator: 'Pendingsurveys',
        Description:
            'The total number of unverified patients who have NOT yet been taken through the PSurvey',
    },
];

const NupiDataset = () => {
    const [nupiDataset, setNupiDataset] = useState([]);

    const loadDataset = useCallback(async () => {
        if (nupiDataset.length === 0) {
            let attempts = 0;
            while (attempts < 2) {
                try {
                    let data = await getAll('care-treatment/nupiDataset', {});
                    setNupiDataset(data);
                    break; // Exit the loop if successful
                } catch (e) {
                    console.log(e);
                    attempts++;
                }
            }
        }
    });

    useEffect(() => {
        loadDataset();
    }, [loadDataset]);

    return (
        <>
            {nupiDataset.length === 0 ? (
                <Loading />
            ) : (
                <ExcelFile
                    filename={`NUPI dataset ${moment().format(
                        'DD-MM-YYYY HH:mm:ss a'
                    )}`}
                    element={<Button positive>Export NUPI Dataset</Button>}
                >
                    <ExcelSheet data={dictionary} name="Dictionary">
                        <ExcelColumn label="Indicator" value="Indicator" />
                        <ExcelColumn label="Description" value="Description" />
                    </ExcelSheet>
                    <ExcelSheet data={nupiDataset} name="Data">
                        <ExcelColumn label="DateQueried" value="DateQueried" />
                        <ExcelColumn label="MFLCode" value="MFLCode" />
                        <ExcelColumn label="Facility" value="Facility" />
                        <ExcelColumn label="SDIP" value="SDIP" />
                        <ExcelColumn label="Agency" value="Agency" />
                        <ExcelColumn label="EMR" value="EMR" />
                        <ExcelColumn
                            label="FacilityType"
                            value="FacilityType"
                        />
                        <ExcelColumn label="County" value="County" />
                        <ExcelColumn
                            label="LatestDateUploaded"
                            value="LatestDateUploaded"
                        />
                        <ExcelColumn
                            label="KHIS TXCurr Latest Reporting Month"
                            value="KHIS TXCurr Latest Reporting Month"
                        />
                        <ExcelColumn label="KHIS TXCurr" value="KHIS TXCurr" />
                        <ExcelColumn
                            label="# MOH Central Registry Verified"
                            value="# MOH Central Registry Verified"
                        />
                        <ExcelColumn
                            label="% MOH Central Registry verified of KHIS TXCurr"
                            value="% MOH Central Registry verified of KHIS TXCurr"
                        />
                        <ExcelColumn
                            label="# MOH UPI for non-art clients"
                            value="# MOH UPI for non-art clients"
                        />
                        <ExcelColumn
                            label="# DWH verified & Matched"
                            value="# DWH verified & Matched"
                        />
                        <ExcelColumn
                            label="% DWH verified of KHIS TXCurr"
                            value="% DWH verified of KHIS TXCurr"
                        />
                        <ExcelColumn
                            label="# Children DWH verified & Matched"
                            value="# Children DWH verified & Matched"
                        />
                        <ExcelColumn
                            label="# Children TXCurr  DWH"
                            value="# Children TXCurr  DWH"
                        />
                        <ExcelColumn
                            label="% Children DWH verified of Chidren TXCurr DWH"
                            value="% Children DWH verified of Chidren TXCurr DWH"
                        />
                        <ExcelColumn
                            label="# Adults DWH verified & Matched"
                            value="# Adults DWH verified & Matched"
                        />
                        <ExcelColumn
                            label="# Adults TXCurr DWH"
                            value="# Adults TXCurr DWH"
                        />
                        <ExcelColumn
                            label="% Adults DWH verified of Adults TXCurr DWH"
                            value="% Adults DWH verified of Adults TXCurr DWH"
                        />
                        <ExcelColumn label="#Unverified" value="#Unverified" />
                        <ExcelColumn
                            label="SurveysReceived"
                            value="SurveysReceived"
                        />
                        <ExcelColumn
                            label="Pendingsurveys"
                            value="Pendingsurveys"
                        />
                        <ExcelColumn
                            label="# Patients verified but with survey"
                            value="# Patients verified but with survey"
                        />
                        <ExcelColumn
                            label="# Patients with survey but not verified among DWH TXCurr"
                            value="# Patients with survey but not verified among DWH TXCurr"
                        />
                        <ExcelColumn
                            label=" # Patients with survey but no nupi in Non-EMR Sites"
                            value=" # Patients with survey but no nupi in Non-EMR Sites"
                        />
                        <ExcelColumn
                            label="# Patients with surveys and with nupi in all sites"
                            value="# Patients with surveys and with nupi in all sites"
                        />
                    </ExcelSheet>
                </ExcelFile>
            )}
        </>
    );
};

export default NupiDataset;
