import React, {useEffect, useState} from 'react';
import './config.scss'
import {FormControlLabel, Slider, Switch} from "@mui/material";


function Config() {
    const [usage, setUsage] = useState(80);
    const [temp, setTemp] = useState(40);
    const [obs, setObs] = useState([]);
    const coloredSwitch = <Switch color="primary"/>
    useEffect(() => {
        setTimeout(() => {
            setObs(['obs_once', 'obs_once_night', 'obs_once_sunset'])
        }, 2000)
    })

    const obsNotifyList = obs.map((v, id) =>
        <FormControlLabel control={coloredSwitch} label={v} key={id} className="notifyToggle"/>
    )

    return (
        <div className="config">
            <div className="notification usage">
                <h3 className="notifyTitle">容量減少通知</h3>
                <div className="slider">
                    <p className="threshold">閾値: {usage}%</p>
                    <Slider min={0} max={100} size="medium" onChange={(e, v) => setUsage(v)} value={usage}/>
                </div>
                <div className="notifyList">
                    <FormControlLabel control={coloredSwitch} label="Slack通知" className="notifyToggle"/>
                    <FormControlLabel control={coloredSwitch} label=" Line通知" className="notifyToggle"/>
                </div>
            </div>

            <div className="notification temp">
                <h3 className="notifyTitle">温度通知</h3>
                <div className="slider">
                    <p className="threshold">閾値: {temp}℃</p>
                    <Slider min={-20} max={60} onChange={(e, v) => setTemp(v)} value={temp}/>
                </div>
                <div className="notifyList">
                    <FormControlLabel control={coloredSwitch} label="Slack通知" className="notifyToggle"/>
                    <FormControlLabel control={coloredSwitch} label="Line通知" className="notifyToggle"/>
                </div>
            </div>
            <div className="notification obs">
                <h3 className="notifyTitle">撮影通知</h3>
                <div className="notifyList">
                    {obsNotifyList}
                </div>
            </div>
        </div>
    )
}

export default Config;