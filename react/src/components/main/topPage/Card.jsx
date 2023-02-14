import React, {useEffect, useState} from 'react';
import CircleGraph from "../common/CircleGraph";
import {Link} from "react-router-dom";
import {deviceIdToName} from "settings";
import {fetchLatestImage} from "../common/api.ts";


const Card = ({deviceId, isOnline, lastRecvTime, cpuTemp, overAllUsage, usbUsage, detailURL}) => {
    const [imgUrl, setImgUrl] = useState('')
    useEffect(
        () => {
            fetchLatestImage(deviceId).then(
                (url) => setImgUrl(url)
            )
        }, []
    )
    return (<div className="card">
            <Link to={detailURL}>
                <img src={imgUrl} alt=""/>
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
}

export default Card;