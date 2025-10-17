import React from "react";

function ListData({ opName, onDelete, onEdit }) {
  return (
    <tr>
      <td>{opName.id}</td>
      <td>{opName.name}</td>
      <td>{opName.dep}</td>
      <td>
        <button className="edit-btn" onClick={onEdit}>EDIT</button>
        <button className="delete-btn" onClick={onDelete}>DELETE</button>
      </td>
    </tr>
  );
}

export default ListData;
