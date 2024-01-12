import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="dark" onClick={handleGoBack}>
      Back
    </Button>
  );
};

export default BackButton;
