import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from '../src/ProjectAssets/membd.js';
import './App.css';


function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    setFormObject(item);
   }
     

  const handleInputChange = function(event) {
  log("in handleInputChange()");

  // Get the 'name' attribute of the input that changed (e.g., 'name', 'email', or 'password')
  const name = event.target.name;

  // Get the new value typed in the input field
  const value = event.target.value;

  // Create a copy of the current formObject state
  let newFormObject = { ...formObject };

  // Update the property corresponding to the input that changed
  newFormObject[name] = value;

  // Update the state to trigger a re-render with the new value
  setFormObject(newFormObject);
}


  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
  if (formObject.id >= 0) {
    deleteById(formObject.id);  
  }
  setFormObject(blankCustomer); 
}


  let onSaveClick = function () {
  if (mode === 'Add') {
    post(formObject);   // Add new customer to memdb.js
  }
  if (mode === 'Update') {
    put(formObject.id, formObject);  // Update existing customer in memdb.js
  }

  setFormObject(blankCustomer);  // Reset form to blank, clearing selection
}

  return (
    <div>
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                className={ (item.id === formObject.id )?'selected': ''}
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
    </div>
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form >
        <table id="customer-add-update" >
          <tbody>
            <tr>
              <td className={'label'} >Name:</td>
              <td><input
                    type="text"
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                    value={formObject.name}
                    placeholder="Customer Name"
                    required /></td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td><input
                type="email"
                name="email"
                value={formObject.email}
                placeholder="name@company.com" /></td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td><input
                  type="password"
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                  value={formObject.password}
                  placeholder="Password"
                  required />
                </td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    </div>
  );
}

export default App;
