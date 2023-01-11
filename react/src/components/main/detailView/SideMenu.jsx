import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faCircleInfo, faSliders} from "@fortawesome/free-solid-svg-icons";

const SideMenu = (props) => (
    // TODO Make SideMenu Responsive
    // TODO Make SideMenu Static (low priority)
    <div className="menu">
        <ul>
            <Link to="info">
                <li>
                    <FontAwesomeIcon icon={faCircleInfo} className='icon'/>
                    <p>INFO</p>
                </li>
            </Link>
            <li>
                <Link to="config">
                    <FontAwesomeIcon icon={faSliders} className='icon'/>
                    <p>CONFIG</p>
                </Link>
            </li>
            <li>
                <Link to="control">
                    <FontAwesomeIcon icon={faCamera} className='icon'/>
                    <p>CONTROL</p>
                </Link>
            </li>
        </ul>
    </div>
)

export default SideMenu;