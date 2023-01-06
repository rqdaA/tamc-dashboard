import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Info from "./components/Info";
import Config from "./components/Config";
import Control from "./components/Control";

const DetailRouter = ({deviceId}) => (
    <Routes>
        <Route path={`info`} element={<Info deviceId={deviceId}/>}/>
        <Route path={`config`} element={<Config device/>}/>
        <Route path={`control`} element={<Control/>}/>
        <Route path={`/*`} element={<Navigate to={`info`}/>}/>
    </Routes>
)

export default DetailRouter;