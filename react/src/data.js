import axios from 'axios';
import React, { useState,useEffect } from 'react';
import "./form.css"
const Data =()=>{
    const [data,setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/users')
        .then(response => {
          console.log('Data fetch successfully!');
          console.log(response.data.results)
          setData(response.data.results)
        })
        .catch(error => {
          if (error.response) {
            console.log('Server responded with an error:', error.response.data);
            console.log('Status code:', error.response.status);
            console.log('Status text:', error.response.statusText);
          } else if (error.request) {
            console.log('No response received:', error.request);
          } else {
            console.log('Error setting up the request:', error.message);
          }
          console.log('Error config:', error.config);
        }); 
    });
return(
<div className="table-container">
<table className="centered-table">
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Country</th>
          <th>State</th>
          <th>City</th>
          <th>Gender</th>
          <th>DateOfBirth</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.country}</td>
            <td>{item.state}</td>
            <td>{item.city}</td>
            <td>{item.gender}</td>
            <td>{item.dob}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div>)
}
export default Data;