import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TypeOfMaintenance = () => {
  const { id } = useParams();
  const [type, setType] = useState(null);

  useEffect(() => {
    const fetchTechnicalModel = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/type_of_maintenance/${id}/`);
        setType(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechnicalModel();
  }, [id]);

  if (!type) {
    return <p>Вид ТО</p>;
  }

  return (
    <div>
      <p>{type.description}</p>
    </div>
  );
};

export default TypeOfMaintenance;