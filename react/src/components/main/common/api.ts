import { deviceIdToDBName } from "../../../settings"

type StorageElements =
    | "lastFetchDate"
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

interface CaptureSettings {
    iso: number
    f_number: number
    ss: number
}

interface GraphData {
    date: string
    val: number
}

const url: string = window.location.hostname
const validateInfo = (raw: number): string => (raw !== -128 ? `${raw}` : "データなし")
const validateUsage = (raw: number): string => (raw !== -128 ? `${raw}%` : "0%")
export const getElement = (deviceId: string | number, elementName: StorageElements): string | undefined => sessionStorage.getItem(`${deviceId}_${elementName}`)
export const setElement = (deviceId: string | number, elementName: StorageElements, newVal: string): void =>
    sessionStorage.setItem(`${deviceId}_${elementName}`, newVal)
export const parseGraphData = (data: number[]): GraphData[] => {
    return data.map((val: number, index: number): GraphData => {
        return { date: `${index + 1}h`, val: val }
    })
}
export const fetchData = async (deviceId: string | number): Promise<void> => {
    if (getElement(deviceId, "lastFetchDate") && Date.now() - parseInt(getElement(deviceId, "lastFetchDate")) < 3600 * 1000)
        return new Promise((resolve) => resolve())
    const respInfo = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/info`, { mode: "cors" })
    const respLogs = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/logs`, { mode: "cors" })
    const respGraph = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/usages`, { mode: "cors" })
    const infoJson: JSON = await (await respInfo).json()
    const logsJson: JSON = await (await respLogs).json()
    const graphDataJson: JSON = await (await respGraph).json()
    setElement(deviceId, "lastFetchDate", Date.now().toString())
    setElement(deviceId, "isOnline", "true")
    setElement(deviceId, "lastUpdate", infoJson["date"].replace("T", " "))
    setElement(deviceId, "temperature", validateInfo(infoJson["temperature"]))
    setElement(deviceId, "moisture", validateInfo(infoJson["moisture"]))
    setElement(deviceId, "cpuTemp", validateInfo(infoJson["cpuTemperature"]) + "℃")
    setElement(deviceId, "uptime", validateInfo(infoJson["uptime"]))
    setElement(deviceId, "usbUsage", validateUsage(infoJson["usbUsage"]))
    setElement(deviceId, "sdCardUsage", validateUsage(infoJson["sdCardUsage"]))
    setElement(deviceId, "cpuUsages", graphDataJson["cpuUsage"].join(","))
    setElement(deviceId, "memUsages", graphDataJson["memUsage"].join(","))
    setElement(deviceId, "logs", JSON.stringify(logsJson))
}

export const fetchCameraSettings = async (deviceId: string | number): Promise<CaptureSettings> => {
    const settings = fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/camera_settings`)
    let captureSettings = await (await settings).json()
    captureSettings["ss"] = parseFloat(captureSettings["ss"].match(/[\d\.]+/)?.[0])
    captureSettings["f_number"] = captureSettings["f_number"].replace("f/", "")
    return captureSettings
}
export const fetchLatestImage = async (deviceId: string | number): Promise<string> => {
    const img = await fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/latest_image`, {
        method: "POST",
        mode: "cors",
        cache: "force-cache",
    })
    return URL.createObjectURL(await img.blob())
}

export const captureImage = async (deviceId: string | number, settings: CaptureSettings): Promise<string> => {
    const img = await fetch(`http://${url}:8080/${deviceIdToDBName[deviceId]}/capture`, {
        method: "POST",
        mode: "cors",
        cache: "force-cache",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            iso: settings["iso"].toString(),
            f_number: `f/${settings["f_number"]}`,
            ss: `${settings["ss"]}s`, // Web Input is in MilliSec, GPhoto's input is in Sec
        }),
    })
    return URL.createObjectURL(await img.blob())
}
