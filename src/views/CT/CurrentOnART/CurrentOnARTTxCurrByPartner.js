import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { getAll } from '../../Shared/Api';
import * as _ from 'lodash';

const CurrentOnARTTxCurrByPartner = ({ globalFilter }) => {
    const [txCurrByPartnerList, setTxCurrByPartnerList] = useState({});
    useEffect(() => {
        loadTxCurrByPartnerList();
    }, [globalFilter]);

    const loadTxCurrByPartnerList = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const txCurrAgeDistributionByPartner = await getAll('care-treatment/getTxCurrAgeGroupDistributionByPartner', params);
        const data = [];

        const partners = _.uniqBy(txCurrAgeDistributionByPartner, obj => obj.CTPartner);
        for (let i = 0; i < partners.length; i++) {
            let sumLessThan5 = 0;
            let sumFiveToNine = 0;
            let sumTenTo14 = 0;
            let sumFifteenTo19 = 0;
            let sumTwentyTo24 = 0;
            let sumTwentyFiveTo34 = 0;
            let sumThirtyFiveTo44 = 0;
            let sumFourtyFiveTo49 = 0;
            let sum50plus = 0;
            let sumfemale = 0;
            let summale = 0;

            const lessThan5 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "<1" || obj.ageGroup === "1-4"));
            const fiveToNine = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "5-9"));
            const tenTo14 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "10-14"));
            const fifteenTo19 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "15-19"));
            const twentyTo24 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "20-24"));
            const twentyFiveTo34 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "25-29" || obj.ageGroup === "30-34"));
            const thirtyFiveTo44 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "35-39" || obj.ageGroup === "40-44"));
            const fourtyFiveTo49 = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "45-49"));
            const fiftyplus = txCurrAgeDistributionByPartner.filter(obj => obj.CTPartner === partners[i].CTPartner && (obj.ageGroup === "50+"));

            if (lessThan5.length > 0) {
                sumLessThan5 = lessThan5.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (fiveToNine.length > 0) {
                sumFiveToNine = fiveToNine.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (tenTo14.length > 0) {
                sumTenTo14 = tenTo14.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (fifteenTo19.length > 0) {
                sumFifteenTo19 = fifteenTo19.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (twentyTo24.length > 0) {
                sumTwentyTo24 = twentyTo24.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (twentyFiveTo34.length > 0) {
                sumTwentyFiveTo34 = twentyFiveTo34.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (thirtyFiveTo44.length > 0) {
                sumThirtyFiveTo44 = thirtyFiveTo44.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (fourtyFiveTo49.length > 0) {
                sumFourtyFiveTo49 = fourtyFiveTo49.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            if (fiftyplus.length > 0) {
                sum50plus = fiftyplus.map(item => item.txCurr).reduce((prev, next) => prev + next);
            }

            data.push({
                partner: partners[i].CTPartner,
                lessThan5: sumLessThan5,
                fiveToNine: sumFiveToNine,
                tenTo14: sumTenTo14,
                fifteenTo19: sumFifteenTo19,
                twentyTo24: sumTwentyTo24,
                twentyFiveTo34: sumTwentyFiveTo34,
                thirtyFiveTo44: sumThirtyFiveTo44,
                fourtyFiveTo49: sumFourtyFiveTo49,
                fiftyplus: sum50plus,
                male: summale,
                female: sumfemale,
                total: (sumLessThan5 + sumFiveToNine + sumTenTo14 + sumFifteenTo19 + sumTwentyTo24 + sumTwentyFiveTo34 + sumThirtyFiveTo44 + sumFourtyFiveTo49 + sum50plus)
            });
        }

        setTxCurrByPartnerList({
            columns: [
                {
                    name: 'PARTNER', selector: 'partner', sortable: true
                },
                {
                    name: '<5', selector: 'lessThan5', sortable: true
                },
                {
                    name: '5-9', selector: 'fiveToNine', sortable: true
                },
                {
                    name: '10-14', selector: 'tenTo14', sortable: true
                },
                {
                    name: '15-19', selector: 'fifteenTo19', sortable: true
                },
                {
                    name: '20-24', selector: 'twentyTo24', sortable: true
                },
                {
                    name: '25-34', selector: 'twentyFiveTo34', sortable: true
                },
                {
                    name: '35-44', selector: 'thirtyFiveTo44', sortable: true
                },
                {
                    name: '45-49', selector: 'fourtyFiveTo49', sortable: true
                },
                {
                    name: '50+', selector: 'fiftyplus', sortable: true
                },
                {
                    name: 'MALE', selector: 'male', sortable: true
                },
                {
                    name: 'FEMALE', selector: 'female', sortable: true
                },
                {
                    name: 'TOTAL', selector: 'total', sortable: true
                }
            ],
            data: data
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TX CURR BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable columns={txCurrByPartnerList.columns} data={txCurrByPartnerList.data}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default CurrentOnARTTxCurrByPartner;
