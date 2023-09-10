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
const MaintenanceForm = () => {

    const location = useLocation();
    const isEditing = location.state?.isEditing || false;

    const initialMainState = location.state?.maintenance ||{
        date_of_maintenance: '',
        operating_time: '',
        order_number: '',
        data_of_order: '',
        organization: '',
        type_of_maintenance: '',
        machine: '',
      };

    const [mainData, setMainData] = useState(initialMainState)


  const { isAuthenticated, permissions } = useAuth();
  const navigate = useNavigate();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};


  const [permissionError, setPermissionError] = useState(false);

  const [data, setData] = useState({
        organizations: [],
        type_of_maintenances: [],
        machines: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseOrganizations = await axiosInstance.get('http://127.0.0.1:8000/api/organizations/', { headers: commonHeaders });
                const responseTypeOgMaintenance = await axiosInstance.get('http://127.0.0.1:8000/api/types_of_maintenance/', { headers: commonHeaders });
                const responseMachines = await axiosInstance.get('http://127.0.0.1:8000/api/machines/', { headers: commonHeaders });

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
        console.error("User does not have permission to add a maintenance.");
        setPermissionError(true);
        return;
    }

    if (!permissions.includes("backend.change_maintenance") && isEditing) {
            console.error("User does not have permission to edit a maintenance.");
            setPermissionError(true);
            return;
        }
    setPermissionError(false);

    const additionalFormData = {
            organization: parseValue(e.target.organization.value),
            type_of_maintenance: parseValue(e.target.type_of_maintenance.value),
            machine: parseValue(e.target.machine.value),
      };

    const postData = {
          ...mainData,
          ...additionalFormData,
       };

    const method = isEditing ? 'put' : 'post';
    const url = isEditing
        ? `http://127.0.0.1:8000/api/maintenances/${mainData.id}/`
        : 'http://127.0.0.1:8000/api/maintenances/';

    axiosInstance[method](url, postData, {
         headers: {
                    'Content-Type': 'application/json'
                }
        })
          .then((response) => {
            console.log(response.data);
            navigate('/maintenance');
          })
          .catch((error) => {
            console.error(error);
          });
  };


  return (
      <div className="form_1">
          <div className="form-container_main">
          <h2 className="machine-form_h2">Add new maintenance:</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-row">
                  <label className="form-label">
                    Date of order:
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
                    Date of maintenance:
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
                    Operating time:
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
                    Order number:
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
                    <label className="form-label">Type of maintenance:</label>
                     <label className="form-label">
                        <select className="option"  name="type_of_maintenance" onChange={handleChange}>
                            {data.type_of_maintenances.map(type_of_maintenance => (
                                <option  key={type_of_maintenance.id} value={type_of_maintenance.id}>{type_of_maintenance.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
              <div className="form-row">
                    <label className="form-label">Machine serial number:</label>
                     <label className="form-label">
                        <select className="option"  name="machine" onChange={handleChange}>
                            {data.machines.map(machine => (
                                <option  key={machine.id} value={machine.id}>{machine.machine_factory_number}</option>
                            ))}
                        </select>
                     </label>
                </div>

              <div className="form-buttons">
                  <button type="submit" className="search-btn">Create</button>
              </div>
              {permissionError && <p style={{color: 'red'}}>You have no permission to create new maintenances!</p>}
          </form>
      </div>
      </div>


  );
};

export default MaintenanceForm;
