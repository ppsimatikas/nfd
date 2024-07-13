import React from "react";
import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import {Container} from "@mantine/core";
import {Header} from "./components/header/Header";
import Create from "./pages/Create";

function Layout() {
    return (
        <div className="layout">
            <Header/>
            <Container>
                <Outlet/>
            </Container>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
