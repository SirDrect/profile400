// File: src/pages/AddProject.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function AddProject() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (password !== "froly123") {
      alert("Wrong password!");
      return;
    }
    const projectRef = ref(db, "projects");
    push(projectRef, { name, comment });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-3xl mb-4">🔐 Add New Project</h2>
      <input
        type="password"
        placeholder="Enter password"
        className="p-2 mb-2 rounded bg-gray-800 block w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Project Name"
        className="p-2 mb-2 rounded bg-gray-800 block w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Project Comment"
        className="p-2 mb-2 rounded bg-gray-800 block w-full"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAdd} className="p-2 bg-blue-600 rounded">Submit</button>
    </div>
  );
}

export default AddProject;
