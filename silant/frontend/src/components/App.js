import React from "react";
import '../styles/App.css';
import Header from "./Header/Header";



function App () {
    return (
    <div className="main-page">
      <Header />

      <main className="content">
        <p>Content</p>
      </main>

      <footer className="footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;