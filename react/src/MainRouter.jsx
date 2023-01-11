import React from 'react';
import {Route, Routes,} from "react-router-dom";
import TopPage from "./components/main/topPage/TopPage";
import DetailView from "./components/main/detailView/DetailView";

const MainRouter = () => (
    <Routes>
        <Route index element={<TopPage confFile=""/>}/>
        <Route path="/201/*" element={<DetailView deviceIdentifier="201"/>}/>
        <Route path="/202/*" element={<DetailView deviceIdentifier="202"/>}/>
        <Route path="/203/*" element={<DetailView deviceIdentifier="203"/>}/>
        <Route path="/204/*" element={<DetailView deviceIdentifier="204"/>}/>
    </Routes>
)


export default MainRouter