import React, {useEffect, useState} from "react";
import "./info.scss";
import {deviceIdToName, widthThresholdPx} from "settings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faDroplet,
    faGlobe,
    faMicrochip,
    faServer,
    faTemperatureThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import CircleGraph from "../../common/CircleGraph";
import {getElement, fetchData, parseGraphData} from "../../common/api.ts";
import Loading from "../../common/Loading";

function Info({deviceId}) {
    // TODO Use load waiting screen (or blank page)
    const deviceType = window.screen.width >= widthThresholdPx ? "PC" : "MOBILE"
    const graphAspect = deviceType === "PC" ? 4 : 2
    const [generalInfo, setGeneralInfo] = useState({
        isOnline: ".", lastUpdate: ".", temperature: ".", moisture: ".", cpuTemp: ".", uptime: ".",
    });
    const [storageUsage, setStorageUsage] = useState({
        usb: "0%", sd: "0%",
    });
    const [graphData, setGraphData] = useState({
        'memUsages': [], 'cpuUsages': []
    })
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            await fetchData(deviceId)
            setGeneralInfo({
                isOnline: getElement(deviceId, "isOnline"),
                lastUpdate: getElement(deviceId, "lastUpdate"),
                temperature: getElement(deviceId, "temperature"),
                moisture: getElement(deviceId, "moisture"),
                cpuTemp: getElement(deviceId, "cpuTemp"),
                uptime: getElement(deviceId, "uptime")
            });
            setStorageUsage({
                usb: getElement(deviceId, "usbUsage"),
                sd: getElement(deviceId, "sdCardUsage")
            });
            setGraphData(deviceType === "PC" ? {
                    'memUsages': parseGraphData(getElement(deviceId, "memUsages").split(',').map((x) => parseInt(x))),
                    'cpuUsages': parseGraphData(getElement(deviceId, "cpuUsages").split(',').map((x) => parseInt(x))),
                } : {
                    'memUsages': parseGraphData(getElement(deviceId, "memUsages").split(',').map((x) => parseInt(x))).slice(0, 12),
                    'cpuUsages': parseGraphData(getElement(deviceId, "cpuUsages").split(',').map((x) => parseInt(x))).slice(0, 12)
                }
            )
        }
        fetch().then(
            () => setLoaded(true)
        )
    }, []);

    const Logs = () => {
        const logs = getElement(deviceId, 'logs')
        if (!logs) return 0

        const dataJson = JSON.parse(logs)
        let res = []
        for (let name in dataJson) {
            res.push(
                <div className="infoCard log">
                    <h3 className="title">{name}</h3>
                    <div className="logText">
                        <pre> <code>{dataJson[name]}</code> </pre>
                    </div>
                </div>
            )
        }
        return res
    }

    return loaded ? (<div className="info">
        <h1 className="deviceName">{deviceIdToName[deviceId]}</h1>
        <div className="infoCards">
            <div className="infoCard detailedInfo">
                <h3 className="title">基本情報</h3>
                <div className="infos">
                    <div className="isOnline indiInfo">
                        <FontAwesomeIcon className="icon" icon={faGlobe}/>
                        <p>疎通:{generalInfo.isOnline}</p>
                    </div>
                    <div className="lastUpdate indiInfo">
                        <FontAwesomeIcon className="icon" icon={faCalendar}/>
                        <p>更新:{generalInfo.lastUpdate}</p>
                    </div>
                    <div className="temp indiInfo">
                        <FontAwesomeIcon
                            className="icon"
                            icon={faTemperatureThreeQuarters}
                        />
                        <p>温度:{generalInfo.temperature}</p>
                    </div>
                    <div className="moisture indiInfo">
                        <FontAwesomeIcon className="icon" icon={faDroplet}/>
                        <p>湿度:{generalInfo.moisture}</p>
                    </div>
                    <div className="cpuTemp indiInfo">
                        <FontAwesomeIcon className="icon" icon={faMicrochip}/>
                        <p>CPU温度:{generalInfo.cpuTemp}</p>
                    </div>
                    <div className="uptime indiInfo">
                        <FontAwesomeIcon className="icon" icon={faServer}/>
                        <p>稼働時間:{generalInfo.uptime}</p>
                    </div>
                </div>
                <div className="pictureCard"></div>
            </div>
            <div className="infoCard useRate">
                <h3 className="title">使用率</h3>
                <div className="content">
                    <div className="circles">
                        <CircleGraph text={storageUsage.sd}/>
                        <CircleGraph text={storageUsage.usb}/>
                    </div>
                    <div className="circleDesc">
                        <p className="description">/</p>
                        <p className="description">/mnt/usb1</p>
                    </div>
                </div>
            </div>
            {<Logs/>}
            <div className="infoCard graph">
                <h3 className="title">CPU使用率</h3>
                <ResponsiveContainer className="chart" aspect={graphAspect}>
                    <LineChart width="100%" height="100%" data={graphData['cpuUsages']}>
                        <Line type="monotone" dataKey="val" stroke="#FFFFFF" strokeWidth={2}/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="infoCard graph">
                <h3 className="title">メモリ使用率</h3>
                <ResponsiveContainer className="chart" width="100%" aspect={graphAspect}>
                    <LineChart width="100%" height="100%" data={graphData['memUsages']}>
                        <Line type="monotone" dataKey="val" stroke="#FFFFFF" strokeWidth={2}/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>) : (
        <div className="info">
            <Loading/>
        </div>
    )
}

export default Info;
