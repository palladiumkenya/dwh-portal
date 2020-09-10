import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import DataTable from 'react-data-table-component';

const FacilitiesNewOnArtList = ({ globalFilter }) => {
    const [facilitiesNewOnArt, setFacilitiesNewOnArt] = useState({});

    const loadFacilitiesNewOnArt = async () => {

        const data = [];

        const result = [
            {"year":2020,"month":7,"txNew":"4345","county":"Nairobi","subCounty":"Starehe","facility":"Kenyatta Hospital","partner":"EDARP"},
            {"year":2020,"month":7,"txNew":"3454","county":"Nairobi","subCounty":"Riruta","facility":"Riruta Health Center","partner":"CHS-SHINDA"},
            {"year":2020,"month":7,"txNew":"4352","county":"Nairobi","subCounty":"Kilimani","facility":"Coptic Hospital","partner":"EGPAF"},
            {"year":2020,"month":7,"txNew":"5343","county":"Nairobi","subCounty":"Embakkasi","facility":"Mama Lucy Kibaki Hospital","partner":"Afya-Ziwani"},
            {"year":2020,"month":7,"txNew":"2324","county":"Nairobi","subCounty":"Starehe","facility":"Pumwani Maternity Hospital","partner":"Afya-Nyota"},
            {"year":2020,"month":7,"txNew":"4532","county":"Nairobi","subCounty":"Starehe","facility":"Dandora II Health Center","partner":"CHS-Naishi"},
            {"year":2020,"month":7,"txNew":"2323","county":"Nairobi","subCounty":"Ruaraka","facility":"Ruiru Sub District Hospital","partner":"EDARP"},
            {"year":2020,"month":7,"txNew":"614","county":"Nairobi","subCounty":"Starehe","facility":"Homabay Hospital","partner":"EGPAF"},
            {"year":2020,"month":7,"txNew":"689","county":"Nairobi","subCounty":"Starehe","facility":"Eldoret Hospital","partner":"UMB"},
            {"year":2020,"month":7,"txNew":"659","county":"Nairobi","subCounty":"Starehe","facility":"Manyatta Hospital","partner":"PATH"},
            {"year":2020,"month":7,"txNew":"564","county":"Nairobi","subCounty":"Starehe","facility":"Kipkaren Hospital","partner":"IRDO"},
            {"year":2020,"month":7,"txNew":"414","county":"Nairobi","subCounty":"Starehe","facility":"Tutu Hospital","partner":"EDARP"},
        ];

        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };

        for(let i = 0; i < result.length; i++) {
            data.push({
                county: result[i].county,
                subCounty: result[i].subCounty,
                facility: result[i].facility,
                partner: result[i].partner,
                txNew: parseInt(result[i].txNew, 10),
                monthYear: monthNames[result[i].month] + ' ' + result[i].year.toString(),
            });
        }

        setFacilitiesNewOnArt({
            columns: [
                { name: 'Facility', selector: 'facility', sortable: true},
                { name: 'Partner', selector: 'partner', sortable: true},
                { name: 'County', selector: 'county', sortable: true},
                { name: 'Sub County', selector: 'subCounty', sortable: true},
                { name: 'No of Patients starting ART more than 14 days after diagnosis', selector: 'txNew', sortable: true, right: true},
                { name: 'Month and Year Tested', selector: 'monthYear', sortable: true, right: true },
            ],
            data: data
        });
    };

    useEffect(() => {
        loadFacilitiesNewOnArt();
    }, [globalFilter]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        FACILITIES WITH &gt;20% OF NEWLY DIAGNOSED PATIENTS STARTING ART &gt;14 DAYS AFTER ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <DataTable columns={facilitiesNewOnArt.columns} data={facilitiesNewOnArt.data}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default FacilitiesNewOnArtList;
