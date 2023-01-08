import React from 'react';
import Menu from "./Menu";
import './detailView.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import Info from "./components/Info";
import Config from "./components/Config";
import Control from "./components/Control";

const DetailView = ({deviceIdentifier: deviceId}) => (
    <div className="detailView">
        <Menu/>
        <Routes>
            <Route path={`info`} element={<Info deviceId={deviceId}/>}/>
            <Route path={`config`} element={<Config device/>}/>
            <Route path={`control`} element={<Control/>}/>
            <Route path={`/*`} element={<Navigate to={`info`}/>}/>
        </Routes>
    </div>
)

export default DetailView;