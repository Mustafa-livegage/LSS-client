import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
export const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button className=" mx-3 my-3 " variant="dark" onClick={handleGoBack}>
      

      {/* <IoMdArrowRoundBack /> */}
      <h5 className="mx-1">Back</h5>
      
      
    </Button>
  );
};

export default BackButton;
