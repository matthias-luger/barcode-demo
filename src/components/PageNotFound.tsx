import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p className="text-3xl">404 Page not found</p>
            <Link style={{ color: 'blue', textDecoration: 'underline' }} to="/">
                Back to startpage
            </Link>
        </div>
    )
}

export default PageNotFound
