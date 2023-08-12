const BASE_URL = 'https://data.bus-data.dft.gov.uk'

export async function getTimetableData(){
    const path = '/api/v1/dataset';

    const searchParams = new URLSearchParams();
    searchParams.set('adminArea', '060,205');
    searchParams.set('noc', 'SCGH,SCLI');
    searchParams.set('limit', '25');
    searchParams.set('offset', '0');
    searchParams.set('search', 'Stagecoach');
    searchParams.set('status', 'published');
    searchParams.set('endDateStart', '2021-01-01T12:45:00');
    searchParams.set('endDateEnd', '2021-01-01T12:45:00');
    searchParams.set('modifiedDate', '2021-01-01T12:45:00');
    searchParams.set('startDateStart', '2021-01-01T12:45:00');
    searchParams.set('startDateEnd', '2021-01-01T12:45:00');
    searchParams.set('dqRag', 'green');
    searchParams.set('bodsCompliance', 'true');

    const headers = {
        accept: 'application/json'
    };

    // const response = await fetch(new URL(path+'?'+searchParams.toString(), BASE_URL), {
    //     method: 'GET',
    //     headers: headers
    // });
    // const body = await response.json()
    // console.log('response', body)

    return {
        "count": 2345,
        "next": "https://data.bus-data.dft.gov.uk/api/v1/dataset/?limit=25&offset=50",
        "previous": "https://data.bus-data.dft.gov.uk/api/v1/dataset/?limit=25&offset=25",
        "results": [
            {
                "id": 1,
                "created": "2021-01-01T12:45:00",
                "modified": "2021-01-01T12:45:00",
                "operatorName": "Stagecoach",
                "noc": [
                    [
                        "BDNY",
                        "CLTL"
                    ]
                ],
                "name": "Stagecoach_Stockport_Manchester City Centre_20200828\"",
                "description": "Stagecoach Manchester",
                "comment": "Automatically detected change in data set",
                "status": "inactive",
                "url": "https://data.bus-data.dft.gov.uk/timetable/dataset/6/download/",
                "extension": "zip",
                "lines": [
                    "1",
                    "10"
                ],
                "firstStartDate": "2020-08-28T00:00:00+00:00",
                "firstEndDate": "2020-11-28T23:59:00+00:00",
                "lastEndDate": "2020-11-28T23:59:00+00:00",
                "adminAreas": [
                    {
                        "atco_code": "060",
                        "name": "Cheshire East"
                    }
                ],
                "localities": [
                    {
                        "gazetter_id": "E0028241",
                        "name": "Abbey Hey"
                    }
                ],
                "dqScore": "100%",
                "dqRag": "green",
                "bodsCompliance": true
            }
        ]
    }
}