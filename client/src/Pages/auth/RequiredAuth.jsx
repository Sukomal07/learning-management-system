import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function RequiredAuth({ allowedRole }) {
    const { role } = useSelector((state) => state.auth);
    const token = Cookies.get('authToken')
    return token && allowedRole.find((myRole) => myRole === role) ? (
        <Outlet />
    ) : token ? <Navigate to={'/'} /> : <Navigate to={'/login'} />
}

export default RequiredAuth
