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

function App () {
    return (
    <div className="main-page">
      <Header />

      <main className="content">
          <Routes>
              <Route path="/" element={<Main />} />
              {/*<Route path="/" element={<Search />} />*/}
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