import { useParams } from 'react-router-dom'

function Detail() {
    const { id } = useParams()

    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold underline mb-4 text-blue-600 text-shadow text-center">Detail page</h1>
            <p>{id}</p>
        </div>
    )
}

export default Detail
