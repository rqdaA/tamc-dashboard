import React, {useEffect, useState} from "react";
import "./info.scss";
import {deviceIdToDBName, deviceIdToName, widthThresholdPx} from "settings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar, faDroplet, faGlobe, faMicrochip, faServer, faTemperatureThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import CircleGraph from "../../common/CircleGraph";

function Info({deviceId, fetchApi}) {
    const graphAspect = window.screen.width >= widthThresholdPx ? 4 : 2;
    const [generalInfo, setGeneralInfo] = useState({
        isOnline: ".", lastUpdate: ".", temp: ".", moisture: ".", cpuTemp: ".", uptime: ".",
    });
    const [storageUsage, setStorageUsage] = useState({
        usb: "0%", sd: "0%",
    });
    const [graphData, setGraphData] = useState({
        'memUsages': [],
        'cpuUsages': []
    })

    useEffect(() => {
        const tick = () => {
            setGeneralInfo((state) => {
                let newState = {...state};
                for (let key in newState) {
                    let val = newState[key];
                    if (!val.replaceAll(".", "").length) {
                        if (val.length === 3) val = ""; else val += ".";
                    }
                    newState[key] = val;
                }
                return newState;
            });
        }

        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    });

    useEffect(() => {
        const access_db = async () => {
            // const url = window.location.host;
            const url = 'toms-server.tail2925.ts.net'
            const respInfo = await fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}`, {mode: "cors"})
            const respLogs = await fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/logs`, {mode: "cors"})
            const respGraph = await fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/usages`, {mode: "cors"})
            const infoJson = await respInfo.json()
            const logsJson = await respLogs.json()
            const graphDataJson = await respGraph.json()
            const str = sessionStorage
            const validate = (raw) => (raw !== -128 ? `${raw}` : "データなし");
            const validateUsage = (num) => (num !== -128 ? `${num}%` : '0%')
            str.setItem(`${deviceId}_isOnline`, 'true')
            str.setItem(`${deviceId}_lastUpdate`, infoJson['date'].replace('T', ' '))
            str.setItem(`${deviceId}_temp`, validate(infoJson['temperature']))
            str.setItem(`${deviceId}_moisture`, validate(infoJson['moisture']))
            str.setItem(`${deviceId}_cpuTemp`, validate(infoJson['cpuTemperature']) + '℃')
            str.setItem(`${deviceId}_uptime`, validate(infoJson['uptime']))
            str.setItem(`${deviceId}_usbUsage`, validateUsage(infoJson['usbUsage']))
            str.setItem(`${deviceId}_sdUsage`, validateUsage(infoJson['sdCardUsage']))
            str.setItem(`${deviceId}_cpuUsages`, graphDataJson['cpuUsage'].join(','))
            str.setItem(`${deviceId}_memUsages`, graphDataJson['memUsage'].join(','))
            str.setItem(`${deviceId}_logNames`, Object.keys(logsJson).join(','))
            for (let logName in logsJson) str.setItem(`${deviceId}_${logName}`, logsJson[logName])
            setGeneralInfo({
                isOnline: str.getItem(`${deviceId}_isOnline`),
                lastUpdate: str.getItem(`${deviceId}_lastUpdate`),
                temp: str.getItem(`${deviceId}_temp`),
                moisture: str.getItem(`${deviceId}_moisture`),
                cpuTemp: str.getItem(`${deviceId}_cpuTemp`),
                uptime: str.getItem(`${deviceId}_uptime`),
            });
            setStorageUsage({
                usb: str.getItem(`${deviceId}_usbUsage`), sd: str.getItem(`${deviceId}_sdUsage`),
            });
            let res = {}
            for (let kw in graphData) {
                res[kw] = sessionStorage.getItem(`${deviceId}_${kw}`)?.split(',').map((x, n) => {
                    let dic = {}
                    dic['date'] = `${n}h`
                    dic['val'] = parseInt(x)
                    return dic
                })
            }
            console.log(res)
            setGraphData(res)
        };
        const str = sessionStorage
        if (!str.getItem(deviceId) || (Date.now() - parseInt(str.getItem(deviceId))) > 3600 * 1000) {
            access_db();
        }
    }, []);
    const handleLogs = () => {
        const str = sessionStorage
        const names = str.getItem(`${deviceId}_logNames`)
        if (!names) return <></>
        let res = []
        for (let name of names.split(',')) {
            res.push(<div className="infoCard logs">
                <h3 className="title">{name}</h3>
                <div className="logText">
                        <pre>
                            <code>{str.getItem(`${deviceId}_${name}`)}</code>
                        </pre>
                </div>
            </div>)
        }
        return res
    }

    return (<div className="info">
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
                        <p>温度:{generalInfo.temp}</p>
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
                        <CircleGraph text={storageUsage.usb}/>
                        <CircleGraph text={storageUsage.sd}/>
                    </div>
                    <div className="circleDesc">
                        <p className="description">/</p>
                        <p className="description">/mnt/usb1</p>
                    </div>
                </div>
            </div>

            {handleLogs()}
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
    </div>);
}

export default Info;
