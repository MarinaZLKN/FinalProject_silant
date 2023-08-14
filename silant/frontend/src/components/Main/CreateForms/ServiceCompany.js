import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function ServiceCompany( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, technicReq] = React.useState(false);
    const [valueSC, setValueSC] = React.useState('');

    const LINK = 'http://127.0.0.1:8000/api/service_companies/';

    let service_company_name = [];

    async function ReqService(){
        let response = await axios.get(LINK);
        return response.data.results;

    };

    console.log('response.data.results: ', ReqService)

    if(requested === false){
        ReqService().then(data => {setResponse(data)});
        technicReq(true);
    };


    for(let i=0; i < response1.length; i+=1){
        let company = response1[i];
        service_company_name.push(company.name);
    };

    service_company_name.unshift(' ------------------------------------------ ');

    const options = service_company_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleServiceCompanyChange = (event) => {
        setValueSC(event.target.value);
        if('------------------------------------------' === event.target.value){
            onChange('');
        }else{
            for(let i=0; i < response1.length; i+=1){
                let company = response1[i];
                if(company.name === event.target.value){
                    onChange(company.id);
                };
            };
        };
    };

    return(
        <>
            <select value={valueSC} onChange={handleServiceCompanyChange}>
                {options}
            </select>
        </>
    );
}

export default ServiceCompany;