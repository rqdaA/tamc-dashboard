import {deviceIdToDBName} from "../../../settings";

type StorageElements =
    "lastFetchDate"
    | "isOnline"
    | "lastUpdate"
    | "temperature"
    | "moisture"
    | "cpuTemp"
    | "uptime"
    | "usbUsage"
    | "sdCardUsage"
    | "cpuUsages"
    | "memUsages"
    | "logs"

interface GraphData {
    'date': string,
    'val': number
}

const validateInfo = (raw: number): string => (raw !== -128 ? `${raw}` : "データなし");
const validateUsage = (raw: number): string => (raw !== -128 ? `${raw}%` : '0%')
export const getElement = (deviceId: string | number, elementName: StorageElements): string | undefined => sessionStorage.getItem(`${deviceId}_${elementName}`)
export const setElement = (deviceId: string | number, elementName: StorageElements, newVal: string): void => sessionStorage.setItem(`${deviceId}_${elementName}`, newVal)
export const parseGraphData = (data: number[]): GraphData[] => {
    return data.map((val: number, index: number): GraphData => {
        return {date: `${index + 1}h`, val: val}
    })
}
export const fetchData = async (deviceId: string | number): Promise<void> => {
    if (getElement(deviceId, "lastFetchDate") && (Date.now() - parseInt(getElement(deviceId, "lastFetchDate"))) < 3600 * 1000)
        return new Promise((resolve) => resolve())
    const url: string = 'toms-server.tail2925.ts.net'
    const respInfo = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/info`, {mode: "cors"})
    const respLogs = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/logs`, {mode: "cors"})
    const respGraph = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/usages`, {mode: "cors"})
    const infoJson: JSON = await (await respInfo).json()
    const logsJson: JSON = await (await respLogs).json()
    const graphDataJson: JSON = await (await respGraph).json()
    setElement(deviceId, "lastFetchDate", Date.now().toString())
    setElement(deviceId, "isOnline", 'true')
    setElement(deviceId, "lastUpdate", infoJson['date'].replace('T', ' '))
    setElement(deviceId, "temperature", validateInfo(infoJson['temperature']))
    setElement(deviceId, "moisture", validateInfo(infoJson['moisture']))
    setElement(deviceId, "cpuTemp", validateInfo(infoJson['cpuTemperature']) + '℃')
    setElement(deviceId, "uptime", validateInfo(infoJson['uptime']))
    setElement(deviceId, "usbUsage", validateUsage(infoJson['usbUsage']))
    setElement(deviceId, "sdCardUsage", validateUsage(infoJson['sdCardUsage']))
    setElement(deviceId, "cpuUsages", graphDataJson['cpuUsage'].join(','))
    setElement(deviceId, "memUsages", graphDataJson['memUsage'].join(','))
    setElement(deviceId, "logs", JSON.stringify(logsJson))
}

export const fetchCameraSettings = async (deviceId: string | number): Promise<JSON> => {
    const url: string = 'toms-server.tail2925.ts.net'
    const settings = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/camera_settings`)
    return (await settings).json()
}

export const capture = (deviceId: string | number) => {
    const url: string = 'toms-server.tail2925.ts.net'
    const img = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/capture`)
}
