import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Organization = () => {
  const { id } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const fetchTechnicalModel = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/organizations/${id}/`);
        setOrg(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechnicalModel();
  }, [id]);

  if (!org) {
    return <p>Организация, проводившая ТО</p>;
  }

  return (
    <div>
      <p>{org.description}</p>
    </div>
  );
};

export default Organization;