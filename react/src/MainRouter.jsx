import React from 'react';
import {Route, Routes,} from "react-router-dom";
import Cards from "./components/main/cards/Cards";
import DetailView from "./components/main/detailView/DetailView";

const MainRouter = () => (
    <Routes>
        <Route index element={<Cards confFile=""/>}/>
        <Route path="/201/*" element={<DetailView deviceIdentifier="201"/>}/>
    </Routes>
)


export default MainRouter