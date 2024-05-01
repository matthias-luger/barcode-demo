import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ArrowForward from '@mui/icons-material/ArrowForwardIos'
import { Link, useNavigate } from 'react-router-dom'
import { Device } from '../types/device'
import { useEffect, useState } from 'react'
import { API_PORT } from '../main'

function Startpage() {
    const navigate = useNavigate()
    const [devices, setDevices] = useState<Device[]>([])

    useEffect(() => {
        loadDevices()

        const callback = (event: CustomEvent) => {
            navigate(`/details/${event.detail}`)
        }

        window.addEventListener<any>('scancomplete', callback)

        return () => {
            window.removeEventListener<any>('scancomplete', callback)
        }
    }, [])

    async function loadDevices() {
        const url = new URL(`${window.location.origin}/devices`)
        url.port = API_PORT

        const response = await fetch(url)
        const data = await response.json()

        setDevices(data)
    }

    function openBarcodeScanner() {
        if ((window as any)['CoflScanQr'] !== undefined) {
            void (window as any)['CoflScanQr'].postMessage('scan')
        }
    }

    return (
        <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4 text-blue-600 text-shadow text-center">Barcode Scanner</h1>
            <button onClick={openBarcodeScanner} className="bg-blue-500 mb-4 text-white font-bold py-2 px-4 rounded">
                <CameraAltIcon />
                <span style={{ marginLeft: 5 }}>Scan</span>
            </button>
            <hr className="w-full mb-4 border-y-2" />
            <ul className="mb-4 space-y-2 w-full">
                {devices.map(device => (
                    <Link key={device.id} to={`/details/${device.id}`}>
                        <li className="text-xl mb-2 bg-gray-300 border pl-8 py-2 rounded-xl shadow flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">{device.name}</h2>
                                <p className="text-sm text-gray-600">{device.constructionSite}</p>
                            </div>
                            <ArrowForward style={{ marginRight: 15 }} />
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Startpage
