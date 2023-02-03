import React from 'react';
import SideMenu from "./SideMenu";
import './detailView.scss'
import Info from "./info/Info";
import Config from "./config/Config";
import Control from "./control/Control";
import {Route, Routes, Navigate} from "react-router-dom";

const DetailView = ({deviceIdentifier}) => (
    <div className="detailView">
        <SideMenu/>
        <Routes>
            <Route path={`info`} element={<Info deviceId={deviceIdentifier}/>}/>
            <Route path={`config`} element={<Config className="menuConfig" deviceId={deviceIdentifier}/>}/>
            <Route path={`control`} element={<Control className="menuControl" deviceId={deviceIdentifier}/>}/>
            <Route path={`/*`} element={<Navigate to={`info`}/>}/>
        </Routes>
    </div>
)

export default DetailView;