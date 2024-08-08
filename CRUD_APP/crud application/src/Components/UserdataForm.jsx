import React, { useState, useEffect } from "react";
import axios from "axios";

export const UserdataForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch data once on component mount
  useEffect(() => {
    axios
      .get("https://66b087176a693a95b5390cf6.mockapi.io/crud")
      .then((response) => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

  const handleEdit = (id) => {
    setEditing(id);
    const item = userData.find((item) => item.id === id);
    if (item) {
      setName(item.e_name);
      setAge(item.e_age);
      setEmail(item.e_email);
    }
  };

  const handleSave = (id) => {
    const updatedData = {
      e_name: name,
      e_age: age,
      e_email: email,
    };

    axios
      .put(
        `https://66b087176a693a95b5390cf6.mockapi.io/crud/${id}`,
         updatedData
      )
      .then((response) => {
        setUserData(
          userData.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
          )
        );
        setEditing(null);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://66b087176a693a95b5390cf6.mockapi.io/crud/${id}`)
      .then(() => {
        setUserData(userData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      e_name: name,
      e_age: age,
      e_email: email,
    };

    axios
      .post("https://66b087176a693a95b5390cf6.mockapi.io/crud", newUser)
      .then((response) => {
        setUserData([...userData, response.data]);
        setName("");
        setAge("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "50px",
          width: "90%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name please"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="Age">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age please"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email please"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div>
            <input type="submit" value="Submit" disabled={editing !== null}
 />
          </div>
        </form>

        <div>
          <h1>Displaying user data</h1>
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item) => (
                <tr key={item.id}>
                  <td>{item.e_name}</td>
                  <td>{item.e_age}</td>
                  <td>{item.e_email}</td>
                  <td>
                    {editing === item.id ? (
                      <button onClick={() => handleSave(item.id)}>Save</button>
                    ) : (
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                    )}
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
