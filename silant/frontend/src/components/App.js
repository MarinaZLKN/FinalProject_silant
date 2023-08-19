import React from "react";
import '../styles/App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Search from "./Search/Search";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./Header/Login";
import MainPicture from "./Main/MainPicture";
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
import ClaimForm from "./Main/CreateForms/ClaimForm";
import PrivateRoute from "./Main/Auth/PrivateRoute";
import MainPagePicture from "./Main/MainPagePicture";


function App () {
    return (
    <div className="main-page">
      <Header />

      <main className="content">
          <div className="dashboard">
              < Dashboard />
              <Search/>


        </div>
          {/*<MainPicture />*/}
          <Routes>
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/" element={<MainPicture />} />
              <Route path="/machines/:id" element={<MachineDetails />} />
              <Route path="/claims/:id" element={<ClaimDetails />} />
              <Route path="/maintenances/:id" element={<MaintenanceDetails />} />
              <Route path="/create-machine" element={<MachineForm/>} />
              <Route path="/create-main" element={<MaintenanceForm/>} />
              <Route path="/create-claim" element={<ClaimForm/>} />
              {/*<Route path="/" element={<Search />} />*/}
              <Route path="/login" element={<Login />} />
              <Route path="/machines" element={<MachineTable />} />
              <Route path="/claim" element={<ClaimTable />} />
              <Route path="/maintenance" element={<MaintenanceTable />} />
          </Routes>

           <div className="main_part-2">
                < MainPagePicture/>
          </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;