import React from 'react';
import SideMenu from "./SideMenu";
import './detailView.scss'
import Info from "./info/Info";
import Config from "./config/Config";
import Control from "./control/Control";
import {Route, Routes, Navigate} from "react-router-dom";

const DetailView = ({deviceIdentifier: deviceId}) => (
    <div className="detailView">
        <SideMenu/>
        <Routes>
            <Route path={`info`} loader={() => {}} element={<Info deviceId={deviceId}/>}/>
            <Route path={`config`} element={<Config className="menuConfig" device/>}/>
            <Route path={`control`} element={<Control className="menuControl"/>}/>
            <Route path={`/*`} element={<Navigate to={`info`}/>}/>
        </Routes>
    </div>
)

export default DetailView;