import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";

const EditableTableCell = ({ value, onSave, options }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || options[0] || "");

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave(editValue);
    console.log(editValue);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <>
      {isEditing ? (
        <>
          <Form.Select
            value={editValue}
            onChange={handleChange}
            className="w-50"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
          <div className="btn btn-dark mx-2" onClick={handleSave}>
            <FaSave />
          </div>
        </>
      ) : (
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div>{value}</div>
          <FaEdit
            role="button"
            className="cursor mx-2"
            onClick={handleToggleEdit}
          />
        </div>
      )}
    </>
  );
};

export default EditableTableCell;
