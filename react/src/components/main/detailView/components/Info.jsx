import React from 'react';
import './contents.scss'
import {deviceIdToName} from "../../../../settings";

//TODO Retrieve Data from API and Cache them in LocalStorage
const Info = ({deviceId}) => (
    <div className='info'>
        <h1 className="deviceName">{deviceIdToName[deviceId]}</h1>
        <div className='detailInfo'>

        </div>

    </div>
)

export default Info;