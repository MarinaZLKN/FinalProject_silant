import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecoveryMethod = () => {
  const { id } = useParams();
  const [recoveryMethod, setRecoveryMethod] = useState(null);

  useEffect(() => {
    const fetchTechnicalModel = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/recovery_methods/${id}/`);
        setRecoveryMethod(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechnicalModel();
  }, [id]);

  if (!recoveryMethod) {
    return <p>Loading data ...</p>;
  }

  return (
    <div>
      <p>{recoveryMethod.description}</p>
    </div>
  );
};

export default RecoveryMethod;