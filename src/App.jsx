import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './components/user/User';
import Form from './components/form/Form'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <Router>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/add/:id?" element={<Form />} /> 
        </Routes>
      </Router>
      <ToastContainer />
    </>
     
      
  );
}

export default App;
