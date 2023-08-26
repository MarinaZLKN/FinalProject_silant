import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FailureNode = () => {
  const { id } = useParams();
  const [failureNode, setFailureNode] = useState(null);

  useEffect(() => {
    const fetchTechnicalModel = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/failure_nodes/${id}/`);
        setFailureNode(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTechnicalModel();
  }, [id]);

  if (!failureNode) {
    return <p>Loading data ...</p>;
  }

  return (
    <div>
      <p>{failureNode.description}</p>
    </div>
  );
};

export default FailureNode;