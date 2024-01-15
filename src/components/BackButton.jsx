import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa";
export const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      className=" mx-3 my-3 px-4 d-flex flex-row align-items-center rounded"
      variant="dark"
      onClick={handleGoBack}
    >
      <FaArrowLeft />
    </Button>
  );
};

export default BackButton;
