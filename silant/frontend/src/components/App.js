import React from "react";
import '../styles/App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Search from "./Search/Search";
import {Route, Routes} from "react-router-dom";
import Login from "./Header/Login";
import Main from "./Main/Main";
import MachineTable from "./Main/MachineTable";
import ClaimTable from "./Main/ClaimTable";
import MaintenanceTable from "./Main/MaintenanceTable";
import Dashboard from "./Main/Dashboard";
import './Main/Dashboard.css';
import MachineDetails from "./Main/MachineDetails";
import ClaimDetails from "./Main/ClaimDetails";
import MaintenanceDetails from "./Main/MaintenanceDetails";
import MachineForm from "./Main/CreateForms/MachineForm";
import MaintenanceForm from "./Main/CreateForms/MaintenanceForm";
import MachineCreateForm from "./Main/CreateForms/MachineCreateForm";
import MF from "./Main/CreateForms/MachineForm/MF";


function App () {
    return (
    <div className="main-page">
      <Header />


      <main className="content">
          <div className="dashboard">
            < Dashboard />

              {/*<Search/>*/}
        </div>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/machines/:id" element={<MachineDetails />} />
              <Route path="/claims/:id" element={<ClaimDetails />} />
              <Route path="/maintenances/:id" element={<MaintenanceDetails />} />
              <Route path="/create-machine" element={<MF/>} />
              <Route path="/create-main" element={<MaintenanceForm/>} />
              <Route path="/" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/machines" element={<MachineTable />} />
              <Route path="/claim" element={<ClaimTable />} />
              <Route path="/maintenance" element={<MaintenanceTable />} />
          </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;