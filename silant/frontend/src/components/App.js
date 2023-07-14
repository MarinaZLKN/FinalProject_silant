import React from "react";
import '../styles/App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Search from "./Search/Search";



function App () {
    return (
    <div className="main-page">
      <Header />

      <main className="content">
        <Search />
      </main>

      <Footer />
    </div>
  );
}

export default App;