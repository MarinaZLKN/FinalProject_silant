import React, {useEffect, useState} from 'react';
import axiosInstance from "../../axiosConfig";
import './MachineForm.css'
import {useAuth} from "../Auth/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";

const parseValue = (value) => {
    if (value === "") return null;
    const intValue = parseInt(value);
    return isNaN(intValue) ? value : intValue;
};
const ClaimForm = () => {


  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const initialClaimState = location.state?.claim ||{
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
  };

  const [claimData, setClaimData] = useState(initialClaimState)
  const { permissions } = useAuth();
  const navigate = useNavigate();

  const [permissionError, setPermissionError] = useState(false);

  const [data, setData] = useState({
        machines: [],
        failure_nodes: [],
        recovery_methods: [],
        service_companies: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMachines = await axiosInstance.get('http://127.0.0.1:8000/api/machines/');
                const responseFailureNodes = await axiosInstance.get('http://127.0.0.1:8000/api/failure_nodes/');
                const responseRecoveryMethods = await axiosInstance.get('http://127.0.0.1:8000/api/recovery_methods/');
                const responseServiceCompanies = await axiosInstance.get('http://127.0.0.1:8000/api/service_companies/');

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
    console.log("User permissions:", permissions);

    if (!permissions.includes("backend.add_claim")) {
        console.error("User does not have permission to add a machine.");
        setPermissionError(true);
        return;
    }

    if (!permissions.includes("backend.change_claim") && isEditing) {
            console.error("User does not have permission to edit a claim.");
            setPermissionError(true);
            return;
        }
    setPermissionError(false);

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

       const method = isEditing ? 'put' : 'post';
       const url = isEditing
            ? `http://127.0.0.1:8000/api/claim/${claimData.id}/`
            : 'http://127.0.0.1:8000/api/claim/';


    axiosInstance[method](url, postData, {
         headers: {
                    'Content-Type': 'application/json'
                }
        })
          .then((response) => {
            console.log(response.data);
            navigate('/claim');
          })
          .catch((error) => {
            console.error(error);
          });
  };

  return (
      <div className="form_1">
          <div className="form-container_claim">
          <h2 className="machine-form_h2">Добавить новую рекламацию:</h2>
          {permissionError && <p style={{color: 'red'}}>Вы не можете добавлять рекламации!</p>}
          <form onSubmit={handleSubmit}>
              <div className="form-row">
                    <label className="form-label">Зав. № машины:</label>
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
                    Дата отказа:
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
                    Дата восстановления:
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
                    Время простоя:
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
                    Наработка:
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
                    Описание отказа:
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
                  <label className="form-label">
                    Используемые запчасти:
                    <input
                      type="text"
                      name="spare_parts_used"
                      value={claimData.spare_parts_used}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>

              <div className="form-row">
                    <label className="form-label">Узел отказа:</label>
                     <label className="form-label">
                        <select className="option"  name="failure_node" onChange={handleChange}>
                            {data.failure_nodes.map(failure_node => (
                                <option  key={failure_node.id} value={failure_node.id}>{failure_node.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
              <div className="form-row">
                    <label className="form-label">Способ восстановления:</label>
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
                        Сервисная компания:
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
      </div>


  );
};

export default ClaimForm;
