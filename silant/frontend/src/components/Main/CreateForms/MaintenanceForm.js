import React, {useEffect, useState} from 'react';
import axiosInstance from "../../axiosConfig";
import './MachineForm.css'
import {useAuth} from "../Auth/AuthContext";

const parseValue = (value) => {
    if (value === "") return null;
    const intValue = parseInt(value);
    return isNaN(intValue) ? value : intValue;
};
const MaintenanceForm = () => {
  const [mainData, setMainData] = useState({
    date_of_maintenance: '',
    operating_time: '',
    order_number: '',
    data_of_order: '',
    organization: '',
    type_of_maintenance: '',
    machine: '',
  });

  const { permissions } = useAuth();

  const [data, setData] = useState({
        organizations: [],
        type_of_maintenances: [],
        machines: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseOrganizations = await axiosInstance.get('http://127.0.0.1:8000/api/organizations/');
                const responseTypeOgMaintenance = await axiosInstance.get('http://127.0.0.1:8000/api/types_of_maintenance/');
                const responseMachines = await axiosInstance.get('http://127.0.0.1:8000/api/machines/');

                setData({

                    organizations: responseOrganizations.data,
                    type_of_maintenances: responseTypeOgMaintenance.data,
                    machines: responseMachines.data,
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
            'organization',
            'type_of_maintenance',
            'machine',

        ];

        if (fieldsToInt.includes(name) && value !== "") {
            const newValue = parseInt(value, 10);

            if (!isNaN(newValue)) {
                setMainData(prevMain => ({
                    ...prevMain,
                    [name]: newValue,
                }));
            }
        } else {
            setMainData(prevMain => ({
                ...prevMain,
                [name]: value,
            }));
        }
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User permissions:", permissions);

    if (!permissions.includes("backend.add_maintenance")) {
        console.error("User does not have permission to add a machine.");
        return;
    }
    const additionalFormData = {
            organization: parseValue(e.target.organization.value),
            type_of_maintenance: parseValue(e.target.type_of_maintenance.value),
            machine: parseValue(e.target.machine.value),
      };
        console.log('additionalFormData: ', additionalFormData)

       const postData = {
          ...mainData,
          ...additionalFormData,
       };

        console.log('postData: ', postData)
    axiosInstance.post('http://127.0.0.1:8000/api/maintenances/', postData, {
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
          <h2 className="machine-form_h2">Добавить ТО</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-row">
                  <label className="form-label">
                    Data of Order:
                    <input
                      type="date"
                      name="data_of_order"
                      value={mainData.data_of_order}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Date of Maintenance:
                    <input
                      type="date"
                      name="date_of_maintenance"
                      value={mainData.date_of_maintenance}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Operating Time (hours):
                    <input
                      type="number"
                      name="operating_time"
                      value={mainData.operating_time}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Order Number:
                    <input
                      type="text"
                      name="order_number"
                      value={mainData.order_number}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                    <label className="form-label">Organization:</label>
                     <label className="form-label">
                        <select className="option"  name="organization" onChange={handleChange}>
                            {data.organizations.map(organization => (
                                <option  key={organization.id} value={organization.id}>{organization.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
              <div className="form-row">
                    <label className="form-label">Type of Maintenance:</label>
                     <label className="form-label">
                        <select className="option"  name="type_of_maintenance" onChange={handleChange}>
                            {data.type_of_maintenances.map(type_of_maintenance => (
                                <option  key={type_of_maintenance.id} value={type_of_maintenance.id}>{type_of_maintenance.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
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

              <div className="form-buttons">
                  <button type="submit" className="search-btn">Создать</button>
              </div>
          </form>
      </div>

  );
};

export default MaintenanceForm;
