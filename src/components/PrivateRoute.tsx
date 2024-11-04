import { Navigate, Outlet } from 'react-router-dom'
import UseAuthStatus from '../hooks/UseAuthStatus'

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = UseAuthStatus();

    if(checkingStatus) {
        return <h3>Loading...</h3>;
    }

  return loggedIn ? <Outlet/> : <Navigate to = "/"/>
}

export default PrivateRoute