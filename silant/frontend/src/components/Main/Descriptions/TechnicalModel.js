import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TechnicalModel = () => {
  const { id } = useParams();
  const [technicalModel, setTechnicalModel] = useState(null);

  useEffect(() => {
    const fetchTechnicalModel = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/technical_models/${id}/`);
        setTechnicalModel(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechnicalModel();
  }, [id]);

  if (!technicalModel) {
    return <p>Loading data ...</p>;
  }

  return (
    <div>
      <p>{technicalModel.description}</p>
    </div>
  );
};

export default TechnicalModel;

