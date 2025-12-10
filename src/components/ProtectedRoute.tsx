import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useUser()

    return (
        <div>
            {user ? children : <Navigate to='/' />}
        </div>
    )
}

export default ProtectedRoute