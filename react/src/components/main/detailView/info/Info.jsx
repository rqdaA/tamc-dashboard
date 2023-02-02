import React, {useEffect, useState} from "react";
import "./info.scss";
import {deviceIdToDBName, deviceIdToName, widthThresholdPx} from "settings";
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

const data = [
    {date: "24h", temperature: Math.round(Math.random() * 50)},
    {
        date: "21h",
        temperature: Math.round(Math.random() * 50),
    },
    {date: "18h", temperature: Math.round(Math.random() * 50)},
    {
        date: "15h",
        temperature: Math.round(Math.random() * 50),
    },
    {date: "12h", temperature: Math.round(Math.random() * 50)},
    {
        date: "9h",
        temperature: Math.round(Math.random() * 50),
    },
    {date: "6h", temperature: Math.round(Math.random() * 50)},
    {
        date: "3h",
        temperature: Math.round(Math.random() * 50),
    },
    {date: "0h", temperature: Math.round(Math.random() * 50)},
];

//TODO Retrieve Data from API and Cache them in LocalStorage
function Info({deviceId}) {
    const aspect = window.screen.width >= widthThresholdPx ? 4 : 2;
    const [info, setInfo] = useState({
        isOnline: ".",
        lastUpdate: ".",
        temp: ".",
        moisture: ".",
        cpuTemp: ".",
        uptime: ".",
        memUsage: ".",
        cpuUsage: ".",
    });
    const [usage, setUsage] = useState({
        usb: "0%",
        sd: "0%",
    });

    useEffect(() => {
        function tick() {
            setInfo((state) => {
                let newState = {...state};
                for (let key in newState) {
                    let val = newState[key];
                    if (!val.replaceAll(".", "").length) {
                        if (val.length === 3) val = "";
                        else val += ".";
                    }
                    newState[key] = val;
                }
                return newState;
            });
        }

        const id = setInterval(() => tick(), 1000);
        return () => clearInterval(id);
    });

    useEffect(() => {
        const access_db = async () => {
            // const url = window.location.host;
            const url = 'toms-server.tail2925.ts.net'
            const resp_info = await fetch(
                `http://${url}:8080/${deviceIdToDBName[deviceId]}`,
                {mode: "cors"}
            )
            const resp_logs = await fetch(
                `http://${url}:8080/${deviceIdToDBName[deviceId]}/logs`,
                {mode: "cors"}
            );
            const info = await resp_info.json();
            const logs = await resp_logs.json()
            const validate = (raw) => (raw !== -128 ? `${raw}` : "データなし");
            const validateUsage = (num) => (num !== -128 ? `${num}%` : '0%')
            const str = sessionStorage
            str.setItem(`${deviceId}_isOnline`, 'true')
            str.setItem(`${deviceId}_lastUpdate`, info['date'].replace('T', ' '))
            str.setItem(`${deviceId}_temp`, validate(info['temperature']))
            str.setItem(`${deviceId}_moisture`, validate(info['moisture']))
            str.setItem(`${deviceId}_cpuTemp`, validate(info['cpuTemperature']) + '℃')
            str.setItem(`${deviceId}_uptime`, validate(info['uptime']))
            str.setItem(`${deviceId}_memUsage`, validate(info['memUsage']))
            str.setItem(`${deviceId}_cpuUsage`, validate(info['cpuUsage']))
            str.setItem(`${deviceId}_usbUsage`, validateUsage(info['usbUsage']))
            str.setItem(`${deviceId}_sdUsage`, validateUsage(info['sdCardUsage']))
            str.removeItem('logNames')
            for (let logName in logs) {
                let prevLog = str.getItem('logNames')
                str.setItem(`${deviceId}_logNames`, (prevLog ? prevLog + "," : "") + logName)
                str.setItem(`${deviceId}_${logName}`, logs[logName])
            }
            setInfo({
                isOnline: str.getItem(`${deviceId}_isOnline`),
                lastUpdate: str.getItem(`${deviceId}_lastUpdate`),
                temp: str.getItem(`${deviceId}_temp`),
                moisture: str.getItem(`${deviceId}_moisture`),
                cpuTemp: str.getItem(`${deviceId}_cpuTemp`) + "℃",
                uptime: str.getItem(`${deviceId}_uptime`),
                memUsage: str.getItem(`${deviceId}_memUsage`),
                cpuUsage: str.getItem(`${deviceId}_cpuUsage`),
            });
            setUsage({
                usb: str.getItem(`${deviceId}_usbUsage`),
                sd: str.getItem(`${deviceId}_sdUsage`),
            });

        };
        const str = sessionStorage
        if (!str.getItem(deviceId) || (Date.now() - parseInt(str.getItem(deviceId))) > 3600 * 1000) {
            access_db();
        }
    }, []);
    const handleLogs = () => {
        return (
            <div className="infoCard logs">
                <h3 className="title">撮影ログ</h3>
                <div className="logText">
                        <pre>
                            <code>Text</code>
                        </pre>
                </div>
            </div>
        )
    }

    return (
        <div className="info">
            <h1 className="deviceName">{deviceIdToName[deviceId]}</h1>
            <div className="infoCards">
                <div className="infoCard detailedInfo">
                    <h3 className="title">基本情報</h3>
                    <div className="infos">
                        <div className="isOnline indiInfo">
                            <FontAwesomeIcon className="icon" icon={faGlobe}/>
                            <p>疎通:{info.isOnline}</p>
                        </div>
                        <div className="lastUpdate indiInfo">
                            <FontAwesomeIcon className="icon" icon={faCalendar}/>
                            <p>更新:{info.lastUpdate}</p>
                        </div>
                        <div className="temp indiInfo">
                            <FontAwesomeIcon
                                className="icon"
                                icon={faTemperatureThreeQuarters}
                            />
                            <p>温度:{info.temp}</p>
                        </div>
                        <div className="moisture indiInfo">
                            <FontAwesomeIcon className="icon" icon={faDroplet}/>
                            <p>湿度:{info.moisture}</p>
                        </div>
                        <div className="cpuTemp indiInfo">
                            <FontAwesomeIcon className="icon" icon={faMicrochip}/>
                            <p>CPU温度:{info.cpuTemp}</p>
                        </div>
                        <div className="uptime indiInfo">
                            <FontAwesomeIcon className="icon" icon={faServer}/>
                            <p>稼働時間:{info.uptime}</p>
                        </div>
                    </div>
                    <div className="pictureCard"></div>
                </div>

                <div className="infoCard useRate">
                    <h3 className="title">使用率</h3>
                    <div className="content">
                        <div className="circles">
                            <CircleGraph text={usage.usb}/>
                            <CircleGraph text={usage.sd}/>
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
                    <ResponsiveContainer className="chart" aspect={aspect}>
                        <LineChart width="100%" height="100%" data={data}>
                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="#FFFFFF"
                                strokeWidth={2}
                            />
                            <XAxis dataKey="date"/>
                            <YAxis/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="infoCard graph">
                    <h3 className="title">メモリ使用率</h3>
                    <ResponsiveContainer className="chart" width="100%" aspect={aspect}>
                        <LineChart width="100%" height="100%" data={data}>
                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="#FFFFFF"
                                strokeWidth={2}
                            />
                            <XAxis dataKey="date"/>
                            <YAxis/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Info;
