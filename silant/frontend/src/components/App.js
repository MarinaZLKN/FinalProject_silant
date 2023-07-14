import React from "react";
import '../styles/App.css';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";



function App () {
    return (
    <div className="main-page">
      <Header />

      <main className="content">
        <p>Content</p>
      </main>

      <Footer />
    </div>
  );
}

export default App;