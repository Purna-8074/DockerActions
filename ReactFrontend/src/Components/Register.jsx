import React, { useEffect, useState } from "react";
import ListData from "./ListData";
import "./Reg.css";
import axios from "axios";
import config from "./Config";

function Register() {
  const burl = `${config.url}/Crud`;
  const [reg, setReg] = useState({
    id: "",
    name: "",
    dep: "",
  });
  const [AllReg, setAllReg] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited

  useEffect(() => {
    Load();
  }, []);

  const Load = async () => {
    try {
      const result = await axios.get(`${burl}/all`);
      setAllReg(result.data);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  function handleInput(e) {
    const { name, value } = e.target;
    setReg({
      ...reg,
      [name]: value,
    });
  }

  async function addOrUpdateReg(e) {
    e.preventDefault();
    try {
      if (editingIndex !== null) {
        // Update existing record
        await axios.put(`${burl}/update/${reg.id}`, reg);
        setEditingIndex(null);
      } else {
        // Add new record
        await axios.post(`${burl}/add`, reg);
      }
      Load();
      setReg({ id: "", name: "", dep: "" });
    } catch (err) {
      console.error("Failed to add/update record:", err);
    }
  }

  function deleteReg(index) {
    const idToDelete = AllReg[index].id;
    axios
      .delete(`${burl}/del/${idToDelete}`)
      .then(() => {
        const afterDeletion = AllReg.filter((_, i) => i !== index);
        setAllReg(afterDeletion);
      })
      .catch((err) => console.error("Failed to delete record:", err));
  }

  function editReg(index) {
    setReg(AllReg[index]);
    setEditingIndex(index);
  }

  return (
    <div className="container">
      <h1>CRUD Operations</h1>

      <form onSubmit={addOrUpdateReg} className="form">
        <input
          type="text"
          name="id"
          placeholder="Enter Your ID"
          value={reg.id}
          onChange={handleInput}
          disabled={editingIndex !== null} // Disable ID change during edit
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={reg.name}
          onChange={handleInput}
        />
        <input
          type="text"
          name="dep"
          placeholder="Enter Department"
          value={reg.dep}
          onChange={handleInput}
        />
        <button type="submit">
          {editingIndex !== null ? "Update Record" : "Add Record"}
        </button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {AllReg.map((reg, index) => (
            <ListData
              key={reg.id || index}
              opName={reg}
              onDelete={() => deleteReg(index)}
              onEdit={() => editReg(index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Register;
