import React from 'react';
import {Route, Routes,} from "react-router-dom";
import Cards from "./components/main/cards/Cards";
import DetailView from "./components/main/detailView/DetailView";

const MainRouter = () => (
    <Routes>
        <Route index element={<Cards confFile=""/>}/>
        <Route path="/201/*" element={<DetailView deviceIdentifier="201"/>}/>
        <Route path="/202/*" element={<DetailView deviceIdentifier="202"/>}/>
        <Route path="/203/*" element={<DetailView deviceIdentifier="203"/>}/>
    </Routes>
)


export default MainRouter