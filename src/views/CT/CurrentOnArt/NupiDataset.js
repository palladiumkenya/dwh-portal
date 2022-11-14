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
        Indicator: 'Partner',
        Description: 'Service delivery partner supporting the facility',
    },
    {
        Indicator: 'Agency',
        Description: 'Supporting PEPFAR  Agency',
    },
    {
        Indicator: 'EMR',
        Description: 'The EMR used to capture the patient record ',
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
        Indicator: '# Total Verified Central Registry',
        Description:
            'Represents  the total number of patients that have been verified in Central registry and whose CCC numbers and MFLCodes match  in DWH',
    },
    {
        Indicator: '# without CCC No. Central Registry',
        Description:
            'Represent number of clients missing CCC numbers from the  Central registry',
    },
    {
        Indicator: '# with CCC No. Central Registry',
        Description:
            'Represents number of clients with CCC numbers from the Central registry',
    },
    {
        Indicator: 'KHIS TXCurr (EMR Sites)',
        Description:
            'The CurrentOnART_Total indicator as reported in KHIS in the latest reporting month',
    },
    {
        Indicator: '# MOH Central Registry Verified (EMR Sites)',
        Description: 'The number of patients verified in Central Registry ',
    },
    {
        Indicator: '% MOH Central Registry verified of KHIS TXCurr',
        Description:
            'The proportion of the patients verified from Central Registry : Total Number Central Registry/ KHIS TXCurr *100',
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
];


const NupiDataset = () => {
    const [nupiDataset, setNupiDataset] = useState([]);

    const loadDataset = useCallback(async () => {
        if (nupiDataset.length === 0)
            try {
                let data = await getAll('care-treatment/nupiDataset', {});
                setNupiDataset(data)

            } catch (e){
                console.log(e)
            }
    },)
    
    useEffect(() => {
        loadDataset();
    }, [loadDataset]);

    return (
        <>
            {nupiDataset.length === 0 ? (
                <Loading />
            ) : (
                <ExcelFile
                    filename={`Nupidataset ${moment().format(
                        'DD-MM-YYYY HH:mm:ss a'
                    )}`}
                    element={<Button positive>Export Nupi Dataset</Button>}
                >
                    <ExcelSheet data={dictionary} name="Dictionary">
                        <ExcelColumn label="Indicator" value="Indicator" />
                        <ExcelColumn label="Description" value="Description" />
                    </ExcelSheet>
                    <ExcelSheet data={nupiDataset} name="Data">
                        <ExcelColumn label="DateQueried" value="DateQueried" />
                        <ExcelColumn label="MFLCode" value="MFLCode" />
                        <ExcelColumn label="Facility" value="Facility" />
                        <ExcelColumn label="Partner" value="Partner" />
                        <ExcelColumn label="Agency" value="Agency" />
                        <ExcelColumn label="EMR" value="EMR" />
                        <ExcelColumn label="County" value="County" />
                        <ExcelColumn
                            label="LatestDateUploaded"
                            value="LatestDateUploaded"
                        />
                        <ExcelColumn
                            label="KHIS TXCurr Latest Reporting Month"
                            value="KHIS TXCurr Latest Reporting Month"
                        />
                        <ExcelColumn
                            label="# Total Verified Central Registry"
                            value="# Total Verified Central Registry"
                        />
                        <ExcelColumn
                            label="# without CCC No. Central Registry"
                            value="# without CCC No. Central Registry"
                        />
                        <ExcelColumn
                            label="# with CCC No. Central Registry"
                            value="# with CCC No. Central Registry"
                        />
                        <ExcelColumn
                            label="KHIS TXCurr (EMR Sites)"
                            value="KHIS TXCurr (EMR Sites)"
                        />
                        <ExcelColumn
                            label="# MOH Central Registry Verified (EMR Sites)"
                            value="# MOH Central Registry Verified (EMR Sites)"
                        />
                        <ExcelColumn
                            label="% MOH Central Registry verified of KHIS TXCurr"
                            value="% MOH Central Registry verified of KHIS TXCurr"
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
                    </ExcelSheet>
                </ExcelFile>
            )}
        </>
    );

}

export default NupiDataset;