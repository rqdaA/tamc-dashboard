import React from 'react';
import CircleGraph from "../common/CircleGraph";
import {Link} from "react-router-dom";
import {deviceIdToName} from "settings";


const Card = ({deviceId, isOnline, lastRecvTime, cpuTemp, overAllUsage, usbUsage, detailURL}) => (
    <div className="card">
        <Link to={detailURL}> <img src="/image.jpg" alt="IMG"/>
            <h5 className={`deviceName ${isOnline ? "online" : "offline"}`}>{deviceIdToName[deviceId]}</h5>
            <div className="cardInfo">
                <p className="lastRecvTime">{lastRecvTime}</p>
                <p className="cpuTemp">{cpuTemp}</p>
            </div>
            <div className="circles">
                <CircleGraph text={overAllUsage}/>
                <CircleGraph text={usbUsage}/>
            </div>
            <div className='circleDesc'>
                <p className="description">/</p>
                <p className="description">/mnt/data</p>
            </div>
        </Link>
    </div>
)

export default Card;