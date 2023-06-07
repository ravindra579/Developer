import React, { useState } from 'react';
import './form.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const countries = ['Country 1', 'Country 2', 'Country 3']; // List of countries from the database
const statesByCountry = {
  'Country 1': ['State 1', 'State 2', 'State 3'], // States for Country 1
  'Country 2': ['State 4', 'State 5', 'State 6'], // States for Country 2
  'Country 3': ['State 7', 'State 8', 'State 9'], // States for Country 3
};
const citiesByState = {
  'State 1': ['City 1', 'City 2', 'City 3'], // Cities for State 1
  'State 2': ['City 4', 'City 5', 'City 6'], // Cities for State 2
  'State 3': ['City 7', 'City 8', 'City 9'], // Cities for State 3
  // ... and so on
};

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setState('');
    setCity('');
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setCity('');
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
    calculateAge(event.target.value);
  };

  const calculateAge = (date) => {
    const dob = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    setAge(age)
  };
  const history = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({firstName,lastName,email,country,state,city,gender,"dob":dateOfBirth,age})
    axios.post('http://localhost:4000/api/v1/users', {firstName,lastName,email,country,state,city,gender,"dob":dateOfBirth,age})
    .then(response => {
      console.log('Data sent successfully!');
      console.log(response)
      handleClick()
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

  };
  const handleClick = () => {
    history('/data');
  };
  
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className='form'>
      <button className='button' onClick={handleClick}>Data</button>
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field flex">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          required
          pattern="[A-Za-z]+"
        />
      </div>

      <div className="form-field">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
          pattern="[A-Za-z]+"
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="country">Country:</label>
        <select id="country" value={country} onChange={handleCountryChange} required>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="state">State:</label>
        <select id="state" value={state} onChange={handleStateChange} required>
          <option value="">Select a state</option>
          {statesByCountry[country]?.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="city">City:</label>
        <select id="city" value={city} onChange={handleCityChange} required>
          <option value="">Select a city</option>
          {citiesByState[state]?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>Gender:</label>
        <div className="radio-group radio-group-vertical">
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleGenderChange}
              required
            />
            Male
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
              required
            />
            Female
          </label>
        </div>
      </div>


      <div className="form-field">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          max={today}
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="age">Age:</label>
        <input type="text" id="age" value={age} readOnly />
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Form;
