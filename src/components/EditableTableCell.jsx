import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaEdit, FaSave } from "react-icons/fa";

const EditableTableCell = ({ value, onSave, options }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || "");

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave(editValue);
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
          <div className="btn btn-info mx-2" onClick={handleSave}>
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