import React, { useState,useEffect } from "react";
import axios from 'axios'
import DisplayuserData from "./DisplayuserData";
export const UserdataForm = () => {
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [email,setEmail] = useState('');
    const [userData,setUserData] = useState([])
    // const [edit,setEdit] = useState(false);
    const [newData,setNewData] = useState({name:"",age:"",email:""})
    const [editing, setEditing] = useState(null);

    //we are using flag here:

    useEffect(()=>{
        axios.get('https://66b087176a693a95b5390cf6.mockapi.io/crud')
        .then((response)=>{
            setUserData(response.data)
        })
    },[userData])

  const handleEdit = (id) => {
    setEditing(id);
    const dt = userData.filter((item)=> item.id===id)
    if(dt!==undefined){
        setName(dt[0].e_name)
        setAge(dt[0].e_age)
        setEmail(dt[0].e_email)
       
    }
    
  };

  const handleSave = (id) => {
    const finddata = userData.filter((item)=> item.id===id)

    setNewData({name:finddata[0].e_name,age:finddata[0].e_age,email:finddata[0].e_email})
     console.log(newData)
    axios.put(`https://66b087176a693a95b5390cf6.mockapi.io/crud/${id}`, newData)
      .then(response => {
        // Update the data in the state
        setUserData(userData.map(item =>
          item.id === id ? { ...item, ...newData } : item
        ));
        setEditing(null);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };


//    const handleUpdate = ()=>{
//      handleSubmit()
//      setEdit(false);
//    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("https://66b087176a693a95b5390cf6.mockapi.io/crud",{
            e_name:name,
            e_age:age,
            e_email:email
        })
    
    }
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-around",height:'50px',width:"90%"}}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">
              Name
          </label>
          <input
              type="text"
              name="name"
              placeholder="Enter your name please "
              onChange={(e)=>setName(e.target.value)}
              value={name}
              
            />
          <label htmlFor="Age">
              Age
          </label>

          <input
              type="number"
              name="age"
              placeholder="Enter your age please "
              onChange={(e)=>setAge(e.target.value)}
              value={age}
              
            />

          <label htmlFor="email">
             Email
          </label>
          <input
              type="email"
              name="email"
              placeholder="Enter your emai please "
              onChange={(e)=>setEmail(e.target.value)} 
              value = {email}
            />

            <div>
                <input type="submit" value='submit' />
            </div>
        </form>

        <div>
            <h1>Displaying user data</h1>
           
            
        <div>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(item => (
            <tr key={item.id}>
              <td>{item.e_name}</td>
              <td>{item.e_age}</td>
              <td>{item.e_email}</td>
              <td>
                {
                editing===item.id? <button onClick={() => handleSave(item.id)}>save</button>: <button onClick={() => handleEdit(item.id)}>EDIT</button>
                }
               
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        </div>
      </div>
    </>
  );
};
