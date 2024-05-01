import { AddCircle } from '@mui/icons-material'
import { CSSProperties, ChangeEvent, useState } from 'react'
import { HistoryEntry } from '../types/device'
import { API_PORT } from '../main'

interface Props {
    deviceId: string
    createButtonStyle?: CSSProperties
    onAfterSave?(newHistory: HistoryEntry): void
    onAfterClose?(): void
}

export default function AddHistoryModal(props: Props) {
    const [show, setShow] = useState(false)
    const [newHistory, setNewHistory] = useState({ date: '', type: '', description: '' } as HistoryEntry)

    function onCreateHistoryClick() {
        setShow(true)
    }

    function onSave() {
        const url = new URL(`${window.location.origin}/devices/${encodeURIComponent(props.deviceId)}/history`)
        if (API_PORT) {
            url.port = API_PORT
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...newHistory,
                date: new Date(newHistory.date).toISOString()
            })
        })
        setShow(false)
        props.onAfterSave?.(newHistory)
    }

    function onClose() {
        setShow(false)
    }

    return (
        <>
            <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                style={props.createButtonStyle}
                type="button"
                onClick={onCreateHistoryClick}
            >
                <AddCircle style={{ color: 'blue', fontWeight: 'bold', fontSize: 'x-large' }} />
            </button>
            {show && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                            <div className="relative transform overflow-x-auto rounded-lg bg-white text-left shadow-xl transition-all w-full">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <h2 className="text-2xl font-bold mb-4">Neuer Eintrag</h2>

                                        <div className="mb-6">
                                            <label htmlFor="date-input" className="block mb-2 text-sm font-medium text-gray-900 ">
                                                Datum
                                            </label>
                                            <input
                                                type="date"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={newHistory.date}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    setNewHistory({ ...newHistory, date: e.target.value })
                                                }}
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="type-input" className="block mb-2 text-sm font-medium text-gray-900">
                                                Typ
                                            </label>
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={newHistory.type}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    setNewHistory({ ...newHistory, type: e.target.value })
                                                }}
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="description-input" className="block mb-2 text-sm font-medium text-gray-900">
                                                Beschreibung
                                            </label>
                                            <textarea
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                value={newHistory.description}
                                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                    setNewHistory({ ...newHistory, description: e.target.value })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 flex justify-between">
                                    <button
                                        data-modal-target="default-modal"
                                        data-modal-toggle="default-modal"
                                        className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        type="button"
                                        onClick={onSave}
                                    >
                                        Speichern
                                    </button>
                                    <button
                                        data-modal-target="default-modal"
                                        data-modal-toggle="default-modal"
                                        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
