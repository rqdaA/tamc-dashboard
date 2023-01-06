import React from 'react';
import './topbar.scss'
import Clock from "./Clock";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";

const Topbar = () => (
    <div className="topbar">
        <div className="left">
            <Link to='/'>
                <p>TAMC DASHBOARD</p>
            </Link>
        </div>
        <div className="right">
            <FontAwesomeIcon icon={faClock} className="timerIcon"/>
            <Clock/>
        </div>
    </div>
)

export default Topbar;