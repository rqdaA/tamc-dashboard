import React from 'react';
import SideMenu from "./SideMenu";
import './detailView.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import Info from "./info/Info";
import Config from "./config/Config";
import Control from "./control/Control";

const DetailView = ({deviceIdentifier: deviceId}) => (
    <div className="detailView">
        <SideMenu/>
        <Routes>
            <Route path={`info`} element={<Info deviceId={deviceId}/>}/>
            <Route path={`config`} element={<Config device/>}/>
            <Route path={`control`} element={<Control/>}/>
            <Route path={`/*`} element={<Navigate to={`info`}/>}/>
        </Routes>
    </div>
)

export default DetailView;