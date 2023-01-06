import React from 'react';
import CircleGraph from "./CircleGraph";
import {Link} from "react-router-dom";


const Card = ({isOnline, lastRecvTime, cpuTemp, moisture, overAllUsage, usbUsage, detailURL}) => (
    <div className="card">
        <Link to={detailURL}>
            <img src="/image.jpg" alt="IMG"/>
            <div className="info">
                <p className={isOnline ? "online" : "offline"}>{(isOnline ? "On" : "Off") + "line"}</p>
                <p className="lastRecvTime">{lastRecvTime}</p>
                <p className="cpuTemp">{cpuTemp}</p>
                <p className="moisture">{moisture}</p>
            </div>
            <div className="circles">
                <CircleGraph text={overAllUsage} fileLocation=""/>
                <CircleGraph text={usbUsage} fileLocation=""/>
            </div>
            <div className='circle_desc'>
                <p className="description">/</p>
                <p className="description">/mnt/data</p>
            </div>
        </Link>
    </div>
)

export default Card;