import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Link, useNavigate } from 'react-router-dom'
import { Device } from '../types/device'
import { useEffect, useState } from 'react'

function Startpage() {
    const navigate = useNavigate()
    const [devices, setDevices] = useState<Device[]>([])

    useEffect(() => {
        loadDevices()

        let callback = (event: CustomEvent) => {
            navigate(`/details/${event.detail}`)
        }

        window.addEventListener<any>('scancomplete', callback)

        return () => {
            window.removeEventListener<any>('scancomplete', callback)
        }
    }, [])

    async function loadDevices() {
        let url = new URL(`${window.location.origin}/devices`)
        url.port = '3000'

        const response = await fetch(url)
        const data = await response.json()

        setDevices(data)
    }

    function openBarcodeScanner() {
        if ((window as any)['CoflScanQr'] !== undefined) {
            ;(window as any)['CoflScanQr'].postMessage('scan')
        }
    }

    return (
        <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4 text-blue-600 text-shadow text-center">Barcode Scanner</h1>
            <button onClick={openBarcodeScanner} className="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded">
                <CameraAltIcon />
                Scan
            </button>
            <hr className="w-full mb-4 border-y-2" />
            <ul className="mb-4 space-y-2 w-full">
                {devices.map(device => (
                    <Link key={device.id} to={`/details/${device.id}`}>
                        <li className="text-xl mb-2 bg-blue-300 border border-blue-400 pl-10 py-2 rounded-full shadow">
                            <h2 className="text-2xl font-bold">{device.name}</h2>
                            <p className="text-sm text-gray-600">{device.constructionSite}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Startpage
