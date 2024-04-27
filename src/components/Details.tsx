import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Device } from '../types/device'
import { ArrowBack, Delete } from '@mui/icons-material'
import AddHistoryModal from './AddHistoryModal'
import { API_PORT } from '../main'

function Detail() {
    const { id } = useParams()
    const [device, setDevice] = useState<Device | null>(null)

    useEffect(() => {
        loadDevice()
    }, [id])

    async function loadDevice() {
        let url = new URL(`${window.location.origin}/devices/${id}`)
        url.port = API_PORT

        let res = await fetch(url)
        setDevice(await res.json())
    }

    function onDeleteHistory(uuid: string) {
        let url = new URL(`${window.location.origin}/devices/${id}/history/${uuid}`)
        url.port = API_PORT

        fetch(url, {
            method: 'DELETE'
        }).then(() => {
            loadDevice()
        })
    }

    if (!device)
        return (
            <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div>loading...</div>
            </div>
        )

    return (
        <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
            <Link className="absolute left-4 top-4" to="/">
                <ArrowBack fontSize="large" />
            </Link>
            <h1 className="text-4xl font-bold mb-4 text-blue-600 text-shadow text-center">Details</h1>
            <hr className="w-full mb-4 border-y-2" />
            {device && (
                <>
                    <div className="bg-white rounded-lg shadow p-6 w-full max-w-md mb-4">
                        <h2 className="text-2xl font-bold mb-2">{device.name}</h2>
                        <p className="text-gray-700 mb-2">
                            <strong className="la">ID:</strong> {device.id}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Baustelle:</strong> {device.constructionSite}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Beschreibung:</strong> {device.description}
                        </p>
                        <hr className="w-full mt-10 mb-2 border-y-2" />
                        <p className="text-gray-700 mb-2">
                            <strong>Unterschrift:</strong>
                        </p>
                        <img style={{ maxHeight: 150 }} src="/signature.svg" />
                    </div>
                    <div className="my-3 w-full">
                        <AddHistoryModal deviceId={device.id} createButtonStyle={{ position: 'absolute', right: 15 }} onAfterSave={loadDevice} />
                        <h3 className="text-2xl font-bold mb-2 text-center">Historie</h3>
                        {device.history.map((entry, index) => (
                            <div key={index} className="relative mb-4 p-4 bg-white rounded shadow">
                                <button
                                    className="absolute right-2 top-1"
                                    type="button"
                                    onClick={() => {
                                        onDeleteHistory(entry.uuid)
                                    }}
                                >
                                    <Delete className="font-bold text-2xl" style={{ color: 'red' }} />
                                </button>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-500">Datum:</span> {new Date(entry.date).toLocaleDateString()}
                                </p>
                                <p className="text-lg font-semibold">
                                    <span className="text-gray-500">Typ:</span> {entry.type}
                                </p>
                                <hr className="my-3 border-gray-300" />
                                <p className="text-lg">{entry.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Detail
