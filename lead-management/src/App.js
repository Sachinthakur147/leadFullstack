import React from 'react';
import CustomNavbar from './components/Navbar';
import LeadTable from './components/LeadTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <div className="container mt-4">
        <LeadTable />
      </div>
    </div>
  );
}

export default App;
