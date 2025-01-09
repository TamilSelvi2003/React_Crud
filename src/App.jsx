import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/Store'; 
import Table from './components/user/User';
import Form from './components/form/Form'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/add/:id?" element={<Form />} /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
