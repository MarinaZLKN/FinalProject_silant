import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MachineForm.css'

const parseValue = (value) => {
    if (value === "") return null;
    const intValue = parseInt(value);
    return isNaN(intValue) ? value : intValue;
};
const ClaimForm = () => {
  const [claimData, setClaimData] = useState({
    machine: '',
    date_of_failure: '',
    date_of_recovery: '',
    technical_downtime: '',
    operating_time: '',
    description_of_failure: '',
    spare_parts_used: '',
    failure_node: '',
    recovery_method: '',
    service_company: '',
  });
  const [data, setData] = useState({
        machines: [],
        failure_nodes: [],
        recovery_methods: [],
        service_companies: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMachines = await axios.get('http://127.0.0.1:8000/api/machines/');
                const responseFailureNodes = await axios.get('http://127.0.0.1:8000/api/failure_nodes/');
                const responseRecoveryMethods = await axios.get('http://127.0.0.1:8000/api/recovery_methods/');
                const responseServiceCompanies = await axios.get('http://127.0.0.1:8000/api/service_companies/');

                setData({
                    machines: responseMachines.data,
                    failure_nodes: responseFailureNodes.data,
                    recovery_methods: responseRecoveryMethods.data,
                    service_companies: responseServiceCompanies.data,
                });
                console.log('Data to server:', data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    console.log('data >>', data)
   const handleChange = (e) => {
        const { name, value } = e.target;

        const fieldsToInt = [
            'machine',
            'failure_node',
            'recovery_method',
            'service_company',

        ];

        if (fieldsToInt.includes(name) && value !== "") {
            const newValue = parseInt(value, 10);

            if (!isNaN(newValue)) {
                setClaimData(prevMain => ({
                    ...prevMain,
                    [name]: newValue,
                }));
            }
        } else {
            setClaimData(prevMain => ({
                ...prevMain,
                [name]: value,
            }));
        }
    };

    console.log('Date of Failure:', claimData.date_of_failure);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const additionalFormData = {
        machine: parseValue(e.target.machine.value),
        failure_node: parseValue(e.target.failure_node.value),
        recovery_method: parseValue(e.target.recovery_method.value),
        service_company: parseValue(e.target.service_company.value),

      };
        console.log('additionalFormData: ', additionalFormData)

       const postData = {
          ...claimData,
          ...additionalFormData,
       };

        console.log('postData: ', postData)
    axios.post('http://127.0.0.1:8000/api/claims/', postData, {
         headers: {
                    'Content-Type': 'application/json'
                }
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
  };

  return (
      <div className="form-container_main">
          <h2 className="machine-form_h2">Добавить Рекламацию</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-row">
                    <label className="form-label">Machine:</label>
                     <label className="form-label">
                        <select className="option"  name="machine" onChange={handleChange}>
                            {data.machines.map(machine => (
                                <option  key={machine.id} value={machine.id}>{machine.machine_factory_number}</option>
                            ))}
                        </select>
                     </label>
                </div>
              <div className="form-row">
                  <label className="form-label">
                    Data of Failure:
                    <input
                      type="date"
                      name="date_of_failure"
                      value={claimData.date_of_failure}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Date of Recovery:
                    <input
                      type="date"
                      name="date_of_recovery"
                      value={claimData.date_of_recovery}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Technical Downtime:
                    <input
                      type="number"
                      name="technical_downtime"
                      value={claimData.technical_downtime}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Operating Time:
                    <input
                      type="text"
                      name="operating_time"
                      value={claimData.operating_time}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Description of the Failure:
                    <input
                      type="text"
                      name="description_of_failure"
                      value={claimData.description_of_failure}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>

              <div className="form-row">
                    <label className="form-label">Failure Node:</label>
                     <label className="form-label">
                        <select className="option"  name="failure_node" onChange={handleChange}>
                            {data.failure_nodes.map(failure_node => (
                                <option  key={failure_node.id} value={failure_node.id}>{failure_node.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
              <div className="form-row">
                    <label className="form-label">Recovery Method:</label>
                     <label className="form-label">
                        <select className="option"  name="recovery_method" onChange={handleChange}>
                            {data.recovery_methods.map(recovery_method => (
                                <option  key={recovery_method.id} value={recovery_method.id}>{recovery_method.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
              <div className="form-row">
                     <label className="form-label">
                        Service Company:
                            <select name="service_company" onChange={handleChange}>
                                {data.service_companies.map(company => (
                                    <option key={company.id} value={company.id}>{company.name.first_name}</option>
                                ))}
                        </select>
                     </label>
                </div>


              <div className="form-buttons">
                  <button type="submit" className="search-btn">Создать</button>
              </div>
          </form>
      </div>

  );
};

export default ClaimForm;
