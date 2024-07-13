import React from "react";
import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage"
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {Container} from "@mantine/core";
import Create from "./pages/Create";

function Layout() {
    return (
        <div className="layout">
            <Header/>
            <Container>
                <Outlet/>
            </Container>
            <Footer/>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="/landing-page" element={<LandingPage />} />
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
