import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faCircleInfo, faSliders} from "@fortawesome/free-solid-svg-icons";

const SideMenu = (props) => (
    <div className="menu">
        <ul>
            <li>
                <NavLink to="info" className={({isActive}) => "link " + (isActive ? "selectedMenu" : "")}>
                    <FontAwesomeIcon icon={faCircleInfo} className='icon'/>
                    <p>INFO</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="config" className={({isActive}) => "link " + (isActive ? "selectedMenu" : "")}>
                    <FontAwesomeIcon icon={faSliders} className='icon'/>
                    <p>CONFIG</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="control" className={({isActive}) => "link " + (isActive ? "selectedMenu" : "")}>
                    <FontAwesomeIcon icon={faCamera} className='icon'/>
                    <p>CONTROL</p>
                </NavLink>
            </li>
        </ul>
    </div>
)

export default SideMenu;