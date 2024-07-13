import React from "react";
import "./App.css";
import {Outlet, Route, Routes} from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage"
import Header from './components/header/Header';
import {Container} from "@mantine/core";
import Create from "./pages/Create";
import {AnalyticsPage} from "./pages/AnalyticsPage";
import {ChatPage} from "./pages/Chat";

function Layout() {
    return (
        <div className="layout">
            <Header/>
            <Container py={10}>
                <Outlet/>
            </Container>
            {/*<Footer/>*/}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="/explore" element={<LandingPage/>}/>
                    <Route path="/analytics" element={<AnalyticsPage/>}/>
                    <Route path="/chat" element={<ChatPage/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
