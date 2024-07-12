import React from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import { Header } from "./components/header/Header";

function Layout() {
  return (
      <div className="layout">
        <Header />
        <Outlet />
      </div>
  );
}

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
