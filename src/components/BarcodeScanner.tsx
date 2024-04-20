import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function BarcodeScanner() {
    useEffect(() => {
        const channel = new BroadcastChannel('CoflScan')
        channel.postMessage('Scan')

        window.addEventListener('scancomplete', event => {
            console.log(event)
        })

        return () => {
            channel.close()
        }
    }, [])

    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p>The native Scanner should show</p>
            <Link style={{ color: 'blue', textDecoration: 'underline' }} to="/">
                Back to startpage
            </Link>
        </div>
    )
}

export default BarcodeScanner
