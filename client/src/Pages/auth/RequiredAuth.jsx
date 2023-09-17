import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function RequiredAuth({ allowedRole }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    return isLoggedIn && allowedRole.find((myRole) => myRole === role) ? (
        <Outlet />
    ) : isLoggedIn ? <Navigate to={'/'} /> : <Navigate to={'/login'} />
}

export default RequiredAuth
