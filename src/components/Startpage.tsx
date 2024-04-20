import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Link, useNavigate } from 'react-router-dom'
import { Device } from '../types/device'
import { useEffect, useState } from 'react'

function Startpage() {
    const navigate = useNavigate()
    const [devices, setDevices] = useState<Device[]>([])

    useEffect(() => {
        loadDevices()
    }, [])

    async function loadDevices() {
        const response = await fetch('/data.json')
        const data = await response.json()

        setDevices(data)
    }

    function navigateToScanner() {
        navigate('/scanner')
    }

    return (
        <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold underline mb-4 text-blue-600 text-shadow text-center">Barcode Scanner</h1>
            <ul className="mb-4 space-y-2 w-full">
                {devices.map(device => (
                    <Link key={device.id} to={`/details/${device.id}`}>
                        <li className="text-xl mb-2 bg-blue-100 border border-blue-200 pl-10 py-2 rounded shadow">
                            <h2 className="text-2xl font-bold">{device.name}</h2>
                            <p className="text-sm text-gray-600">{device.constructionSite}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <button onClick={navigateToScanner} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <CameraAltIcon />
                Open Scanner
            </button>
        </div>
    )
}

export default Startpage
